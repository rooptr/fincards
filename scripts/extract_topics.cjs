const fs = require('fs');
const path = require('path');

// 1. Read files
const cardsPath = path.join(__dirname, '../src/data/cards.json');
const taxonomyPath = 'C:\\Users\\swaro\\.gemini\\antigravity\\brain\\04694f98-2bbb-4a63-aa9e-51580a898074\\finance_taxonomy.md';

const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const taxonomyText = fs.readFileSync(taxonomyPath, 'utf8');

// 2. Parse Taxonomy to extract real topics and their domains
const domains = [
  'Corporate Finance', 'Accounting', 'Economics', 'Financial Markets', 
  'Investment Banking', 'Portfolio Management', 'Derivatives', 
  'Fixed Income', 'Risk Management', 'Financial Modeling', 
  'Behavioral Finance', 'Personal Finance'
];

// Helper to normalize domain name to one of the 12
function normalizeDomain(rawDomain) {
  const clean = rawDomain.replace(/^\d+\.\s*/, '').trim();
  if (clean.includes('Financial Statements') || clean.includes('Ratio')) return 'Accounting';
  if (clean.includes('Valuation')) return 'Investment Banking';
  if (clean.includes('Securitization')) return 'Fixed Income';
  if (clean.includes('Macroeconomics') || clean.includes('Microeconomics')) return 'Economics';
  if (clean.includes('Excel') || clean.includes('Modeling')) return 'Financial Modeling';
  if (clean.includes('Quant') || clean.includes('Guesstimate')) return 'Portfolio Management';
  if (clean.includes('Moody') || clean.includes('Oxane') || clean.includes('Industry Structure')) return 'Risk Management';
  if (clean.includes('Aptitude') || clean.includes('Logical')) return 'Behavioral Finance'; // Fallback
  
  const found = domains.find(d => clean.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(clean.toLowerCase()));
  return found || 'Corporate Finance'; // default fallback
}

const topics = [];
let currentDomain = 'Corporate Finance';

