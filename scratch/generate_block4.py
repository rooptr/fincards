import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 4: Fixed Income & Credit [DEEP PRIORITY]
block4 = [
    # --- Bond Price & Yields ---
    {
        "id": "fi_bond_001",
        "category": "Fixed Income",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between the Clean Price and the Dirty Price of a bond?",
        "answer": "Clean Price is the price of the bond excluding accrued interest. Dirty Price is the actual cash price paid by the buyer, which includes accrued interest since the last coupon payment date.",
        "explanation": "Formula: Dirty Price = Clean Price + Accrued Interest. Bonds are quoted in the market using their Clean Price to avoid pricing volatility caused by interest accumulation, but the buyer always pays the Dirty Price.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "fi_bond_002",
        "category": "Fixed Income",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain how Accrued Interest on a bond is calculated. What day-count conventions are standard?",
        "answer": "Accrued Interest is calculated as: Coupon Payment * (Days since last payment / Days in coupon period). Standard conventions are 30/360 for corporate bonds and Actual/Actual for government bonds.",
        "explanation": "If a corporate bond has an annual coupon of $60 (paid semi-annually, so $30 per period) and 90 days have elapsed since the last payment in a 180-day period under the 30/360 convention: Accrued Interest = $30 * (90/180) = $15.",
        "source": "Finance MBA Deck"
    },

    # --- Duration & Convexity ---
    {
        "id": "fi_dur_001",
        "category": "Fixed Income",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Contrast Macaulay Duration with Modified Duration. Which one measures price sensitivity directly?",
        "answer": "Macaulay Duration measures the weighted average time (in years) to receive all cash flows. Modified Duration measures the percentage change in a bond's price for a 100-basis-point change in yield, measuring sensitivity directly.",
        "explanation": "Formula: Modified Duration = Macaulay Duration / (1 + YTM/m), where m is coupon frequency. A bond with a Modified Duration of 6.0 will fall in price by approximately 6% if interest rates rise by 1.0% (100 bps).",
        "source": "Finance MBA Deck"
    },

    # --- Covenants ---
    {
        "id": "fi_cov_001",
        "category": "Fixed Income",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain the difference between a Maintenance Covenant and an Incurrence Covenant. Which is safer for credit investors?",
        "answer": "Maintenance covenants require the borrower to meet financial tests quarterly (e.g., Debt/EBITDA < 4.0x). Incurrence covenants are tested only if a specific event occurs (e.g., issuing new debt). Maintenance covenants are safer.",
        "explanation": "Maintenance covenants act as an early-warning system for bank lenders, allowing them to force renegotiations before defaults occur. Bond issuances and modern private credit leverage loans are increasingly covenant-lite (incurrence-only), which increases risk for credit investors.",
        "source": "Finance MBA Deck"
    },

    # --- Yield Curve ---
    {
        "id": "fi_yield_001",
        "category": "Fixed Income",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What is an Inverted Yield Curve? Why is it historically considered a precursor to an economic recession?",
        "answer": "An inverted yield curve occurs when short-term interest rates are higher than long-term interest rates.",
        "explanation": "Under normal conditions, long-term bonds yield more due to inflation risk (Liquidity Premium). An inversion implies that investors expect future inflation and interest rates to fall because of economic contraction. It indicates the market is pricing in a recession and central bank rate cuts.",
        "real_world_example": "The US 2-year vs. 10-year Treasury yield curve inverted in July 2022 and stayed inverted for the longest streak in history, reflecting aggressive Fed hikes and persistent market recession expectations.",
        "source_link": "https://www.reuters.com/markets/us/longest-us-yield-curve-inversion-nears-end-with-recession-still-elusive-2024-03-22/",
        "source": "Finance MBA Deck"
    },

    # --- Credit ratings ---
    {
        "id": "fi_rate_001",
        "category": "Fixed Income",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain 'Structural Subordination' and how it leads to 'Notching' between issuer and issue ratings.",
        "answer": "Structural subordination occurs when a parent holding company's debt is junior to operating subsidiary debt. Rating agencies notch parent debt lower to reflect poorer recovery prospects.",
        "explanation": "If a parent company goes bankrupt, cash flows from operating assets must pay off operating subsidiary liabilities first. The parent only gets residual value. Moody's notches the parent debt lower (usually by 1 or 2 notches, e.g., Baa1 to Baa3) relative to the subsidiary's credit rating to reflect this junior claim.",
        "source": "Finance MBA Deck"
    },

    # --- Credit ratios ---
    {
        "id": "fi_ratio_001",
        "category": "Fixed Income",
        "difficulty": "Hard",
        "card_type": "framework",
        "question": "Explain how Moody's incorporates Net Debt/EBITDA vs. gross Debt/EBITDA. Why is gross Debt/EBITDA preferred by rating agencies?",
        "answer": "Net Debt subtracts cash. Gross Debt does not. Rating agencies prefer gross Debt/EBITDA because a firm's cash pile can be spent or locked in foreign tax jurisdictions, making it unavailable during defaults.",
        "explanation": "While equity analysts prefer Net Debt/EBITDA, credit agencies are conservative. They assume that in a liquidity crisis, a company's cash will be burnt rapidly or held by subsidiaries, meaning the gross debt burden represents the true recovery claim during restructuring.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "fi_ratio_002",
        "category": "Fixed Income",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "What is the FFO/Debt (Funds From Operations to Debt) ratio benchmark for an investment-grade rating (Baa3/BBB-) in heavy manufacturing?",
        "answer": "Historically, rating agencies look for an FFO/Debt ratio exceeding 15% to 20% for investment-grade credit profiles in capital-intensive industries.",
        "explanation": "FFO measures cash generated before working capital changes. If FFO/Debt is 20%, it implies the company could theoretically pay off its entire debt burden in 5 years using operations. Anything under 10% is typically speculative grade (high-yield).",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block4)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 4 cards. Total cards: {len(cards)}")
