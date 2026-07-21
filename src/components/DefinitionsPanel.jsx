import { useEffect, useState } from 'react';

function groupedDefinitions(definitions) {
  return definitions.reduce((groups, item) => {
    const group = item.group || 'Key terms';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
    return groups;
  }, new Map());
}

export default function DefinitionsPanel({ lesson }) {
  const [open, setOpen] = useState(false);
  const definitions = lesson.definitionCatalog ?? [];

  useEffect(() => {
    setOpen(false);
  }, [lesson.id]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (definitions.length === 0) return null;

  return (
    <>
      <button
        className="deep-dive-definitions-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={`definitions-panel-${lesson.id}`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="deep-dive-definitions-toggle-mark" aria-hidden="true">Aa</span>
        <span>Definitions</span>
        <small>{definitions.length}</small>
      </button>
      {open && (
        <>
          <button className="deep-dive-definitions-backdrop" type="button" aria-label="Close definitions panel" onClick={() => setOpen(false)} />
          <aside
            id={`definitions-panel-${lesson.id}`}
            className="deep-dive-definitions-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${lesson.canonicalName ?? lesson.title} academic definitions`}
          >
            <header className="deep-dive-definitions-header">
              <div>
                <span>Academic reference</span>
                <h2>Definitions</h2>
                <p>{definitions.length} terms mapped to this lesson.</p>
              </div>
              <button className="deep-dive-definitions-close" type="button" aria-label="Close definitions" onClick={() => setOpen(false)}>Close</button>
            </header>
            <div className="deep-dive-definitions-content">
              {[...groupedDefinitions(definitions)].map(([group, items]) => (
                <section key={group} className="deep-dive-definition-group">
                  <h3>{group}</h3>
                  <dl>
                    {items.map((item) => (
                      <div key={item.id} className="deep-dive-definition-entry">
                        <dt>{item.term}</dt>
                        <dd>
                          <p><strong>Definition</strong>{item.formalDefinition}</p>
                          <p><strong>Why it matters</strong>{item.whyItMatters}</p>
                          <p><strong>Common examination error</strong>{item.commonExaminationError}</p>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
