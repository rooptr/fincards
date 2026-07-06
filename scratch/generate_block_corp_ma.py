import json

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 1 Part 2: Working Capital, Dividend, Stock Actions, M&A, VC/Startup, Roles
block1_part2 = [
    # --- Working Capital Management ---
    {
        "id": "cf_wc_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the Cash Conversion Cycle (CCC)?",
        "answer": "The metric expressing the time (in days) it takes for a company to convert its investments in inventory and other resources into cash flows from sales.",
        "explanation": "Formula: CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO). A lower CCC indicates a more efficient, liquid company.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wc_002",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain how a company can have negative Working Capital. Is it always a sign of financial distress?",
        "answer": "Negative Working Capital occurs when Current Liabilities exceed Current Assets. It is not always distress; for efficient retail or subscription companies, it represents a source of interest-free funding.",
        "explanation": "Companies with massive buyer power (like Walmart) or cash-collecting subscription models (like Amazon) receive cash from customers instantly (low DSO/DIO) but pay suppliers much later (high DPO). This negative working capital is a sign of operational efficiency, not distress.",
        "real_world_example": "Amazon operates with negative working capital because it collects cash from customers before paying its third-party vendors, effectively using supplier credit to fund daily operations.",
        "source_link": "https://www.forbes.com/sites/greatspeculations/2019/11/12/how-does-amazons-working-capital-affect-its-valuation/",
        "source": "Finance MBA Deck"
    },

    # --- Dividend Policy ---
    {
        "id": "cf_div_001",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Contrast a Residual Dividend Policy with a Stable Dividend Policy. Which is preferred by institutional investors?",
        "answer": "Residual dividends are paid only from cash left over after all positive NPV projects are funded. Stable dividends pay a predictable amount regardless of capital budgets. Institutional investors prefer Stable dividends.",
        "explanation": "Residual dividends make payouts highly volatile, which investors hate. Stable dividends provide a steady stream of income and signal management's confidence in long-term earnings stability.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_div_002",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why would a company choose Share Buybacks over Cash Dividends to return capital to shareholders?",
        "answer": "Buybacks offer tax advantages for shareholders (capital gains vs. dividend taxes) and increase EPS by reducing the total share count, whereas dividends commit the company to recurring payouts.",
        "explanation": "Initiating a dividend creates a high market expectation of continuity; cutting a dividend causes the stock price to plunge. Buybacks are highly flexible and can be executed opportunistically when management believes the stock is undervalued.",
        "source": "Finance MBA Deck"
    },

    # --- Stock Market Issuance ---
    {
        "id": "cf_stk_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between an IPO and an OFS (Offer for Sale)?",
        "answer": "An IPO involves the company issuing new shares to raise fresh capital. An OFS is the sale of existing shares by current promoters/investors; no new capital enters the company.",
        "explanation": "IPOs dilute existing shareholders but provide growth capital. OFS does not dilute share capital but acts as an exit route for private equity backers or founders.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_stk_002",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Why does a Stock Split not change the value of the company, and why do companies do it?",
        "answer": "A stock split increases the number of shares outstanding while proportionally reducing the share price, leaving the total market capitalization unchanged. It is done to improve liquidity.",
        "explanation": "By lowering the per-share price, the stock becomes more affordable and accessible to retail investors, which increases trading volume and market liquidity without altering any underlying company fundamentals.",
        "real_world_example": "NVIDIA executed a 10-for-1 stock split in June 2024, lowering its share price from ~$1,200 to ~$120 to make stock ownership more accessible to employees and retail investors.",
        "source_link": "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2025",
        "source": "Finance MBA Deck"
    },

    # --- M&A Basics ---
    {
        "id": "cf_ma_001",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What determines if an M&A transaction is Accretive or Dilutive to the acquirer's EPS? Explain the P/E shortcut.",
        "answer": "An acquisition is accretive if the combined EPS increases post-deal. The shortcut states that if the acquirer's P/E multiple is higher than the target's P/E, a 100% stock deal is accretive.",
        "explanation": "If a high P/E company issues stock to buy a low P/E company, it gets more earnings per share issued, inflating the combined EPS (P/E arbitrage). If paid in cash, the deal is accretive if the target's earnings yield exceeds the post-tax interest lost on cash.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_ma_002",
        "category": "Corporate Finance",
        "difficulty": "Hard",
        "card_type": "framework",
        "question": "What is a Poison Pill defense? Explain how it deters hostile takeovers.",
        "answer": "A shareholder rights plan that allows existing shareholders (except the hostile bidder) to purchase additional shares at a deep discount, diluting the bidder's stake.",
        "explanation": "By flooding the market with cheap shares, the poison pill makes the acquisition prohibitively expensive for the hostile bidder and dilutes their voting control. It forces the bidder to negotiate directly with the target's board.",
        "real_world_example": "Twitter's board adopted a poison pill defense in April 2022 to block Elon Musk's unsolicited $43 billion hostile acquisition bid before eventually negotiating a deal.",
        "source_link": "https://www.nytimes.com/2022/04/15/business/twitter-poison-pill-elon-musk.html",
        "source": "Finance MBA Deck"
    },

    # --- VC & Startups ---
    {
        "id": "cf_vc_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the difference between a Startup's Burn Rate and its Runway?",
        "answer": "Burn Rate is the net rate at which a startup spends its venture capital cash reserves. Runway is the time (in months) the startup can survive before running out of money.",
        "explanation": "Runway = Current Cash / Monthly Burn Rate. If a company has $1.2M in bank and burns $100k/month, its runway is 12 months. Managing runway is the single most critical task for seed-stage CFOs.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_vc_002",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain ESOP dilution. How does it impact founders and early employees?",
        "answer": "ESOPs (Employee Stock Option Pools) set aside equity to recruit talent, diluting existing shareholders (founders and early investors) when options are created and exercised.",
        "explanation": "Founders typically set aside 10% to 15% of the company's equity for an ESOP during venture rounds. While it dilutes ownership percentages, it aligns employee incentives with company growth, increasing the absolute value of the remaining shares if successful.",
        "source": "Finance MBA Deck"
    },

    # --- Banking/PE/AM Roles ---
    {
        "id": "cf_roles_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "Contrast the Sell-Side and the Buy-Side in financial markets.",
        "answer": "The Sell-side creates, promotes, and sells financial securities and advisory services (e.g., Investment Banks). The Buy-side buys securities to invest capital (e.g., PE, Mutual Funds, Hedge Funds).",
        "explanation": "Sell-side firms earn fees from transactions and advisory. Buy-side firms invest assets under management (AUM) to generate returns and earn performance/management fees.",
        "source": "Finance MBA Deck"
    }
]

cards.extend(block1_part2)

with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended Block 1 Part 2 cards. Total cards: {len(cards)}")
