import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 2: Financial Statements, Ratios, & Microeconomics
block2 = [
    # --- Financial Statements ---
    {
        "id": "fs_acc_001",
        "category": "Financial Statements",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the key difference between Cash Accounting and Accrual Accounting?",
        "answer": "Cash accounting recognizes revenue and expenses only when cash changes hands. Accrual accounting recognizes them when they are earned or incurred, regardless of cash movement.",
        "explanation": "Standard corporate statements use Accrual accounting. It matches revenues with the expenses incurred to generate them (Matching Principle), providing a truer picture of long-term business performance.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "fs_acc_002",
        "category": "Financial Statements",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Walk me through how a $10 increase in Depreciation cascades through the 3 Financial Statements.",
        "answer": "IS: EBIT decreases by $10. Assuming a 40% tax rate, Net Income decreases by $6. CFS: Net Income is down $6, but add back $10 Depreciation (non-cash), so CFO is up $4. BS: Cash is up $4, PP&E is down $10, which matches Retained Earnings being down $6.",
        "explanation": "This is a classic investment banking question testing statement linkage. The Net Income from the IS flows to the top of the CFS, and both the ending cash from the CFS and the adjusted asset values/retained earnings link back onto the BS.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "fs_acc_003",
        "category": "Financial Statements",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why is EBITDA often considered a flawed proxy for cash flow? Name three things it completely omits.",
        "answer": "It omits changes in Working Capital, Capital Expenditures (CapEx), and interest/tax obligations, all of which represent massive cash drains.",
        "explanation": "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is an accounting metric, not cash. A company with high EBITDA but massive CapEx requirements (like telecom) or severe collection lag (increases in working capital) can easily go bankrupt due to negative actual cash flow.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "fs_acc_004",
        "category": "Financial Statements",
        "difficulty": "Medium",
        "card_type": "definition",
        "question": "What is the difference between Free Cash Flow to Firm (FCFF) and Free Cash Flow to Equity (FCFE)?",
        "answer": "FCFF represents cash available to all capital providers (debt + equity) and is calculated before interest payments. FCFE is cash available only to shareholders and is calculated after interest payments and net debt borrowing.",
        "explanation": "FCFF = EBIT * (1 - T) + D&A - CapEx - Change in Net Working Capital. FCFE = FCFF - Interest * (1 - T) + Net Borrowing. Use WACC to discount FCFF, and Cost of Equity (Ke) to discount FCFE.",
        "source": "Finance MBA Deck"
    },

    # --- Financial Ratios ---
    {
        "id": "fs_rat_001",
        "category": "Financial Statements",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Explain the 3-Step DuPont Decomposition of Return on Equity (ROE). What does it help analysts evaluate?",
        "answer": "It breaks ROE down into Net Profit Margin (Profitability), Asset Turnover (Efficiency), and Equity Multiplier (Leverage).",
        "explanation": "Formula: ROE = (Net Income / Revenue) * (Revenue / Assets) * (Assets / Equity). It helps analysts understand *how* a company is generating its ROE: whether it has strong margins, highly utilized assets, or is simply taking on excessive leverage.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "fs_rat_002",
        "category": "Financial Statements",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why is Return on Invested Capital (ROIC) considered superior to ROE for assessing operational performance?",
        "answer": "ROIC isolates operational efficiency by comparing post-tax operating income to the total capital invested, making it neutral to capital structure choices (unlike ROE, which is inflated by leverage).",
        "explanation": "Formula: ROIC = EBIT * (1 - T) / (Debt + Equity - Cash). ROE can look spectacular if a company borrows heavily to buy back shares, even if the underlying business performance is deteriorating. ROIC strips out this debt engineering.",
        "source": "Finance MBA Deck"
    },

    # --- Microeconomics Basics ---
    {
        "id": "micro_eco_001",
        "category": "Microeconomics",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is Price Elasticity of Demand?",
        "answer": "A measure of how sensitive the quantity demanded of a good is to a change in its price.",
        "explanation": "Formula: % Change in Quantity Demanded / % Change in Price. If Elasticity > 1, demand is elastic (consumers are sensitive to price, like luxury goods). If Elasticity < 1, demand is inelastic (necessities like insulin or gasoline).",
        "source": "Finance MBA Deck"
    },
    {
        "id": "micro_eco_002",
        "category": "Microeconomics",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "State the rule for Profit Maximization. Why does a company stop producing when Marginal Cost exceeds Marginal Revenue?",
        "answer": "A firm maximizes profit by producing at the exact quantity where Marginal Revenue equals Marginal Cost (MR = MC).",
        "explanation": "If MR > MC, the firm makes additional profit on each unit sold, so it should expand production. If MC > MR, the cost of producing the next unit exceeds the revenue it brings in, which reduces total profit, so production must be capped.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "micro_eco_003",
        "category": "Microeconomics",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Contrast Oligopoly with Monopolistic Competition. Provide key characteristics of each.",
        "answer": "Oligopoly is dominated by a few large firms with high barriers to entry. Monopolistic Competition has many sellers offering slightly differentiated products with low barriers to entry.",
        "explanation": "Oligopolies (e.g., telecom networks, commercial aircraft) exhibit high strategic interdependence (pricing actions by one trigger responses). Monopolistic competition (e.g., restaurants, clothing brands) relies heavily on brand differentiation rather than pure price wars.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block2)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 2 cards. Total cards: {len(cards)}")
