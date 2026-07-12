const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    id: 'corp_finance',
    name: 'Corporate Finance',
    color: '#FF6B6B',
    topics: [
      { id: 'tvm', title: 'Time Value of Money', subtitle: 'TVM', short_summary: 'The concept that money available at the present time is worth more than the identical sum in the future due to its potential earning capacity.', prereqs: [], leads_to: ['cap_budgeting', 'dcf'] },
      { id: 'cap_budgeting', title: 'Capital Budgeting', subtitle: 'Project Valuation', short_summary: 'The process a business undertakes to evaluate potential major projects or investments.', prereqs: ['tvm'], leads_to: ['cost_capital'] },
      { id: 'cost_capital', title: 'Cost of Capital', subtitle: 'Hurdle Rate', short_summary: 'The required return necessary to make a capital budgeting project worthwhile.', prereqs: ['cap_budgeting'], leads_to: ['cap_structure', 'wacc'] },
      { id: 'cap_structure', title: 'Capital Structure', subtitle: 'Debt & Equity', short_summary: 'The particular combination of debt and equity used by a company to finance its overall operations and growth.', prereqs: ['cost_capital'], leads_to: ['wacc', 'lbo'] },
      { id: 'wacc', title: 'WACC', subtitle: 'Weighted Average Cost of Capital', short_summary: 'The average rate of return a company expects to pay to all its security holders to finance its assets.', formula: 'WACC = (E/V) * Re + (D/V) * Rd * (1 - Tc)', prereqs: ['cost_capital', 'cap_structure', 'cost_equity', 'cost_debt', 'beta'], leads_to: ['dcf', 'dividend_policy'] },
      { id: 'dividend_policy', title: 'Dividend Policy', subtitle: 'Payout', short_summary: 'The strategy a company uses to decide how much of its earnings it will pay out to shareholders as dividends.', prereqs: ['wacc'], leads_to: [] }
    ]
  },
  {
    id: 'valuation',
    name: 'Valuation',
    color: '#4ECDC4',
    topics: [
      { id: 'fin_ratios', title: 'Financial Ratios', subtitle: 'Ratios', short_summary: 'Mathematical relationships between financial statement line items used to evaluate performance.', prereqs: ['fin_stmts'], leads_to: ['comps', 'credit_risk'] },
      { id: 'comps', title: 'Comparable Company Analysis', subtitle: 'Trading Comps', short_summary: 'A relative valuation method comparing the current value of a business to similar businesses.', prereqs: ['fin_ratios'], leads_to: ['prec_trans', 'enterprise_value'] },
      { id: 'prec_trans', title: 'Precedent Transactions', subtitle: 'Transaction Comps', short_summary: 'A valuation method in which the price paid for similar companies in the past is considered an indicator of a company\'s value.', prereqs: ['comps'], leads_to: ['enterprise_value'] },
      { id: 'enterprise_value', title: 'Enterprise Value', subtitle: 'EV', short_summary: 'A measure of a company\'s total value, often used as a more comprehensive alternative to equity market capitalization.', formula: 'EV = Equity Value + Total Debt - Cash', prereqs: ['comps', 'prec_trans'], leads_to: ['dcf'] },
      { id: 'dcf', title: 'DCF', subtitle: 'Discounted Cash Flow', short_summary: 'A valuation method used to estimate the value of an investment based on its expected future cash flows.', prereqs: ['enterprise_value', 'wacc', 'tvm'], leads_to: ['lbo'] },
      { id: 'lbo', title: 'LBO Basics', subtitle: 'Leveraged Buyout', short_summary: 'The acquisition of another company using a significant amount of borrowed money to meet the cost of acquisition.', prereqs: ['dcf', 'cap_structure', 'debt_basics'], leads_to: [] }
    ]
  },
  {
    id: 'fixed_income',
    name: 'Fixed Income & Credit',
    color: '#45B7D1',
    topics: [
      { id: 'bond_basics', title: 'Bond Basics', subtitle: 'Bonds', short_summary: 'A fixed income instrument that represents a loan made by an investor to a borrower.', prereqs: ['tvm'], leads_to: ['yield_duration', 'cost_debt', 'debt_basics'] },
      { id: 'yield_duration', title: 'Yield & Duration', subtitle: 'Interest Rate Risk', short_summary: 'Measures of a bond\'s expected return and sensitivity to interest rate changes.', prereqs: ['bond_basics', 'interest_rates'], leads_to: ['credit_risk'] },
      { id: 'credit_risk', title: 'Credit Risk', subtitle: 'Default Risk', short_summary: 'The risk of default on a debt that may arise from a borrower failing to make required payments.', prereqs: ['yield_duration', 'fin_ratios'], leads_to: ['credit_ratings'] },
      { id: 'credit_ratings', title: 'Credit Ratings', subtitle: 'Ratings', short_summary: 'An assessment of the creditworthiness of a borrower in general terms or with respect to a particular debt or financial obligation.', prereqs: ['credit_risk'], leads_to: ['spread_analysis'] },
      { id: 'spread_analysis', title: 'Spread Analysis', subtitle: 'Credit Spreads', short_summary: 'The difference in yield between two bonds of similar maturity but different credit quality.', prereqs: ['credit_ratings'], leads_to: ['distressed_debt'] },
      { id: 'distressed_debt', title: 'Distressed Debt', subtitle: 'Restructuring', short_summary: 'Securities of companies or government entities that are experiencing financial or operational distress, default, or are under bankruptcy.', prereqs: ['spread_analysis'], leads_to: [] },
      { id: 'cost_debt', title: 'Cost of Debt', subtitle: 'Kd', short_summary: 'The effective rate that a company pays on its borrowed funds.', prereqs: ['bond_basics'], leads_to: ['wacc'], isolated: true },
      { id: 'debt_basics', title: 'Debt Basics', subtitle: 'Debt', short_summary: 'Basic concepts of borrowing and lending.', prereqs: ['bond_basics'], leads_to: ['lbo'], isolated: true }
    ]
  },
  {
    id: 'securitization',
    name: 'Securitization',
    color: '#96CEB4',
    topics: [
      { id: 'loans', title: 'Loans', subtitle: 'Origination', short_summary: 'The process of a borrower receiving money from a lender.', prereqs: [], leads_to: ['pooling'] },
      { id: 'pooling', title: 'Pooling', subtitle: 'Aggregation', short_summary: 'Combining multiple loans into a single pool to be securitized.', prereqs: ['loans'], leads_to: ['spv'] },
      { id: 'spv', title: 'SPV', subtitle: 'Special Purpose Vehicle', short_summary: 'A subsidiary company with an asset/liability structure and legal status that makes its obligations secure.', prereqs: ['pooling'], leads_to: ['tranching'] },
      { id: 'tranching', title: 'Tranching', subtitle: 'Risk Slicing', short_summary: 'Dividing a pool of assets into classes with different levels of risk and return.', prereqs: ['spv'], leads_to: ['abs'] },
      { id: 'abs', title: 'ABS', subtitle: 'Asset-Backed Security', short_summary: 'A financial security backed by a loan, lease or receivables against assets other than real estate.', prereqs: ['tranching'], leads_to: ['mbs'] },
      { id: 'mbs', title: 'MBS', subtitle: 'Mortgage-Backed Security', short_summary: 'A type of asset-backed security that is secured by a mortgage or collection of mortgages.', prereqs: ['abs'], leads_to: ['cdo'] },
      { id: 'cdo', title: 'CDO', subtitle: 'Collateralized Debt Obligation', short_summary: 'A complex structured finance product that is backed by a pool of loans and other assets.', prereqs: ['mbs'], leads_to: [] }
    ]
  },
  {
    id: 'derivatives',
    name: 'Derivatives 101',
    color: '#DDA15E',
    topics: [
      { id: 'forwards', title: 'Forward Contracts', subtitle: 'Forwards', short_summary: 'A customized contract between two parties to buy or sell an asset at a specified price on a future date.', prereqs: [], leads_to: ['futures'] },
      { id: 'futures', title: 'Futures Contracts', subtitle: 'Futures', short_summary: 'Standardized legal agreements to buy or sell something at a predetermined price at a specified time in the future.', prereqs: ['forwards'], leads_to: ['options_basics'] },
      { id: 'options_basics', title: 'Options Basics', subtitle: 'Options', short_summary: 'Financial derivatives that give buyers the right, but not the obligation, to buy or sell an underlying asset at an agreed-upon price and date.', prereqs: ['futures'], leads_to: ['options_pricing', 'hedging'] },
      { id: 'options_pricing', title: 'Options Pricing', subtitle: 'Black-Scholes', short_summary: 'Mathematical models to calculate the theoretical value of options.', prereqs: ['options_basics', 'risk_return'], leads_to: ['swaps'] },
      { id: 'swaps', title: 'Swaps', subtitle: 'Interest Rate Swaps', short_summary: 'A derivative contract through which two parties exchange financial instruments.', prereqs: ['options_pricing'], leads_to: ['hedging'] },
      { id: 'hedging', title: 'Hedging Strategies', subtitle: 'Risk Mgmt', short_summary: 'Strategies used to offset potential losses or gains that may be incurred by a companion investment.', prereqs: ['options_basics', 'swaps', 'risk_return'], leads_to: [] }
    ]
  },
  {
    id: 'financial_statements',
    name: 'Financial Statements',
    color: '#6C5CE7',
    topics: [
      { id: 'income_stmt', title: 'Income Statement', subtitle: 'P&L', short_summary: 'Shows a company\'s revenues and expenses during a particular period.', prereqs: [], leads_to: ['bal_sheet'] },
      { id: 'bal_sheet', title: 'Balance Sheet', subtitle: 'Assets & Liab', short_summary: 'A statement of the assets, liabilities, and capital of a business at a particular point in time.', prereqs: ['income_stmt'], leads_to: ['cf_stmt'] },
      { id: 'cf_stmt', title: 'Cash Flow Statement', subtitle: 'Cash Flow', short_summary: 'A financial statement that summarizes the amount of cash and cash equivalents entering and leaving a company.', prereqs: ['bal_sheet'], leads_to: ['fin_stmts'] },
      { id: 'fin_stmts', title: 'Financial Analysis', subtitle: 'Core Analysis', short_summary: 'The process of evaluating businesses, projects, budgets, and other finance-related transactions.', prereqs: ['cf_stmt'], leads_to: ['working_cap', 'fin_ratios'] },
      { id: 'working_cap', title: 'Working Capital', subtitle: 'NWC', short_summary: 'The capital of a business which is used in its day-to-day trading operations.', prereqs: ['fin_stmts'], leads_to: [] }
    ]
  },
  {
    id: 'portfolio_mgmt',
    name: 'Portfolio Management',
    color: '#FF8A5C',
    topics: [
      { id: 'risk_return', title: 'Risk & Return', subtitle: 'The Trade-off', short_summary: 'The principle that potential return rises with an increase in risk.', prereqs: [], leads_to: ['diversification', 'options_pricing', 'hedging'] },
      { id: 'diversification', title: 'Diversification', subtitle: 'Spreading Risk', short_summary: 'A risk management strategy that mixes a wide variety of investments within a portfolio.', prereqs: ['risk_return'], leads_to: ['capm_port'] },
      { id: 'capm_port', title: 'CAPM', subtitle: 'Capital Asset Pricing Model', short_summary: 'Describes the relationship between systematic risk and expected return for assets.', prereqs: ['diversification', 'risk_return'], leads_to: ['beta_port'] },
      { id: 'beta_port', title: 'Beta', subtitle: 'Systematic Risk', short_summary: 'A measure of the volatility, or systematic risk, of a security or a portfolio in comparison to the market as a whole.', prereqs: ['capm_port'], leads_to: ['port_theory', 'wacc', 'beta'] },
      { id: 'port_theory', title: 'Portfolio Theory', subtitle: 'MPT', short_summary: 'A mathematical framework for assembling a portfolio of assets such that the expected return is maximized for a given level of risk.', prereqs: ['beta_port'], leads_to: ['asset_alloc'] },
      { id: 'asset_alloc', title: 'Asset Allocation', subtitle: 'Allocation', short_summary: 'An investment strategy that aims to balance risk and reward by apportioning a portfolio\'s assets according to an individual\'s goals, risk tolerance, and investment horizon.', prereqs: ['port_theory'], leads_to: [] },
      { id: 'cost_equity', title: 'Cost of Equity', subtitle: 'Ke', short_summary: 'The return a company requires to decide if an investment meets capital return requirements.', prereqs: ['beta_port'], leads_to: ['wacc'], isolated: true },
      { id: 'beta', title: 'Beta (Corp Fin)', subtitle: 'Systematic Risk', short_summary: 'Beta applied to corporate finance.', prereqs: ['beta_port'], leads_to: ['wacc'], isolated: true }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    color: '#A8E6CF',
    topics: [
      { id: 'sup_dem', title: 'Supply & Demand', subtitle: 'Basics', short_summary: 'An economic model of price determination in a market.', prereqs: [], leads_to: ['market_struct'] },
      { id: 'market_struct', title: 'Market Structure', subtitle: 'Competition', short_summary: 'The interconnected characteristics of a market, such as the number and relative strength of buyers and sellers.', prereqs: ['sup_dem'], leads_to: ['gdp'] },
      { id: 'gdp', title: 'GDP & Growth', subtitle: 'Macro Output', short_summary: 'The total value of goods produced and services provided in a country during one year.', prereqs: ['market_struct'], leads_to: ['monetary'] },
      { id: 'monetary', title: 'Monetary Policy', subtitle: 'Central Banks', short_summary: 'The macroeconomic policy laid down by the central bank.', prereqs: ['gdp'], leads_to: ['interest_rates'] },
      { id: 'interest_rates', title: 'Interest Rates', subtitle: 'Rates', short_summary: 'The proportion of a loan that is charged as interest to the borrower, typically expressed as an annual percentage.', prereqs: ['monetary'], leads_to: ['inflation', 'yield_duration'] },
      { id: 'inflation', title: 'Inflation', subtitle: 'Purchasing Power', short_summary: 'A general increase in prices and fall in the purchasing value of money.', prereqs: ['interest_rates'], leads_to: [] }
    ]
  }
];

