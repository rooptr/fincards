import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const input = path.join(root, 'scratch', 'securitisation_masterclass_episode_scripts.json');
const output = path.join(root, 'scratch', 'securitisation_masterclass_notebooklm_controls_v4.md');
const data = JSON.parse(fs.readFileSync(input, 'utf8'));

const indianContext = [
  'Use classroom situations involving borrowers, lenders, and investors in Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune, Ahmedabad, and Kolkata.',
  'Use Indian financial institutions and Indian regulatory context only when the uploaded sources support the claim.',
  'Do not invent transaction figures, default rates, names, dates, or legal conclusions. If a real figure is unavailable, teach the mechanism without a number.',
  'A foreign historical event may be used when it is the strongest evidence for the mechanism, but return immediately to the general concept and explain the Indian relevance.'
].join(' ');

const gameOfThrones = [
  'Use at most two very brief Game of Thrones memory cues in the episode. They must clarify the finance mechanism, never replace it.',
  'Do not discuss the show, the production, or the quote as content. Mention the cue, explain the finance meaning in one sentence, and continue teaching.',
  'Keep the cues short, situational, and subordinate to the MBA material.'
].join(' ');

const episodeCoverage = {
  1: [
    'Securitisation: define the transaction, asset pool, contractual cash-flow right, obligor, originator, special purpose vehicle, issuer, servicer, trustee, investor claim, and the distinction between securitisation, ordinary loan transfer, and secured borrowing. Explain why cash-flow rights must be identifiable, transferable, enforceable, and sufficiently predictable.',
    'Cash securitisation: distinguish an asset-backed claim from the originator’s general revenue, explain true sale and the movement of cash-flow rights, and show why servicing, commingling, dilution, obligor concentration, and retained exposure still matter.',
    'Term securitisation: explain a defined pool, legal maturity, expected maturity, amortisation profile, principal collections, prepayment, early redemption, sequential amortisation, pro-rata amortisation, and the difference between the note’s contractual clock and the collateral’s cash-flow clock.',
    'Conduit securitisation: explain a multi-seller or multi-pool platform, eligibility criteria, common funding, liquidity support, concentration, common-servicer risk, replenishment, pool-level allocation, and the possibility of cross-pool or common-provider contagion.'
  ],
  2: [
    'Originator: define the institution that creates or owns the assets. Teach its underwriting role, representations and warranties, servicing role, risk retention, repurchase obligations, residual interest, incentive effects, and why legal transfer does not make the originator irrelevant.',
    'Special purpose vehicle: explain limited purpose, separateness, ownership of transferred assets, issuance of notes, governance, account control, trustee duties, bankruptcy remoteness, and why an SPV is a legal mechanism rather than a decorative box in a diagram.',
    'Bankruptcy remoteness: distinguish legal isolation from credit protection, explain true sale, non-consolidation, creditor interference, commingling, enforceability, legal opinions, and what happens to collections if the originator enters insolvency.',
    'Servicer: explain collection, borrower contact, delinquency management, records, reconciliation, reporting, remittance, cash controls, data integrity, replacement servicing, servicing disruption, and why operational failure can damage cash even when borrowers remain creditworthy.'
  ],
  3: [
    'Auto-loan securitisation: teach amortising receivables, borrower payment behaviour, vehicle valuation, repossession, recovery severity, recovery timing, seasoning, geography, employment concentration, prepayment, and the difference between vehicle value and collectible cash.',
    'Credit-card securitisation: teach revolving receivables, replenishment, payment rate, balances, charge-offs, dilution, utilisation, account behaviour, excess spread, early amortisation, and why the collateral changes after issuance.',
    'Non-performing-loan securitisation: distinguish defaulted exposure from recoverable value. Teach enforcement, collateral realisation, restructuring, legal delay, recovery rate, recovery timing, valuation uncertainty, servicing capability, and why carrying value is not the same as cash recovery.',
    'Non-qualified-mortgage securitisation: teach underwriting heterogeneity, borrower characteristics, documentation, loan-to-value, debt service, collateral value, delinquency migration, prepayment, loss severity, and why the mortgage label cannot replace pool-level analysis.',
    'Whole-business securitisation: distinguish receivables from operating cash flow. Teach revenue continuity, contracts, customer concentration, business interruption, intellectual property or franchise dependence, operating covenants, debt service priority, and the risk that the business itself stops producing the collateral cash.'
  ],
  4: [
    'Pass-through structure: define direct distribution of collateral collections, explain limited reshaping, investor exposure to prepayment and recovery timing, servicing deductions, and why pass-through does not remove credit, legal, liquidity, or operational risk.',
    'Pay-through structure: define issuer-controlled collection and designed investor payments. Teach reshaped maturity, reserves, triggers, interest and principal allocation, structural protection, and the assumptions that make the designed payment profile credible.',
    'Payment waterfall: trace collections from borrower receipts through fees, servicing, trustee costs, reserves, interest, principal, losses, junior claims, and residual cash. Explain ordinary and stressed priority and why a shortfall at one step changes every later payment.',
    'Securitisation waterfall: explain trigger states, sequential versus pro-rata allocation, early amortisation, redirection of excess spread, reserve funding, senior control, loss allocation, and how to trace one rupee through the structure under normal performance and trigger breach.'
  ],
  5: [
    'Tranching: define senior, mezzanine, subordinated, and residual claims. Teach priority, subordination, credit enhancement, first-loss exposure, attachment point, detachment point, loss band, expected timing, control rights, and why the same collateral can produce different investor outcomes.',
    'Pro-rata pay: define principal sharing across classes and compare it with sequential amortisation. Teach how pro-rata pay changes protection consumption, expected life, principal timing, loss exposure, reinvestment risk, and the conditions required before pro-rata distributions are permitted.',
    'Also distinguish subordination, excess spread, reserves, guarantees, and liquidity facilities. Explain why they are different forms of protection and why a rating is an analytical output rather than proof that losses cannot occur.'
  ],
  6: [
    'Re-securitisation: define a structured claim used as collateral for another structured claim. Teach added layers of correlation, model risk, opacity, disclosure dependence, tranche-on-tranche exposure, and why the second structure inherits weaknesses from the first.',
    'Regulatory capital relief securitisation: distinguish accounting derecognition, funding, economic risk transfer, legal transfer, and prudential capital treatment. Teach risk retention, capital relief conditions, retained exposure, counterparty risk, and why lower regulatory capital does not automatically mean lower economic risk.',
    'Synthetic securitisation: explain reference portfolios, credit protection, guarantees, credit default protection, credit-linked notes, credit events, protection-provider risk, collateral, settlement, and the fact that the loans may remain on the originator’s balance sheet while credit risk moves contractually.',
    'STS securitisation: define simple, transparent, and standardised status. Teach the difference between regulatory eligibility and credit performance, disclosure, standardisation, risk retention, investor due diligence, jurisdiction, and why STS is not a guarantee of liquidity or repayment.'
  ],
  7: [
    'PSA prepayment model: define PSA, conditional prepayment rate, prepayment speed, scheduled principal, unscheduled principal, contraction risk, extension risk, expected life, legal maturity, and the difference between a market convention and a forecast.',
    'Term Asset-Backed Securities Loan Facility: explain TALF as a liquidity and funding facility, eligible collateral, haircuts, financing support, non-recourse structure where applicable, market functioning, and why liquidity support is not a guarantee of collateral credit performance.',
    'Integrate the timing lesson: show how borrower prepayment becomes investor reinvestment risk, how slower repayment becomes extension and duration risk, and how funding support can improve market liquidity without changing default or recovery economics.'
  ]
};

