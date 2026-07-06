import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 11: Massive Expansion (Aptitude, Banking GK, Regulators, and corporate giants)
expansion_cards = [
    # --- Aptitude: Time & Work ---
    {
        "id": "apt_tw_001",
        "category": "Aptitude",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the relation between individual work rate and total time taken?",
        "answer": "Work rate is inversely proportional to time taken: Rate = 1 / Time.",
        "explanation": "If a person takes 5 days to complete a task, their daily work rate is 1/5th of the project per day. When combining workers, you sum their rates, not their times.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "apt_tw_002",
        "category": "Aptitude",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "A can do a piece of work in 10 days and B in 15 days. If they work together, how long will they take?",
        "answer": "6 days.",
        "explanation": "Solve using standard LCM approach.",
        "real_world_example": "Speed Hack:\n1. Total work = LCM(10, 15) = 30 units.\n2. A's rate = 30/10 = 3 units/day.\n3. B's rate = 30/15 = 2 units/day.\n4. Together = 30 / (3 + 2) = 6 days.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "apt_tw_003",
        "category": "Aptitude",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "A is twice as efficient as B and can complete a job in 15 days less than B. How long will they take working together?",
        "answer": "10 days.",
        "explanation": "Use efficiency ratios.",
        "real_world_example": "Speed Hack:\n1. Efficiency ratio A:B = 2:1. Time ratio A:B = 1:2.\n2. Difference in time = 1 part = 15 days.\n3. So, A takes 15 days, B takes 30 days.\n4. Total work = LCM(15, 30) = 30 units.\n5. Rates: A = 2, B = 1. Together = 30 / 3 = 10 days.",
        "source": "Finance MBA Deck"
    },

    # --- Aptitude: Pipes & Cisterns ---
    {
        "id": "apt_pc_001",
        "category": "Aptitude",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Pipe A can fill a tank in 20 minutes, and Pipe B can empty it in 30 minutes. If both are opened together, how long to fill the tank?",
        "answer": "60 minutes.",
        "explanation": "Outlets represent negative work rates.",
        "real_world_example": "Speed Hack:\n1. Total Capacity = LCM(20, 30) = 60 units.\n2. Inlet A rate = +3 units/min. Outlet B rate = -2 units/min.\n3. Net rate = +1 unit/min.\n4. Time = 60 / 1 = 60 minutes.",
        "source": "Finance MBA Deck"
    },

    # --- Aptitude: Trains, Boats & Streams ---
    {
        "id": "apt_tbs_001",
        "category": "Aptitude",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "A boat travels upstream at 6 km/h and downstream at 10 km/h. Find the speed of the boat in still water and the speed of the stream.",
        "answer": "Boat: 8 km/h. Stream: 2 km/h.",
        "explanation": "Let boat speed be x, stream speed be y. Downstream = x+y, Upstream = x-y.",
        "real_world_example": "Speed Hack:\n1. Boat speed in still water = (Downstream + Upstream) / 2 = (10 + 6) / 2 = 8 km/h.\n2. Stream speed = (Downstream - Upstream) / 2 = (10 - 6) / 2 = 2 km/h.",
        "source": "Finance MBA Deck"
    },

    # --- Finance GK: Regulators ---
    {
        "id": "gk_reg_002",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is SEBI? What are its primary objectives?",
        "answer": "The Securities and Exchange Board of India. Its objectives are to protect retail investors, promote development, and regulate the securities market.",
        "explanation": "SEBI monitors stock exchanges, mutual funds, merchant bankers, and enforces measures to prevent insider trading and market manipulation.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "gk_reg_003",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the Competition Commission of India (CCI)?",
        "answer": "The regulatory body responsible for enforcing antitrust laws and preventing anti-competitive practices in the market.",
        "explanation": "CCI reviews major mergers and acquisitions to ensure they do not create monopolies or adversely affect market competition in India.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "gk_reg_004",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What are the roles of NABARD and SIDBI?",
        "answer": "NABARD regulates and finances rural credit. SIDBI regulates and provides refinancing facilities specifically to Micro, Small, and Medium Enterprises (MSMEs).",
        "explanation": "NABARD (National Bank for Agriculture and Rural Development) and SIDBI (Small Industries Development Bank of India) are specialized development banks in India.",
        "source": "Finance MBA Deck"
    },

    # --- Banking terms ---
    {
        "id": "gk_bnk_002",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is a Letter of Credit (L/C)? How does it reduce risk in international trade?",
        "answer": "A bank document guaranteeing that a buyer's payment to a seller will be received on time and for the correct amount, shifting credit risk from the buyer to the bank.",
        "explanation": "If the buyer is unable to make payment, the bank is obligated to cover the full purchase amount, protecting the foreign seller against default risk.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "gk_bnk_003",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between RTGS, NEFT, and IMPS?",
        "answer": "RTGS is for high-value real-time settlement (min 2 Lakhs). NEFT is processed in half-hourly batches. IMPS is instant 24/7 retail transfer up to 5 Lakhs.",
        "explanation": "RTGS (Real Time Gross Settlement) and NEFT (National Electronic Funds Transfer) are managed by RBI. IMPS (Immediate Payment Service) and UPI are managed by NPCI.",
        "source": "Finance MBA Deck"
    },

    # --- International Organizations ---
    {
        "id": "gk_int_001",
        "category": "Finance GK",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between the IMF and the World Bank?",
        "answer": "The IMF provides short-term loans to stabilize currencies and solve balance of payments crises. The World Bank provides long-term loans for structural development projects.",
        "explanation": "IMF focus is financial stability and macroeconomic management. World Bank focus is poverty reduction and economic development.",
        "source": "Finance MBA Deck"
    },

    # --- Market / Corporate Awareness ---
    {
        "id": "corp_aw_001",
        "category": "Company Awareness",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What does Reliance Industries do? Name its three main business segments.",
        "answer": "A massive Indian conglomerate. Its segments are Oil-to-Chemicals (O2C), Retail, and Digital Services (Jio).",
        "explanation": "Reliance is the largest company by market cap in India, led by Mukesh Ambani.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "corp_aw_002",
        "category": "Company Awareness",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Who is the parent promoter of Tata Consultancy Services (TCS)? What is their position in the Indian IT sector?",
        "answer": "Tata Group. TCS is the largest IT services exporter and the second largest company by market cap in India.",
        "explanation": "TCS is a global leader in IT consulting and digital transformation services.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "corp_aw_003",
        "category": "Company Awareness",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is Hindustan Unilever (HUL)? What sector does it lead in India?",
        "answer": "The Indian subsidiary of British giant Unilever, leading the Fast-Moving Consumer Goods (FMCG) market in India.",
        "explanation": "HUL owns iconic household brands like Surf Excel, Dove, Lifebuoy, and Knorr, serving as the benchmark for consumer sector valuations in India.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(expansion_cards)

# Ensure no duplicate card IDs
seen = set()
unique_cards = []
for c in cards:
    if c['id'] not in seen:
        seen.add(c['id'])
        unique_cards.append(c)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(unique_cards, f, indent=2, ensure_ascii=False)

print(f"Appended additional cards. Total unique cards: {len(unique_cards)}")
