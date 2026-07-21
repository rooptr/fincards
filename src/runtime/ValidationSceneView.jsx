import SceneRuntime from './SceneRuntime.jsx';
import { validationObjects, validationScenes } from './validationScene.js';

export default function ValidationSceneView() {
  return (
    <main className="runtime-validation-page">
      <SceneRuntime scenes={validationScenes} objects={validationObjects} />
    </main>
  );
}
