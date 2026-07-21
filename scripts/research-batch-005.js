import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const searchIndexPath = path.join(root, 'src/data/search_index.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

const source = (id, tier, title, url) => ({ id, tier, title, url });
const relianceAnnualReport = source('ril_annual_report_2024_25', 1, 'Reliance Industries Integrated Annual Report 2024–25', 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf');
const nseReliance = source('nse_reliance_quote', 1, 'NSE quote and historical-data entry point for Reliance Industries', 'https://www.nseindia.com/get-quote/equity/RELIANCE/reliance-industries-ltd.');
const nifty50 = source('nifty_50_methodology', 1, 'Nifty 50 index methodology and factsheet', 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty--50');
const rbiGsec = source('rbi_government_securities_faq', 1, 'RBI FAQ: Government securities and Treasury Bill yields', 'https://m.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=711');
const sharpeCapm = source('sharpe_capm_1964', 2, 'Sharpe (1964), Capital Asset Prices', 'https://doi.org/10.1111/j.1540-6261.1964.tb02865.x');
const gordonShapiro = source('gordon_shapiro_1956', 2, 'Gordon and Shapiro (1956), Capital Equipment Analysis', 'https://doi.org/10.1287/mnsc.3.1.102');

const records = {
  wacc: {
    format: 'Structural',
    description: 'Reliance Industries’ annual-report capital structure, Indian sovereign-yield context, and market data provide a concrete valuation artifact for WACC. The lesson isolates the required return on operating assets from the financing mix used to fund them and forces an explicit consistency test between cash flow and discount rate.',
    sources: [relianceAnnualReport, rbiGsec, nifty50, sharpeCapm],
    question: 'What blended required return should discount operating cash flows when debt and equity investors bear different risks and receive different cash-flow claims?',
    mechanics: 'Estimate market-value debt and equity weights, cost of debt, marginal tax rate, and cost of equity; compute the weighted average; then test whether the selected discount rate matches the cash-flow definition and target capital structure.',
    reason: 'WACC applies to operating-company valuation and capital budgeting when the cash flows belong to all capital providers; an Indian issuer filing and market inputs provide the correct evidence base.',
  },
  discounted_cash_flow: {
    format: 'Modeling Lab',
    description: 'Reliance Industries’ annual report supplies a real Indian-company base for a DCF build: historical operating performance, capital expenditure, cash-flow statement, debt, and investment activity feed a forecast of unlevered free cash flow, which is discounted at a market-consistent WACC and reconciled to equity value.',
    sources: [relianceAnnualReport, nseReliance, nifty50, rbiGsec, sharpeCapm],
    question: 'What is the value of an operating business when forecast cash flows, reinvestment requirements, capital structure, and the cost of capital are made internally consistent?',
    mechanics: 'Build revenue, margin, tax, depreciation, capital expenditure, and working-capital drivers; derive unlevered free cash flow; discount it using WACC; calculate continuing value; reconcile enterprise value to equity value; and stress the value drivers.',
    reason: 'DCF is a genuine dependency-rich valuation build, so Modeling Lab is the correct format. Reliance’s filing provides real historical input lines without forcing a manufactured historical case.',
  },
  unlevered_dcf: {
    format: 'Modeling Lab',
    description: 'Reliance Industries’ consolidated cash-flow, capital-expenditure, borrowing, and operating disclosures provide an Indian-company artifact for building unlevered free cash flow before financing effects. The model values the business available to all capital providers, then separately reconciles enterprise value to the equity claim.',
    sources: [relianceAnnualReport, nseReliance, nifty50, rbiGsec, sharpeCapm],
    question: 'How can operating cash generation be valued independently of the company’s current financing choices and then reconciled to equity value?',
    mechanics: 'Forecast EBIT, apply operating taxes, add non-cash charges, subtract capital expenditure and investment in working capital, discount unlevered free cash flow at WACC, then subtract net debt and other senior claims to arrive at equity value.',
    reason: 'Unlevered DCF is a full valuation workflow with statement, financing, and valuation dependencies; it belongs in a Modeling Lab rather than as an isolated formula.',
  },
  terminal_value: {
    format: 'Structural',
    description: 'A DCF’s continuing value is the present value assigned to cash flows after the explicit forecast horizon. Reliance’s real investment, cash-flow, and capital-structure disclosures make the key discipline visible: terminal assumptions must describe a sustainable mature business, not extend a temporary growth phase indefinitely.',
    sources: [relianceAnnualReport, gordonShapiro, rbiGsec],
    question: 'What value remains after the explicit forecast period, and which economic assumptions make that continuing value defensible?',
    mechanics: 'Choose a terminal-year cash flow, a mature growth or exit-multiple convention, and a discount rate consistent with the cash flow; calculate continuing value, discount it to present value, and test how growth, reinvestment, and returns on capital constrain the result.',
    reason: 'Terminal value is a valuation component with its own economic assumptions, not a full standalone analytical build; a structural lesson is the appropriate format.',
  },
  gordon_growth_model: {
    format: 'Structural',
    description: 'The Gordon–Shapiro framework turns a stream of dividends or cash flows growing at a stable rate into a present value. Reliance’s mature, diversified operating profile and Indian sovereign-yield setting provide a concrete context for distinguishing stable-growth assumptions from a high-growth forecast.',
    sources: [gordonShapiro, relianceAnnualReport, rbiGsec],
    question: 'When can a stable, perpetually growing cash-flow stream be valued as a continuing claim, and what breaks when growth approaches the required return?',
    mechanics: 'Estimate next-period distributable cash flow, choose a sustainable perpetual growth rate below the required return, divide the cash flow by the spread between required return and growth, and stress the denominator for assumption sensitivity.',
    reason: 'The Gordon Growth Model is a compact valuation mechanism governed by strict economic assumptions; it is best taught structurally rather than as a separate modeling workflow.',
  },
  dividend_discount_model: {
    format: 'Structural',
    description: 'Dividend discount valuation makes the equity-holder claim explicit: value comes from the present value of distributions available to common shareholders. Reliance’s annual-report distribution and financing disclosures provide a real Indian-company artifact for separating dividends from operating cash flow and from enterprise value.',
    sources: [relianceAnnualReport, nseReliance, rbiGsec, gordonShapiro],
    question: 'When is the present value of expected shareholder distributions an appropriate way to value equity, and when do payout policy or financing choices make it misleading?',
    mechanics: 'Forecast dividends or equity cash flows available to common holders, discount them at cost of equity, distinguish payout from operating performance, and test whether the assumed distribution policy is sustainable.',
    reason: 'Dividend discount valuation concerns the equity claim and payout policy; it is a structural valuation method, not a multi-schedule model by default.',
  },
  exit_multiple_method: {
    format: 'Structural',
    description: 'The exit-multiple method estimates continuing value by applying a market multiple to a normalized terminal operating metric. Reliance’s reported EBITDA, debt, and market disclosures make the discipline visible: the terminal metric, peer set, capital structure, and multiple must refer to the same economic claim.',
    sources: [relianceAnnualReport, nseReliance, nifty50],
    question: 'How can a terminal enterprise value be estimated from a normalized operating metric without mixing peer multiples, accounting periods, and capital claims?',
    mechanics: 'Select a normalized terminal metric, choose an enterprise-value or equity-value multiple that matches it, apply the multiple to the terminal metric, discount the result, and reconcile the implied valuation assumptions with the DCF forecast.',
    reason: 'Exit multiples are a terminal-value convention that requires comparability and claim consistency; the concept is structural rather than a full standalone build.',
  },
};

const updated = topics.map((topic) => {
  if (topic.topic_id === 'dcf_model') {
    return {
      ...topic,
      aliases: [...new Set([...(topic.aliases ?? []), 'Discounted Cash Flow Model', 'DCF Valuation', 'Discounted Cash Flow Analysis'])],
      eligibility: 'duplicate_of:discounted_cash_flow',
      research_status: 'reviewed',
      classification_status: 'reviewed',
      classification_rationale: 'Merged into discounted_cash_flow because both entries describe the same valuation build.',
    };
  }
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:valuation-batch-005`,
    description: record.description,
    geography: 'India',
    recognition_score: 9,
    governing_question_draft: record.question,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 9,
    data_completeness_score: 9,
    selection_rationale: 'Reliance provides real Indian-company financial-statement inputs; the academic and market sources supply the valuation mechanism and observable market context.',
    sources: record.sources,
  };
  return lockBestAnchor({
    ...topic,
    format: record.format,
    classification_status: 'reviewed',
    classification_rationale: record.format === 'Modeling Lab'
      ? 'Modeling Lab confirmed because the lesson requires linked operating, cash-flow, financing, valuation, and sensitivity dependencies.'
      : 'Structural format confirmed because the lesson isolates a valuation mechanism or terminal-value convention rather than a full build.',
    formula_or_mechanics_stub: record.mechanics,
    anchor_candidates: [candidate],
  }, [candidate]);
});

searchIndex['discounted cash flow model'] = 'discounted_cash_flow';
searchIndex['dcf valuation'] = 'discounted_cash_flow';
searchIndex['discounted cash flow analysis'] = 'discounted_cash_flow';

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
fs.writeFileSync(searchIndexPath, `${JSON.stringify(searchIndex, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} valuation anchors and merged dcf_model into discounted_cash_flow.`);
