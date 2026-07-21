import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { createBehaviorSegment, behaviorFactories } from './behaviors.js';
import { assertObject, assertScene } from './sceneTypes.js';
import { createScrollTrigger, ScrollTrigger } from './triggers.jsx';

function renderStyle(object) {
  return {
    left: object.position.x,
    top: object.position.y,
    width: object.size.width,
    height: object.size.height,
    opacity: object.opacity ?? 1,
    color: object.style?.color,
    backgroundColor: object.style?.backgroundColor,
    borderColor: object.style?.borderColor,
    borderRadius: object.style?.borderRadius,
    ...object.style,
  };
}

function findScrollContainer(element) {
  let parent = element?.parentElement;
  while (parent) {
    const styles = window.getComputedStyle(parent);
    const canScrollY = /(auto|scroll|overlay)/.test(styles.overflowY);
    if (canScrollY && parent.scrollHeight > parent.clientHeight) return parent;
    parent = parent.parentElement;
  }
  return undefined;
}

function readPinOffset(element) {
  const value = window.getComputedStyle(element).getPropertyValue('--scene-pin-offset');
  const offset = Number.parseFloat(value);
  return Number.isFinite(offset) ? offset : 0;
}

function RuntimeObject({ object, bind, children }) {
  return (
    <div ref={(element) => bind(object.id, element)} data-runtime-object={object.id} className="scene-runtime-object" style={renderStyle(object)}>
      {object.content ?? (
        <>
          {object.icon && <span aria-hidden="true">{object.icon}</span>}
          {object.text && <span>{object.text}</span>}
        </>
      )}
      {children}
    </div>
  );
}

export default function SceneRuntime({ scenes, objects, scroller }) {
  const rootRef = useRef(null);
  const objectRefs = useRef(new Map());
  const runtimeObjects = useMemo(() => objects.map(assertObject), [objects]);
  const runtimeScenes = useMemo(() => scenes.map(assertScene), [scenes]);

  useLayoutEffect(() => {
    if (!rootRef.current || runtimeObjects.length === 0 || runtimeScenes.length === 0) return undefined;
    const ctx = gsap.context(() => {
      const totalDuration = runtimeScenes.reduce((sum, scene) => sum + (scene.duration ?? 1), 0);
      const master = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      const pageSurface = rootRef.current.parentElement;
      // Main Deep Dive lives inside App's own overflow container. Validation
      // route lives inside runtime-validation-page. Bind to that parent so
      // both surfaces scrub the same timeline instead of falling back to the
      // window and producing a shaking, blank pin.
      const resolvedScroller = scroller || findScrollContainer(rootRef.current);
      const pinOffset = readPinOffset(rootRef.current);
      let cursor = 0;

      runtimeScenes.forEach((scene) => {
        const sceneTimeline = gsap.timeline({ defaults: { ease: 'none' } });
        scene.behaviors.forEach((behavior) => {
          const object = runtimeObjects.find((candidate) => candidate.id === behavior.target);
          const element = objectRefs.current.get(behavior.target);
          if (!object || !element) return;
          const segment = createBehaviorSegment({ action: behavior.action, object, element, params: behavior.params });
          sceneTimeline.add(segment, behavior.at ?? 0);
        });

        master.add(sceneTimeline, cursor);
        master.to(rootRef.current, { backgroundColor: scene.background, duration: scene.duration ?? 1, ease: 'none' }, cursor);
        if (pageSurface) master.to(pageSurface, { backgroundColor: scene.background, duration: scene.duration ?? 1, ease: 'none' }, cursor);
        cursor += scene.duration ?? 1;
      });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        master.progress(1);
        return () => master.kill();
      }

      const trigger = createScrollTrigger({
        trigger: rootRef.current,
        timeline: master,
        scroller: resolvedScroller,
        pinOffset,
        distance: Math.max(1800, totalDuration * 900),
        onProgress: (progress) => {
          if (import.meta.env.DEV) rootRef.current.dataset.runtimeProgress = progress.toFixed(3);
        },
      });

      gsap.delayedCall(0, () => {
        trigger.refresh();
        ScrollTrigger.refresh();
      });
      return () => {
        trigger.kill();
        master.kill();
      };
    }, rootRef);
    return () => ctx.revert();
  }, [runtimeObjects, runtimeScenes, scroller]);

  const bind = (id, element) => {
    if (element) objectRefs.current.set(id, element);
    else objectRefs.current.delete(id);
  };

  const renderObjects = (parentId = null) => runtimeObjects
    .filter((object) => (object.parentId ?? null) === parentId)
    .map((object) => (
      <RuntimeObject key={object.id} object={object} bind={bind}>
        {renderObjects(object.id)}
      </RuntimeObject>
    ));

  return (
    <section ref={rootRef} className="scene-runtime-root" data-runtime-scenes={runtimeScenes.length}>
      {renderObjects()}
    </section>
  );
}

export { behaviorFactories };
