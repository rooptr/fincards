import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const log = (msg) => console.log(`[all-render] ${msg}`);

// 1. Record Lesson 1 MP3 stats before execution
const lesson1Path = path.join(process.cwd(), 'public', 'audio', 'deep-dive', 'generated_securitisation_securitization', 'lesson-01-human.mp3');
let lesson1StatsBefore = null;
try {
  const stat = fs.statSync(lesson1Path);
  lesson1StatsBefore = {
    mtimeMs: stat.mtimeMs,
    size: stat.size
  };
  log(`Lesson 1 MP3 original stats recorded. Size: ${stat.size} bytes, mtime: ${stat.mtime}`);
} catch (err) {
  log(`Warning: Lesson 1 MP3 not found: ${err.message}`);
}

// 2. Parse .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.trim().match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
}

// 3. Load 25 lessons
const jsonPath = path.join(process.cwd(), 'scratch', 'securitisation_masterclass_audio_scripts.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
log(`Loaded ${data.lessons.length} lessons from JSON file.`);

// Render lessons 3 through 25. Lessons 1 and 2 are left untouched.
const targetLessons = data.lessons.slice(2);
log(`Filtered to ${targetLessons.length} lessons (lessons 3 through 25).`);

const completed = [];
const failed = [];
const outputPaths = [];
const fileSizes = [];

for (let i = 0; i < targetLessons.length; i++) {
  const lesson = targetLessons[i];
  const lessonNumber = i + 3; // lesson 3 corresponds to index 0 of targetLessons
  const paddedNumber = String(lessonNumber).padStart(2, '0');
  const chapterId = `lesson-${paddedNumber}-human`;

  // Use one consistent narrator across the entire masterclass.
  const voice = 'en-IN-Diya:DragonHDLatestNeural';

  log(`--- Processing Lesson ${lessonNumber}/25: ${lesson.lessonId} with voice ${voice} ---`);

  const processEnv = {
    ...process.env,
    AZURE_SPEECH_KEY: env.AZURE_SPEECH_KEY,
    AZURE_SPEECH_REGION: env.AZURE_SPEECH_REGION,
    AZURE_SPEECH_VOICE: voice,
    // Fewer joins preserve sentence flow and avoid audible chunk boundaries.
    DEEP_DIVE_CHUNK_SIZE: '3000',
    DEEP_DIVE_LESSON_ID: lesson.lessonId,
    DEEP_DIVE_CHAPTER_ID: chapterId,
    DEEP_DIVE_TEXT: lesson.script
  };

  const result = spawnSync('node', ['scripts/generate-deep-dive-audio-azure.mjs'], {
    env: processEnv,
    encoding: 'utf8',
    stdio: 'inherit'
  });

  if (result.status === 0) {
    completed.push(lesson.lessonId);
    const audioFilePath = path.join('public', 'audio', 'deep-dive', lesson.lessonId, `${chapterId}.mp3`);
    const size = fs.statSync(audioFilePath).size;
    outputPaths.push(audioFilePath);
    fileSizes.push(size);
    log(`Successfully generated ${audioFilePath} (${size} bytes).`);
  } else {
    failed.push(lesson.lessonId);
    log(`Failed to generate ${lesson.lessonId}. Exit code: ${result.status}`);
  }
}

// 4. Verifications
log('--- Running verifications ---');
let validationResult = 'PASS';
const validationErrors = [];

// Check counts (lessons 3 to 25 generated).
if (completed.length !== targetLessons.length) {
  validationResult = 'FAIL';
  validationErrors.push(`Expected ${targetLessons.length} successfully completed lessons, but got ${completed.length}`);
}

// Check Lesson 1 stats
if (lesson1StatsBefore) {
  try {
    const statAfter = fs.statSync(lesson1Path);
    if (statAfter.size !== lesson1StatsBefore.size) {
      validationResult = 'FAIL';
      validationErrors.push(`Lesson 1 MP3 size changed from ${lesson1StatsBefore.size} to ${statAfter.size}`);
    }
    if (statAfter.mtimeMs !== lesson1StatsBefore.mtimeMs) {
      validationResult = 'FAIL';
      validationErrors.push(`Lesson 1 MP3 timestamp was modified!`);
    }
  } catch (err) {
    validationResult = 'FAIL';
    validationErrors.push(`Lesson 1 MP3 could not be statted after run: ${err.message}`);
  }
}

// Verify manifests and hashes for lessons 3 through 25.
const verificationLessons = data.lessons.slice(2);
for (let i = 0; i < verificationLessons.length; i++) {
  const lesson = verificationLessons[i];
  const lessonNumber = i + 3;
  const paddedNumber = String(lessonNumber).padStart(2, '0');
  const chapterId = `lesson-${paddedNumber}-human`;
  const folderPath = path.join('public', 'audio', 'deep-dive', lesson.lessonId);
  const mp3File = path.join(folderPath, `${chapterId}.mp3`);
  const manifestFile = path.join(folderPath, 'manifest.json');

  if (!fs.existsSync(mp3File)) {
    validationResult = 'FAIL';
    validationErrors.push(`Missing MP3: ${mp3File}`);
  }
  if (!fs.existsSync(manifestFile)) {
    validationResult = 'FAIL';
    validationErrors.push(`Missing manifest: ${manifestFile}`);
    continue;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    const expectedVoice = 'en-IN-Diya:DragonHDLatestNeural';

    if (!manifest.voice.includes(expectedVoice)) {
      validationResult = 'FAIL';
      validationErrors.push(`${lesson.lessonId} manifest voice mismatch. Expected ${expectedVoice}, found ${manifest.voice}`);
    }

    // Hash verify
    const crypto = await import('node:crypto');
    const expectedHash = crypto.createHash('sha256').update(lesson.script.replace(/\r/g, '').trim()).digest('hex');
    if (manifest.scriptHash !== expectedHash) {
      validationResult = 'FAIL';
      validationErrors.push(`${lesson.lessonId} manifest scriptHash mismatch. Expected ${expectedHash}, found ${manifest.scriptHash}`);
    }

    // SSML literal check
    const scriptText = manifest.chapters[0].script;
    if (/<p>|<s>|<break|<sub|<\/p>|<\/s>|<\/sub>/.test(scriptText)) {
      validationResult = 'FAIL';
      validationErrors.push(`${lesson.lessonId} manifest script contains literal SSML tags.`);
    }

  } catch (err) {
    validationResult = 'FAIL';
    validationErrors.push(`Error validating ${lesson.lessonId}: ${err.message}`);
  }
}

log(`Validation result: ${validationResult}`);
if (validationErrors.length > 0) {
  log(`Errors:\n${validationErrors.join('\n')}`);
}

// 5. Output Report
const report = {
  lessonsCompleted: completed,
  lessonsFailed: failed,
  outputPaths,
  fileSizes,
  validationResult,
  validationErrors
};

fs.writeFileSync('scratch/render-report.json', JSON.stringify(report, null, 2));
log('Wrote report to scratch/render-report.json');
