import json
import uuid

cards = [
    # 1. Valuation (DEEP)
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "VALUATION",
        "question": "Walk me through the difference in calculating Terminal Value using the Gordon Growth Method vs. the Exit Multiple Method. When would you use one over the other?",
        "answer": "Gordon Growth assumes cash flows grow at a constant rate perpetually (TV = FCF_n * (1+g) / (WACC - g)). Exit Multiple assumes the business is sold at the end of the forecast period based on a peer multiple (e.g., EV/EBITDA).",
        "explanation": "Use Gordon Growth for mature companies with stable, predictable growth (like utilities). Use Exit Multiple for cyclical companies, PE buyouts, or when peer transaction data is highly relevant.",
        "source": "Core Deck"
    },
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "VALUATION",
        "question": "If you are valuing a company using Precedent Transactions, why do the multiples typically come out higher than Comparable Company Analysis?",
        "answer": "Precedent transactions include a 'Control Premium'.",
        "explanation": "When acquiring a company, buyers pay a premium over the current share price to gain majority control and access synergies. Comps trade on minority stakes, which lack this premium.",
        "source": "Core Deck"
    },
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "VALUATION",
        "question": "What happens to the Enterprise Value if you issue $100 in Debt to buy $100 in Equipment?",
        "answer": "Enterprise Value does not change.",
        "explanation": "EV = Equity + Debt - Cash. Debt increases by $100, but the equipment generates future operating value. EV is capital structure neutral, meaning raising debt to buy an operating asset just shifts the claims, but doesn't instantly change the core Enterprise Value.",
        "source": "Core Deck"
    },
    # 2. Credit Ratios (DEEP)
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "CREDIT RATIOS",
        "question": "Why do credit rating agencies look closely at FFO/Debt (Funds From Operations to Debt) instead of just Net Income to Debt?",
        "answer": "FFO is a better proxy for recurring operating cash flow because it excludes non-cash items (Depreciation) and one-time gains/losses.",
        "explanation": "Net Income is distorted by accounting policies. FFO measures the actual cash a company generates from core operations to service its debt burden. A high FFO/Debt ratio implies strong cash generation relative to leverage.",
        "source": "Core Deck"
    },
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "CREDIT RATIOS",
        "question": "Define the Interest Coverage Ratio (ICR). What does a ratio of 1.5x imply for a highly leveraged firm?",
        "answer": "ICR = EBIT or EBITDA / Interest Expense. 1.5x implies a dangerously thin cushion.",
        "explanation": "A 1.5x ratio means the company only generates $1.50 in earnings for every $1.00 of interest owed. Any slight downturn in revenue could cause a default. Credit investors typically look for >3.0x for comfort.",
        "source": "Core Deck"
    },
    # 4. Fixed Income & Credit
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "FIXED INCOME",
        "question": "Explain the concept of Bond Convexity and why fixed-income investors care about it.",
        "answer": "Convexity measures the curvature in the relationship between bond prices and yields.",
        "explanation": "Duration assumes a linear price-yield relationship, which is inaccurate for large rate changes. Positive convexity means a bond's price will rise more when yields drop than it will fall when yields rise. Investors love positive convexity.",
        "source": "Core Deck"
    },
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "FIXED INCOME",
        "question": "What is the difference between a Covenant-Lite Loan and a traditional syndicated leveraged loan?",
        "answer": "Cov-lite loans lack maintenance covenants (financial tests the borrower must pass quarterly) and only have incurrence covenants.",
        "explanation": "This gives the borrower massive flexibility and prevents technical defaults, shifting risk to the lender. Cov-lite dominates the modern private credit and leveraged loan markets.",
        "source": "Core Deck"
    },
    # 5. Securitization
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "SECURITIZATION",
        "question": "In a CMBS (Commercial Mortgage-Backed Security), what is 'Defeasance'?",
        "answer": "A mechanism to prepay the loan by replacing the real estate collateral with a portfolio of government bonds.",
        "explanation": "Since CMBS investors hate prepayment risk (it messes up their yield), borrowers can't just pay off the loan early. Defeasance forces the borrower to buy Treasuries that replicate the exact cash flows of the loan, protecting the bondholders' yield.",
        "source": "Core Deck"
    },
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "SECURITIZATION",
        "question": "Explain how the 'Waterfall' structure provides credit enhancement in an ABS transaction.",
        "answer": "It dictates the strict priority of cash flows: senior tranches get paid interest and principal first before junior tranches get anything.",
        "explanation": "If the underlying pool of loans suffers losses, the equity/junior tranches absorb the losses first. This subordination allows the Senior tranche to achieve an AAA rating even if the underlying loans are subprime.",
        "source": "Core Deck"
    },
    # 9. Guesstimates (DEEP)
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "GUESSTIMATES",
        "question": "Guesstimate: What is the total daily revenue of the Starbucks in Terminal 3 of Delhi Airport? (Structure your approach)",
        "answer": "Approach: Top-down capacity constraint model.",
        "explanation": "1. Operating hours (e.g., 24 hrs). 2. Peak vs Off-peak hours. 3. Average time to serve a customer (e.g., 2 mins). 4. Number of registers (capacity). 5. Average ticket size (₹500). Max theoretical revenue vs utilized revenue. Don't just guess numbers, explain the logical formula.",
        "source": "Core Deck"
    },
    # 10. Company Specific (Moody's & Oxane)
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "INDUSTRY: MOODY'S",
        "question": "How does Moody's business model work, and what is the 'Issuer-Pays' conflict of interest?",
        "answer": "Moody's is paid by the company issuing the debt to rate that debt, rather than being paid by the investors who rely on the rating.",
        "explanation": "This creates a massive conflict of interest (highlighted in 2008), as rating agencies might be incentivized to give higher ratings to win business from issuers (ratings shopping).",
        "source": "Core Deck"
    },
    {
        "id": "c_" + uuid.uuid4().hex[:8],
        "category": "INDUSTRY: OXANE",
        "question": "Why is 'Portfolio Monitoring-as-a-Service' becoming critical for Private Credit funds (Oxane's target market)?",
        "answer": "Private credit loans are highly bespoke, illiquid, and lack public price discovery, requiring intensive manual tracking of covenants and cash flows.",
        "explanation": "Unlike public bonds (which have CUSIPs and daily Bloomberg pricing), private credit involves bespoke Excel models and covenant testing. Oxane provides the tech layer to automate this complex monitoring for GPs.",
        "source": "Core Deck"
    }
]

# Write to src/data/cards.json
with open('C:/Users/swaro/Desktop/finance-flashcards/src/data/cards.json', 'w', encoding='utf-8') as f:
    json.dump(cards, f, indent=2)

print(f"Successfully generated {len(cards)} deep finance flashcards.")
