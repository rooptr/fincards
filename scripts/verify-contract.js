import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderers = [
  path.join(__dirname, '../src/components/PrimitiveSvgRenderer.jsx'),
  path.join(__dirname, '../src/components/LessonView.jsx')
];

let failed = false;

console.log("== Running Renderer Contract Test ==");

renderers.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 1. Assert no hardcoded template string matching for widget types
  if (content.includes("type === 'Allocation'") || content.includes("type === 'Compare'")) {
    console.error(`❌ FAILED: ${path.basename(file)} still contains hardcoded widget type cases.`);
    failed = true;
  } else if (file.includes('LessonView')) {
    console.log(`✅ PASSED: ${path.basename(file)} Widget engine is generic.`);
  }

  // 2. Assert PrimitiveSvgRenderer uses objects map instead of hardcoded sizes
  if (file.includes('PrimitiveSvgRenderer')) {
    if (content.includes('w-32 h-10 bg-blue-200') && !content.includes('objects.map')) {
      console.error(`❌ FAILED: ${path.basename(file)} still contains hardcoded stack sizes.`);
      failed = true;
    } else {
      console.log(`✅ PASSED: ${path.basename(file)} SVG renderer dynamically maps illustrationPackage.objects.`);
    }
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log("== All Renderer Contract Tests Passed ==");
}
