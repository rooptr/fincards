import assert from 'node:assert/strict';
import {
  securitisationDefinitions,
  securitisationMasterclassDefinitions,
} from './deepDiveDefinitions.js';
import { SECURITISATION_PODCAST_GLOSSARY } from './securitisationPodcastGlossary.js';

const sourceDefinitions = [...securitisationDefinitions, ...securitisationMasterclassDefinitions];
const expectedIds = sourceDefinitions.map(({ id }) => id).sort();
const actualIds = SECURITISATION_PODCAST_GLOSSARY.map(({ id }) => id).sort();

assert.deepEqual(actualIds, expectedIds);
assert.equal(new Set(actualIds).size, actualIds.length);

const allowedKeys = [
  'aliases',
  'definition',
  'example',
  'id',
  'technicalMeaning',
  'term',
].sort();

for (const entry of SECURITISATION_PODCAST_GLOSSARY) {
  assert.deepEqual(Object.keys(entry).sort(), allowedKeys, entry.id + ' has an unexpected field');
  assert.ok(entry.term.trim(), entry.id + ' needs a term');
  assert.ok(Array.isArray(entry.aliases) && entry.aliases.length > 0, entry.id + ' needs spoken aliases');
  assert.ok(entry.definition.length >= 24, entry.id + ' needs a useful plain definition');
  assert.ok(entry.example.length >= 32, entry.id + ' needs a concrete example');
  assert.ok(entry.technicalMeaning.length >= 40, entry.id + ' needs a precise technical meaning');
  assert.notEqual(entry.example, entry.technicalMeaning, entry.id + ' example cannot repeat its technical meaning');
  assert.equal('whyItMatters' in entry, false, entry.id + ' must not expose whyItMatters');
}

for (const source of sourceDefinitions) {
  const entry = SECURITISATION_PODCAST_GLOSSARY.find(({ id }) => id === source.id);
  assert.equal(entry.technicalMeaning, source.formalDefinition, source.id + ' must preserve the approved technical definition');
}

console.log('Securitisation podcast glossary test passed.');
