import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 9: General GK & Current Affairs Tracker
block9 = [
    # --- Finance GK ---
    {
        "id": "gk_reg_001",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the function of PFRDA in India?",
        "answer": "The Pension Fund Regulatory and Development Authority (PFRDA) regulates and promotes the pension sector, supervising the National Pension System (NPS).",
        "explanation": "PFRDA acts as the sole pension sector regulator in India, protecting the interests of pension fund subscribers and establishing investment guidelines for pension fund managers.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "gk_bank_001",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Define the CASA Ratio in commercial banking. Why is a high CASA ratio desirable?",
        "answer": "CASA Ratio = (Current Account + Savings Account Deposits) / Total Deposits. A high ratio is desirable because it represents a cheap source of interest-free or low-interest funding.",
        "explanation": "Current accounts pay 0% interest, and savings accounts pay very low interest (typically 3-4%). If a bank has a high CASA ratio, its cost of funds is extremely low, allowing it to generate higher Net Interest Margins (NIM) when lending at market rates.",
        "source": "Finance MBA Deck"
    },

    # --- Values Tracker (Macro rates) ---
    {
        "id": "val_track_001",
        "category": "Values Tracker",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the current RBI Repo Rate?",
        "answer": "5.25% as of July 2026.",
        "explanation": "The Repo rate is the rate at which the RBI lends money to commercial banks against government securities. It was lowered to 5.25% at the June 2026 Monetary Policy Committee (MPC) meeting.",
        "last_updated": "2026-07-06",
        "source": "Finance MBA Deck"
    },
    {
        "id": "val_track_002",
        "category": "Values Tracker",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the current target range for the US Federal Reserve Funds Rate?",
        "answer": "3.50% to 3.75% as of July 2026.",
        "explanation": "The Federal funds rate is the target interest rate at which commercial banks borrow and lend their excess reserves to each other overnight. The FOMC maintained this range at its June 2026 meeting.",
        "last_updated": "2026-07-06",
        "source": "Finance MBA Deck"
    },

    # --- Company Awareness ---
    {
        "id": "comp_aware_001",
        "category": "Company Awareness",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Name the Big Four accounting and professional services firms.",
        "answer": "Deloitte, PwC (PricewaterhouseCoopers), EY (Ernst & Young), and KPMG.",
        "explanation": "These four networks audit the vast majority of public companies globally and provide massive corporate consulting, tax, advisory, and financial transaction services.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "comp_aware_002",
        "category": "Company Awareness",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Name the domestic credit rating agencies operating in India, and identify the largest one.",
        "answer": "CRISIL, ICRA, and CARE Ratings. CRISIL is the largest credit rating agency in India.",
        "explanation": "These agencies rate local rupee-denominated corporate bonds and commercial papers. CRISIL is majority-owned by S&P Global, and ICRA is majority-owned by Moody's, reflecting the global oligopoly's local presence.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block9)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 9 cards. Total cards: {len(cards)}")
