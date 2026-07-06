import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 3: Valuation [DEEP PRIORITY]
block3 = [
    # --- DCF Mechanics ---
    {
        "id": "val_dcf_001",
        "category": "Valuation",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why is WACC used to discount Free Cash Flow to Firm (FCFF), while Cost of Equity is used for Free Cash Flow to Equity (FCFE)?",
        "answer": "Because FCFF belongs to both lenders and shareholders (unlevered cash flow), so it must be discounted using the blended cost of capital (WACC). FCFE belongs only to shareholders, so it is discounted at the Cost of Equity.",
        "explanation": "Discounting FCFF at WACC yields Enterprise Value. Discounting FCFE at Cost of Equity (Ke) yields Equity Value directly. Mixing these up (e.g., discounting FCFF at Ke) is a fatal valuation error.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "val_dcf_002",
        "category": "Valuation",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "How do you calculate the Perpetuity Growth Rate (g) for the Gordon Growth Method? What is the logical constraint on this number?",
        "answer": "It is estimated based on long-term GDP growth. It must be logically constrained to be lower than the long-term GDP growth rate of the country where the firm operates.",
        "explanation": "If a company's terminal growth rate (g) exceeded the GDP growth rate of the country, the company would mathematically grow larger than the entire economy over time, which is impossible. Typically, g is set between the long-term inflation rate and GDP growth (e.g., 2% to 3% in developed markets).",
        "source": "Finance MBA Deck"
    },
    {
        "id": "val_dcf_003",
        "category": "Valuation",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "What is the Mid-Year Convention in a DCF? Why does it increase a company's calculated valuation?",
        "answer": "It assumes cash flows are generated evenly throughout the year (represented at month 6), rather than entirely at the end of the year (month 12). It increases valuation because cash flows are discounted for less time.",
        "explanation": "Under the standard year-end assumption, year 1 cash flow is discounted by a full year: CF1 / (1+WACC)^1. Under mid-year convention, it is discounted by 0.5 years: CF1 / (1+WACC)^0.5. Because money is received sooner on average, the present value is higher.",
        "source": "Finance MBA Deck"
    },

    # --- Comps Analysis ---
    {
        "id": "val_comp_001",
        "category": "Valuation",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Walk me through the complete process of building a Comparable Company Analysis (Trading Comps) peer universe.",
        "answer": "1. Identify initial candidates based on industry sector. 2. Filter by financial metrics (size/revenue, growth, margins). 3. Filter by geography. 4. Gather financial data, normalize for non-recurring items, and calendarize results.",
        "explanation": "A high-quality peer set should share similar risk profiles, capital intensity, and growth drivers. If you mix high-growth software firms with slow-growth hardware providers, the multiples will skew, leading to an inaccurate valuation range.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "val_comp_002",
        "category": "Valuation",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain 'Calendarization' in Comparable Company Analysis. Why is it necessary?",
        "answer": "The process of aligning peer company financials to a common year-end date (usually December 31st) so that their multiples are directly comparable.",
        "explanation": "If Peer A has a fiscal year ending in March and Peer B ends in December, using their raw unadjusted multiples would compare different macroeconomic quarters (e.g., comparing old winter performance with newer summer performance). We calendarize by taking fractions of the current and prior fiscal years to build a clean 12-month period.",
        "source": "Finance MBA Deck"
    },

    # --- Precedent Transactions ---
    {
        "id": "val_prec_001",
        "category": "Valuation",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why do Precedent Transactions typically trade at higher multiples than Comparable Company multiples? Name the core premium type.",
        "answer": "Because precedent transactions include a 'Control Premium' and anticipated synergy values, which strategic acquirers pay to buy the entire company.",
        "explanation": "Comparable company multiples reflect public market pricing of minority shares (which lack voting control). Precedents reflect transactions where a buyer acquires 100% of the voting control, allowing them to restructure the business, access cost/revenue synergies, and command premium pricing.",
        "real_world_example": "When AbbVie acquired Allergan for $63 Billion in 2019, they paid a 45% premium over Allergan's trading share price, pricing in massive projected synergies in specialized immunology markets.",
        "source_link": "https://www.reuters.com/article/us-allergan-m-a-abbvie-idUSKCN1TQ1F5",
        "source": "Finance MBA Deck"
    },

    # --- Reconciling Valuation ---
    {
        "id": "val_recon_001",
        "category": "Valuation",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "What is a 'Football Field' chart in valuation? How is it used to advise a board of directors?",
        "answer": "A visual summary chart that shows the valuation ranges derived from different methods (DCF, Comps, Precedents, LBO, 52-week high/low) side-by-side.",
        "explanation": "It helps a board see where the valuation methods overlap. It doesn't provide a single 'correct' number, but rather a consensus range (e.g., $45 to $52 per share) to support negotiation pricing or bid structuring.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "val_sotp_001",
        "category": "Valuation",
        "difficulty": "Medium",
        "card_type": "definition",
        "question": "What is Sum-of-the-Parts (SOTP) valuation? When would you use it?",
        "answer": "A method of valuing a conglomerate by valuing each of its business units separately (using Comps or DCF) and summing them up to find the total value.",
        "explanation": "Conglomerates often trade at a 'conglomerate discount'—meaning the market values the combined entity at less than the sum of its individual parts due to inefficiency or lack of focus. SOTP reveals this hidden value, often used as justification for spin-offs.",
        "real_world_example": "General Electric (GE) executed an SOTP-justified breakup ending in 2024, spinning off its Aviation (GE Aerospace), Healthcare, and Energy (GE Vernova) units into separate, publicly traded companies to unlock massive shareholder value.",
        "source_link": "https://www.ge.com/news/press-releases/ge-completes-three-way-split-ge-aerospace-starts-trading-on-nyse",
        "source": "Finance MBA Deck"
    },
    {
        "id": "val_rebase_001",
        "category": "Valuation",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is 'Rebasing' share price performance and why is it used in peer comparison charts?",
        "answer": "The process of setting all peer share prices to a starting value of 100 on a specific date, allowing direct percentage-based performance comparison over time.",
        "explanation": "If Company A trades at $200 and Company B trades at $10, plotting their absolute share prices on one chart is useless. By rebasing both to 100 on Day 1, you can visually track which stock generated a higher percentage return over the period.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block3)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 3 cards. Total cards: {len(cards)}")
