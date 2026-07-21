import { securitisationDeskPilot } from './deepDiveAppliedPilots.js';
import { caseFileDefinitions, modelingDefinitions, pilotSubtopicCoverage, quickRatioDefinitions } from './deepDiveDefinitions.js';
import { generatedDeepDiveLessons } from './generatedDeepDiveLessons.js';
import { accountingCoreLessons } from './accountingCoreLessons.js';

const sources = {
  bbbQ3: {
    id: 'bbbQ3',
    title: 'Bed Bath & Beyond Inc. Form 10-Q for the quarter ended November 26, 2022',
    publisher: 'U.S. Securities and Exchange Commission',
    url: 'https://www.sec.gov/Archives/edgar/data/886158/000088615823000026/bbby-20221126.htm',
  },
  bbbChapter11: {
    id: 'bbbChapter11',
    title: 'Bed Bath & Beyond Inc. Form 8-K, Chapter 11 filing',
    publisher: 'U.S. Securities and Exchange Commission',
    url: 'https://www.sec.gov/Archives/edgar/data/886158/000119312523111754/d465247d8k.htm',
  },
};

const quickRatioNodes = {
  'quick-opening': { text: 'April 23, 2023. Bed Bath & Beyond filed voluntary Chapter 11 petitions in the United States Bankruptcy Court for the District of New Jersey.', citations: ['bbbChapter11'] },
  'quick-context': { text: 'Five months earlier, the retailer reported $1.878 billion of current assets, including $1.436 billion of merchandise inventory, against $2.572 billion of current liabilities.', citations: ['bbbQ3'] },
  'quick-question': { text: 'How much of the next twelve months’ contractual claim can be met without first completing an operating transaction?', citations: [] },
  'quick-identity': { text: 'The Quick Ratio is a creditor-coverage measure that reclassifies current assets by conversion certainty rather than accounting maturity.', citations: [] },
  'quick-formula': { text: 'The numerator is a judgment about conversion certainty; the denominator is a claim on near-term cash.', citations: [] },
  'quick-meaning': { text: 'The spread between the Current Ratio and the Quick Ratio measures how much reported liquidity still depends on operating execution.', citations: [] },
  'quick-boundary': { text: 'The Quick Ratio assumes that receivables remain collectible and marketable securities remain liquid when payment pressure arrives.', citations: [] },
  'quick-consequence': { text: 'The filing also disclosed substantial doubt about the company’s ability to continue as a going concern because of recurring operating losses, negative operating cash flow, and projected liquidity.', citations: ['bbbQ3'] },
};

const quickRatioFormula = {
  accessibleLabel: 'Quick Ratio equals cash plus marketable securities plus accounts receivable, divided by current liabilities.',
  label: 'Quick Ratio',
  lhsLatex: String.raw`\text{Quick Ratio}`,
  relationLatex: '=',
  rhsLatex: String.raw`\frac{\text{Cash} + \text{Marketable securities} + \text{Accounts receivable}}{\text{Current liabilities}}`,
  latex: String.raw`\text{Quick Ratio} = \frac{\text{Cash} + \text{Marketable securities} + \text{Accounts receivable}}{\text{Current liabilities}}`,
  glossary: {
    cash: {
      term: 'Cash',
      definition: 'Cash and cash equivalents available for immediate settlement without an intervening sale or collection.',
      location: 'Balance sheet, current assets.',
      financialInterpretation: 'Cash has no conversion delay, but only unrestricted balances represent deployable liquidity.',
      commonExaminationTrap: 'Using total reported cash without checking restrictions, trapped cash, or minimum operating cash requirements.',
    },
    'marketable-securities': {
      term: 'Marketable securities',
      definition: 'Highly liquid debt or equity instruments that can ordinarily be sold without material loss of value.',
      location: 'Balance sheet, generally current assets when the expected holding period is within twelve months.',
      financialInterpretation: 'Eligibility depends on market depth, price stability, and the absence of sale restrictions under stress.',
      commonExaminationTrap: 'Treating every investment as a quick asset regardless of maturity, restriction, or market liquidity.',
    },
    'accounts-receivable': {
      term: 'Accounts receivable',
      definition: 'Amounts contractually owed to the company by customers for goods or services already delivered.',
      location: 'Balance sheet, current assets, net of the allowance for expected credit losses.',
      financialInterpretation: 'Receivables are economically liquid only to the extent that customers pay within the liability horizon.',
      commonExaminationTrap: 'Using gross receivables without testing aging, concentration, disputes, or expected credit losses.',
    },
    'current-liabilities': {
      term: 'Current liabilities',
      definition: 'Obligations expected to be settled within the operating cycle or twelve months, whichever is longer.',
      location: 'Balance sheet, current liabilities.',
      financialInterpretation: 'The denominator establishes the cash-claim horizon, but payment timing inside the period determines actual stress.',
      commonExaminationTrap: 'Assuming every current liability is due immediately or that expected refinancing is equivalent to contractual liquidity.',
    },
  },
};

