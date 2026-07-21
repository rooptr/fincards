import assert from 'node:assert/strict';
import { prepareNarrationText, renderNarrationSsml } from './lib/narration-surface.js';

const input = 'In late 2022, Kogta Financial transferred receivables into MIAMI 10 2022. The SPV issued ABS. TALF supported funding in 2009. The reserve was 12.5%.';
const surface = prepareNarrationText(input);

assert.ok(!surface.includes('MIAMI 10 2022'), 'transaction codes must not reach the voice unchanged');
assert.ok(surface.includes("Kogta Financial's [[YEAR:2022]] vehicle-loan securitisation"), 'known transaction code should become speakable prose');
assert.ok(surface.includes('[[ALIAS:SPV]]'), 'SPV should use a pronunciation alias');
assert.ok(surface.includes('[[ALIAS:ABS]]'), 'ABS should use a pronunciation alias');
assert.ok(surface.includes('[[ALIAS:TALF]]'), 'TALF should use a pronunciation alias');
assert.ok(surface.includes('[[YEAR:2009]]'), 'years should use date markup rather than raw number words');
assert.ok(surface.includes('[[NUMBER:12.5]]%'), 'ordinary numeric values should use a cardinal marker');

const ssml = renderNarrationSsml(surface, (value) => String(value).replace(/[<&>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char])));
assert.ok(ssml.includes('<say-as interpret-as="date" format="y">2022</say-as>'), 'year must render through say-as');
assert.ok(ssml.includes('<sub alias="S P V">SPV</sub>'), 'SPV must render through sub alias');
assert.ok(ssml.includes('<say-as interpret-as="cardinal">12.5</say-as>%'), 'ordinary numeric values must render through say-as');
assert.ok(!ssml.includes('MIAMI 10 2022'), 'raw transaction code must not leak into SSML');

console.log('Narration surface compiler test passed.');
