import assert from 'node:assert/strict';
import { HERO_STAGES, formulaMarkup, stageAt, uniqueMetaphors } from './lessonPresentation.js';

assert.deepEqual(HERO_STAGES, ['prologue', 'reveal', 'expand', 'content']);
assert.match(formulaMarkup('PV = \\frac{FV}{(1+r)^n}'), /katex|frac/);
assert.match(formulaMarkup('WACC = (E/V) \\times r_e'), /sub|WACC/);
assert.equal(new Set(uniqueMetaphors([{ illustration_package: { primitive_type: 'stacked_bars' } }, { illustration_package: { primitive_type: 'stacked_bars' } }])).size, 2);
assert.deepEqual([stageAt(0), stageAt(.35), stageAt(.6), stageAt(.9)], HERO_STAGES);

console.log('lesson presentation tests passed.');
