import { useMemo } from 'react';
import { formulaMarkup } from '../utils/lessonPresentation';

// Formula terms are defined immediately below the equation. Keeping the equation
// static avoids a second, competing interaction model for the same information.
export default function HoverGlossary({ formula }) {
  const equation = useMemo(() => {
    if (!formula.lhsLatex || !formula.rhsLatex) return null;
    return {
      lhs: formulaMarkup(formula.lhsLatex, { output: 'html', displayMode: false }),
      relation: formulaMarkup(formula.relationLatex ?? '=', { output: 'html', displayMode: false }),
      rhs: formulaMarkup(formula.rhsLatex, { output: 'html', displayMode: false }),
    };
  }, [formula.lhsLatex, formula.relationLatex, formula.rhsLatex]);

  const markup = useMemo(
    () => formulaMarkup(formula.latex, { output: 'html' }),
    [formula.latex],
  );

  return (
    <section className="deep-dive-formula-glossary" aria-label={`${formula.label ?? 'Formula'} definitions`}>
      {equation ? (
        <div className="deep-dive-equation" aria-label={formula.accessibleLabel}>
          <span className="deep-dive-equation-lhs" dangerouslySetInnerHTML={{ __html: equation.lhs }} />
          <span className="deep-dive-equation-relation" dangerouslySetInnerHTML={{ __html: equation.relation }} />
          <span className="deep-dive-equation-rhs" dangerouslySetInnerHTML={{ __html: equation.rhs }} />
        </div>
      ) : (
        <div
          className="deep-dive-formula"
          aria-label={formula.accessibleLabel}
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      )}
      <dl className="deep-dive-formula-key" aria-label="Formula definitions">
        {Object.entries(formula.glossary).map(([key, item]) => (
          <div key={key}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
