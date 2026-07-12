import fs from 'fs';
import path from 'path';

function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  // Simple Jaccard similarity of words for rough comparison
  const set1 = new Set(str1.toLowerCase().split(/\W+/).filter(w => w));
  const set2 = new Set(str2.toLowerCase().split(/\W+/).filter(w => w));
  if (set1.size === 0 && set2.size === 0) return 1;
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

const oldFile = fs.readFileSync('./src/data/chapters/wacc.json', 'utf8');
const newFile = fs.readFileSync('C:/Users/swaro/.gemini/antigravity/brain/74394427-aa6e-486e-b6a7-484874ddd415/wacc_raw.json', 'utf8');

const oldData = JSON.parse(oldFile);
const newData = JSON.parse(newFile);

let rejected = false;

// Task 1.3 checks
console.log("== Running Automated Reuse-Detection Gate ==");
for (let i = 0; i < Math.min(oldData.scenes.length, newData.scenes.length); i++) {
  const oldScene = oldData.scenes[i];
  const newScene = newData.scenes[i];

  // 1. Formula Expression Check
  const oldExpr = oldScene.formula_package?.equation || oldScene.formula_package?.expression;
  const newExpr = newScene.formula?.expression;
  if (oldExpr && newExpr) {
    if (calculateSimilarity(oldExpr, newExpr) > 0.85) {
      console.error(`❌ Scene ${i+1} Formula Expression is >85% similar to MVP data: ${newExpr}`);
      rejected = true;
    }
  }

  // 2. Widget Inputs Check
  const oldInputs = JSON.stringify(oldScene.widget_package?.inputs || oldScene.widget_package?.config?.inputs || []);
  const newInputs = JSON.stringify(newScene.widget?.inputs || []);
  if (oldInputs && newInputs && oldInputs.length > 5) {
    if (calculateSimilarity(oldInputs, newInputs) > 0.85) {
      console.error(`❌ Scene ${i+1} Widget Inputs are >85% similar to MVP data`);
      rejected = true;
    }
  }

  // 3. Animation Primitive Check
  const oldAnim = oldScene.animation_package?.primitive;
  const newAnim = newScene.animation?.primitive;
  if (oldAnim && newAnim) {
     // primitive is just a single word (e.g. 'stack'). similarity check doesn't make sense to strictly reject on a single enum word match,
     // but we can check if the overall animation payload is identical.
     const oldAnimFull = JSON.stringify(oldScene.animation_package);
     const newAnimFull = JSON.stringify(newScene.animation);
     if (calculateSimilarity(oldAnimFull, newAnimFull) > 0.85) {
        console.error(`❌ Scene ${i+1} Animation is >85% similar to MVP data`);
        rejected = true;
     }
  }
}

if (!rejected) {
  console.log("✅ Passed Reuse-Detection Gate! All generated content is sufficiently unique.");
} else {
  console.error("❌ Failed Reuse-Detection Gate. Regenerate needed.");
  process.exit(1);
}
