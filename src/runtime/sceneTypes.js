/**
 * Finance-agnostic runtime contracts.
 * Scene data contains IDs and behavior names. Meaning lives outside this runtime.
 */
export const behaviorNames = [
  'fade',
  'burn',
  'split',
  'shake',
  'collapse',
  'grow',
  'float',
  'assemble',
  'count',
  'highlight',
  'morph',
];

export function assertScene(scene) {
  if (!scene || typeof scene !== 'object') throw new Error('Scene must be an object');
  if (typeof scene.id !== 'string') throw new Error('Scene id must be a string');
  if (!Array.isArray(scene.objects)) throw new Error(`Scene ${scene.id} objects must be an array`);
  if (!Array.isArray(scene.behaviors)) throw new Error(`Scene ${scene.id} behaviors must be an array`);
  scene.behaviors.forEach((behavior) => {
    if (!scene.objects.includes(behavior.target)) throw new Error(`Behavior target ${behavior.target} is not in Scene ${scene.id}`);
    if (!behaviorNames.includes(behavior.action)) throw new Error(`Unknown behavior ${behavior.action}`);
  });
  return scene;
}

export function assertObject(object) {
  if (!object || typeof object !== 'object') throw new Error('Object must be an object');
  if (typeof object.id !== 'string') throw new Error('Object id must be a string');
  if (!object.position || !object.size) throw new Error(`Object ${object.id} needs position and size`);
  return object;
}
