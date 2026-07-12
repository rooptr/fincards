const fs = require('fs');
const path = require('path');

const data = {
  domains: [
    {
      id: 'domain_securitization',
      name: 'Securitization',
      color: '#FFFFFF', // Clean stark white glow
      position: { x: 0, y: 15, z: -80 },
      brightness: 2.0,
      nodes: [
        { id: 'loan_origination', title: 'Loan Origination', type: 'concept', pos: { x: -40, y: 40, z: -100 } },
        { id: 'pooling', title: 'Asset Pooling', type: 'concept', pos: { x: -20, y: 25, z: -90 } },
        { id: 'spv', title: 'SPV', type: 'mechanism', pos: { x: 0, y: 15, z: -80 } }, // Overlaps domain star
        { id: 'credit_enhancement', title: 'Credit Enhancement', type: 'mechanism', pos: { x: 25, y: 30, z: -95 } },
        { id: 'tranche_structuring', title: 'Tranche Structuring', type: 'mechanism', pos: { x: 40, y: 5, z: -85 } },
        { id: 'rmbs', title: 'RMBS', type: 'instance', pos: { x: 30, y: -20, z: -80 } },
        { id: 'cmbs', title: 'CMBS', type: 'instance', pos: { x: 50, y: -15, z: -90 } },
        { id: 'abs', title: 'ABS', type: 'instance', pos: { x: 60, y: 0, z: -85 } },
        { id: 'cdo', title: 'CDO', type: 'instance', pos: { x: 15, y: -30, z: -80 } }
      ],
      lines: [
        ['loan_origination', 'pooling'],
        ['pooling', 'spv'],
        ['spv', 'credit_enhancement'],
        ['credit_enhancement', 'tranche_structuring'],
        ['tranche_structuring', 'rmbs'],
        ['tranche_structuring', 'cmbs'],
        ['tranche_structuring', 'abs'],
        ['tranche_structuring', 'cdo']
      ]
    },
    {
      id: 'domain_corp_fin',
      name: 'Corporate Finance',
      color: '#B4C6FF', // Soft ice blue
      position: { x: -80, y: 45, z: -120 },
      brightness: 1.8,
      nodes: [
        { id: 'tvm', title: 'Time Value of Money', type: 'concept', pos: { x: -110, y: 65, z: -130 } },
        { id: 'wacc', title: 'WACC', type: 'concept', pos: { x: -90, y: 55, z: -125 } },
        { id: 'cap_budgeting', title: 'Capital Budgeting', type: 'concept', pos: { x: -80, y: 45, z: -120 } },
        { id: 'npv', title: 'NPV & IRR', type: 'concept', pos: { x: -65, y: 30, z: -115 } },
        { id: 'dividends', title: 'Dividend Policy', type: 'concept', pos: { x: -100, y: 35, z: -125 } }
      ],
      lines: [
        ['tvm', 'wacc'],
        ['wacc', 'cap_budgeting'],
        ['cap_budgeting', 'npv'],
        ['wacc', 'dividends']
      ]
    },
    {
      id: 'domain_derivatives',
      name: 'Derivatives',
      color: '#FFDAB9', // Peach/gold
      position: { x: 80, y: 50, z: -140 },
      brightness: 1.8,
      nodes: [
        { id: 'forwards', title: 'Forwards', type: 'concept', pos: { x: 65, y: 40, z: -145 } },
        { id: 'futures', title: 'Futures', type: 'concept', pos: { x: 80, y: 50, z: -140 } },
        { id: 'options', title: 'Options', type: 'concept', pos: { x: 100, y: 65, z: -150 } },
        { id: 'swaps', title: 'Swaps', type: 'concept', pos: { x: 95, y: 35, z: -135 } },
        { id: 'greeks', title: 'The Greeks', type: 'concept', pos: { x: 120, y: 70, z: -155 } }
      ],
      lines: [
        ['forwards', 'futures'],
        ['futures', 'options'],
        ['futures', 'swaps'],
        ['options', 'greeks']
      ]
    },
    {
      id: 'domain_fixed_income',
      name: 'Fixed Income',
      color: '#E0E5EC', // Crisp stark light grey
      position: { x: -50, y: -30, z: -110 },
      brightness: 1.6,
      nodes: [
        { id: 'bond_math', title: 'Bond Math', type: 'concept', pos: { x: -70, y: -20, z: -120 } },
        { id: 'duration', title: 'Duration', type: 'concept', pos: { x: -50, y: -30, z: -110 } },
        { id: 'convexity', title: 'Convexity', type: 'concept', pos: { x: -30, y: -45, z: -100 } },
        { id: 'yield_curve', title: 'Yield Curve', type: 'concept', pos: { x: -60, y: -50, z: -115 } }
      ],
      lines: [
        ['bond_math', 'duration'],
        ['duration', 'convexity'],
        ['duration', 'yield_curve']
      ]
    },
    {
      id: 'domain_valuation',
      name: 'Valuation',
      color: '#D4E6F1', // Light sky
      position: { x: 60, y: -25, z: -130 },
      brightness: 1.7,
      nodes: [
        { id: 'dcf', title: 'DCF', type: 'concept', pos: { x: 60, y: -25, z: -130 } },
        { id: 'comps', title: 'Trading Comps', type: 'concept', pos: { x: 85, y: -15, z: -140 } },
        { id: 'precedents', title: 'Precedent Transactions', type: 'concept', pos: { x: 45, y: -10, z: -125 } },
        { id: 'lbo', title: 'LBO', type: 'concept', pos: { x: 70, y: -45, z: -135 } }
      ],
      lines: [
        ['dcf', 'comps'],
        ['dcf', 'precedents'],
        ['dcf', 'lbo']
      ]
    },
    {
      id: 'domain_macro',
      name: 'Macroeconomics',
      color: '#FDEBD0', // Soft warm yellow
      position: { x: -10, y: 70, z: -160 },
      brightness: 1.5,
      nodes: [
        { id: 'inflation', title: 'Inflation', type: 'concept', pos: { x: -30, y: 85, z: -170 } },
        { id: 'monetary', title: 'Monetary Policy', type: 'concept', pos: { x: -10, y: 70, z: -160 } },
        { id: 'fiscal', title: 'Fiscal Policy', type: 'concept', pos: { x: 10, y: 80, z: -165 } },
        { id: 'fx', title: 'Forex', type: 'concept', pos: { x: -5, y: 50, z: -155 } }
      ],
      lines: [
        ['inflation', 'monetary'],
        ['monetary', 'fiscal'],
        ['monetary', 'fx']
      ]
    }
  ]
};

fs.writeFileSync(path.join(__dirname, '../src/data/galaxyGraph.json'), JSON.stringify(data, null, 2));
console.log('Galaxy graph generated successfully!');
