import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const relianceAnnualReport = {
  id: 'ril_annual_report_2024_25',
  tier: 1,
  title: 'Reliance Industries Integrated Annual Report 2024-25',
  url: 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf',
};

const records = {
  debt_to_equity_ratio: {
    description: 'Reliance Industries’ debt and equity disclosures provide a real Indian-company artifact for examining financial leverage as a claim on enterprise cash flows, not as a generic signal that debt is intrinsically good or bad.',
    question: 'How much creditor capital supports each unit of shareholders’ equity, and when does that financing mix increase resilience versus magnify financial risk?',
    mechanics: 'Divide the explicitly defined debt balance by common equity, reconcile lease and hybrid treatment, and interpret the result alongside cash flow stability, maturity profile, asset quality, and covenant capacity.',
    reason: 'Debt-to-equity analysis applies to non-financial operating companies with identifiable debt and equity; it is not a substitute for bank regulatory-capital measures.',
  },
  net_leverage_ratio: {
    description: 'Reliance Industries’ debt, cash, and EBITDA disclosures provide a real operating-company artifact for assessing debt relative to recurring earnings capacity after recognising immediately available cash, while preserving the limits of EBITDA as a cash-flow proxy.',
    question: 'How many years of EBITDA would net debt represent under a stable earnings assumption, and which assumptions make that shorthand unsafe?',
    mechanics: 'Subtract eligible cash and cash equivalents from gross debt, divide by consistently defined EBITDA, and test sensitivity to cyclical earnings, restricted cash, leases, maturities, and acquisition financing.',
    reason: 'Net leverage is a credit metric for operating companies with debt, cash, and recurring earnings; it should not be applied as a bank liquidity measure.',
  },
  interest_coverage_ratio: {
    description: 'Reliance Industries’ finance-cost and operating-profit disclosures provide an Indian-company artifact for asking whether operating earnings can service contractual interest before principal repayment, refinancing, and capital expenditure are considered.',
    question: 'How many times can operating profit cover the period’s interest burden, and what deterioration would threaten debt-service capacity?',
    mechanics: 'Divide EBIT or another explicitly defined pre-interest earnings measure by gross interest expense, then test the result against earnings cyclicality, floating-rate exposure, debt maturity, and cash conversion.',
    reason: 'Interest coverage applies to debt-financed operating companies and requires a consistent operating-earnings and interest-expense definition.',
  },
  fixed_charge_coverage_ratio: {
    description: 'Reliance Industries’ operating earnings, finance costs, and lease disclosures provide a real company setting for extending interest coverage to recurring fixed commitments that can constrain cash flow even when debt interest alone appears manageable.',
    question: 'Can recurring operating earnings meet interest and other fixed financing commitments, including lease obligations where relevant?',
    mechanics: 'Define fixed charges consistently, divide the corresponding pre-charge earnings measure by interest plus fixed commitments, and reconcile lease treatment to the company’s reporting convention.',
    reason: 'Fixed-charge coverage is relevant for operating companies with debt and recurring fixed commitments; interpretation depends on the contractual obligations included.',
  },
  debt_service_coverage_ratio: {
    description: 'Reliance Industries’ cash-flow, debt, and financing disclosures provide a real artifact for distinguishing income-statement interest coverage from the cash available to meet both interest and scheduled principal obligations.',
    question: 'Does recurring cash generation cover the full period debt-service requirement, including scheduled principal, rather than interest alone?',
    mechanics: 'Divide a clearly defined cash-flow measure by scheduled interest plus principal payments for the period, then distinguish contractual amortisation from bullet maturities and refinancing risk.',
    reason: 'DSCR applies to debt-financed operating assets and companies with identifiable debt-service commitments; it is a cash-flow capacity test, not a profitability ratio.',
  },
  total_leverage_ratio: {
    description: 'Reliance Industries’ debt and EBITDA disclosures provide a real operating-company artifact for measuring gross contractual debt against earnings capacity before netting cash, making the liquidity and capital-allocation distinction explicit.',
    question: 'What is the company’s gross debt burden relative to earnings capacity, and what additional question must be answered before treating cash as an offset?',
    mechanics: 'Divide total funded debt by consistently defined EBITDA; separately identify available versus restricted cash, lease liabilities, hybrid instruments, and the maturity distribution of the debt balance.',
    reason: 'Total leverage applies to operating companies with funded debt and EBITDA; it must not be substituted for financial-institution capital or liquidity ratios.',
  },
  interest_burden_ratio: {
    description: 'Reliance Industries’ income statement provides a real operating-company artifact for isolating the share of pre-tax earnings retained after net interest, which links financial leverage to the return ultimately available to equity holders.',
    question: 'How much of operating profit survives the financing layer before tax, and how does this expose the earnings sensitivity created by leverage?',
    mechanics: 'Divide earnings before tax by EBIT, or use the equivalent reconciled form EBIT less net interest divided by EBIT, and trace movements to debt balances, rates, and operating-profit volatility.',
    reason: 'Interest-burden analysis applies to non-financial companies where EBIT, interest, and pre-tax income are meaningfully separable in the income statement.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:credit-batch-008`,
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
    selection_rationale: 'A real Indian operating-company annual report provides the debt, cash-flow, and earnings disclosures needed to teach creditor-risk mechanics without using a bank-inappropriate metric.',
    sources: [relianceAnnualReport],
  };
  return lockBestAnchor({
    ...topic,
    format: 'Structural',
    classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed because each topic interprets a reported debt, earnings, or cash-flow relationship.',
    formula_or_mechanics_stub: record.mechanics,
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} credit and leverage anchors.`);