const quickRatio = {
  id: 'quick_ratio',
  kind: 'standard',
  format: 'Narrative',
  eyebrow: 'Liquidity analysis',
  date: 'April 23, 2023',
  title: 'Inventory is an asset. It is not cash.',
  dek: 'Five months before its Chapter 11 filing, Bed Bath & Beyond reported substantial current assets against even larger current liabilities. The balance sheet looked substantial. The question was how much of it could pay a bill before the next sale.',
  dekSourceIds: ['bbbQ3'],
  definitionCatalog: quickRatioDefinitions,
  subtopicCoverage: pilotSubtopicCoverage.standard,
  knowledgeMap: {
    whyItExists: 'Current-asset classification measures expected realization within an operating cycle; it does not measure whether value can become cash before creditors require payment.',
    informationIsolated: 'The ratio isolates liquidity that does not depend on selling inventory, consuming prepaid assets, or completing another operating transaction.',
    decisionEnabled: 'The result directs attention to ordinary liquid assets, inventory realization, borrowing-base availability, and refinancing capacity before a short-term claim must be paid.',
    validityAssumptions: 'Receivables must remain collectible, securities must remain saleable without material loss, cash must be unrestricted, and current liabilities must capture the relevant claim horizon.',
    criticalQuestion: 'What proportion of the stated numerator can be converted to cash before the actual payment dates in the denominator, after adjusting for restrictions, collectibility, seasonality, and financing capacity?',
  },
  sources,
  nodes: quickRatioNodes,
  formulas: { quickRatio: quickRatioFormula },
  cram: [
    { label: 'Governing Question', pointer: 'quick-question' },
    { label: 'Definition', pointer: 'quick-identity' },
    { label: 'Formula', pointer: 'quick-formula' },
    { label: 'Interpretation', pointer: 'quick-meaning' },
    { label: 'Limitation', pointer: 'quick-boundary' },
  ],
  sections: [
    {
      id: 'case-context', heading: 'Case Context', sentences: ['quick-opening', 'quick-context'],
    },
    {
      id: 'governing-question', heading: 'Governing Question', sentences: ['quick-question'],
    },
    {
      id: 'conceptual-foundation', heading: 'Conceptual Foundation', sentences: ['quick-identity'],
      body: [
        'The Quick Ratio is a liquidity measure for operating companies whose current-asset balances contain items with materially different conversion certainty. It asks whether near-term obligations are covered by assets that can become cash without relying on inventory sales or other operating execution.',
        'Its domain is deliberately narrow. The measure is informative when working capital contains cash, receivables, and inventory; it is not a substitute for bank liquidity measures, which address deposit outflows, funding concentration, asset duration, and regulatory liquidity requirements.',
      ],
    },
    {
      id: 'economic-logic', heading: 'Economic Logic',
      body: [
        'Current classification is an accounting timing convention, not a guarantee of cash availability. A company may expect inventory to turn during its operating cycle while still needing to settle payroll, suppliers, taxes, or debt before the sale occurs.',
        'The ratio therefore separates balance-sheet value from payment capacity. A lower ratio signals that the enterprise must execute a sale, collect a customer balance, or obtain financing before it can satisfy the full set of short-term claims; that dependency is the economic risk the measure exposes.',
        'Liquidity stress is path-dependent. A business can possess positive net assets and still fail if the timing, certainty, or accessibility of inflows does not match the timing of required outflows.',
      ],
    },
    {
      id: 'formula-construction', heading: 'Formula Construction', formula: 'quickRatio', sentences: ['quick-formula'],
      body: [
        'Cash enters the numerator only when it is unrestricted and available for settlement. Marketable securities qualify when their maturity, market depth, and absence of transfer restrictions make sale proceeds dependable under the relevant stress scenario.',
        'Accounts receivable qualify because the company has already performed and holds a contractual claim against a customer. The relevant amount is the collectible balance, not the gross invoice total: aging, disputes, customer concentration, returns, and expected credit losses determine whether the receivable will convert within the liability horizon.',
        'Inventory is excluded because its carrying amount becomes cash only after a customer purchases the goods at a realizable price. Current liabilities provide the comparison horizon because they represent obligations expected to be settled within the operating cycle or twelve months, whichever is longer.',
      ],
    },
    {
      id: 'eli5', heading: 'ELI5: Core Intuition',
      body: [
        'Imagine pausing the business before it sells another unit of inventory. The Quick Ratio asks which short-term bills the company could still meet using cash already held, securities that can be sold, and customer invoices that can be collected.',
        'It does not treat merchandise on a shelf as money because the merchandise becomes money only after someone buys it and pays. The difference between those two states is the reason the ratio exists.',
      ],
    },
    {
      id: 'comparative-framework', heading: 'Comparative Framework',
      body: [
        'The Current Ratio includes all current assets and tests whether the working-capital balance is large relative to current liabilities. The Quick Ratio removes inventory and other assets whose realization depends on an intervening transaction and tests a stricter payment-capacity question.',
        'The Cash Ratio is stricter again because it excludes receivables. It is most useful when collection risk is elevated, liabilities are immediately payable, or the question concerns the most conservative liquidity buffer rather than ordinary operating continuity.',
        'The gap between the Current Ratio and the Quick Ratio is often more informative than either metric alone. A wide gap indicates that reported liquidity rests heavily on inventory conversion or other operating assets; a narrow gap indicates that a larger share of the current-asset base is already close to cash.',
      ],
    },
    {
      id: 'interpretation', heading: 'Interpretation', sentences: ['quick-meaning'],
      body: [
        'No universal benchmark exists for the Quick Ratio. The appropriate comparison set is the company’s own seasonal history, direct operating peers at the same point in the working-capital cycle, and the timing profile of obligations that must actually be funded.',
        'A ratio above 1.0 indicates that qualifying quick assets exceed current liabilities in aggregate, but it does not establish that every obligation can be met on its contractual date. A ratio below 1.0 indicates dependence on future conversion or funding, not automatic insolvency.',
        'The interpretation must be paired with cash-flow direction. A low ratio may be manageable for a business with recurring cash generation and committed financing; the same ratio is more serious when operating cash flow is negative, suppliers are tightening terms, or financing availability is shrinking.',
      ],
    },
    {
      id: 'assumptions-limitations', heading: 'Assumptions and Limitations', sentences: ['quick-boundary'],
      body: [
        'A high ratio can overstate resilience when cash is restricted, receivables are concentrated or delinquent, securities lose market depth, or liabilities cluster earlier than the expected asset conversion. The accounting numerator then exceeds the economically usable numerator.',
        'A low ratio can be manageable when the business generates predictable operating cash flow and has committed financing that remains drawable. The measure is a point-in-time screen, not a complete forecast of liquidity or a probability-of-default model.',
        'Sector matters. The Quick Ratio is designed for non-financial operating companies; applying it mechanically to banks, insurers, or REITs substitutes an inventory-conversion question for the funding, reserve, or asset-liability question that actually determines liquidity in those businesses.',
      ],
    },
    {
      id: 'case-resolution', heading: 'Case Resolution', sentences: ['quick-consequence'], citations: ['bbbQ3'],
      evidence: {
        documentTitle: 'Form 10-Q for the quarter ended November 26, 2022', issuer: 'BED BATH & BEYOND INC.', statementTitle: 'Consolidated Balance Sheets', period: 'November 26, 2022', unit: 'USD thousands', image: '/evidence/bbby-2022-consolidated-balance-sheet.png',
        rows: [
          { item: 'Cash and cash equivalents', value: '153,521', source: 'bbbQ3', emphasis: true },
          { item: 'Merchandise inventory', value: '1,436,150', source: 'bbbQ3' },
          { item: 'Total current assets', value: '1,878,174', source: 'bbbQ3' },
          { item: 'Total current liabilities', value: '2,572,239', source: 'bbbQ3', emphasis: true },
        ],
        formula: '153,521 / 2,572,239 = 0.060x',
        note: 'The filing did not report separate current receivables or marketable securities in this asset block. The observable numerator is therefore reported cash and cash equivalents, making 0.060x a cash-based quick-liquidity measure.',
        source: 'bbbQ3',
      },
      diagram: {
        title: 'Accounting value must pass a conversion test before it can cover a claim', cash: 153.521, inventory: 1436.15, liabilities: 2572.239, cashLabel: '$153.521m', inventoryLabel: '$1,436.150m', liabilitiesLabel: '$2,572.239m', source: 'bbbQ3',
        insight: 'Inventory represented substantial accounting value, but none of it covered a current claim until a customer completed a purchase. The ratio isolates that execution dependency.',
      },
      body: [
        'Bed Bath & Beyond reported a 0.73x Current Ratio, while reported cash covered only 0.06x of current liabilities. The difference was not an arithmetic curiosity: the company needed inventory conversion, collections, or external financing to meet the bulk of its short-term obligations.',
        'The case does not establish that a low Quick Ratio causes bankruptcy. It establishes the narrower and more useful proposition: when operating losses, negative operating cash flow, and constrained financing coexist with weak conversion-independent liquidity, the balance sheet offers little room for an execution shortfall.',
      ],
    },
    {
      id: 'mastery-questions', heading: 'Questions That Test Mastery',
      conclusionQuestions: [
        { question: 'Why can a retailer report a Current Ratio near one and still exhibit weak near-term liquidity?', answer: 'Current classification indicates expected realization within the operating cycle; it does not establish realization before a liability becomes payable. A retailer can therefore report current assets near current liabilities while still depending on inventory sales, collections, or financing to produce cash.' },
        { question: 'Why are receivables included in the Quick Ratio while inventory is excluded?', answer: 'Receivables represent contractual claims for goods or services already delivered, so their conversion requires collection rather than a new sale. Inventory still requires a buyer, an acceptable price, and settlement. Receivables nevertheless belong in the numerator only to the extent that aging, credit quality, disputes, returns, and concentration support collection within the relevant liability horizon.' },
        { question: 'When is the Cash Ratio more informative than the Quick Ratio?', answer: 'The Cash Ratio is more informative when receivable collectibility is uncertain, payment timing is immediate, or a stress scenario requires the most conservative measure of liquidity. It excludes receivables and therefore measures coverage using cash and cash equivalents, and usually qualifying marketable securities, alone.' },
        { question: 'Can a company with a Quick Ratio below 1.0 still be financially sound?', answer: 'Yes. A sub-1.0 ratio indicates that quick assets do not fully cover current liabilities at the measurement date; it does not establish financial distress. Stable operating cash generation, rapid inventory turnover, predictable collections, and committed financing can support ordinary operations. The conclusion changes when those offsetting sources of liquidity become uncertain or unavailable.' },
        { question: 'Why is there no universal good Quick Ratio threshold?', answer: 'Working-capital economics differ by sector, business model, and season. A grocery retailer can operate with a lower ratio because it turns inventory and collects cash rapidly, whereas a distributor with long receivable cycles may require a larger buffer. The appropriate benchmark is comparable companies at the same point in the operating cycle, together with the company’s own history and payment calendar.' },
        { question: 'How do restricted cash and trapped cash affect the ratio?', answer: 'They reduce the amount of reported cash that can satisfy the relevant obligations. Restricted balances may secure another obligation or be legally unavailable, while cash held in a foreign subsidiary may not be immediately transferable without legal, tax, or regulatory consequences. A rigorous calculation removes cash that cannot fund the denominator’s claims.' },
        { question: 'How should seasonality change interpretation of the Quick Ratio?', answer: 'Seasonality changes both the numerator and the denominator. Retailers may accumulate inventory ahead of a selling season and pay suppliers on a different timetable, while receivables can expand after sales. Comparing a quarter-end ratio with a non-comparable quarter can mistake normal working-capital timing for a deterioration in liquidity.' },
        { question: 'Why is the Quick Ratio generally inappropriate for a bank?', answer: 'A bank’s funding risk arises from deposit behavior, wholesale funding, asset duration, collateral, and regulatory liquidity requirements rather than inventory conversion. Measures such as the Liquidity Coverage Ratio, Net Stable Funding Ratio, loan-to-deposit ratio, and duration analysis address that economic structure more directly.' },
        { question: 'Does an undrawn revolving credit facility eliminate a low Quick Ratio concern?', answer: 'No. A revolving facility supplements liquidity only when its commitment remains available and the borrower can satisfy borrowing-base tests, covenants, representations, and collateral conditions. The facility must be evaluated as a separate source of contingent liquidity rather than silently added to cash.' },
        { question: 'What is the most common error when comparing the Current Ratio and Quick Ratio?', answer: 'The common error is to treat the difference as a measure of inventory alone. The gap can also reflect prepaid expenses and other current assets that are not convertible to cash. Its proper meaning is broader: it indicates how much reported current liquidity depends on assets that fail the quick-conversion test.' },
      ],
    },
  ],
};

