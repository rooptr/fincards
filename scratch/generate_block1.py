import json
import os

cards_path = r"C:\Users\swaro\Desktop\finance-flashcards\src\data\cards.json"

# Load existing cards
with open(cards_path, "r", encoding="utf-8") as f:
    cards = json.load(f)

# Block 1 Cards: Corporate Finance (Capital Structure, WACC, Capital Budgeting)
block1 = [
    # --- Capital Structure & Optimal Leverage ---
    {
        "id": "cf_cap_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is Capital Structure?",
        "answer": "The specific mix of debt and equity used by a company to finance its overall operations and growth.",
        "explanation": "Equity represents ownership claims (higher cost, lower risk for company), while debt represents contractual borrowing obligations (lower cost due to tax shields, higher default risk for company).",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_cap_002",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain Modigliani-Miller Theorem Proposition I (No Taxes). Why is it historically significant despite its assumptions?",
        "answer": "It states that in a perfect market with no taxes, bankruptcy costs, or asymmetric information, a company's capital structure does not affect its total enterprise value.",
        "explanation": "MM Prop I proves that the value of a company is determined solely by its underlying earning power and the risk of its assets, not by how it divides that value between debt and equity. It serves as the baseline proof showing that capital structure only matters in the real world because of market imperfections (taxes, friction).",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_cap_003",
        "category": "Corporate Finance",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "How does Modigliani-Miller Proposition II change when corporate taxes are introduced? Explain the trade-off.",
        "answer": "With corporate taxes, leverage increases company value because interest payments are tax-deductible, creating a valuable tax shield that increases cash flows to investors.",
        "explanation": "According to MM Prop II with taxes, the optimal capital structure is theoretically 100% debt. In the real world, this benefit is capped by the trade-off theory: the tax shield value is eventually offset by the present value of financial distress and bankruptcy costs as leverage rises.",
        "real_world_example": "Apple historically held massive cash piles but began issuing billions in corporate debt in 2013. By raising debt rather than repatriating cash (which faced high tax rates), they optimized their capital structure and funded massive share buybacks.",
        "source_link": "https://www.reuters.com/article/us-apple-debt-idUSBRE93T13C20130430",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_cap_004",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Walk me through the Pecking Order Theory of capital structure. What does it signal to the market?",
        "answer": "Companies prioritize funding sources in this order: Internal funds (retained earnings) first, Debt second, and Equity issuance as a last resort.",
        "explanation": "This ordering is driven by asymmetric information. Managers have more information than outside investors. Issuing equity signals to the market that the stock might be overvalued, causing the share price to drop (adverse selection). Raising debt signals confidence in cash flows to meet interest payments.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_cap_005",
        "category": "Corporate Finance",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain how Agency Costs of Debt affect a firm's borrowing capacity. Contrast it with the Agency Costs of Equity.",
        "answer": "Agency costs of debt arise from conflicts of interest between shareholders (who seek high-risk, high-return projects) and debt holders (who seek principal preservation).",
        "explanation": "Under high leverage, shareholders might engage in 'asset substitution' (taking high-risk bets because if they win, they keep the upside; if they lose, lenders bear the downside) or 'underinvestment' (refusing positive NPV projects because the proceeds would go to lenders). Lenders protect themselves by charging higher interest rates or writing strict covenants, which limits the firm's borrowing capacity.",
        "source": "Finance MBA Deck"
    },

    # --- Cost of Capital (WACC) ---
    {
        "id": "cf_wacc_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the Weighted Average Cost of Capital (WACC)?",
        "answer": "The average rate of return a company is expected to pay to all its security holders, including debt, preferred stock, and common equity.",
        "explanation": "It serves as the hurdle rate or discount rate for valuing companies and projects. WACC = (E/V * Ke) + (D/V * Kd * (1 - T)), where Ke is cost of equity, Kd is cost of debt, E is equity, D is debt, V is total capital, and T is the marginal tax rate.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wacc_002",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the Capital Asset Pricing Model (CAPM)?",
        "answer": "A model that describes the relationship between systematic risk and expected return for assets, particularly stocks.",
        "explanation": "It is used to calculate the Cost of Equity (Ke). CAPM formula: Ke = Rf + Beta * (Rm - Rf), where Rf is the risk-free rate, Rm is the expected return of the market, and (Rm - Rf) is the Equity Risk Premium.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wacc_003",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "In a CAPM calculation, how do you determine the Risk-Free Rate (Rf) and what is the standard practice in corporate finance?",
        "answer": "The risk-free rate is the theoretical rate of return of an investment with zero risk, estimated using highly liquid government bonds.",
        "explanation": "Standard practice is to match the tenor of the risk-free rate with the cash flows being valued (e.g., using a 10-year US Treasury bond or a 10-year Indian Government Securities bond for long-term corporate valuations). Use nominal rates for nominal cash flows.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wacc_004",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What is the Equity Risk Premium (ERP)? How is it estimated?",
        "answer": "The excess return that investors require for holding a risky equity portfolio rather than a risk-free government bond.",
        "explanation": "ERP = Rm - Rf. It is typically estimated using historical data (averaging market returns over 30-50 years) or implied methods (reverse-engineering the current market capitalization using expected dividends). ERP typically ranges from 4% to 6% in developed markets like the US, and higher in emerging markets.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wacc_005",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Define Beta. What is the difference between an asset with a Beta of 0.8 vs. an asset with a Beta of 1.5?",
        "answer": "Beta measures the volatility or systematic risk of a security relative to the overall market.",
        "explanation": "A Beta of 1.0 moves exactly with the market. A Beta of 0.8 is defensive (moves 80% as much as the market; e.g., consumer goods, utilities). A Beta of 1.5 is aggressive (moves 150% as much as the market; e.g., tech, biotech). Negative Beta (rare) moves in the opposite direction (e.g., gold stocks in market downturns).",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wacc_006",
        "category": "Corporate Finance",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Why must you unlever and then relever Beta when performing Comparable Company Analysis to find a target's WACC?",
        "answer": "Because each peer firm has a different capital structure, which distorts their risk profile. You must remove this financial leverage noise to isolate their asset risk.",
        "explanation": "1. Peer's Levered Beta reflects both business risk and debt risk. 2. Unlevering calculates the Asset Beta (business risk only): Beta_Asset = Beta_Levered / [1 + (1 - T)*(D/E)]. 3. Relevering applies the target company's specific capital structure: Beta_Target = Beta_Asset * [1 + (1 - T_Target)*(D_Target/E_Target)].",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_wacc_007",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "What is the Tax Shield in WACC and why does it apply only to the Cost of Debt?",
        "answer": "The reduction in income taxes resulting from the tax-deductibility of interest payments. It applies only to debt because interest is paid pre-tax.",
        "explanation": "Because interest payments reduce taxable net income, the government effectively subsidizes a portion of the debt expense. Post-tax Cost of Debt = Kd * (1 - T). Dividends to equity holders are paid post-tax, so they do not generate a tax shield.",
        "source": "Finance MBA Deck"
    },

    # --- Capital Budgeting ---
    {
        "id": "cf_bud_001",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is Net Present Value (NPV)?",
        "answer": "The difference between the present value of cash inflows and the present value of cash outflows over a period of time.",
        "explanation": "It measures the dollar value created by an investment. Formula: NPV = Sum [ CF_t / (1 + r)^t ] - Initial Investment. If NPV > 0, the project creates value and should be accepted.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_bud_002",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the Internal Rate of Return (IRR)?",
        "answer": "The discount rate at which the Net Present Value (NPV) of a project's cash flows equals zero.",
        "explanation": "It represents the expected annualized rate of return on the project. If the IRR exceeds the company's hurdle rate (cost of capital), the project is economically viable and should be accepted.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_bud_003",
        "category": "Corporate Finance",
        "difficulty": "Hard",
        "card_type": "concept",
        "question": "Explain the Reinvestment Rate Assumption conflict between NPV and IRR. Which method is superior and why?",
        "answer": "NPV assumes intermediate cash flows are reinvested at the Cost of Capital, while IRR assumes they are reinvested at the IRR itself.",
        "explanation": "Reinvesting cash flows at a very high IRR (e.g., 40%) is often unrealistic, making IRR overly optimistic for highly profitable projects. NPV's assumption of reinvesting at the Cost of Capital is much more conservative and realistic. Therefore, NPV is theoretically superior and should be prioritized for decision-making.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_bud_004",
        "category": "Corporate Finance",
        "difficulty": "Easy",
        "card_type": "definition",
        "question": "What is the Profitability Index (PI)?",
        "answer": "A ratio of the present value of future cash flows to the initial investment, used to measure capital efficiency.",
        "explanation": "PI = PV of Future Cash Flows / Initial Investment. If PI > 1.0, the project is profitable (corresponds to NPV > 0). It is highly useful for ranking projects under capital rationing constraints.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_bud_005",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "framework",
        "question": "Contrast Mutually Exclusive projects with Independent projects in capital budgeting. How does this impact selection?",
        "answer": "Independent projects can be accepted simultaneously if they meet hurdle rates. Mutually exclusive projects compete, meaning accepting one automatically rejects the other.",
        "explanation": "For independent projects under no capital constraints, accept all with NPV > 0. For mutually exclusive projects, always select the project with the highest absolute NPV, even if another has a higher IRR or Profitability Index.",
        "source": "Finance MBA Deck"
    },
    {
        "id": "cf_bud_006",
        "category": "Corporate Finance",
        "difficulty": "Medium",
        "card_type": "concept",
        "question": "Explain the difference between the Payback Period and the Discounted Payback Period. What is their main limitation?",
        "answer": "Payback Period is the time required to recover the initial investment in nominal terms. Discounted Payback discounts the cash flows first to account for the time value of money.",
        "explanation": "Discounted Payback is superior because it accounts for WACC. However, both methods share a major limitation: they completely ignore all cash flows generated *after* the payback cutoff date, which can lead to rejecting highly profitable long-term projects.",
        "source": "Finance MBA Deck"
    }
]

# Append new cards
cards.extend(block1)

# Save back to file
with open(cards_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Successfully appended {len(block1)} cards. Total cards in deck: {len(cards)}")
