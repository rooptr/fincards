import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const sec = (id, tier, title, url) => ({ id, tier, title, url });
const sebiSatyam = sec(
  'sebi_satyam_order_2015',
  1,
  'SEBI order in the matter of Satyam Computer Services Ltd.',
  'https://www.sebi.gov.in/cms/sebi_data/attachdocs/1441894262377.pdf',
);
const sebiSatyamReport = sec(
  'sebi_annual_report_satyam_2008_09',
  1,
  'SEBI Annual Report 2008–09: investigation in Satyam Computer Services',
  'https://www.sebi.gov.in/sebi_data/attachdocs/1289364867230.pdf',
);
const beneishPaper = sec(
  'beneish_1999_paper',
  2,
  'Beneish, The Detection of Earnings Manipulation',
  'https://doi.org/10.2307/2491172',
);
const icaiIndAs38 = sec(
  'icai_ind_as_38_material',
  1,
  'ICAI Educational Material on Ind AS 38, Intangible Assets',
  'https://www.icai.org/post/release-educational-material-indas38',
);
const icaiIndAs12 = sec(
  'icai_ind_as_12_material',
  1,
  'ICAI Educational Material on Ind AS 12, Income Taxes',
  'https://www.icai.org/post/educational-material-on-indas-12-income-taxes',
);
const icaiIndAs12Pdf = sec(
  'icai_ind_as_12_pdf',
  1,
  'ICAI Educational Material on Ind AS 12, Income Taxes (PDF)',
  'https://kb.icai.org/pdfs/PDFFile664ae4ef5c4c05.26743208.pdf',
);
const rbiCamels = sec(
  'rbi_camels_supervision_report',
  1,
  'RBI Report on Trend and Progress of Banking Supervision: CAMELS framework',
  'https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?ID=663',
);
const rbiRiskBasedSupervision = sec(
  'rbi_risk_based_supervision',
  1,
  'RBI Risk Based Supervision of Banks',
  'https://rbi.org.in/scripts/PublicationsView.aspx?Id=18086',
);
const rbiCreditDepositGuide = sec(
  'rbi_credit_deposit_ratio_guide',
  1,
  'RBI Comprehensive Guide for Current Statistics: Credit–Deposit Ratio',
  'https://dbieold.rbi.org.in/DBIE/doc/Comprehensive%20Guide%20for%20Monthly%20Bulletin.pdf',
);
const rbiAnnualReport = sec(
  'rbi_annual_report_credit_deposit_ratio',
  1,
  'RBI Annual Report: Credit–Deposit Ratio',
  'https://www.rbi.org.in/scripts/PublicationsView.aspx?id=23078',
);