const threeStatementModeling = {
  id: 'three_statement_modeling', kind: 'modeling', format: 'Modeling Lab', eyebrow: 'Integrated model', date: 'Quarter ended November 26, 2022', title: 'Three statements. One cash balance.', dek: 'An integrated model converts operating assumptions into three statements that reconcile to one another.', sources: { bbbQ3: sources.bbbQ3 },
  definitionCatalog: modelingDefinitions,
  subtopicCoverage: pilotSubtopicCoverage.modeling,
  nodes: { 'model-scenario': { text: 'For the nine months ended November 26, 2022, Bed Bath & Beyond reported a $284.984 million cash-flow benefit from lower merchandise inventory while ending inventory fell to $1.436 billion.', citations: ['bbbQ3'] } },
  objective: 'Build an integrated view of an operating company so that operating performance, cash movement, and the ending balance sheet agree.',
  inputs: [
    { name: 'Nine-month net sales', value: '$4,159.548m', source: 'bbbQ3', unit: 'USD millions' }, { name: 'Nine-month cost of sales', value: '$3,133.111m', source: 'bbbQ3', unit: 'USD millions' }, { name: 'Ending cash and cash equivalents', value: '$153.521m', source: 'bbbQ3', unit: 'USD millions' },
  ],
  buildOrder: [
    { title: 'Establish the model boundary', detail: 'Separate historical filing data from explicit operating assumptions, and define the forecast horizon, units, sign convention, and source of truth for each input before calculation begins.', source: 'bbbQ3' },
    { title: 'Build operating performance', detail: 'Translate revenue and expense assumptions into gross profit, operating income, taxes, and net income before linking any cash-flow effects.', source: 'bbbQ3' },
    { title: 'Build supporting schedules', detail: 'Forecast working capital, capital expenditure, depreciation, debt, and equity because each schedule supplies one or more three-statement links.', source: 'bbbQ3' },
    { title: 'Build cash flow', detail: 'Start with net income, reverse non-cash charges, then incorporate operating, investing, and financing cash movements.', source: 'bbbQ3' },
    { title: 'Close the balance sheet and outputs', detail: 'Link ending cash and all supporting-schedule balances to the balance sheet, verify that assets equal liabilities plus equity, then present the output relevant to the decision.', source: 'bbbQ3' },
  ],
  graph: [['Revenue and costs', 'Income statement'], ['Income statement', 'Cash flow statement'], ['Working capital', 'Cash flow statement'], ['Cash flow statement', 'Balance sheet cash'], ['Debt and equity', 'Balance sheet']],
  checks: [
    { title: 'Signs and scenario direction agree', detail: 'A change in an operating assumption must move each downstream statement line in the expected direction; a favorable result created by a reversed sign is not a valid sensitivity.', source: 'bbbQ3' },
    { title: 'Balance sheet balances', detail: 'Total assets must equal total liabilities plus shareholders’ equity in every modeled period.', source: 'bbbQ3' }, { title: 'Cash ties', detail: 'The ending cash flow statement balance must equal the cash line on the balance sheet.', source: 'bbbQ3' }, { title: 'Schedules reconcile', detail: 'Debt, fixed-asset, depreciation, and working-capital schedules must reconcile to their respective financial-statement lines.', source: 'bbbQ3' },
  ],
  scenario: { sentence: 'model-scenario', trace: 'A reduction in inventory releases cash through operating cash flow and reduces the inventory asset. The model must carry both effects into the same period while preserving the balance-sheet check.' },
  output: 'The finished model turns a named operating assumption into a traceable effect on profit, cash, debt capacity, and balance-sheet liquidity.',
  auditQuestions: [
    { question: 'What is the correct first step before building a three-statement model?', answer: 'Define the decision, forecast horizon, units, sign convention, and model boundary. A model cannot be audited when historical data, assumptions, and outputs are mixed without an identified source of truth. This step also determines which schedules are necessary and which apparent detail is irrelevant to the decision.' },
    { question: 'Why should a model distinguish historical facts from assumptions?', answer: 'Historical facts establish the starting position and must trace to a filing or other primary source. Assumptions express a forward-looking judgment and must remain visible, changeable, and scenario-specific. Combining the two conceals where the model stops reporting evidence and begins making an economic claim.' },
    { question: 'Why are supporting schedules built before the final cash flow statement?', answer: 'Working capital, fixed assets, depreciation, debt, and equity are not independent lines. Their schedules establish the beginning balance, period movement, and ending balance that feed the income statement, cash flow statement, and balance sheet. Building the statements first encourages hardcoded plugs rather than traceable linkages.' },
    { question: 'How should a model handle circularity created by debt and interest expense?', answer: 'The builder must identify the feedback loop explicitly: debt determines interest expense, interest expense changes cash flow, and cash flow changes debt. A model may use a deliberate iterative calculation, an average-balance convention, or a circularity switch, but the chosen treatment must be visible and tested under every scenario.' },
    { question: 'What distinguishes a sensitivity from a scenario?', answer: 'A sensitivity changes one input while holding the rest of the model constant to reveal local exposure. A scenario changes a coherent set of linked assumptions, such as revenue, margin, working capital, and financing availability, to represent a plausible economic state. Treating a scenario as an isolated sensitivity can create internally inconsistent results.' },
    { question: 'How should a decision-maker use the model output?', answer: 'Use the output to compare explicitly stated alternatives and identify the assumptions that change the conclusion. A model does not certify a forecast as true; it makes the economic dependencies visible. The decision-maker should focus on the variables with the greatest effect and on evidence that could invalidate those assumptions.' },
    { question: 'What is the most serious modeling error that a balance-sheet check will not catch?', answer: 'A conceptually wrong assumption or a reversed economic relationship can still produce a balanced balance sheet. For example, an inventory reduction that is modeled as a use rather than a source of cash may be offset elsewhere. Integrity requires both mechanical reconciliation and a causal review of each material line.' },
    { question: 'If revenue falls, which lines change before cash changes?', answer: 'Revenue changes gross profit and operating income first. Taxes, working capital, operating cash flow, financing needs, and ending cash then respond through the model’s assumptions and linkages.' },
    { question: 'Where would a sign error in inventory appear?', answer: 'It reverses the inventory working-capital adjustment in operating cash flow, causing cash flow to disagree with the balance-sheet movement and eventually breaking the cash tie.' },
    { question: 'Which check identifies an incomplete model?', answer: 'A balance-sheet imbalance or an ending-cash mismatch indicates that one or more supporting schedules has not been linked consistently into the three statements.' },
  ],
};