// Parse taxonomy line by line
const lines = taxonomyText.split('\n');
for (const line of lines) {
  const domainMatch = line.match(/^###\s+(.*)/);
  if (domainMatch) {
    currentDomain = normalizeDomain(domainMatch[1]);
    continue;
  }

  // Look for bold subtopics or indented bullet points
  const subtopicMatch = line.match(/^\s*[-*]\s+\*\*([^*]+)\*\*/);
  const bulletMatch = line.match(/^\s*[-*]\s+([^*]+)$/);
  
  let title = '';
  if (subtopicMatch) {
    title = subtopicMatch[1].trim();
  } else if (bulletMatch) {
    title = bulletMatch[1].trim();
  }

  if (title && title.length > 3 && !title.startsWith('PART') && !title.startsWith('Note:')) {
    // Generate clean ID
    const id = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
      .substring(0, 30);
      
    if (!topics.find(t => t.title === title || t.id === id)) {
      topics.push({
        id,
        title,
        domain: currentDomain,
        node_type: 'concept', // default, to be classified
        has_formula: false,
        short_summary: '',
        formula: '',
        source_categories: new Set()
      });
    }
  }
}

// 3. Heuristic formulas database (specific formulas for known topics)
const formulaDb = {
  'wacc': { formula: 'WACC = (E/V)*Re + (D/V)*Rd*(1-Tc)', has_formula: true },
  'capm': { formula: 'Re = Rf + Beta * (Rm - Rf)', has_formula: true },
  'modigliani_miller': { formula: 'V_L = V_U + T_c * D', has_formula: true },
  'gordon_growth': { formula: 'PV = CF1 / (r - g)', has_formula: true },
  'enterprise_value': { formula: 'EV = Equity + Debt + Preferred Stock + Non-Controlling Interest - Cash', has_formula: true },
  'dupont_decomposition': { formula: 'ROE = Profit Margin * Asset Turnover * Leverage Ratio', has_formula: true },
  'interest_coverage': { formula: 'ICR = EBIT / Interest Expense', has_formula: true },
  'cash_conversion_cycle': { formula: 'CCC = DIO + DSO - DPO', has_formula: true },
  'bond_pricing': { formula: 'P = Sum( C / (1+r)^t ) + F / (1+r)^n', has_formula: true },
  'duration': { formula: 'Modified Duration = Macaulay Duration / (1 + y/m)', has_formula: true },
  'cagr': { formula: 'CAGR = (EV/BV)^(1/n) - 1', has_formula: true }
};

// 4. Map flashcards to topics to enrich summaries, formulas, categories, and classify node_types
cards.forEach(card => {
  const textToSearch = `${card.question} ${card.answer} ${card.explanation || ''}`.toLowerCase();
  
  // Find matching topics
  topics.forEach(topic => {
    const topicWords = topic.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const matchesAll = topicWords.every(word => textToSearch.includes(word));
    
    if (matchesAll || textToSearch.includes(topic.title.toLowerCase())) {
      topic.source_categories.add(card.category);
      
      // Enrich summary if empty
      if (!topic.short_summary && card.answer && card.answer.length < 150) {
        topic.short_summary = card.answer;
      } else if (!topic.short_summary && card.explanation) {
        topic.short_summary = card.explanation.substring(0, 150) + '...';
      }

      // Check if card has a formula mentioned
      if (!topic.has_formula) {
        const formulaPatterns = [
          /formula/i, /=\s*/, /\s*\/\s*/, /\s*\*\s*/, /\s*\+\s*/, /minus/i, /plus/i, /multiplied/i, /divided/i
        ];
        const looksLikeFormula = formulaPatterns.some(p => p.test(card.answer) || (card.explanation && p.test(card.explanation)));
        if (looksLikeFormula && (card.answer.includes('=') || (card.explanation && card.explanation.includes('=')))) {
          topic.has_formula = true;
          // Extract equation string if simple
          const eqMatch = card.answer.match(/([A-Za-z0-9_\s\/*+-]+=[A-Za-z0-9_\s\/*+-]+)/) || 
                          (card.explanation && card.explanation.match(/([A-Za-z0-9_\s\/*+-]+=[A-Za-z0-9_\s\/*+-]+)/));
          if (eqMatch) {
            topic.formula = eqMatch[1].trim();
          }
        }
      }
    }
  });
});

// 5. Apply Classification Rules (node_type)
topics.forEach(topic => {
  const id = topic.id;
  const titleLower = topic.title.toLowerCase();

  // Classify based on terminology
  if (
    id.includes('rmbs') || id.includes('cmbs') || id.includes('abs') || 
    titleLower.includes('sovereign bond') || titleLower.includes('treasury bill') ||
    titleLower.includes('starbucks') || titleLower.includes('delhi airport') ||
    titleLower.includes('moody') || titleLower.includes('oxane')
  ) {
    topic.node_type = 'instance';
  } else if (
    titleLower.includes('process') || titleLower.includes('pooling') || 
    titleLower.includes('tranch') || titleLower.includes('structuring') || 
    titleLower.includes('issuance') || titleLower.includes('calculation') || 
    titleLower.includes('decomposition') || titleLower.includes('shortcut')
  ) {
    topic.node_type = 'mechanism';
  } else if (
    id.includes('cdo') || id.includes('synthetic') || 
    titleLower.includes('greeks') || titleLower.includes('black-scholes') ||
    titleLower.includes('arbitrage') || titleLower.includes('sensitivity')
  ) {
    topic.node_type = 'advanced';
  } else {
    topic.node_type = 'concept';
  }

  // Overlay manual high-quality formulas
  if (formulaDb[id]) {
    topic.has_formula = formulaDb[id].has_formula;
    topic.formula = formulaDb[id].formula;
  }

  // Convert Set back to Array for JSON output
  topic.source_categories = Array.from(topic.source_categories);
  if (topic.source_categories.length === 0) {
    topic.source_categories = [topic.domain];
  }

  // Fill in default summary if still empty
  if (!topic.short_summary) {
    topic.short_summary = `Core principles of ${topic.title} in ${topic.domain}.`;
  }
});

// Save to disk
const outputPath = path.join(__dirname, '../src/data/extractedTopics.json');
fs.writeFileSync(outputPath, JSON.stringify(topics, null, 2));

console.log(`Pipeline complete! Successfully extracted and classified ${topics.length} finance topics.`);
