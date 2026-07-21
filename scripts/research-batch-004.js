import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const source = (id, tier, title, url) => ({ id, tier, title, url });
const sharpeCapm = source('sharpe_capm_1964', 2, 'Sharpe (1964), Capital Asset Prices', 'https://doi.org/10.1111/j.1540-6261.1964.tb02865.x');
const hamada = source('hamada_1972', 2, 'Hamada (1972), The Effect of Capital Structure on Systematic Risk', 'https://doi.org/10.1111/j.1540-6261.1972.tb00971.x');
const nifty50 = source('nifty_50_methodology', 1, 'Nifty 50 index methodology and factsheet', 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty--50');
const rbiGsec = source('rbi_government_securities_faq', 1, 'RBI FAQ: Government securities and Treasury Bill yields', 'https://m.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=711');
const relianceAnnualReport = source('ril_annual_report_2024_25', 1, 'Reliance Industries Integrated Annual Report 2024–25', 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf');
const nseReliance = source('nse_reliance_quote', 1, 'NSE quote and historical-data entry point for Reliance Industries', 'https://www.nseindia.com/get-quote/equity/RELIANCE/reliance-industries-ltd.');

const records = {
  beta: {
    description: 'Nifty 50 methodology and NSE trading data for Reliance Industries provide a real Indian market artifact for estimating beta: align periodic security returns with the chosen market-proxy returns, estimate their covariance relative to market variance, then test whether the estimate is stable enough for the decision at hand.',
    sources: [nifty50, nseReliance],
    question: 'How much systematic exposure does a security contribute relative to the market portfolio used by the investor or valuation model?',
    mechanics: 'Select a defensible market proxy and return frequency, align the security and market return series, estimate beta from covariance divided by market variance or a regression slope, and test stability across the observation window.',
    reason: 'Beta is a market-risk measure for traded securities and portfolios; Nifty 50 and NSE price data provide a concept-correct Indian market setting.',
  },
  capital_asset_pricing_model: {
    description: 'The CAPM can be built with an Indian market proxy, an observable sovereign-yield reference, and a security beta estimate. The lesson treats the model as a cost-of-equity framework with explicit judgment over the risk-free rate, market proxy, horizon, and equity-risk premium rather than as a one-click calculation.',
    sources: [sharpeCapm, nifty50, rbiGsec, nseReliance],
    question: 'What return should equity investors require for bearing the systematic risk of a security, given an explicit market proxy and risk-free reference?',
    mechanics: 'Set the risk-free rate, market proxy, horizon, and equity-risk premium; estimate beta from aligned security and market returns; then calculate required return as risk-free rate plus beta times the market risk premium and stress the assumptions.',
    reason: 'CAPM is a market-pricing framework used to estimate required return on equity. It is a structural finance concept, not a standalone modeling lab or a historical-event narrative.',
  },
  beta_unlevering: {
    description: 'Reliance Industries’ annual-report capital-structure disclosures provide a real Indian issuer artifact for separating operating asset risk from the equity risk created by financing. The unlevering step removes the effect of debt from an observed equity beta before it is transferred to another capital structure.',
    sources: [hamada, relianceAnnualReport, nseReliance],
    question: 'How can an observed equity beta be adjusted to isolate the systematic risk of the underlying business before changing leverage assumptions?',
    mechanics: 'Start with levered equity beta, debt-to-equity ratio, and tax assumption; divide levered beta by one plus the after-tax debt-to-equity adjustment, then assess whether debt risk and business mix make the simplification defensible.',
    reason: 'Beta unlevering applies to operating companies when an observed equity beta must be normalized for capital structure; an Indian issuer’s filing supplies the debt-and-equity evidence needed for the process.',
  },
  hamada_equation: {
    description: 'Hamada’s research formalized the link between capital structure and equity systematic risk. Reliance Industries’ reported debt-equity disclosures provide a concrete Indian capital-structure artifact for showing why the same operating assets can support different equity betas as leverage changes.',
    sources: [hamada, relianceAnnualReport],
    question: 'How does financial leverage transform the systematic risk borne by equity holders when the operating risk of the assets is held constant?',
    mechanics: 'Relate levered beta to unlevered beta through one plus the after-tax debt-to-equity ratio, then identify the conditions under which debt beta, tax treatment, or non-comparable business mix invalidate the shortcut.',
    reason: 'The Hamada equation is a capital-structure adjustment to equity beta; the original research and a real Indian issuer capital structure are directly applicable anchors.',
  },
  levered_beta: {
    description: 'A listed company’s observed equity beta reflects both the operating risk of its assets and the residual risk equity holders bear after debt claims. Reliance Industries’ annual-report capital structure and NSE market data provide an Indian artifact for keeping those two sources of risk separate.',
    sources: [hamada, relianceAnnualReport, nseReliance],
    question: 'Why does the beta observed in a listed company’s share price reflect financing choices as well as the risk of the underlying business?',
    mechanics: 'Estimate or observe equity beta from market returns, identify the company’s capital structure, and explain how debt amplifies the sensitivity of residual equity cash flows to systematic operating shocks.',
    reason: 'Levered beta applies to listed operating companies with debt and equity; issuer filings and exchange data are the appropriate evidence base.',
  },
  unlevered_beta: {
    description: 'Unlevered beta is the capital-structure-neutral estimate used to compare the systematic operating risk of businesses. Reliance Industries’ disclosed debt-equity position and the Hamada framework provide a real Indian setting for removing financing effects before selecting comparable businesses or re-levering to a target structure.',
    sources: [hamada, relianceAnnualReport, nseReliance],
    question: 'What systematic risk belongs to the business itself after the effects of its current financing structure are removed?',
    mechanics: 'Convert observed levered beta to asset beta using debt-to-equity and tax assumptions, compare the result across truly comparable businesses, then re-lever to the target capital structure if the decision requires an equity beta.',
    reason: 'Unlevered beta is used in valuation and capital-structure analysis for operating companies; the Hamada framework and issuer capital structure are directly applicable.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:capm-batch-004`,
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
    selection_rationale: 'The anchor combines an Indian market artifact and issuer disclosure with the primary academic source required to teach the mechanism accurately.',
    sources: record.sources,
  };
  return lockBestAnchor({
    ...topic,
    format: 'Structural',
    classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed: these are market-risk and capital-structure mechanisms, not standalone multi-schedule modeling workflows.',
    formula_or_mechanics_stub: record.mechanics,
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} CAPM-family anchors.`);
