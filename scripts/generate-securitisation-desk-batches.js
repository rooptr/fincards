import fs from 'node:fs';
import {
  securitisationDefinitions,
  securitisationMasterclassDefinitions,
} from '../src/data/deepDiveDefinitions.js';
import {
  SECURITISATION_EPISODE_BY_TOPIC,
  SECURITISATION_HEADLINES,
  SECURITISATION_MASTERCLASS,
  SECURITISATION_TOPIC_LENSES,
} from '../src/data/securitisationMasterclass.js';

const queue = JSON.parse(fs.readFileSync('scratch/deep_dive_generation_queue.json', 'utf8'));
const batches = JSON.parse(fs.readFileSync('scratch/deep_dive_generation_batches.json', 'utf8')).lesson_batches
  .filter((batch) => batch.batch_id.startsWith('lessons-securitisation_desk-'));

const sourceCatalog = {
  rbi_transfer_loan_exposures_2021: {
    id: 'rbi_transfer_loan_exposures_2021', tier: 1,
    title: 'RBI Master Direction: Transfer of Loan Exposures Directions, 2021',
    publisher: 'Reserve Bank of India',
    url: 'https://www.rbi.org.in/scripts/notificationuser.aspx/searchnew/scripts/scripts/NotificationUser.aspx?Id=12166',
  },
  rbi_securitisation_standard_assets_2021: {
    id: 'rbi_securitisation_standard_assets_2021', tier: 1,
    title: 'RBI Master Direction: Securitisation of Standard Assets',
    publisher: 'Reserve Bank of India',
    url: 'https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D11959%282%29.html',
  },
  rbi_financial_markets: {
    id: 'rbi_financial_markets', tier: 1,
    title: 'RBI Financial Markets and Regulatory Publications',
    publisher: 'Reserve Bank of India',
    url: 'https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22042',
  },
  rbi_arc_report: {
    id: 'rbi_arc_report', tier: 1,
    title: 'RBI Committee Report on the Working of Asset Reconstruction Companies',
    publisher: 'Reserve Bank of India',
    url: 'https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?ID=1188&UrlPage=',
  },
  sec_structured_finance: {
    id: 'sec_structured_finance', tier: 1,
    title: 'SEC Asset Backed Securities and Regulation AB',
    publisher: 'U.S. Securities and Exchange Commission',
    url: 'https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/asset-backed-securities',
  },
  sec_regulation_ab_final_rule: {
    id: 'sec_regulation_ab_final_rule', tier: 1,
    title: 'SEC Asset-Backed Securities Disclosure and Registration Final Rule',
    publisher: 'U.S. Securities and Exchange Commission',
    url: 'https://www.sec.gov/rules-regulations/2014/09/s7-08-10',
  },
  sifma_uniform_practices_psa: {
    id: 'sifma_uniform_practices_psa', tier: 2,
    title: 'SIFMA Uniform Practices: Standard Prepayment Model',
    publisher: 'Securities Industry and Financial Markets Association',
    url: 'https://www.sifma.org/wp-content/uploads/2017/08/ch02.pdf',
  },
  federal_reserve_talf: {
    id: 'federal_reserve_talf', tier: 1,
    title: 'Federal Reserve announcement establishing the Term Asset-Backed Securities Loan Facility',
    publisher: 'Board of Governors of the Federal Reserve System',
    url: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20081125c.htm',
  },
  fcic_report: {
    id: 'fcic_report', tier: 1,
    title: 'The Financial Crisis Inquiry Report',
    publisher: 'Financial Crisis Inquiry Commission',
    url: 'https://www.govinfo.gov/content/pkg/GPO-FCIC/pdf/GPO-FCIC.pdf',
  },
  bis_synthetic_securitisation: {
    id: 'bis_synthetic_securitisation', tier: 1,
    title: 'Basel Committee framework on securitisation and credit-risk transfer',
    publisher: 'Bank for International Settlements',
    url: 'https://www.bis.org/publ/bcbs189.pdf',
  },
  eu_sts_securitisation: {
    id: 'eu_sts_securitisation', tier: 1,
    title: 'European Commission securitisation framework',
    publisher: 'European Commission',
    url: 'https://finance.ec.europa.eu/regulation-and-supervision/securitisation_en',
  },
};

const allDefinitions = [...securitisationDefinitions, ...securitisationMasterclassDefinitions];

function clean(value) {
  if (typeof value === 'string') return value.replace(/[â€”â€“]/g, ', ').replace(/Ã¢â‚¬â„¢/g, "'").replace(/Ã¢â€šÂ¹/g, 'INR ');
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clean(item)]));
  return value;
}

