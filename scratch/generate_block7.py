import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 7: Excel, Quant, & Guesstimates [DEEP PRIORITY (Guesstimates)]
block7 = [
    # --- Excel & Modeling ---
    {
        "id": "xl_mod_001",
        "category": "Excel & Modeling",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Explain the color-coding conventions in professional investment banking models.",
        "answer": "Blue represents hardcoded inputs (e.g., historical numbers, assumptions). Black represents formulas and calculations. Green represents links to other worksheets or external sheets.",
        "explanation": "Consistency is critical for auditing models. If an analyst buries a hardcoded number inside a black formula cell, it makes the model untraceable and prone to severe errors during sensitivity analysis.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "xl_mod_002",
        "category": "Excel & Modeling",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "What is a Circular Reference in a financial model? Provide a classic example and how to resolve it.",
        "answer": "A circular reference occurs when a formula refers to its own cell, either directly or indirectly. The classic example is calculating interest expense based on ending debt, which depends on cash flow, which is reduced by interest expense.",
        "explanation": "To resolve it: Excel's 'Iterative Calculation' settings must be enabled, or you must write a macro sweep. Circular loops are common in debt schedule modeling where interest and the cash balance feed back into each other.",
        "source": "Finance MBA Deck"
    },

    # --- Quant Formulas ---
    {
        "id": "qnt_calc_001",
        "category": "Quant / Calculations",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why is CAGR (Compound Annual Growth Rate) superior to Average Annual Growth Rate? Contrast the formulas.",
        "answer": "Average annual growth rate ignores compounding, inflating returns in volatile periods. CAGR measures the true geometric rate of return. CAGR = (Ending Value / Beginning Value)^(1/n) - 1.",
        "explanation": "If a stock goes from $100 to $50 (-50%) and then back to $100 (+100%), the average growth is (-50% + 100%) / 2 = 25%. However, you made exactly 0% profit. CAGR correctly calculates (100/100)^(1/2) - 1 = 0% return.",
        "source": "Finance MBA Deck"
    },

    # --- Guesstimates ---
    {
        "id": "gst_think_001",
        "category": "Guesstimates",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Contrast the Top-Down vs. Bottom-Up approaches in guesstimate interview questions.",
        "answer": "Top-down starts with a macro population (e.g., country population) and applies percentage filters. Bottom-up starts with a single unit (e.g., one Starbucks outlet) and scales it up.",
        "explanation": "Top-down is best for market sizing (e.g., how many smartphones are sold in India). Bottom-up is best for local revenue capacity constraints (e.g., Delhi airport Starbucks daily sales). Always explain the structure, identify constraints, and perform a sanity-check.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "gst_think_002",
        "category": "Guesstimates",
        "difficulty": "Hard",
        "card_type": "framework",
        "question": "How do you handle ambiguous or vague guesstimate prompts (e.g., 'How many tennis balls fit in a plane?')? Walk through the first 3 steps.",
        "answer": "1. Ask clarifying questions (What type of plane?). 2. Make logical assumptions (state passenger plane volume). 3. Break down the mathematical formula aloud before doing any math.",
        "explanation": "Interviewers care about your structured thinking, not the actual number. Define structural limits: subtract passenger seats/luggage volume to find empty volume, estimate ball volume including packing efficiency (typically ~70%), and sanity-check your order of magnitude.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block7)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 7 cards. Total cards: {len(cards)}")