const nodes = {};
const lines = {};

let currentY = 160;

CATEGORIES.forEach(cat => {
  lines[cat.id] = {
    id: cat.id,
    name: cat.name,
    color: cat.color,
    stations: []
  };

  let currentX = 120;
  
  cat.topics.forEach(topic => {
    nodes[topic.id] = {
      id: topic.id,
      title: topic.title,
      subtitle: topic.subtitle,
      short_summary: topic.short_summary,
      formula: topic.formula,
      x: topic.isolated ? -999 : currentX, // Isolated nodes don't get placed on the trunk directly
      y: topic.isolated ? -999 : currentY,
      lines: topic.isolated ? [] : [cat.id],
      prerequisite_ids: topic.prereqs,
      leads_to_ids: topic.leads_to,
      aliases: []
    };
    if (!topic.isolated) {
      lines[cat.id].stations.push(topic.id);
      currentX += 180;
    }
  });

  currentY += 120;
});

// Post-process: any nodes that are isolated can just be defined as nodes.
// Ensure all leads_to are reciprocal to prereqs.
Object.values(nodes).forEach(node => {
  node.prerequisite_ids.forEach(prereqId => {
    if (nodes[prereqId] && !nodes[prereqId].leads_to_ids.includes(node.id)) {
      nodes[prereqId].leads_to_ids.push(node.id);
    }
  });
  node.leads_to_ids.forEach(leadId => {
    if (nodes[leadId] && !nodes[leadId].prerequisite_ids.includes(node.id)) {
      nodes[leadId].prerequisite_ids.push(node.id);
    }
  });
});

fs.writeFileSync(path.join(__dirname, 'src/data/knowledgeGraph.json'), JSON.stringify({ nodes, lines }, null, 2));
console.log('Graph generated!');
