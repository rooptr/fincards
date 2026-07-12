const fs = require('fs');
const path = require('path');

const nodes = {
  // Roots (Foundations)
  loan_origination: {
    id: 'loan_origination',
    title: 'Loan Origination',
    subtitle: 'Asset Creation',
    short_summary: 'The process by which a borrower applies for a new loan, and a lender processes, underwrites, and services it. These loans serve as the raw materials for securitization.',
    node_type: 'concept',
    tier: 1,
    prerequisite_ids: [],
    leads_to_ids: ['pooling'],
    x: 400,
    y: 580
  },
  pooling: {
    id: 'pooling',
    title: 'Asset Pooling',
    subtitle: 'Aggregation',
    short_summary: 'The collection and combining of multiple individual financial assets (loans, leases, receivables) into a single portfolio to achieve diversification and scale.',
    node_type: 'concept',
    tier: 1,
    prerequisite_ids: ['loan_origination'],
    leads_to_ids: ['spv'],
    x: 600,
    y: 580
  },

  // Trunk (Mechanisms)
  spv: {
    id: 'spv',
    title: 'Special Purpose Vehicle (SPV)',
    subtitle: 'Legal Shield',
    short_summary: 'A distinct legal entity (usually a trust or corporation) created solely to isolate financial risk and hold the pooled assets, protecting them from parent company bankruptcy.',
    formula: 'SPV Assets = Debt Issued + Equity',
    node_type: 'mechanism',
    tier: 2,
    prerequisite_ids: ['pooling'],
    leads_to_ids: ['credit_enhancement'],
    x: 500,
    y: 450
  },
  credit_enhancement: {
    id: 'credit_enhancement',
    title: 'Credit Enhancement',
    subtitle: 'Risk Mitigation',
    short_summary: 'Techniques used to improve the credit profile of structured finance assets, such as overcollateralization, subordination, or third-party guarantees.',
    node_type: 'mechanism',
    tier: 2,
    prerequisite_ids: ['spv'],
    leads_to_ids: ['tranche_structuring'],
    x: 500,
    y: 350
  },
  tranche_structuring: {
    id: 'tranche_structuring',
    title: 'Tranche Structuring',
    subtitle: 'Risk Slicing',
    short_summary: 'The slicing of a cash-flow pool into distinct debt classes (senior, mezzanine, equity) with different priorities of payment and risk exposure.',
    node_type: 'mechanism',
    tier: 2,
    prerequisite_ids: ['credit_enhancement'],
    leads_to_ids: ['securitization'],
    x: 500,
    y: 250
  },

  // Canopy (Target & Sibling Instances)
  securitization: {
    id: 'securitization',
    title: 'Securitization',
    subtitle: 'Structured Finance Target',
    short_summary: 'The overarching process of converting illiquid asset pools into liquid interest-bearing securities sold to capital market investors.',
    node_type: 'concept',
    tier: 3,
    prerequisite_ids: ['tranche_structuring'],
    leads_to_ids: ['cdo'],
    x: 500,
    y: 150
  },
  rmbs: {
    id: 'rmbs',
    title: 'RMBS',
    subtitle: 'Residential Mortgage',
    short_summary: 'Residential Mortgage-Backed Securities. Fixed-income assets backed by cash flows from residential home mortgages.',
    node_type: 'instance',
    tier: 3,
    stage_group: 'canopy_leaves',
    prerequisite_ids: ['securitization'],
    leads_to_ids: [],
    x: 350,
    y: 120
  },
  cmbs: {
    id: 'cmbs',
    title: 'CMBS',
    subtitle: 'Commercial Mortgage',
    short_summary: 'Commercial Mortgage-Backed Securities. Debt securities backed by cash flows from commercial properties like offices or retail parks.',
    node_type: 'instance',
    tier: 3,
    stage_group: 'canopy_leaves',
    prerequisite_ids: ['securitization'],
    leads_to_ids: [],
    x: 500,
    y: 90
  },
  abs: {
    id: 'abs',
    title: 'ABS',
    subtitle: 'Asset-Backed Security',
    short_summary: 'Asset-Backed Securities. Bonds backed by non-mortgage pools, such as auto loans, credit card receivables, or student loans.',
    node_type: 'instance',
    tier: 3,
    stage_group: 'canopy_leaves',
    prerequisite_ids: ['securitization'],
    leads_to_ids: [],
    x: 650,
    y: 120
  },

  // Saplings (Leads-to / Advanced)
  cdo: {
    id: 'cdo',
    title: 'Collateralized Debt Obligation (CDO)',
    subtitle: 'Structured Derivative',
    short_summary: 'An advanced structured credit product that repackages pools of bonds, RMBS, or other debt instruments into new tranches for investors.',
    node_type: 'advanced',
    tier: 4,
    prerequisite_ids: ['securitization'],
    leads_to_ids: [],
    x: 500,
    y: 40
  },

  // Sub-roots for SPV (rendered inline on click)
  trust_law: {
    id: 'trust_law',
    title: 'Trust Law',
    subtitle: 'Legal Foundation',
    short_summary: 'The legal framework establishing fiduciary relationships where a trustee holds assets for the benefit of security holders.',
    node_type: 'concept',
    tier: 1.5,
    prerequisite_ids: [],
    leads_to_ids: ['spv'],
    x: -120, // Offset positions relative to parent node
    y: 100
  },
  true_sale: {
    id: 'true_sale',
    title: 'True Sale opinion',
    subtitle: 'Asset Transfer',
    short_summary: 'A legal opinion confirming that transfer of assets from originators to SPVs is a complete sale, not a secured loan.',
    node_type: 'concept',
    tier: 1.5,
    prerequisite_ids: [],
    leads_to_ids: ['spv'],
    x: 0,
    y: 120
  },
  bankruptcy_remoteness: {
    id: 'bankruptcy_remoteness',
    title: 'Bankruptcy Remoteness',
    subtitle: 'Entity Isolation',
    short_summary: 'Design features ensuring the SPV cannot be consolidated into the originator\'s bankruptcy estate.',
    node_type: 'mechanism',
    tier: 1.5,
    prerequisite_ids: [],
    leads_to_ids: ['spv'],
    x: 120,
    y: 100
  }
};

const lines = {
  securitization_journey: {
    id: 'securitization_journey',
    name: 'Securitization Journey',
    color: '#FF6B6B',
    stations: ['loan_origination', 'pooling', 'spv', 'credit_enhancement', 'tranche_structuring', 'securitization']
  }
};

fs.writeFileSync(path.join(__dirname, '../src/data/knowledgeGraph.json'), JSON.stringify({ nodes, lines }, null, 2));
console.log('v6 tree graph generated successfully!');