function sourcePack(topic, lens) {
  const ids = lens.sourceIds ?? topic.research?.candidate_anchors?.[0]?.sources?.map((source) => source.id) ?? [];
  const selected = ids.map((id) => sourceCatalog[id]).filter(Boolean);
  if (selected.length) return [...new Map(selected.map((source) => [source.id, source])).values()];
  return [sourceCatalog.rbi_securitisation_standard_assets_2021, sourceCatalog.sec_structured_finance];
}

function input(name, value, unit, source, sourceField, classification = 'historical_fact') {
  return {
    name,
    value,
    unit,
    asOfDate: 'As stated in the cited source document',
    classification,
    source: source.url,
    sourceId: source.id,
    sourceField,
  };
}

function makeInputs(sources, topic, lens, governingQuestion) {
  const primary = sources[0];
  return [
    input('Primary governing artifact', primary.title, 'source document', primary, 'Official document title'),
    input('Applicable transaction domain', lens.anchor, 'source context', primary, lens.dataField),
    input('Governing question', governingQuestion, 'decision question', primary, 'Research record governing question'),
    input(`${topic.canonical_name} transaction field`, 'Not disclosed in the cited public source pack. Obtain the transaction-level field before issuing a numeric conclusion.', 'research task; field, unit, and as-of date required', primary, lens.dataField, 'market_input'),
  ];
}

function reviewQuestions(topic, lens, governingQuestion) {
  const name = topic.canonical_name;
  return [
    { question: `What economic problem does ${name} solve?`, answer: `${lens.thesis} ${lens.decision}` },
    { question: 'Which cash flow is legally and economically being transferred?', answer: `The answer must identify the contractual cash-flow right, its obligor, its payment frequency, its eligibility conditions, and the legal mechanism that makes the right available to the issuing vehicle. A balance-sheet line or revenue total is not sufficient evidence of a transferable cash flow.` },
    { question: 'Why does the originator remain relevant after closing?', answer: 'The originator can retain underwriting exposure, representations, repurchase obligations, servicing duties, risk retention, or a residual interest. Those continuing obligations affect incentives, collection quality, data integrity, and the credibility of the assumed loss distribution. Legal transfer changes the claim structure; it does not erase institutional conduct.' },
    { question: 'What does the SPV contribute to the credit structure?', answer: 'The SPV creates a limited-purpose legal boundary between the transferred assets and the originator. Its value depends on valid transfer, separateness, account control, governance, servicing continuity, and the enforceability of the payment documents. The acronym itself is not evidence of bankruptcy remoteness.' },
    { question: 'How does collateral performance reach a tranche?', answer: 'Borrower collections, prepayments, defaults, recoveries, fees, and servicing adjustments enter the waterfall. The waterfall then applies contractual priority, enhancement, trigger states, and tranche balances. Tranche risk is therefore produced by the interaction of collateral behaviour and payment priority, not by the collateral label alone.' },
    { question: 'Why are default frequency and recovery timing separate variables?', answer: 'Default frequency identifies how often exposures fail, while recovery severity identifies how much value remains after enforcement, costs, and collateral realization. Recovery timing determines when that value reaches the transaction. A pool with modest defaults can still impair a note if recoveries arrive late, incur high costs, or fall below the assumed severity.' },
    { question: 'What changes when a performance trigger is breached?', answer: 'A trigger is a contractual state transition. Once the specified delinquency, loss, enhancement, payment-rate, or coverage condition is breached, the documents may stop replenishment, redirect excess spread, increase reserves, accelerate senior principal, or change control rights. The answer must state both the threshold and its consequence.' },
    { question: 'What evidence would make the conclusion defensible?', answer: `The minimum evidence is the transaction document, asset eligibility schedule, dated pool stratification, historical performance, servicing report, legal transfer analysis, waterfall, enhancement terms, trigger definitions, and the specific reporting date. ${lens.dataField} remains a defined diligence requirement when it is absent from the cited source pack.` },
    { question: 'What is the most serious category error in securitisation analysis?', answer: `The serious error is treating ${name} as a synonym for credit quality. ${lens.failure} The correct conclusion must separate collateral risk, structural protection, legal enforceability, servicing execution, market liquidity, and model uncertainty.` },
    { question: 'What decision does the governing question make possible?', answer: `${governingQuestion} The decision must be bounded by the evidence: approve further diligence, approve a defined exposure, reject the structure, or withhold a tranche-level conclusion until missing fields are obtained.` },
    { question: 'What would reverse the recommendation?', answer: 'A reversal would follow from evidence that changes the loss distribution, weakens legal isolation, reduces servicing continuity, consumes enhancement earlier than assumed, changes the waterfall, or makes the relevant collateral cash flow less transferable or less predictable than the transaction requires.' },
    { question: 'How should this concept be distinguished from a related structure?', answer: 'Compare the legal asset transfer, reference portfolio, payment priority, loss attachment, replenishment rules, liquidity support, and investor claim. Labels such as ABS, MBS, conduit, synthetic, term, and pass-through describe different dimensions of a transaction and cannot substitute for reading the documents.' },
  ];
}