const focusBox = (episode) => {
  const lessons = episode.lessonOrder.map((lesson) => `${lesson.overallSequence}. ${lesson.canonicalName}`).join('; ');
  const teaching = episode.teachingPlan;
  return [
    `Teach Episode ${episode.number} as an instructor-led MBA finance class titled “${episode.title},” not as a podcast about the episode theme.`,
    `The episode must teach every assigned sublesson in this exact order: ${lessons}. Do not skip, merge, or merely name any sublesson.`,
    `The intellectual objective is: ${teaching.objective} The opening hook must be brief and relevant, then move quickly into the first sublesson. Do not spend the opening discussing the lesson plan, source packet, architecture, or what the episode will cover.`,
    'For each sublesson, teach five things in order: the precise definition; why the concept exists; the economic and legal mechanism; what decision or conclusion it enables; and the assumption or failure condition that limits it.',
    'Use bridging sentences that sound like a professor teaching a difficult class. Ask the learner short questions, pause for the reasoning, then answer them. Do not create host banter, fictional dialogue, news commentary, or a summary that substitutes for instruction.',
    'Treat the uploaded episode script as the teaching spine. Treat the official source documents as evidence used to verify definitions, rules, dates, institutional roles, and real events. Do not talk about “the sources,” “the script,” “the document pack,” or “the lesson plan” while teaching.',
    'The case or event is supporting evidence. The concept is the subject. After every evidence reference, return to the general mechanism and explain how the learner would recognise it in a new transaction.',
    `The required technical coverage for this episode is: ${episodeCoverage[episode.number].join(' ')}`,
    'Use specific Indian loan examples to illustrate the securitisation steps: for example, a Mumbai vehicle-loan pool, a Pune two-wheeler-loan pool, a Bengaluru personal-loan pool, a Chennai housing-loan pool, or an Ahmedabad small-business-loan pool. Use real names, figures, and events only when they appear in the uploaded evidence. Otherwise make the example clearly conceptual and do not invent numbers.',
    'Emphasise RBI compliance requirements when teaching an Indian securitisation transaction. When SEC materials are used, identify them as U.S. reporting or disclosure standards. Explain the difference between RBI prudential and transaction requirements and SEC reporting and disclosure requirements. Never present an SEC rule as Indian law, and never imply that RBI directions govern a U.S. transaction.',
    indianContext,
    gameOfThrones,
    'Use exact graduate-finance vocabulary suitable for MBA students. Define acronyms on first use. Explain formulas aloud, define every variable, and state what changes when an input changes. If the topic has no formula, teach the operating sequence or decision rule instead.',
    'End with a compact mastery test containing at least five questions about the concept, not trivia about the case. Include one transfer question using an Indian classroom situation and one homework task requiring the learner to draw, calculate, compare, or defend the mechanism.',
    'Do not say “today we are going to,” “the rest of the lesson,” “in this episode we will look at,” “analyst questions,” “source packet,” or “architecture” unless the word is itself the finance concept being taught.'
  ].join(' ');
};

