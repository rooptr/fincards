import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 8: Moody's, Oxane, and Industry Structure [DEEP PRIORITY]
block8 = [
    # --- Moody's ---
    {
        "id": "moodys_001",
        "category": "Moody's",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is an NRSRO (Nationally Recognized Statistical Rating Organization)? What regulatory status does it give Moody's?",
        "answer": "A credit rating agency registered with the SEC that is permitted to issue ratings used by institutional investors for regulatory capital calculations.",
        "explanation": "Moody's is one of the primary NRSROs (along with S&P and Fitch). This designation means that bank regulations (like Basel III) mandate that banks can only hold assets with specific rating tiers from these NRSROs to reduce capital requirements.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "moodys_002",
        "category": "Moody's",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain how the Dodd-Frank Act changed credit rating agency liabilities post-2008.",
        "answer": "It stripped rating agencies of their expert exemption under the Securities Act of 1933, making them legally liable for ratings fraud or negligence.",
        "explanation": "Before Dodd-Frank, agencies defended ratings as protected 'freedom of speech' (opinions). Dodd-Frank allowed investors to sue agencies if they failed to conduct proper due diligence or exhibited conflicts of interest, significantly increasing compliance standards.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "moodys_003",
        "category": "Moody's",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Contrast Moody's Investors Service (MIS) with Moody's Analytics (MA). How do they operate separately?",
        "answer": "MIS is the credit rating agency that rates debt issues and issuers. MA is the software, data, and research provider that sells tools to credit and risk professionals.",
        "explanation": "This separation is strictly maintained to prevent conflicts of interest (so that a company cannot pay MA for advisory services to artificially inflate their MIS rating).",
        "source": "Finance MBA Deck"
    },

    # --- Oxane Partners ---
    {
        "id": "oxane_001",
        "category": "Oxane Partners",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What is Oxane Panorama, and how does it solve data problems for private credit funds?",
        "answer": "Oxane Panorama is a centralized portfolio monitoring platform that unifies data, automates covenant tracking, and provides risk reporting for bespoke private debt deals.",
        "explanation": "Unlike public bonds (which have standardized data feeds like Bloomberg), private credit involves highly customized, unstructured contracts. Oxane Panorama digitizes these workflows, acting as the single source of truth for GPs.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "oxane_002",
        "category": "Oxane Partners",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Why is independent valuation critical for private debt funds? Explain Oxane's value proposition here.",
        "answer": "Because private debt assets are illiquid and do not trade on public exchanges, requiring independent, tech-enabled valuation services to satisfy auditors and investors.",
        "explanation": "Private assets are categorized as Level 3 assets (unobservable inputs). Regulatory scrutiny (like SEC rules) forces funds to get third-party independent valuations. Oxane uses proprietary tech and credit analytics to provide audited, defensible valuations.",
        "source": "Finance MBA Deck"
    },

    # --- Industry Structure ---
    {
        "id": "ind_struct_001",
        "category": "Industry Structure",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Why has Private Credit (direct lending) grown exponentially post-2008? Explain the banking regulatory constraint.",
        "answer": "Because Basel III regulations forced traditional commercial banks to hold significantly more capital against risky corporate loans, causing them to retreat from leveraged lending.",
        "explanation": "When banks pulled back to protect their regulatory capital ratios, non-bank lenders (like Ares, Blackstone, and Blue Owl) stepped in. They raised capital from institutional investors (pensions, insurance) who wanted yield, creating the private credit direct lending market.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block8)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 8 cards. Total cards: {len(cards)}")