function makeSections(topic, lens, governingQuestion) {
  const name = topic.canonical_name;
  return [
    { id: 'transaction-mandate', heading: 'Transaction Mandate', body: [lens.thesis, `${governingQuestion} The transaction is evaluated as a defined allocation of legal rights, cash-flow timing, credit risk, and control rights among originator, vehicle, servicer, noteholders, and residual interests.`] },
    { id: 'pool-data-room', heading: 'Pool Data Room', body: [`The evidence boundary for ${name} begins with the asset or reference portfolio. The decision-maker must identify eligibility, seasoning, obligor concentration, delinquency, default, recovery, prepayment, servicing, reporting date, and the field that determines cash availability.`, `The cited primary artifact establishes ${lens.dataField}. It does not establish a transaction-level expected loss or tranche outcome unless the relevant pool tape and transaction documents disclose those fields. Missing evidence is recorded as a diligence requirement rather than replaced with a sector average.`] },
    { id: 'structure-design', heading: 'Structure Design', body: [lens.mechanism, `The design is defensible only when each legal feature has an economic function. Transfer provisions define the investor claim, the vehicle defines the asset boundary, servicing provisions protect collection continuity, and retention or recourse provisions determine which risks remain economically connected to the sponsor.`] },
    { id: 'priority-of-payments', heading: 'Priority of Payments', body: [`Collections become investor cash only after the transaction applies its contractual priority. Fees, reserve movements, interest, principal, losses, and residual distributions must be read in sequence because a shortfall at one step changes the amount available at every later step.`, `For ${name}, the decisive question is not whether the pool produces cash in aggregate. It is which claim receives each unit of cash under ordinary performance, trigger breach, delayed recovery, and accelerated prepayment.`] },
    { id: 'credit-enhancement-triggers', heading: 'Credit Enhancement and Triggers', body: [`Enhancement determines the amount and timing of collateral deterioration that a tranche can withstand before impairment. Subordination, reserves, excess spread, guarantees, and liquidity support have different legal mechanics and must not be aggregated as interchangeable protection.`, `Triggers are contractual responses to measured performance. They can terminate replenishment, redirect excess spread, increase reserve funding, accelerate senior amortisation, or alter control rights. ${lens.failure}`] },
    { id: 'stress-transmission', heading: 'Stress Transmission', body: [`A valid stress begins with a sourced change in ${lens.dataField} and ends with a stated tranche or transaction consequence. Default, recovery, prepayment, servicing, funding, and legal assumptions must be changed separately when their economic effects differ.`, `The public source pack does not disclose the transaction-specific field required for a numeric stress in this lesson. The professional output is therefore a reproducible diligence design: obtain the field, state the convention, run the waterfall, measure enhancement consumption, and identify the claim whose payment changes first.`] },
    { id: 'investment-committee-memo', heading: 'Investment Committee Memo', body: [`The decision for ${name} is bounded: proceed to transaction-level diligence only if the cited evidence supports the structure’s legal, collateral, servicing, enhancement, and cash-flow assumptions. No tranche-level conclusion is authorized from framework documents alone.`, `The recommendation would be reversed by evidence of weaker collateral, defective transfer, inadequate servicing continuity, unmodeled concentration, earlier enhancement depletion, or a payment priority different from the one used in the analysis.`] },
    { id: 'desk-drill', heading: 'Applied Questions', body: ['The questions below test the transferable finance logic of the structure. Each answer must identify the source evidence, economic mechanism, contractual consequence, and boundary of the conclusion.'] },
  ];
}

