import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TypewriterCopy({ text, duration = 1.05 }) {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (!textRef.current) return undefined;
    const ctx = gsap.context(() => {
      const state = { count: 0 };
      textRef.current.textContent = '';
      gsap.to(state, {
        count: text.length,
        duration,
        ease: 'none',
        onUpdate: () => {
          if (textRef.current) textRef.current.textContent = text.slice(0, Math.floor(state.count));
        },
      });
    }, textRef);
    return () => ctx.revert();
  }, [duration, text]);

  return <span ref={textRef} aria-label={text} />;
}
