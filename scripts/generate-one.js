import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Parse .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.trim().match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
}

// Load scripts json
const scriptsPath = path.join(process.cwd(), 'scratch', 'securitisation_masterclass_audio_scripts.json');
const scripts = JSON.parse(fs.readFileSync(scriptsPath, 'utf8'));

// Get Lesson 3 (index 2)
const lesson = scripts.lessons[2];
console.log(`Targeting lesson: ${lesson.lessonId}`);

// Run renderer in child process
const processEnv = {
  ...process.env,
  AZURE_SPEECH_KEY: env.AZURE_SPEECH_KEY,
  AZURE_SPEECH_REGION: env.AZURE_SPEECH_REGION,
  AZURE_SPEECH_VOICE: 'en-IN-Diya:DragonHDLatestNeural',
  DEEP_DIVE_CHUNK_SIZE: '1500',
  DEEP_DIVE_LESSON_ID: lesson.lessonId,
  DEEP_DIVE_CHAPTER_ID: 'lesson-03-human',
  DEEP_DIVE_TEXT: lesson.script
};

console.log('Spawning generate-deep-dive-audio-azure.mjs for lesson 2...');
const result = spawnSync('node', ['scripts/generate-deep-dive-audio-azure.mjs'], {
  env: processEnv,
  encoding: 'utf8',
  stdio: 'inherit'
});

if (result.status !== 0) {
  console.error(`Process exited with status ${result.status}`);
  if (result.error) console.error(result.error);
  process.exit(1);
} else {
  console.log('Success generating lesson 2!');
}
