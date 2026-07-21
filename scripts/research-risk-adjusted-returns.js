import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const sebiUrl = 'https://www.sebi.gov.in/sebi_data/attachdocs/jan-2025/1737111319202.pdf';
const niftyUrl = 'https://www.niftyindices.com/docs/default-source/indices/nifty-50/nifty-50-whitepaper-2024.pdf?sfvrsn=1cd6e35_4';

const records = {
  calmar_ratio: {
    format: 'Structural',
    description: 'NSE Indices\' Nifty 50 Total Return whitepaper supplies a dated return series and risk profile; the lesson uses it to show why Calmar requires a separate maximum-drawdown observation before the ratio can be computed.',
    governing: 'How much return has a portfolio produced relative to the deepest loss an investor had to endure, and what does that comparison reveal that volatility does not?',
    mechanics: 'Divide annualized return by maximum drawdown over the same measurement window, define the drawdown peak and trough, and keep the return and drawdown periods consistent.',
    reason: 'Calmar Ratio is a portfolio risk-adjusted return measure. A total-return index is the correct investment artifact, while maximum drawdown must remain an explicit input rather than an invented value.',
    sources: [{ id: 'nifty50_whitepaper_2024', tier: 1, title: 'NSE Indices, Nifty 50 Whitepaper 2024', url: niftyUrl }],
  },
  information_ratio: {
    format: 'Reference',
    description: 'SEBI Circular SEBI/HO/IMD/IMD-PoD-2/P/CIR/2025/6 requires equity-oriented mutual-fund schemes to disclose Information Ratio daily and specifies the benchmark, excess-return, and daily-volatility methodology.',
    governing: 'How much benchmark-relative return has a portfolio produced per unit of the variability in that relative return, and what does the consistency of the excess return imply about repeatable skill?',
    mechanics: 'Compute portfolio return less benchmark return, then divide by the standard deviation of excess return using daily return observations and the Tier 1 benchmark prescribed by the scheme.',
    reason: 'Information Ratio is expressly governed for Indian equity-oriented mutual-fund schemes by SEBI. The regulator is the authoritative source for the formula and disclosure method.',
    sources: [{ id: 'sebi_information_ratio_2025', tier: 1, title: 'SEBI Circular on disclosure of Information Ratio for mutual-fund schemes', url: sebiUrl }],
  },
  jensens_alpha: {
    format: 'Structural',
    description: 'NSE Indices\' Nifty 50 Total Return whitepaper supplies the benchmark return convention and dated market-return observations needed to distinguish benchmark-adjusted performance from raw portfolio return.',
    governing: 'What return did a portfolio earn beyond the return predicted by its exposure to systematic market risk, and which model assumptions make that residual meaningful?',
    mechanics: 'Estimate expected return with the risk-free rate, portfolio beta, and benchmark risk premium, then subtract expected return from realized portfolio return to obtain alpha.',
    reason: 'Jensen\'s Alpha is a benchmark and beta-based portfolio measure. The Nifty total-return benchmark is an appropriate Indian market reference, but risk-free rate and beta remain required inputs.',
    sources: [{ id: 'nifty50_whitepaper_2024', tier: 1, title: 'NSE Indices, Nifty 50 Whitepaper 2024', url: niftyUrl }],
  },
  sharpe_ratio: {
    format: 'Structural',
    description: 'NSE Indices\' Nifty 50 Total Return whitepaper reports dated annualized return and volatility observations and makes the dividend-reinvestment convention explicit, providing a real portfolio benchmark context for excess-return-per-volatility analysis.',
    governing: 'How much return has a portfolio earned above the risk-free rate for each unit of total return volatility, and is that compensation adequate for the uncertainty carried?',
    mechanics: 'Subtract the risk-free return from portfolio return and divide the excess return by the standard deviation of portfolio returns over the same period and frequency.',
    reason: 'Sharpe Ratio is a portfolio risk-adjusted return measure. Nifty total-return data supplies a real market context; the risk-free series must be sourced separately for any computed output.',
    sources: [{ id: 'nifty50_whitepaper_2024', tier: 1, title: 'NSE Indices, Nifty 50 Whitepaper 2024', url: niftyUrl }],
  },
  sortino_ratio: {
    format: 'Structural',
    description: 'NSE Indices\' Nifty 50 Total Return whitepaper provides a dated return history and calendar-year downside observations that support a real distinction between total volatility and harmful downside deviation.',
    governing: 'How much return has a portfolio earned above a target return for each unit of downside deviation, and why should adverse outcomes receive different treatment from favorable variation?',
    mechanics: 'Subtract the target or minimum acceptable return from portfolio return, then divide by downside deviation calculated only from observations below that target.',
    reason: 'Sortino Ratio is a portfolio downside-risk measure. The Nifty total-return series is an appropriate real return context, while the target return and downside observations must remain explicit inputs.',
    sources: [{ id: 'nifty50_whitepaper_2024', tier: 1, title: 'NSE Indices, Nifty 50 Whitepaper 2024', url: niftyUrl }],
  },
  treynor_ratio: {
    format: 'Structural',
    description: 'NSE Indices\' Nifty 50 Total Return whitepaper supplies a real market benchmark and explains the index\'s total-return and free-float construction, allowing Treynor Ratio to be taught as compensation for systematic rather than total risk.',
    governing: 'How much excess return has a portfolio produced per unit of market risk, and when is beta the correct denominator rather than total volatility?',
    mechanics: 'Subtract the risk-free return from portfolio return and divide by portfolio beta relative to the selected market benchmark.',
    reason: 'Treynor Ratio is a beta-based portfolio measure. A broad, total-return market index is the correct benchmark context; beta and the risk-free rate remain required inputs.',
    sources: [{ id: 'nifty50_whitepaper_2024', tier: 1, title: 'NSE Indices, Nifty 50 Whitepaper 2024', url: niftyUrl }],
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:risk-adjusted-primary-source`,
    description: record.description,
    geography: 'India',
    recognition_score: 9,
    governing_question_draft: record.governing,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 10,
    selection_rationale: 'The selected regulator or official index methodology places the concept inside its real portfolio-performance domain and provides dated source material without inventing missing inputs.',
    sources: record.sources,
  };
  return lockBestAnchor({
    ...topic,
    format: record.format,
    formula_or_mechanics_stub: record.mechanics,
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked the risk-adjusted return family to SEBI and NSE Indices primary sources.');
