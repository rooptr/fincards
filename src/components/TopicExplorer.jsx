import { useMemo, useState } from 'react';
import positions from '../data/topicPositions.json';
import mainTopics from '../data/main_topics.json';
import concepts from '../data/concepts.json';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const clusterMetadata = new Map(mainTopics.map((topic) => [topic.id, topic]));
const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]));
const categoryOrder = [...new Set(mainTopics.map((topic) => topic.category))];

const prettyCluster = (value) => value
  .split('_')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');

const flashcardDestination = (topic) => {
  // The flashcard screen resolves this concept to its explicit card IDs.
  // It only falls back to term matching for the few concepts with no ID mapping.
  const concept = conceptsById.get(topic.id);
  const topicId = concept?.id || topic.id;
  return `${BASE_PATH}/flashcards?topic=${encodeURIComponent(topicId)}`;
};

export default function TopicExplorer() {
  const [query, setQuery] = useState('');
  const search = query.trim().toLowerCase();

  const atlas = useMemo(() => {
    const clusters = new Map();

    positions.forEach((topic) => {
      if (!clusters.has(topic.cluster)) clusters.set(topic.cluster, []);
      clusters.get(topic.cluster).push(topic);
    });

    const grouped = new Map();
    clusters.forEach((topics, clusterId) => {
      const metadata = clusterMetadata.get(clusterId);
      const category = metadata?.category || 'Other Finance Topics';
      const name = metadata?.name || prettyCluster(clusterId);
      const sortedTopics = [...topics].sort((a, b) => a.name.localeCompare(b.name));
      const matches = !search || name.toLowerCase().includes(search) || category.toLowerCase().includes(search)
        || sortedTopics.some((topic) => topic.name.toLowerCase().includes(search));

      if (!matches) return;
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category).push({ id: clusterId, name, topics: sortedTopics });
    });

    return [...grouped.entries()]
      .map(([name, clustersInCategory]) => ({
        name,
        clusters: clustersInCategory.sort((a, b) => a.name.localeCompare(b.name)),
        count: clustersInCategory.reduce((total, cluster) => total + cluster.topics.length, 0),
      }))
      .sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.name);
        const bIndex = categoryOrder.indexOf(b.name);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex) || a.name.localeCompare(b.name);
      });
  }, [search]);

  const visibleTopicCount = atlas.reduce((total, category) => total + category.count, 0);

  return (
    <main className="topic-atlas">
      <style>{`
        .topic-atlas {
          --ink: #111111;
          --muted: #787774;
          --line: #e7e7e5;
          min-height: 100vh;
          background: #fbfbfa;
          color: var(--ink);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
        }
        .topic-atlas * { box-sizing: border-box; }
        .atlas-header {
          position: sticky;
          top: 0;
          z-index: 10;
          display: grid;
          grid-template-columns: minmax(130px, 1fr) auto minmax(250px, 1fr);
          align-items: center;
          gap: 24px;
          min-height: 72px;
          padding: 14px 32px;
          background: rgba(251, 251, 250, 0.94);
          border-bottom: 1px solid var(--line);
          backdrop-filter: blur(12px);
        }
        .atlas-home {
          justify-self: start;
          border: 0;
          padding: 6px 0;
          background: transparent;
          color: var(--ink);
          font: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .atlas-home:hover { color: #0066cc; }
        .atlas-brand { text-align: center; line-height: 1.1; }
        .atlas-brand strong { display: block; font-size: 15px; letter-spacing: -0.035em; }
        .atlas-brand span { display: block; margin-top: 4px; color: var(--muted); font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
        .atlas-search {
          justify-self: end;
          width: min(100%, 320px);
          border: 1px solid var(--line);
          border-radius: 4px;
          background: #ffffff;
          color: var(--ink);
          padding: 10px 12px;
          outline: none;
          font: inherit;
          font-size: 13px;
        }
        .atlas-search:focus { border-color: #0066cc; box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.09); }
        .atlas-layout { display: grid; grid-template-columns: 224px minmax(0, 1fr); max-width: 1560px; margin: 0 auto; }
        .atlas-nav { position: sticky; top: 72px; align-self: start; height: calc(100vh - 72px); overflow-y: auto; padding: 34px 24px 32px 32px; border-right: 1px solid var(--line); }
        .atlas-nav-label { margin: 0 0 13px; color: var(--muted); font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; }
        .atlas-nav a { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 9px 0; color: var(--muted); font-size: 13px; font-weight: 550; line-height: 1.25; text-decoration: none; }
        .atlas-nav a:hover { color: #0066cc; }
        .atlas-nav-count { color: #a5a5a1; font-family: "SF Mono", Consolas, monospace; font-size: 10px; }
        .atlas-content { min-width: 0; padding: 54px 52px 80px; }
        .atlas-intro { max-width: 660px; margin-bottom: 62px; }
        .atlas-eyebrow { margin: 0 0 10px; color: #0066cc; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .atlas-intro h1 { max-width: 570px; margin: 0; font-size: clamp(32px, 4vw, 54px); font-weight: 620; letter-spacing: -0.065em; line-height: 0.98; }
        .atlas-intro p { max-width: 510px; margin: 18px 0 0; color: var(--muted); font-size: 15px; line-height: 1.5; }
        .atlas-category { scroll-margin-top: 104px; padding-top: 2px; }
        .atlas-category + .atlas-category { margin-top: 74px; }
        .atlas-category-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--ink); }
        .atlas-category-heading h2 { margin: 0; font-size: 24px; font-weight: 650; letter-spacing: -0.045em; }
        .atlas-category-heading span { color: var(--muted); font-family: "SF Mono", Consolas, monospace; font-size: 11px; }
        .atlas-clusters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px; row-gap: 37px; padding-top: 25px; }
        .atlas-cluster { min-width: 0; }
        .atlas-cluster h3 { margin: 0 0 13px; color: #3f3f3d; font-size: 15px; font-weight: 650; letter-spacing: -0.025em; }
        .atlas-cluster h3 span { margin-left: 6px; color: #ababaa; font-family: "SF Mono", Consolas, monospace; font-size: 10px; font-weight: 500; }
        .atlas-topics { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 13px; }
        .atlas-topic { border: 0; border-bottom: 1px solid transparent; border-radius: 0; padding: 1px 0; background: transparent; color: #5f5f5c; font: inherit; font-size: 14px; font-weight: 500; line-height: 1.5; text-align: left; cursor: pointer; }
        .atlas-topic:hover, .atlas-topic:focus-visible { border-bottom-color: #0066cc; color: #0066cc; outline: none; }
        .atlas-empty { padding: 24px 0; color: var(--muted); font-size: 14px; }
        @media (max-width: 900px) {
          .atlas-header { grid-template-columns: 1fr auto; padding: 12px 20px; }
          .atlas-brand { text-align: right; }
          .atlas-search { grid-column: 1 / -1; grid-row: 2; justify-self: stretch; width: 100%; }
          .atlas-layout { display: block; }
          .atlas-nav { position: sticky; top: 118px; z-index: 9; display: flex; gap: 16px; width: 100%; height: auto; overflow-x: auto; overflow-y: hidden; padding: 12px 20px; border-right: 0; border-bottom: 1px solid var(--line); background: rgba(251, 251, 250, 0.94); backdrop-filter: blur(12px); }
          .atlas-nav-label { display: none; }
          .atlas-nav a { flex: 0 0 auto; padding: 2px 0; white-space: nowrap; }
          .atlas-content { padding: 40px 20px 64px; }
        }
        @media (max-width: 620px) {
          .atlas-header { gap: 12px; min-height: 108px; }
          .atlas-brand strong { font-size: 14px; }
          .atlas-nav { top: 108px; }
          .atlas-intro { margin-bottom: 46px; }
          .atlas-intro h1 { font-size: 37px; }
          .atlas-intro p { font-size: 14px; }
          .atlas-clusters { grid-template-columns: 1fr; row-gap: 29px; }
          .atlas-category + .atlas-category { margin-top: 55px; }
        }
      `}</style>

      <header className="atlas-header">
        <button className="atlas-home" type="button" onClick={() => window.location.assign(`${BASE_PATH}/`)}>&larr; Home</button>
        <div className="atlas-brand"><strong>Topic Atlas</strong><span>{positions.length} topics</span></div>
        <input
          className="atlas-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a topic or study area"
          aria-label="Find a topic or study area"
        />
      </header>

      <div className="atlas-layout">
        <nav className="atlas-nav" aria-label="Study areas">
          <p className="atlas-nav-label">Study areas</p>
          {atlas.map((category) => (
            <a href={`#atlas-${category.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} key={category.name}>
              {category.name}<span className="atlas-nav-count">{category.count}</span>
            </a>
          ))}
        </nav>

        <div className="atlas-content">
          <section className="atlas-intro">
            <p className="atlas-eyebrow">Interview revision map</p>
            <h1>What have I not revised?</h1>
            <p>Scan the full finance syllabus by area. See a name you forgot? Click it and start its flashcards.</p>
          </section>

          {atlas.length ? atlas.map((category) => (
            <section className="atlas-category" id={`atlas-${category.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} key={category.name}>
              <div className="atlas-category-heading">
                <h2>{category.name}</h2><span>{category.count} topics</span>
              </div>
              <div className="atlas-clusters">
                {category.clusters.map((cluster) => (
                  <article className="atlas-cluster" key={cluster.id}>
                    <h3>{cluster.name}<span>{cluster.topics.length}</span></h3>
                    <div className="atlas-topics">
                      {cluster.topics.map((topic) => (
                        <button key={topic.id} className="atlas-topic" type="button" onClick={() => window.location.assign(flashcardDestination(topic))}>
                          {topic.name}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )) : <p className="atlas-empty">No topic found. Try another word.</p>}

          {search && atlas.length > 0 && <p className="atlas-empty">Showing {visibleTopicCount} topics for “{query.trim()}”.</p>}
        </div>
      </div>
    </main>
  );
}