const quickRatioDecisionCase = {
  id: 'quick_ratio_decision_case',
  kind: 'decision-case',
  format: 'Case File',
  eyebrow: 'Bed Bath & Beyond liquidity record',
  date: 'November 26, 2022',
  title: 'Inventory was current. The obligations were closer.',
  dek: 'At November 26, 2022, Bed Bath & Beyond reported $1.436 billion of inventory, $153.521 million of cash, and $2.572 billion of current liabilities. Determine whether the reported asset base supported near term payment capacity.',
  definitionCatalog: caseFileDefinitions,
  subtopicCoverage: pilotSubtopicCoverage.caseFile,
  sources: { bbbQ3: sources.bbbQ3 },
  role: 'Finance associate preparing a credit committee recommendation on a retailer’s near term payment capacity.',
  decision: 'Determine whether the committee can rely on reported current assets as support for obligations due within twelve months, or must require evidence of inventory conversion and committed financing before taking a credit position.',
  inputs: [
    { name: 'Cash and cash equivalents', value: '$153.521m', unit: 'USD millions', asOfDate: '2022-11-26', classification: 'historical_fact', source: 'https://www.sec.gov/Archives/edgar/data/886158/000088615823000026/bbby-20221126.htm', sourceField: 'Consolidated Balance Sheets: Cash and cash equivalents', sourceId: 'bbbQ3' },
    { name: 'Merchandise inventory', value: '$1,436.150m', unit: 'USD millions', asOfDate: '2022-11-26', classification: 'historical_fact', source: 'https://www.sec.gov/Archives/edgar/data/886158/000088615823000026/bbby-20221126.htm', sourceField: 'Consolidated Balance Sheets: Merchandise inventories', sourceId: 'bbbQ3' },
    { name: 'Current liabilities', value: '$2,572.239m', unit: 'USD millions', asOfDate: '2022-11-26', classification: 'historical_fact', source: 'https://www.sec.gov/Archives/edgar/data/886158/000088615823000026/bbby-20221126.htm', sourceField: 'Consolidated Balance Sheets: Total current liabilities', sourceId: 'bbbQ3' },
  ],
  sections: [
    { id: 'case-record', heading: 'Case Record', body: 'The balance sheet classified $1.878 billion of assets as current against $2.572 billion of current liabilities. The classification did not establish that those assets could be converted to cash before suppliers, employees, lenders, and tax authorities required payment.' },
    { id: 'verified-evidence', heading: 'Verified Evidence' },
    { id: 'committee-mandate', heading: 'Committee Mandate', body: 'The committee must decide whether the asset base provides credible twelve month liquidity support. The decision standard is payment capacity at the relevant due dates, not the reported total of current assets.' },
    { id: 'financial-assessment', heading: 'Financial Assessment', body: 'Cash covers 0.060x of current liabilities. Inventory remains a current asset, yet it cannot settle an obligation until a buyer purchases it at a realizable price and the proceeds become available. The decisive variables are conversion timing, expected markdowns, operating cash flow, receivable collectibility, and committed financing capacity.' },
    { id: 'proposed-position', heading: 'Proposed Position', body: 'Recommend additional diligence before treating the reported current asset balance as liquidity support. A credit conclusion requires evidence that specified sources of cash will be available before specified obligations fall due.' },
    { id: 'committee-examination', heading: 'Committee Examination' },
    { id: 'reasoned-resolution', heading: 'Reasoned Resolution' },
  ],
  options: [
    { title: 'Position A: Rely on the reported current asset balance', detail: 'Treat the current asset base as adequate support because it represents a substantial pool of assets classified as current.' },
    { title: 'Position B: Require conversion and financing evidence', detail: 'Do not treat inventory as liquidity until sell through, receivable collection, operating cash flow, borrowing base availability, and payment timing have been tested against the liability schedule.' },
  ],
  answerKey: {
    recommendation: 'Require conversion and financing evidence.',
    reasoning: 'The current-asset total describes accounting classification, not immediate payment capacity. Reported cash covered only 0.060x of current liabilities. The committee must therefore test the timing and realizable value of inventory, the collectibility of receivables, the operating cash-flow outlook, and any committed facility before treating the balance sheet as adequate liquidity support.',
    evidenceRequired: 'Obtain a liability maturity calendar, inventory aging and markdown assumptions, receivable aging, a weekly cash forecast, borrowing base availability, and the contractual terms governing every committed facility.',
    reversalEvidence: 'The recommendation could change if dated evidence demonstrated that expected inventory proceeds, receivable collections, operating cash flow, and committed borrowing capacity covered the liability calendar with an adequate liquidity cushion.',
    temptingWrongAnswer: 'The tempting error is to equate a large inventory balance with a cash reserve. Inventory becomes cash only after a sale at a realizable price, and its timing can diverge sharply from supplier, payroll, tax, or debt payment dates.',
    followUpQuestion: 'Which liability comes due first, and which specific source of cash is contractually available before that date?',
  },
  challengeQuestions: [
    { question: 'Why does current asset classification not establish liquidity?', answer: 'Classification identifies the expected operating cycle or twelve month realization period. Liquidity requires cash availability before a specific obligation falls due. An asset can remain current while its conversion timing or realizable value is insufficient for the liability calendar.' },
    { question: 'What does the reported cash balance establish in this case?', answer: 'Cash establishes the minimum immediately available resource, subject to restrictions not visible in the selected balance sheet lines. At $153.521 million against $2.572 billion of current liabilities, it covers 0.060x of those obligations and therefore cannot independently support a broad liquidity conclusion.' },
    { question: 'Why is inventory excluded from the Quick Ratio?', answer: 'Inventory requires a sale before it produces cash. Sale timing, demand, markdowns, shrinkage, returns, and settlement terms determine whether the carrying amount can be realized before the payment date. Excluding inventory isolates resources that do not depend on that operating conversion.' },
    { question: 'Why does a 0.73x Current Ratio not answer the committee mandate?', answer: 'The Current Ratio includes inventory and other current assets that may require sale, collection, or consumption before they produce cash. The committee is evaluating the timing and certainty of funds available to meet actual payment dates, not the aggregate accounting classification of current assets.' },
    { question: 'Which evidence would convert inventory from an accounting balance into usable liquidity evidence?', answer: 'Inventory aging, expected sell through, markdown assumptions, gross margin, supplier terms, return rates, and a dated cash forecast would establish both probable proceeds and their availability relative to the liability calendar.' },
    { question: 'Why can receivables be more liquid than inventory without being equivalent to cash?', answer: 'A receivable represents a contractual claim on a customer, so it normally requires collection rather than sale. Its liquidity still depends on counterparty credit quality, dispute risk, concentration, aging, and the collection cycle. It belongs in the Quick Ratio only when those conditions support timely realization.' },
    { question: 'What is the principal limitation of the Quick Ratio in a deteriorating retailer?', answer: 'The ratio is a point in time screen. It does not forecast future operating losses, supplier tightening, borrowing base reductions, debt maturities, or the speed at which inventory and receivables convert into cash. A committee must pair it with a liquidity forecast and maturity analysis.' },
    { question: 'What fact would most directly reverse the committee recommendation?', answer: 'A dated, contractually supported liquidity schedule showing that cash, reliable receivable collections, inventory proceeds after realistic markdowns, and committed borrowing capacity exceed each required payment through the relevant horizon would directly address the conversion gap.' },
  ],
};

export const deepDiveLessons = [...accountingCoreLessons, quickRatio, threeStatementModeling, quickRatioDecisionCase, securitisationDeskPilot, ...generatedDeepDiveLessons];

export function lessonById(id) {
  return deepDiveLessons.find((lesson) => lesson.id === id) ?? quickRatio;
}
