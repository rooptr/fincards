import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const sources = [
  { id: 'ril_disney_jv_completion_2024', tier: 1, title: 'Reliance and Disney completion of the JioStar joint-venture transaction', url: 'https://www.ril.com/news-media/press-releases/reliance-and-disney-announce-completion-transaction-form-joint-venture' },
  { id: 'cci_ril_disney_combination_2024', tier: 1, title: 'CCI approval of the Reliance, Viacom18, and Star India combination', url: 'https://www.cci.gov.in/combination/press-release/details/425/0' },
];

const records = {
  mergers_and_acquisitions: {
    description: 'The 2024 Reliance–Disney JioStar transaction provides a real Indian combination for examining how a buyer combines assets, cash, governance, regulatory approvals, and claimed synergies into a transaction whose value must exceed its total cost.',
    question: 'When does combining two businesses create value for owners rather than merely increase scale, and how is that claim tested before the transaction closes?',
    mechanics: 'Define the strategic rationale, value standalone businesses, estimate credible after-tax synergies and integration costs, choose consideration and financing, test accretion and returns, then incorporate governance and regulatory constraints.',
    reason: 'M&A analysis applies to real corporate combinations; the transaction documents and competition approval supply a directly relevant structural anchor.',
  },
  consideration_mix: {
    description: 'The JioStar transaction’s asset and cash contributions provide a real Indian case for showing that consideration design allocates both value and risk among parties; cash, shares, debt assumption, and contingent consideration do not have interchangeable consequences.',
    question: 'How does the form of consideration determine who bears valuation, financing, and post-closing performance risk in a transaction?',
    mechanics: 'Identify each consideration component, value it at announcement and closing as applicable, trace ownership dilution and financing effects, and separate headline purchase price from assumed obligations and contingent payouts.',
    reason: 'Consideration-mix analysis applies to mergers, acquisitions, and joint ventures with identified contribution and ownership terms.',
  },
  exchange_ratio: {
    description: 'The JioStar ownership allocation provides a real transaction structure for teaching how a negotiated exchange ratio translates a relative valuation judgement into post-transaction ownership, control, and dilution.',
    question: 'What relative value judgement is embedded in an exchange ratio, and how does that ratio transfer upside and downside between the two shareholder groups?',
    mechanics: 'Divide the value attributed to the target equity claim by the acquirer share value or negotiated reference value, adjust for the agreed transaction terms, then calculate pro forma ownership and value sensitivity.',
    reason: 'Exchange-ratio analysis applies to stock consideration, mergers, and contribution transactions where relative ownership is issued against contributed value.',
  },
  demerger: {
    description: 'The JioStar restructuring—combining selected media and digital assets into a separately governed venture—provides a real Indian corporate-reorganisation setting for distinguishing a demerger’s strategic focus from its legal, tax, financing, and valuation consequences.',
    question: 'When can separating or transferring a business unlock value through strategic focus, capital allocation, or investor choice, and when does it merely relocate complexity?',
    mechanics: 'Identify the perimeter of assets, liabilities, contracts, employees, and tax attributes transferred; value the stand-alone entity; set ownership and governance; and assess separation costs, stranded costs, and capital structure.',
    reason: 'Demerger analysis applies to corporate reorganisations that transfer a defined business perimeter into a separate ownership or governance structure.',
  },
  spinoff: {
    description: 'The JioStar restructuring offers a nearby real corporate-separation case for explaining how a spin-off changes the investor claim from one conglomerate exposure into separately valued businesses, while requiring a rigorous test of allocation, governance, and stand-alone funding.',
    question: 'Why might separating a business allow markets and management to value it differently, and what costs or conflicts can erase that benefit?',
    mechanics: 'Define the separated perimeter, allocate debt and shared costs, establish stand-alone financial statements and governance, distribute or list the new equity claim, and compare the combined stand-alone values with the pre-separation value net of costs.',
    reason: 'Spin-off analysis applies to separations of an operating business into a separately owned entity; a real corporate restructuring supplies the proper anchor.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:jiostar-ma-batch-010`, description: record.description,
    geography: 'India', recognition_score: 10, governing_question_draft: record.question,
    applicability_status: 'pass', applicability_reason: record.reason,
    applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 9,
    selection_rationale: 'The official closing announcement and CCI approval document the real Indian transaction structure; the lesson uses them as evidence, not as a substitute for M&A mechanics.', sources,
  };
  return lockBestAnchor({
    ...topic, format: 'Structural', classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed because the lesson teaches transaction architecture; full accretion, LBO, and purchase-accounting builds are separately routed to Modeling Labs.',
    formula_or_mechanics_stub: record.mechanics, anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} M&A anchors.`);
