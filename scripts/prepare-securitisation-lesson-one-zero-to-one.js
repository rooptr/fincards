import fs from 'node:fs';

const sourceFile = 'scripts/content/securitisation/lesson-01-documentary.txt';
const outputFile = 'scratch/securitisation_lesson_01_zero_to_one_v3.txt';
const metadataFile = 'scratch/securitisation_lesson_01_zero_to_one_v3.json';

const script = fs.readFileSync(sourceFile, 'utf8').replace(/\r/g, '').trim();
const paragraphs = script.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
if (!paragraphs.length) throw new Error(`No narration paragraphs found in ${sourceFile}.`);
const unterminated = paragraphs.find((paragraph) => !/[.!?][”'\")\]]*$/.test(paragraph));
if (unterminated) throw new Error(`Every lesson-one paragraph must end in punctuation: ${unterminated.slice(0, 120)}`);

fs.writeFileSync(outputFile, `${script}\n`);
fs.writeFileSync(metadataFile, `${JSON.stringify({
  version: 'lesson-01-documentary-discovery-v1',
  lessonId: 'generated_securitisation_securitization',
  voice: 'en-IN-Diya:DragonHDLatestNeural',
  sourceFile,
  teachingMethod: 'documentary-discovery',
  references: ['Kogta Financial vehicle-loan securitisation', 'Financial Crisis Inquiry Commission'],
  sources: [
    'https://www.icra.in/Rating/GetRationalReportFilePdf?id=118503',
    'https://www.icra.in/Rating/GetRationalReportFilePdf?id=133655',
    'https://www.rbi.org.in/scripts/notificationuser.aspx/searchnew/scripts/scripts/NotificationUser.aspx?Id=12166',
    'https://www.govinfo.gov/content/pkg/GPO-FCIC/pdf/GPO-FCIC.pdf',
  ],
  oldVersionsUntouched: true,
  outputFile,
}, null, 2)}\n`);

console.log(JSON.stringify({ sourceFile, outputFile, metadataFile, characters: script.length, paragraphs: paragraphs.length }, null, 2));
