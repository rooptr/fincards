import { pilotSubtopicCoverage, securitisationDefinitions } from './deepDiveDefinitions.js';

const rbiArcReport = 'https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?ID=1188&UrlPage=';

export const securitisationDeskPilot = {
  id: 'securitization_desk_pilot',
  kind: 'securitisation-desk',
  topicId: 'securitization',
  format: 'Securitisation Desk',
  eyebrow: 'Structured-credit practice',
  date: 'March 31, 2021',
  title: 'The pool tape is missing. The credit conclusion waits.',
  dek: 'A structured credit decision-maker has sector evidence but not the loan level data required to model tranche losses. The professional decision is whether to proceed to diligence. It is not an invitation to invent precision.',
  definitionCatalog: securitisationDefinitions,
  subtopicCoverage: pilotSubtopicCoverage.securitisation,
  sources: {
    rbiArc: { id: 'rbiArc', title: 'RBI Committee Report on the Working of Asset Reconstruction Companies', publisher: 'Reserve Bank of India', url: rbiArcReport },
  },
  role: 'Structured-credit associate reviewing whether a stressed-asset transaction has enough disclosed evidence for committee review.',
  decision: 'Decide whether the public evidence is sufficient to approve the transaction structure for deeper diligence, or whether the missing pool tape must be obtained before any tranche conclusion is made.',
  sections: [
    {
      id: 'transaction-mandate',
      heading: 'Transaction Mandate',
      body: [
        'Securitisation separates the ownership and payment priority of a financial asset pool from the balance sheet of the originating institution. Investors do not receive a generic claim on the originator. They receive contractual claims on the cash flows assigned to the transaction structure.',
        'The mandate is to determine whether the disclosed evidence is sufficient to proceed to transaction level diligence. Sector scale can establish relevance, but it cannot establish the expected loss, cash flow timing, or tranche protection of a specific pool.',
      ],
    },
    {
      id: 'pool-data-room',
      heading: 'Pool Data Room',
      body: [
        'A pool tape is the analytical foundation of structured credit. It should identify each exposure or a sufficiently granular stratification of balances, obligors, asset type, seasoning, delinquency, default status, collateral, recovery history, prepayment behavior, and contractual cash flows.',
        'The cited RBI report provides sector context and confirms the relevance of bank originated stressed assets. It does not disclose the loan level fields required to calculate a transaction loss distribution. That absence is a diligence finding, not a permission to substitute sector averages.',
      ],
    },
    {
      id: 'structure-design',
      heading: 'Structure Design',
      body: [
        'The originator transfers eligible assets to a special purpose vehicle. The vehicle issues classes of securities with different payment priorities and loss positions. The structure converts one pool of borrower cash flows into claims with distinct risk and expected timing.',
        'The legal transfer, servicing arrangement, reserve framework, and risk retention terms determine whether the structural protections operate as described. A tranche label alone does not establish protection. The decision-maker must read the governing documents and connect each protection to a measurable loss absorption mechanism.',
      ],
    },
    {
      id: 'priority-of-payments',
      heading: 'Priority of Payments',
      body: [
        'The waterfall is the transaction rule that decides which claim receives cash first. A senior note can withstand collateral deterioration only because fees, reserves, interest, principal, and residual claims are paid in a defined order.',
        'A waterfall must be read in both directions. Strong collections determine which claims receive cash, while shortfalls determine which claims are deferred or absorb losses. The same pool can therefore produce materially different outcomes for different tranches under different payment rules.',
      ],
    },
    {
      id: 'credit-enhancement-triggers',
      heading: 'Credit Enhancement and Triggers',
      body: [
        'Subordination, reserves, excess spread, and other forms of credit enhancement absorb or delay the effect of collateral losses before senior notes are impaired. Their value depends on amount, replenishment, priority, and the point at which protection is consumed.',
        'Performance triggers convert deterioration into a contractual change in cash allocation. A delinquency trigger may redirect collections toward senior protection. An enhancement depletion trigger may show that the original loss cushion no longer covers the stated risk. Both thresholds must be taken from the transaction documents.',
      ],
    },
    {
      id: 'stress-transmission',
      heading: 'Stress Transmission',
      body: [
        'A structured credit stress starts with a pool assumption and ends with a tranche consequence. Higher defaults reduce collections, recoveries determine the amount ultimately returned, and timing determines when the loss reaches the waterfall. The decision-maker must trace each step rather than state that senior notes are protected in general.',
        'This pilot cannot calculate a numeric tranche loss because the cited public report does not disclose the pool tape or transaction documents. The correct output is a defined research task: obtain the missing fields, document the waterfall, select a recovery and timing convention, and then run the stress.',
      ],
    },
    {
      id: 'investment-committee-memo',
      heading: 'Investment Committee Memo',
      body: [
        'The committee should approve deeper diligence, not a tranche level credit conclusion. The available evidence establishes sector context and concentration relevance. It does not establish collateral quality, legal isolation, payment priority, enhancement sufficiency, or expected loss for a specific transaction.',
      ],
    },
    {
      id: 'desk-drill',
      heading: 'Applied Questions',
      body: [
        'The questions below test whether the learner can move from sector evidence to transaction analysis. A correct answer identifies the missing evidence, the economic mechanism, and the decision consequence.',
      ],
    },
  ],
  parties: [
    { name: 'Originator', responsibility: 'Creates or owns the receivables and transfers the eligible assets into the transaction.' },
    { name: 'Special purpose vehicle', responsibility: 'Holds the transferred assets and issues securities supported by their cash flows.' },
    { name: 'Servicer', responsibility: 'Collects borrower payments, administers the pool, and remits transaction cash.' },
    { name: 'Investors', responsibility: 'Hold claims with different payment priorities and loss positions.' },
  ],
  inputs: [
    { name: 'ARC sector cumulative AUM', value: 'Approximately ₹5.2 lakh crore', unit: 'book value acquired', asOfDate: '2021-03-31', classification: 'historical_fact', source: rbiArcReport, sourceId: 'rbiArc', sourceField: 'Committee report, section B.4' },
    { name: 'Bank-originated share of ARC assets', value: '79.8%', unit: 'share of assets flowing into ARC sector', asOfDate: '2021-03-31', classification: 'historical_fact', source: rbiArcReport, sourceId: 'rbiArc', sourceField: 'Committee report, section D.1.1' },
    { name: 'Public-sector-bank share of ARC assets', value: '51.6%', unit: 'share of assets acquired by ARC sector', asOfDate: '2021-03-31', classification: 'historical_fact', source: rbiArcReport, sourceId: 'rbiArc', sourceField: 'Committee report, section D.1.1' },
    { name: 'Loan-level pool tape', value: 'Not publicly disclosed in the cited sector report', unit: 'research task', asOfDate: '2021-03-31', classification: 'historical_fact', source: rbiArcReport, sourceId: 'rbiArc', sourceField: 'Not provided; obtain transaction-level disclosure before modeling' },
  ],
  tranches: [
    { name: 'Senior notes', priority: 'First claim after permitted fees and required reserves', dataRequirement: 'Obtain legal payment priority, enhancement, and expected loss coverage from transaction documents.' },
    { name: 'Residual or subordinated interest', priority: 'Absorbs losses before senior notes', dataRequirement: 'Obtain attachment point, retained interest, and loss-allocation terms from transaction documents.' },
  ],
  waterfall: [
    { step: 1, name: 'Collections', consequence: 'Aggregate borrower recoveries and other permitted pool cash receipts.' },
    { step: 2, name: 'Permitted fees', consequence: 'Pay servicing, trustee, and transaction expenses under the documents.' },
    { step: 3, name: 'Reserve funding', consequence: 'Replenish required reserves before discretionary distributions.' },
    { step: 4, name: 'Senior distribution', consequence: 'Pay senior interest and principal according to the contractual priority.' },
    { step: 5, name: 'Residual distribution or loss allocation', consequence: 'Allocate remaining cash or losses to subordinated interests and residual holders.' },
  ],
  triggers: [
    { name: 'Delinquency or default trigger', threshold: 'Obtain transaction-specific threshold', consequence: 'Test whether cash switches to accelerated senior protection or additional reserve funding.' },
    { name: 'Credit-enhancement depletion trigger', threshold: 'Obtain transaction-specific enhancement floor', consequence: 'Test whether senior protection is breached and tranche loss allocation changes.' },
  ],
  stress: { changedInput: 'Loan-level pool tape', value: 'Required before numeric stress testing', trace: 'The public sector report is sufficient to establish why originator concentration matters, but not to calculate tranche losses. Obtain loan-level balances, seasoning, delinquency, default, recovery, and prepayment fields before applying a numeric stress.' },
  decisionMemo: 'Do not approve a tranche-level credit conclusion from sector-level evidence alone. The RBI report establishes the sector context and the importance of bank-originated stressed assets; transaction approval requires the missing pool tape and legal waterfall documents.',
  reviewQuestions: [
    { question: 'Why is the reported ARC AUM not a substitute for a transaction pool tape?', answer: 'Sector AUM is an aggregate book-value measure. It does not disclose the obligor distribution, seasoning, delinquency, default, recovery, prepayment, collateral, or cash-flow timing needed to model a specific securitisation.' },
    { question: 'What must be obtained before calculating tranche losses?', answer: 'The decision-maker needs a loan-level or sufficiently granular pool tape, servicing and collection history, legal payment priority, credit-enhancement terms, trigger definitions, and a consistent recovery and timing convention.' },
    { question: 'What economic problem does securitisation solve for an originator?', answer: 'Securitisation converts a pool of contractual receivables into funded claims with defined payment priorities. It can release funding capacity and distribute risk, but it also creates dependence on data quality, servicing, legal transfer, and the contractual allocation of cash flows.' },
    { question: 'Why does a special purpose vehicle matter to investors?', answer: 'The vehicle is intended to separate the transferred assets and their cash flows from the originator. That protection depends on the legal transfer, governance, servicing arrangements, and insolvency analysis. The vehicle name alone is not evidence of bankruptcy remoteness.' },
    { question: 'Why is a true sale different from a secured borrowing?', answer: 'A true sale is intended to transfer ownership and associated rights in the assets. A secured borrowing leaves the economic exposure and creditor claim structure materially different. The distinction affects whether asset cash flows remain available to transaction investors if the originator fails.' },
    { question: 'How does subordination protect a senior tranche?', answer: 'Subordination places junior claims below the senior tranche in the loss allocation and payment hierarchy. Junior interests absorb specified losses or payment shortfalls first, so the protection available to the senior tranche equals the remaining enhancement after prior losses and structural deductions.' },
    { question: 'What does the waterfall determine that the pool tape cannot determine?', answer: 'The pool tape describes the collateral cash flows and risks. The waterfall determines how those cash flows are allocated among fees, reserves, senior claims, junior claims, and residual interests. Tranche outcomes require both collateral behavior and contractual payment priority.' },
    { question: 'Why do performance triggers change the stress outcome?', answer: 'A trigger is a contractual state change. When collateral performance crosses the stated threshold, cash may be redirected toward senior protection, reserves may be replenished, or residual distributions may stop. The consequence depends on the exact transaction language.' },
    { question: 'Why are recovery timing and prepayment behavior separate from default frequency?', answer: 'Default frequency measures how many exposures fail. Recovery timing determines when and how much value returns after failure, while prepayment changes the timing of principal collections before maturity. Each variable changes the cash available to the waterfall and the expected life of each tranche.' },
  ],
};
