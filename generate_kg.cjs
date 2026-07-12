const fs = require('fs');

const GRID = 80;

const lines = {
  corp_finance: { id: 'corp_finance', name: 'Track A - Corporate Finance', color: '#e54d42', stations: [] },
  equity: { id: 'equity', name: 'Track B - Equity', color: '#2997ff', stations: [] },
  debt: { id: 'debt', name: 'Track C - Debt', color: '#34c759', stations: [] },
  valuation: { id: 'valuation', name: 'Track D - Valuation', color: '#ffcc00', stations: [] },
  securitization: { id: 'securitization', name: 'Track E - Securitization', color: '#af52de', stations: [] }
};

const stations = [
  // CORP FINANCE LINE
  { 
    id: 'finance_basics', title: 'Finance Basics', subtitle: 'Core Principles', x: 1, y: 4, lines: ['corp_finance'],
    short_summary: 'The foundational concepts of modern finance.',
    prerequisite_ids: [], leads_to_ids: ['risk_return']
  },
  { 
    id: 'risk_return', title: 'Risk & Return', subtitle: 'The Trade-off', x: 3, y: 4, lines: ['corp_finance'],
    short_summary: 'Understanding the relationship between risk taken and expected return.',
    prerequisite_ids: ['finance_basics'], leads_to_ids: ['beta']
  },
  { 
    id: 'beta', title: 'Beta', subtitle: 'Systematic Risk', x: 5, y: 4, lines: ['corp_finance'],
    short_summary: 'A measure of the volatility, or systematic risk, of a security compared to the market as a whole.',
    prerequisite_ids: ['finance_basics', 'risk_return'], leads_to_ids: ['capm']
  },
  { 
    id: 'capm', title: 'CAPM', subtitle: 'Capital Asset Pricing Model', x: 7, y: 4, lines: ['corp_finance'],
    short_summary: 'Model that describes the relationship between systematic risk and expected return.',
    formula: 'ERi = Rf + βi * (ERm - Rf)',
    prerequisite_ids: ['finance_basics', 'risk_return', 'beta'], leads_to_ids: ['wacc']
  },
  
  // WACC INTERCHANGE
  { 
    id: 'wacc', title: 'WACC', subtitle: 'Weighted Average Cost of Capital', x: 9, y: 4, lines: ['corp_finance', 'equity', 'debt', 'valuation'], 
    short_summary: 'The average rate of return a company expects to pay to all its security holders to finance its assets.',
    formula: 'WACC = (E/V) * Re + (D/V) * Rd * (1 - Tc)',
    prerequisite_ids: ['finance_basics', 'risk_return', 'beta', 'capm'], 
    leads_to_ids: ['dcf', 'enterprise_value', 'fcff', 'eva']
  },
  
  // EQUITY LINE
  { 
    id: 'cost_equity', title: 'Cost of Equity', subtitle: 'Equity Return', x: 11, y: 2, lines: ['equity'],
    short_summary: 'The return a company requires to decide if an investment meets capital return requirements.',
    prerequisite_ids: ['finance_basics', 'risk_return', 'beta', 'capm', 'wacc'], leads_to_ids: []
  },
  
  // DEBT LINE
  { 
    id: 'cost_debt', title: 'Cost of Debt', subtitle: 'Debt Return', x: 11, y: 3, lines: ['debt'],
    short_summary: 'The effective rate that a company pays on its borrowed funds.',
    prerequisite_ids: ['finance_basics', 'wacc'], leads_to_ids: []
  },
  
  // VALUATION LINE
  { 
    id: 'dcf', title: 'DCF', subtitle: 'Discounted Cash Flow', x: 11, y: 6, lines: ['valuation'],
    short_summary: 'A valuation method used to estimate the value of an investment based on its expected future cash flows.',
    prerequisite_ids: ['finance_basics', 'wacc'], leads_to_ids: []
  },
  { 
    id: 'enterprise_value', title: 'Enterprise Value', subtitle: 'Total Value', x: 13, y: 6, lines: ['valuation'],
    short_summary: 'A measure of a company\'s total value, often used as a more comprehensive alternative to equity market capitalization.',
    formula: 'EV = MC + Total Debt - Cash',
    prerequisite_ids: ['finance_basics', 'wacc'], leads_to_ids: []
  },
  
  // SECURITIZATION LINE
  { 
    id: 'loans', title: 'Loans', subtitle: 'Origination', x: 1, y: 8, lines: ['securitization'],
    short_summary: 'The process of a borrower receiving money from a lender.',
    prerequisite_ids: [], leads_to_ids: ['pooling']
  },
  { 
    id: 'pooling', title: 'Pooling', subtitle: 'Aggregation', x: 3, y: 8, lines: ['securitization'],
    short_summary: 'Combining multiple loans into a single pool to be securitized.',
    prerequisite_ids: ['loans'], leads_to_ids: ['spv']
  },
  { 
    id: 'spv', title: 'SPV', subtitle: 'Special Purpose Vehicle', x: 5, y: 8, lines: ['securitization'],
    short_summary: 'A subsidiary company with an asset/liability structure and legal status that makes its obligations secure.',
    prerequisite_ids: ['loans', 'pooling'], leads_to_ids: ['tranching']
  },
  { 
    id: 'tranching', title: 'Tranching', subtitle: 'Risk Slicing', x: 7, y: 8, lines: ['securitization'],
    short_summary: 'Dividing a pool of assets into classes with different levels of risk and return.',
    prerequisite_ids: ['loans', 'pooling', 'spv'], leads_to_ids: ['abs', 'mbs']
  },
  { 
    id: 'abs', title: 'ABS', subtitle: 'Asset-Backed Security', x: 9, y: 8, lines: ['securitization'],
    short_summary: 'A financial security backed by a loan, lease or receivables against assets other than real estate.',
    prerequisite_ids: ['loans', 'pooling', 'spv', 'tranching'], leads_to_ids: []
  },
  { 
    id: 'mbs', title: 'MBS', subtitle: 'Mortgage-Backed Security', x: 11, y: 8, lines: ['securitization'],
    short_summary: 'A type of asset-backed security that is secured by a mortgage or collection of mortgages.',
    prerequisite_ids: ['loans', 'pooling', 'spv', 'tranching'], leads_to_ids: []
  },

  // Dummy nodes for leads to that don't exist in stations (to satisfy WACC leads_to)
  {
    id: 'fcff', title: 'FCFF', subtitle: 'Free Cash Flow to Firm', x: 13, y: 4, lines: [],
    short_summary: 'Cash flow available to all investors after taxes and reinvestments.',
    prerequisite_ids: ['wacc'], leads_to_ids: []
  },
  {
    id: 'eva', title: 'EVA', subtitle: 'Economic Value Added', x: 13, y: 5, lines: [],
    short_summary: 'A measure of a company\'s financial performance based on the residual wealth.',
    prerequisite_ids: ['wacc'], leads_to_ids: []
  }
];

lines.corp_finance.stations = ['finance_basics', 'risk_return', 'beta', 'capm', 'wacc'];
lines.equity.stations = ['wacc', 'cost_equity'];
lines.debt.stations = ['wacc', 'cost_debt'];
lines.valuation.stations = ['wacc', 'dcf', 'enterprise_value']; 
lines.securitization.stations = ['loans', 'pooling', 'spv', 'tranching', 'abs', 'mbs'];

const nodes = {};
stations.forEach(s => {
  nodes[s.id] = {
    id: s.id,
    title: s.title,
    subtitle: s.subtitle || '',
    short_summary: s.short_summary || '',
    formula: s.formula,
    x: s.x * GRID,
    y: s.y * GRID,
    lines: s.lines || [],
    prerequisite_ids: s.prerequisite_ids || [],
    leads_to_ids: s.leads_to_ids || [],
    aliases: [] // fallback for UI
  };
});

fs.writeFileSync('./src/data/knowledgeGraph.json', JSON.stringify({ nodes, lines }, null, 2));
console.log('knowledgeGraph.json generated successfully.');
