import { useId } from 'react';
import { controlKindFor, controlPercent } from './HandDrawnControl.model.js';

export { controlKindFor } from './HandDrawnControl.model.js';

/**
 * A semantic control whose shape follows the active explanatory metaphor.
 * The native range input remains the source of interaction, so pointer,
 * keyboard, and assistive-technology controls stay intact.
 */
export default function HandDrawnControl({ input, value, metaphor, onChange }) {
  const generatedId = useId();
  const name = input?.name ?? 'value';
  const id = `lesson-control-${generatedId}`;
  const min = input?.min ?? 0;
  const max = input?.max ?? 100;
  const step = input?.step ?? 1;
  const numericValue = Number.isFinite(Number(value)) ? Number(value) : Number(min);
  const kind = controlKindFor(metaphor);
  const progress = controlPercent(numericValue, min, max);
  const valueText = Number.isFinite(numericValue)
    ? numericValue.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : String(value ?? '');

  function changeValue(event) {
    onChange?.(name, Number(event.target.value));
  }

  return (
    <div className={`hand-drawn-control hand-drawn-control--${kind}`}>
      <div className="flex items-baseline justify-between gap-4 text-[12px]">
        <label htmlFor={id} className="text-[#515154]">{name}</label>
        <output htmlFor={id} className="font-medium text-[#1d1d1f]">{valueText}</output>
      </div>
      <div className="hand-drawn-control__track-wrap" aria-hidden="true">
        <span className="hand-drawn-control__ink-track" style={{ '--control-progress': `${progress}%` }} />
        <span className="hand-drawn-control__marker" style={{ left: `${progress}%` }} />
      </div>
      <input
        id={id}
        className="hand-drawn-control__range"
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={numericValue}
        aria-valuetext={`${name}: ${valueText}`}
        onChange={changeValue}
      />
    </div>
  );
}