function makeLesson(topic, batchIndex, topicIndex) {
  const research = topic.research ?? topic;
  const episode = SECURITISATION_EPISODE_BY_TOPIC[topic.topic_id] ?? SECURITISATION_MASTERCLASS.episodes[0];
  const lens = SECURITISATION_TOPIC_LENSES[topic.topic_id] ?? {
    thesis: `${topic.canonical_name} is a structured-credit mechanism that allocates collateral cash flows and credit risk through a documented transaction architecture.`,
    mechanism: research.mechanics_stub ?? 'Identify the collateral, legal transfer, payment priority, enhancement, and stress path from primary transaction documents.',
    decision: 'Decide whether the available evidence supports the proposed cash-flow and risk allocation.',
    failure: 'The concept fails when a label replaces the underlying legal, collateral, servicing, and waterfall analysis.',
    anchor: 'The cited primary structured-finance source pack.',
    sourceIds: ['rbi_securitisation_standard_assets_2021', 'sec_structured_finance'],
    dataField: 'Transaction-specific collateral and structural fields',
  };
  const headline = SECURITISATION_HEADLINES[topic.topic_id] ?? {
    title: 'The transaction changed the claim. The collateral still carried the risk.',
    date: '',
  };
  const sources = sourcePack(topic, lens);
  const primary = sources[0];
  const orderedTopicIds = SECURITISATION_MASTERCLASS.episodes.flatMap((item) => item.topicIds);
  const episodeSequence = episode.topicIds.indexOf(topic.topic_id) + 1;
  const overallSequence = orderedTopicIds.indexOf(topic.topic_id) + 1;
  const governingQuestion = research.governing_question_draft ?? `How does ${topic.canonical_name} determine the cash-flow and credit-risk allocation in a securitisation transaction?`;
  const definitions = allDefinitions.map((item) => ({ ...item }));
  const subtopicCoverage = [
    { subtopic: 'Foundational transaction architecture', section: 'Transaction Mandate', definitionIds: allDefinitions.slice(0, 8).map((item) => item.id) },
    { subtopic: 'Collateral, legal separation, and servicing', section: 'Pool Data Room', definitionIds: allDefinitions.slice(8, 16).map((item) => item.id) },
    { subtopic: 'Cash-flow priority and capital structure', section: 'Priority of Payments', definitionIds: allDefinitions.slice(16, 24).map((item) => item.id) },
    { subtopic: 'Risk transfer, timing, and market infrastructure', section: 'Stress Transmission', definitionIds: allDefinitions.slice(24).map((item) => item.id) },
  ];
  return clean({
    id: `generated_securitisation_${topic.topic_id}`,
    topicId: topic.topic_id,
    canonicalName: topic.canonical_name,
    kind: 'securitisation-desk',
    format: 'Securitisation Desk',
    experienceType: topic.experience_type,
    eyebrow: `Securitisation Masterclass, Episode ${episode.number}`,
    date: headline.date,
    title: headline.title,
    dek: `${lens.thesis} This episode uses ${primary.title} to teach the mechanism, the evidence required to test it, and the conclusion that the evidence cannot support.`,
    dekSourceIds: sources.map((source) => source.id),
    series: {
      id: SECURITISATION_MASTERCLASS.id,
      title: SECURITISATION_MASTERCLASS.title,
      subtitle: SECURITISATION_MASTERCLASS.subtitle,
      episodeNumber: episode.number,
      episodeId: episode.id,
      episodeTitle: episode.title,
      totalEpisodes: SECURITISATION_MASTERCLASS.episodes.length,
      sequence: episodeSequence,
      topicCount: episode.topicIds.length,
      overallSequence,
      totalLessons: orderedTopicIds.length,
    },
    audio: {
      unit: 'standalone episode',
      title: `${SECURITISATION_MASTERCLASS.title}, Episode ${episode.number}: ${topic.canonical_name}`,
      screenIndependent: true,
      register: 'graduate finance casebook',
    },
    definitionCatalog: definitions,
    subtopicCoverage,
    sources: Object.fromEntries(sources.map((source) => [source.id, source])),
    role: `MBA finance student deciding whether the evidence for ${topic.canonical_name} supports a defensible transaction conclusion.`,
    decision: lens.decision,
    governingQuestion,
    anchor: { description: lens.anchor, mechanism: lens.mechanism, sourceIds: sources.map((source) => source.id), dataField: lens.dataField },
    sections: makeSections(topic, lens, governingQuestion),
    parties: [
      { name: 'Originator', responsibility: 'Creates or owns the receivables or reference exposures and remains relevant through underwriting, representations, servicing, retention, or residual exposure.' },
      { name: 'Special purpose vehicle', responsibility: 'Holds transferred rights or issues protection and distributes cash according to the transaction documents.' },
      { name: 'Servicer', responsibility: 'Collects, reconciles, reports, remits, and administers the collateral or reference portfolio.' },
      { name: 'Trustee or administrator', responsibility: 'Maintains records, applies contractual controls, calculates compliance, and distributes cash where the documents assign those duties.' },
      { name: 'Investors', responsibility: 'Hold claims with defined payment priority, expected timing, loss attachment, and control rights.' },
    ],
    inputs: makeInputs(sources, topic, lens, governingQuestion),
    tranches: [
      { name: 'Senior notes', priority: 'Receive payment before subordinated claims after permitted fees and required reserves.', dataRequirement: 'Obtain payment priority, enhancement, trigger, and expected-loss coverage from the transaction documents.' },
      { name: 'Mezzanine notes', priority: 'Stand behind senior claims and ahead of residual interests under the stated waterfall.', dataRequirement: 'Obtain attachment, detachment, subordination, amortisation, and trigger terms.' },
      { name: 'Residual interest', priority: 'Receives residual economics and absorbs the first-loss position specified by the structure.', dataRequirement: 'Obtain retained-interest, loss-allocation, excess-spread, and residual-distribution terms.' },
    ],
    waterfall: [
      { step: 1, name: 'Collateral collections', consequence: 'Identify scheduled payments, recoveries, prepayments, and other permitted receipts by source and reporting period.' },
      { step: 2, name: 'Transaction expenses', consequence: 'Pay servicing, trustee, administration, hedging, and other permitted expenses under the documents.' },
      { step: 3, name: 'Reserve and enhancement tests', consequence: 'Fund or replenish required reserves and test whether the transaction remains within its contractual protection thresholds.' },
      { step: 4, name: 'Interest and principal priority', consequence: 'Allocate interest and principal to note classes according to sequential or pro-rata rules and the current trigger state.' },
      { step: 5, name: 'Subordinated and residual allocation', consequence: 'Allocate remaining cash or specified losses to junior claims and residual interests after senior obligations are addressed.' },
    ],
    triggers: [
      { name: 'Collateral performance trigger', threshold: 'Obtain the transaction-specific delinquency, default, loss, payment-rate, or coverage threshold.', consequence: 'Test whether replenishment stops, cash is redirected, reserves increase, or senior amortisation accelerates.' },
      { name: 'Structural protection trigger', threshold: 'Obtain the enhancement floor, reserve floor, liquidity test, or coverage condition.', consequence: 'Test whether the transaction changes payment priority, control rights, or the treatment of residual cash.' },
    ],
    stress: { changedInput: lens.dataField, value: 'Required from the transaction-level source pack before numeric stress testing.', trace: `Obtain ${lens.dataField}, state the default, recovery, prepayment, servicing, or timing convention, then trace the change through collections, enhancement consumption, trigger state, waterfall priority, tranche balances, and investor cash flow.` },
    decisionMemo: `The evidence supports only the decision to obtain or withhold further diligence until ${lens.dataField} is sourced. A transaction-level credit conclusion requires the primary documents, dated collateral data, and a reproducible waterfall trace.`,
    reviewQuestions: reviewQuestions(topic, lens, governingQuestion),
    evidenceExhibit: { status: 'source_pack_locked', documentTitle: primary.title, sourceUrl: primary.url, sourceIds: sources.map((source) => source.id), realAnchor: lens.anchor, unavailableField: lens.dataField },
    generationAudit: { batchType: 'securitisation_desk', seriesId: SECURITISATION_MASTERCLASS.id, episodeId: episode.id, sourceStatus: 'concept_specific_primary_source_pack_locked', sourceInputStatus: 'real source artifacts identified; transaction-specific fields remain explicit diligence requirements where not disclosed' },
    batchIndex,
    topicIndex,
  });
}

for (const [batchIndex, batch] of batches.entries()) {
  const lessons = batch.topics.map((batchTopic, topicIndex) => makeLesson(
    queue.find((item) => item.topic_id === batchTopic.topic_id) ?? batchTopic,
    batchIndex + 1,
    topicIndex + 1,
  ));
  const outputFile = `scratch/deep_dive_generated_securitisation_batch_${String(batchIndex + 1).padStart(3, '0')}.json`;
  fs.writeFileSync(outputFile, `${JSON.stringify({ schemaVersion: 'deep-dive-generated-securitisation-batch.v2', series: SECURITISATION_MASTERCLASS, batchId: batch.batch_id, status: 'generated_for_editorial_review', lessonCount: lessons.length, lessons }, null, 2)}\n`);
  console.log(JSON.stringify({ outputFile, batchId: batch.batch_id, lessons: lessons.length, series: SECURITISATION_MASTERCLASS.id }));
}