const sourceInstruction = (episode) => {
  const sources = episode.sources.map((source, index) => `${index + 1}. ${source.title}\n   ${source.url}${source.fallbackUrl ? `\n   Fallback: ${source.fallbackUrl}` : ''}`).join('\n');
  return `SOURCE SET FOR EPISODE ${episode.number}: ${episode.title}\n\nUpload the matching episode script file first. Then upload only these official evidence sources:\n\n${sources}\n\nUse the script as the teaching spine and the official sources as evidence. Do not let the hosts turn the episode into a discussion of the source list. If a source is inaccessible, use its fallback or the local official copy; do not replace it with a search-result summary.`;
};

const blocks = ['# Securitisation Masterclass: NotebookLM Controls v4', '', 'Use these controls with the full v3 episode scripts. These instructions convert the output from a loose overview into a structured MBA class.', '', '## NotebookLM settings', '', 'Format: Deep Dive. This is the available Audio Overview format designed for in-depth treatment. Set length to Longer where available. Set language to English. If Interactive mode is available, leave it off for the master recording; it is useful for a separate revision recording. NotebookLM’s official help describes Deep Dive as the in-depth format and allows a custom focus prompt. [Official NotebookLM Audio Overview guidance](https://support.google.com/notebooklm/answer/16212820)', '', '## Episode controls', ''];

for (const episode of data.episodes) {
  blocks.push(`### Episode ${episode.number}: ${episode.title}`, '', `Lessons: ${episode.lessonOrder.map((lesson) => `${lesson.overallSequence}. ${lesson.canonicalName}`).join('; ')}`, '', '**Paste this into the focus box:**', '', focusBox(episode), '', '**Paste or save this as the source-control note if needed:**', '', '```text', sourceInstruction(episode), '```', '');
}

fs.writeFileSync(output, `${blocks.join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ output, episodes: data.episodes.length, lessons: data.series.totalLessons }, null, 2));