const records = {
  beneish_m_score: {
    format: 'Narrative',
    description: 'The Satyam accounting scandal provides an Indian, regulator-documented setting for teaching the Beneish M-Score as a forensic screening model: reported financial statements were later found to contain fabricated and overstated information, making the distinction between a statistical warning signal and proof of manipulation essential.',
    sources: [sebiSatyam, sebiSatyamReport, beneishPaper],
    question: 'How can a financial-statement pattern indicate an elevated probability of earnings manipulation without proving that manipulation occurred?',
    reason: 'The anchor is concept-correct because the M-Score is a forensic screening model applied to reported financial statements, and SEBI provides primary documentation of a major Indian financial-reporting failure. The academic paper supplies the model’s original research basis.',
    rationale: 'Satyam is a nationally recognized Indian case with regulator-documented reporting irregularities; it makes the model’s warning-signal role and evidentiary limits teachable.',
  },
  capitalizing_vs_expensing: {
    description: 'Ind AS 38 provides the governing accounting framework for deciding when expenditure creates a separately identifiable intangible asset and when it must be recognized as an expense, making the accounting choice a question of future economic benefits and reliable measurement rather than managerial preference.',
    sources: [icaiIndAs38],
    question: 'When should an expenditure be carried forward as an asset because it creates future economic benefits, and when should it reduce current-period profit?',
    reason: 'Capitalization versus expensing is an accounting-recognition question governed by the intangible-assets standard; Ind AS 38 is the appropriate Indian reference anchor.',
    rationale: 'The governing standard teaches the recognition boundary directly and avoids manufacturing a company case where the accounting rule itself is the subject.',
  },
  deferred_tax_asset: {
    format: 'Reference',
    description: 'Ind AS 12 frames a deferred tax asset as the future tax benefit associated with deductible temporary differences, unused tax losses, or credits, recognized only to the extent that future taxable profit is probable enough to support utilization.',
    sources: [icaiIndAs12, icaiIndAs12Pdf],
    question: 'When does an accounting difference create a future tax benefit that can be recognized as an asset, and what evidence supports recognition?',
    reason: 'Deferred tax assets are governed by income-tax accounting standards and depend on the probability of future taxable profit; Ind AS 12 is the correct authoritative reference.',
    rationale: 'The standard exposes the key tension between a recognized accounting benefit and the evidence required to realize it through future taxable income.',
  },
  deferred_tax_liability: {
    format: 'Reference',
    description: 'Ind AS 12 frames a deferred tax liability as the future tax consequence of taxable temporary differences, requiring the balance sheet to reflect tax that will arise when the underlying carrying amount is recovered or settled.',
    sources: [icaiIndAs12, icaiIndAs12Pdf],
    question: 'Why can an entity report a tax liability before the related cash tax is payable, and how does the temporary difference reverse?',
    reason: 'Deferred tax liabilities are governed by income-tax accounting standards and arise from temporary differences between accounting carrying amounts and tax bases; Ind AS 12 is the correct reference.',
    rationale: 'The standard teaches the timing mismatch between accounting recognition and tax payment without substituting a company-specific anecdote for the mechanism.',
  },
  camel_rating: {
    description: 'RBI’s documented CAMEL framework shows how supervisors summarize a bank’s capital adequacy, asset quality, management, earnings, and liquidity into a supervisory view, while also showing why a composite score cannot replace forward-looking risk assessment.',
    sources: [rbiCamels, rbiRiskBasedSupervision],
    question: 'How does a supervisory rating system translate multiple dimensions of bank condition into a judgment about soundness, and why is the score not a market valuation?',
    reason: 'CAMEL is a bank-supervision framework, and RBI is the authoritative Indian source for its historical use and limitations.',
    rationale: 'The RBI record gives the concept institutional context and makes the transition from CAMEL/CAMELS toward risk-based supervision part of the lesson rather than an omitted caveat.',
  },
  camels_rating_system: {
    description: 'RBI’s supervisory history documents CAMELS as a six-part bank examination framework that adds systems and controls to capital adequacy, asset quality, management, earnings, and liquidity, while later RBI material records the move toward risk-based supervision.',
    sources: [rbiCamels, rbiRiskBasedSupervision],
    question: 'What does each CAMELS dimension reveal about a bank, how are the dimensions combined, and why did supervisors move toward risk-based supervision?',
    reason: 'CAMELS applies to regulated banks as a supervisory assessment framework; RBI directly documents both the framework and its later status in India.',
    rationale: 'The source set supports both the mechanics of the framework and the institutional limitation that the historical acronym is not the whole of current supervision.',
  },
  loan_to_deposit_ratio: {
    description: 'RBI’s credit–deposit ratio measures the share of a bank’s deposit base deployed as bank credit, making it a funding-deployment indicator whose interpretation depends on asset quality, liquidity buffers, loan demand, and the credit cycle rather than on a universal target.',
    sources: [rbiCreditDepositGuide, rbiAnnualReport],
    question: 'How much of a bank’s deposit funding is deployed into credit, and what does a high or rising ratio imply about lending intensity and liquidity risk?',
    reason: 'Loan-to-deposit analysis is a bank-specific funding and deployment question; RBI defines and reports the closely corresponding credit–deposit ratio for Indian banking data.',
    rationale: 'RBI provides both the ratio definition and official system-level reporting, allowing the lesson to distinguish the metric from simplistic “higher is better” interpretation.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:reference-batch-002`,
    description: record.description,
    geography: record.sources.some((source) => source.url.includes('rbi.org.in') || source.url.includes('sebi.gov.in') || source.url.includes('icai.org')) ? 'India' : 'Global',
    recognition_score: topic.topic_id === 'beneish_m_score' ? 9 : 10,
    governing_question_draft: record.question,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 9,
    data_completeness_score: 10,
    selection_rationale: record.rationale,
    sources: record.sources,
  };
  return lockBestAnchor({
    ...topic,
    format: record.format ?? topic.format,
    classification_status: 'reviewed',
    classification_rationale: 'Reference or regulator-documented case format confirmed during source review.',
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} India-first anchors.`);
