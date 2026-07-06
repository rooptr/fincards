import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 5: Securitization [DEEP PRIORITY]
block5 = [
    # --- Securitization Foundations ---
    {
        "id": "sec_found_001",
        "category": "Securitization",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between a True Sale and a Synthetic Securitization?",
        "answer": "True Sale physically transfers asset ownership from the originator to the SPV, removing assets from the originator's balance sheet. Synthetic securitization uses derivatives (like CDS) to transfer credit risk without selling the assets.",
        "explanation": "True Sale isolates the assets from the bankruptcy risk of the originator. Synthetic securitizations are used by banks to hedge credit risk or manage regulatory capital requirements without disrupting customer relationships.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "sec_found_002",
        "category": "Securitization",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain the role of a Special Purpose Vehicle (SPV) in securitization. Why is the 'Bankruptcy Remote' status critical?",
        "answer": "An SPV is a separate legal entity created solely to hold the securitized asset pool. Bankruptcy remote status ensures that if the originator goes bankrupt, the SPV's assets cannot be seized by the originator's creditors.",
        "explanation": "This insulation is the foundation of structured finance. Because the assets are isolated, the SPV can issue debt that is rated strictly on the quality of the asset pool, independent of the credit rating of the originator.",
        "source": "Finance MBA Deck"
    },

    # --- Prepayment and CMOs ---
    {
        "id": "sec_rmbs_001",
        "category": "Securitization",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What is Prepayment Risk in an RMBS? How does a drop in interest rates affect investors?",
        "answer": "Prepayment risk is the risk that homeowners pay off their mortgages early (usually by refinancing). A drop in interest rates causes prepayments to spike, forcing investors to reinvest cash at lower yields.",
        "explanation": "This is known as contraction risk. When mortgage rates drop, homeowners refinance, and MBS bonds get paid off early. Investors receive their principal back sooner than expected, precisely when market reinvestment rates are at their lowest.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "sec_cmbs_001",
        "category": "Securitization",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain Extension Risk in CMBS and contrast it with Prepayment Risk.",
        "answer": "Extension risk is the risk that loans are not repaid on time (often due to refinancing failures during economic downturns), extending the bond's maturity. Prepayment risk is the opposite (early repayment).",
        "explanation": "CMBS loans usually feature large 'balloon payments' at maturity. If real estate markets crash or credit dries up, commercial borrowers cannot refinance and default on the balloon payment. This extends the life of the CMBS tranches, locking investors into low yields during rising rate periods.",
        "source": "Finance MBA Deck"
    },

    # --- Waterfalls & Enhancement ---
    {
        "id": "sec_wat_001",
        "category": "Securitization",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Explain the cash flow difference between a Sequential Pay structure and a Pro-Rata structure in a waterfall.",
        "answer": "Sequential pay applies all principal payments to the senior tranche first until it is retired, before paying junior tranches. Pro-rata pays principal proportionally to all tranches based on size.",
        "explanation": "Sequential pay offers the highest credit protection to senior investors. Pro-rata pay is riskier because it returns capital to junior tranches before senior tranches are fully paid, leaving the remaining pool with less credit protection later.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "sec_wat_002",
        "category": "Securitization",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain the difference between Subordination and Overcollateralization (OC) as credit enhancement mechanisms.",
        "answer": "Subordination creates a junior tranche to absorb losses first. Overcollateralization issues less debt than the value of the underlying collateral assets, creating a built-in cushion.",
        "explanation": "If a pool has $100M in loans but the SPV only issues $90M in bonds, it is overcollateralized by $10M. This means the pool can suffer up to $10M in defaults before the most senior bondholder suffers a loss of principal. Subordination distributes this loss protection through a tiered structure.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "sec_wat_003",
        "category": "Securitization",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "What is 'Excess Spread' in structured finance? How does it protect senior bondholders?",
        "answer": "The difference between the interest collected from the underlying loan pool and the interest paid out to the bondholders and servicing fees.",
        "explanation": "If the loan pool earns 8.0% interest and the SPV pays 5.0% interest to bondholders and 0.5% in fees, the Excess Spread is 2.5%. This cash is trapped in a reserve account first to cover any default losses in the pool before they hit the principal of the tranches.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block5)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 5 cards. Total cards: {len(cards)}")
