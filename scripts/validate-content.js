import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PRIMITIVES = ["note_stack", "timeline", "scale", "flow_path", "stacked_bars", "container_transfer"];

// Helper to check words
function wordCount(str) {
  if (!str) return 0;
  return str.split(/\s+/).filter(w => w.trim().length > 0).length;
}

function checkTextField(errors, pathStr, val) {
  if (typeof val === 'string' && wordCount(val) > 0 && wordCount(val) < 8) {
    // allow short formulas or labels, but these usually live in specific fields
    // we'll apply this heuristic mostly to paragraphs
    const ignored = ['formula', 'title', 'label', 'schema_version', 'content_version', 'domain', 'topic', 'hero_visual_concept', 'concept_id', 'folded_into_scene_id', 'scene_type', 'primitive_type', 'variable_id', 'type', 'name', 'expression', 'purpose', 'drives', 'symbol', 'story_engine'];
    if (!ignored.some(ig => pathStr.includes(ig))) {
      errors.push(`Text field too short (<8 words) at ${pathStr}: "${val}"`);
    }
  }
}

// recursively check text fields
function traverse(errors, obj, pathStr = 'root') {
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => traverse(errors, item, `${pathStr}[${idx}]`));
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(k => {
      const val = obj[k];
      if (typeof val === 'string') {
        checkTextField(errors, `${pathStr}.${k}`, val);
      } else {
        traverse(errors, val, `${pathStr}.${k}`);
      }
    });
  }
}

export function validateContent(topicData) {
  const errors = [];
  traverse(errors, topicData);

// 1. hook_scenario check
const hero = topicData.canonical_concept_model?.hero;
if (hero && hero.hook_scenario) {
  const hook = hero.hook_scenario;
  const hasNumber = /\d/.test(hook);
  // rudimentary check for named entity: capitalized word that is not first word of sentence
  // A bit flaky to automate perfectly, but let's check for any uppercase letter not following punctuation.
  const hasUppercaseWordInMiddle = /\s[A-Z][a-z]+/.test(hook);
  if (!hasNumber) errors.push("hook_scenario must contain at least one number.");
  if (!hasUppercaseWordInMiddle) errors.push("hook_scenario must contain a named entity (capitalized word).");
} else {
  errors.push("Missing canonical_concept_model.hero.hook_scenario");
}

// 2. Coverage gaps
const coverage = topicData.canonical_concept_model?.coverage_check;
if (coverage && coverage.coverage_gaps && coverage.coverage_gaps.length > 0) {
  errors.push(`coverage_gaps must be empty. Found: ${coverage.coverage_gaps.join(', ')}`);
}

let introducesCount = 0;
const scenes = topicData.scenes || [];
let allWidgetInputs = [];
let allBoundToInputs = [];

scenes.forEach((scene, i) => {
  // 3. Introduces formal term
  if (scene.introduces_formal_term) introducesCount++;
  
  // 4. non-hook refers_back_to_hook
  // (Assuming scene 0 might be hook elaboration or if hero is separate, all scenes are after hero)
  if (!scene.refers_back_to_hook) {
    errors.push(`Scene ${i} missing refers_back_to_hook: true`);
  }

  // Widget inputs tracking
  if (scene.widget_package && scene.widget_package.inputs) {
    scene.widget_package.inputs.forEach(inp => allWidgetInputs.push(inp.name));
  }

  // 5. Illustration package validation
  const ill = scene.illustration_package;
  if (ill && Object.keys(ill).length > 0) {
    if (!PRIMITIVES.includes(ill.primitive_type)) {
      errors.push(`Scene ${i}: Invalid or missing primitive_type '${ill.primitive_type}'`);
    }
    
    if (!ill.bound_variables || ill.bound_variables.length === 0) {
      errors.push(`Scene ${i}: Missing bound_variables`);
    } else {
      ill.bound_variables.forEach((bv, bvi) => {
        if (!bv.variable_id || !bv.drives) {
          errors.push(`Scene ${i}: bound_variable[${bvi}] missing variable_id or drives`);
        }
      });
    }

    if (!ill.pedagogical_justification) {
      errors.push(`Scene ${i}: Missing illustration pedagogical_justification`);
    } else {
      if (!ill.pedagogical_justification.includes(ill.primitive_type)) {
        errors.push(`Scene ${i}: pedagogical_justification must mention the primitive_type '${ill.primitive_type}'`);
      }
    }

    if (ill.bound_to_widget_input) {
      ill.bound_to_widget_input.forEach(inp => allBoundToInputs.push(inp));
    }
  }
});

if (introducesCount !== 1) {
  errors.push(`Exactly one scene must have introduces_formal_term: true. Found ${introducesCount}`);
}

// 6. Widget inputs must appear in bound_to_widget_input somewhere
const uniqueInputs = [...new Set(allWidgetInputs)];
uniqueInputs.forEach(inp => {
  if (!allBoundToInputs.includes(inp)) {
    errors.push(`Widget input '${inp}' does not appear in any illustration's bound_to_widget_input`);
  }
});

  const storyInteractions = topicData.story_engine?.interactions;
  if (storyInteractions !== undefined && !Array.isArray(storyInteractions)) {
    errors.push('story_engine.interactions must be an array.');
  }

  (storyInteractions ?? []).forEach((interaction, index) => {
    const prefix = `Story engine interaction ${index}`;
    if (!interaction || typeof interaction.input !== 'string' || !interaction.input.trim()) {
      errors.push(`${prefix} needs a non-empty input.`);
    }
    if (!Array.isArray(interaction?.drives) || interaction.drives.length === 0 || interaction.drives.some((drive) => typeof drive !== 'string' || !drive.trim())) {
      errors.push(`${prefix} must drive at least one visual property.`);
    }
    if (typeof interaction?.learning_effect !== 'string' || !interaction.learning_effect.trim()) {
      errors.push(`${prefix} needs a learning effect.`);
    }
  });

  return errors;
}

function main() {
  const fileParam = process.argv[2];
  if (!fileParam) {
    console.error("Usage: node validate-content.js <topic_name>");
    process.exitCode = 1;
    return;
  }

  const dataPath = path.join(process.cwd(), `src/data/chapters/${fileParam}.json`);
  if (!fs.existsSync(dataPath)) {
    console.error(`File not found: ${dataPath}`);
    process.exitCode = 1;
    return;
  }

  const errors = validateContent(JSON.parse(fs.readFileSync(dataPath, 'utf8')));
  if (errors.length > 0) {
    console.error("VALIDATION FAILED:");
    errors.forEach(e => console.error(` - ${e}`));
    process.exitCode = 1;
    return;
  }

  console.log("Validation Passed.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
