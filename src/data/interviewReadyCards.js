import {
  interviewReadyArchiveExpansion,
  interviewReadyGeneratedExpansion,
  interviewReadyRelatedExpansion,
} from './interviewReadyExpansion.js';

export const interviewReadyCards = [
  {
    "id": "ir_001",
    "question": "Walk through how you would assess whether a company can meet its debt obligations over the next 12 months using only a balance sheet and income statement.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Step 1: Check current ratio (Current Assets/Current Liabilities) and quick ratio for short-term liquidity. Step 2: Identify total short-term debt maturing within 12 months from the balance sheet (current portion of long-term debt + short-term borrowings). Step 3: From the income statement, calculate EBITDA and interest coverage ratio (EBITDA/Interest Expense). Step 4: Estimate free cash flow proxy: EBITDA minus estimated capex and taxes. Step 5: Compare available cash + expected operational cash flow against total debt service (interest + principal). Step 6: Check if net working capital is positive and trending stable. A company can meet obligations if projected cash generation exceeds total debt service with adequate margin.",
    "relatedIds": [
      "ir_002",
      "ir_006",
      "ir_r002"
    ]
  },
  {
    "id": "ir_002",
    "question": "A company has an EBITDA/Interest Expense ratio of 2.5x. Is this strong or weak coverage? What additional context would you need?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "2.5x interest coverage is generally considered borderline-to-weak for most industrial companies. Moody's typically expects investment-grade companies to maintain 4x+ coverage. Context needed: (1) Industry cyclicality - 2.5x might be acceptable for utilities but risky for cyclical sectors like mining. (2) Capital expenditure requirements - high mandatory capex reduces free cash flow. (3) Debt maturity profile - near-term maturities increase refinancing risk. (4) Interest rate structure - floating rate debt means coverage could deteriorate with rate hikes. (5) Revenue stability and margin trends. (6) Whether EBITDA is normalized or includes one-time items.",
    "relatedIds": [
      "ir_060",
      "ir_055",
      "ir_076",
      "ir_066"
    ]
  },
  {
    "id": "ir_003",
    "question": "Explain the difference between a secured and unsecured bond. How does this affect recovery rates in default scenarios?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "A secured bond is backed by specific collateral (assets like property, equipment, or receivables) pledged to bondholders, giving them a priority claim on those assets in default. An unsecured bond (debenture) has no specific collateral backing and relies solely on the issuer's general creditworthiness. In default, secured bondholders can seize and liquidate pledged assets, typically recovering 50-80% of face value. Unsecured bondholders stand behind secured creditors in the liquidation waterfall and typically recover 20-40%. Structural subordination also matters - if debt is at a subsidiary level with assets, holding company unsecured debt effectively ranks below. Recovery rates are tracked by rating agencies: Moody's data shows first-lien secured bonds average ~65% recovery vs ~30% for senior unsecured.",
    "relatedIds": [
      "ir_046",
      "ir_171",
      "ir_022",
      "ir_041"
    ]
  },
  {
    "id": "ir_004",
    "question": "If a company's revenue grows 20% but its gross margin shrinks from 35% to 30%, what might this signal about credit quality?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "This signals deteriorating unit economics despite top-line growth. Possible causes: (1) Revenue growth is being driven by aggressive price discounting to gain market share. (2) Input cost inflation (raw materials, labor) is outpacing pricing power. (3) Revenue mix shift toward lower-margin products/services. (4) Acquisition-driven growth incorporating lower-margin businesses. For credit quality: the 5-percentage-point margin compression means gross profit grew by only ~2.9% despite 20% revenue growth (from 35 to 36 on base 100 becoming 30% of 120 = 36). Operating leverage is negative. If fixed costs haven't been cut proportionally, EBITDA margins compress even more. Cash flow generation weakens, reducing debt service capacity. Analysts should investigate sustainability of revenue growth and whether margins are stabilizing or continuing to decline.",
    "relatedIds": [
      "ir_007",
      "ir_023",
      "ir_060",
      "ir_068"
    ]
  },
  {
    "id": "ir_005",
    "question": "Why is interest not deducted while calculating Free Cash Flow to the Firm (FCFF)?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "FCFF represents the total cash flow available to ALL capital providers - both debt holders and equity holders. Interest payments are the return paid specifically to debt holders. Since FCFF is meant to capture cash flow before any distribution to capital providers, deducting interest would double-count the cost of debt (it's already reflected in the discount rate, WACC). FCFF is discounted at WACC to arrive at Enterprise Value, which belongs to both debt and equity holders. If interest were deducted, you'd get Free Cash Flow to Equity (FCFE), which is discounted at the cost of equity to arrive at Equity Value directly. Formula: FCFF = EBIT \u00d7 (1-T) + D&A - CapEx - Change in NWC.",
    "formula": "FCFF = EBIT \u00d7 (1-T) + D&A - CapEx - \u0394NWC",
    "relatedIds": [
      "ir_070",
      "ir_048",
      "ir_006",
      "ir_031"
    ]
  },
  {
    "id": "ir_006",
    "question": "Describe the DSCR. Why is EBITDA used as the numerator?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "The Debt Service Coverage Ratio measures a company's ability to service its total debt obligations from operating cash flow. DSCR = EBITDA / (Interest Expense + Mandatory Principal Repayment). EBITDA is used because: (1) Depreciation and Amortization are non-cash charges - they don't consume actual cash, so EBIT understates cash availability. (2) EBITDA approximates core operating cash generation before capital structure decisions (interest) and tax regimes. (3) Using Net Income would understate cash available because it deducts D&A, interest (which is already in the denominator), and taxes. A DSCR of 1.0x means the company barely covers debt service. Lenders typically require 1.25x-1.50x minimum. Below 1.0x indicates the company cannot meet debt obligations from operations.",
    "formula": "DSCR = EBITDA / (Interest + Principal Amortization)",
    "relatedIds": [
      "ir_025",
      "ir_005",
      "ir_044",
      "ir_052"
    ]
  },
  {
    "id": "ir_007",
    "question": "What if EBIT or Net Income is used as numerator instead of EBITDA for DSCR?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Using EBIT as numerator deducts Depreciation & Amortization, which are non-cash expenses. This understates actual cash available for debt service since D&A doesn't require cash outflow. EBIT-based DSCR would be more conservative but less representative of true cash coverage. Using Net Income is even more problematic: (1) It deducts interest expense, which is already in the DSCR denominator - creating circular logic and double-counting. (2) It deducts taxes, but tax payments are variable and may differ from tax expense. (3) It includes below-the-line items (extraordinary gains/losses) that don't reflect recurring cash. The result: Net Income-based DSCR would give artificially lower coverage ratios and miss the core analytical purpose of measuring raw operational cash flow vs. debt service.",
    "relatedIds": [
      "ir_019",
      "ir_076",
      "ir_026",
      "ir_033"
    ]
  },
  {
    "id": "ir_008",
    "question": "What are the main types of financial ratios? List Liquidity Ratios and explain why 2:1 is the ideal current ratio.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Main types: (1) Liquidity Ratios - Current, Quick, Cash ratio. (2) Profitability Ratios - Gross margin, Operating margin, ROE, ROA. (3) Leverage/Solvency - Debt/Equity, Debt/EBITDA, Interest Coverage. (4) Efficiency/Activity - Inventory turnover, Receivables turnover, Asset turnover. (5) Market/Valuation - P/E, EV/EBITDA, P/B. Liquidity Ratios: Current Ratio = Current Assets / Current Liabilities. Quick Ratio = (Current Assets - Inventory) / Current Liabilities. Cash Ratio = Cash / Current Liabilities. The 2:1 ideal for Current Ratio originated from traditional banking practice - it implies that even if current assets lose 50% of their value in a distressed liquidation, there would still be enough to cover all current liabilities. However, the ideal varies by industry: retail and subscription businesses often operate successfully below 1.5x due to rapid cash conversion cycles.",
    "formula": "Current Ratio = Current Assets / Current Liabilities",
    "relatedIds": [
      "ir_023",
      "ir_001",
      "ir_042",
      "ir_013"
    ]
  },
  {
    "id": "ir_009",
    "question": "As an investor or credit analyst, would you consider EBITDA or Net Profit for judging a borrower's risk?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "For credit analysis, EBITDA is generally preferred over Net Profit for several reasons: (1) EBITDA strips out non-cash charges (D&A), giving a closer approximation of operating cash generation. (2) It's capital-structure neutral - not distorted by varying interest expenses, making peer comparison easier. (3) It removes tax jurisdiction differences. (4) It's less susceptible to accounting manipulation through depreciation policies. However, EBITDA has limitations: it ignores capital expenditure requirements (a company with high mandatory capex has less free cash), working capital needs, and actual tax payments. Best practice: use EBITDA for initial screening and peer comparison, but then drill into FCFF and cash conversion to assess true repayment capacity. Net Profit matters more for equity investors focused on EPS and dividend capacity.",
    "relatedIds": [
      "ir_065",
      "ir_054",
      "ir_020",
      "ir_034"
    ]
  },
  {
    "id": "ir_010",
    "question": "Which would you invest in and why: Net Income, EBIT, or EBITDA?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "This question tests understanding of metrics as investment proxies. EBITDA is preferred for investment analysis because: (1) It represents the cash-generative power of core operations before financing, tax, and accounting decisions. (2) It allows apples-to-apples comparison across companies with different capital structures, tax rates, and depreciation policies. (3) It's the basis for EV/EBITDA, the most widely used valuation multiple in M&A and credit. However, the answer depends on context: For a dividend investor, Net Income matters because dividends come from earnings after all obligations. For a lender, EBITDA (or better, FCFF) matters because debt service comes before equity returns. For a PE buyer, EBITDA is key because it determines the debt capacity and enterprise value of a target.",
    "relatedIds": [
      "ir_013",
      "ir_045",
      "ir_064",
      "ir_024"
    ]
  },
  {
    "id": "ir_011",
    "question": "Define Enterprise Value (EV). How do you calculate it from Equity Value?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Enterprise Value represents the total value of a company's core operations available to all capital providers (debt + equity). It is the theoretical takeover price. Formula: EV = Market Capitalization (Equity Value) + Total Debt + Preferred Stock + Minority Interest + Unfunded Pension Liabilities - Excess Cash & Cash Equivalents. EV = Equity Value + Net Debt + Minority Interest + Preferred Stock. EV is capital-structure neutral, making it ideal for comparing companies regardless of how they're financed. It's used in multiples like EV/EBITDA and EV/Revenue.",
    "formula": "EV = Equity Value + Total Debt + Preferred Stock + Minority Interest - Excess Cash",
    "relatedIds": [
      "ir_051",
      "ir_039",
      "ir_017",
      "ir_050"
    ]
  },
  {
    "id": "ir_012",
    "question": "Why are debt and excess cash adjusted when calculating EV? How does a company differentiate operational cash from excess cash?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Debt is added because an acquirer must either assume or repay existing debt - it represents a claim on the enterprise that equity market cap doesn't capture. Cash is subtracted because it effectively reduces the net purchase price - an acquirer gains access to the target's cash balance. Operational vs Excess Cash: Operational cash is the minimum cash needed to run daily operations (typically estimated as 2-5% of revenue, or based on the company's working capital cycle and minimum bank balance requirements). Excess cash is everything above that operating minimum - it's unencumbered cash that could be distributed to shareholders or used to pay down debt without affecting operations. Some analysts use the higher of: (a) management-stated operating cash needs, (b) industry-average cash-to-revenue ratio, (c) cash required to fund one month of operating expenses.",
    "relatedIds": [
      "ir_005",
      "ir_061",
      "ir_048",
      "ir_047"
    ]
  },
  {
    "id": "ir_013",
    "question": "What are Unfunded Pension Liabilities? Why are they included as debt in EV?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Unfunded pension liabilities represent the shortfall between a company's future pension obligations to employees (the Projected Benefit Obligation, PBO) and the fair value of assets currently set aside in the pension fund to meet those obligations. If PBO exceeds plan assets, the deficit is 'unfunded.' These are included as debt-like items in EV because: (1) They represent a contractual, legally binding obligation requiring future cash outflows. (2) Like debt, they must be serviced - the company must make catch-up contributions. (3) In an acquisition, the buyer inherits these obligations. (4) They reduce the cash available for debt service and equity returns. Under GAAP/IFRS, unfunded pension liabilities appear on the balance sheet as a long-term liability. Large unfunded pensions can significantly impact enterprise value and credit quality.",
    "relatedIds": [
      "ir_058",
      "ir_046",
      "ir_004",
      "ir_041"
    ]
  },
  {
    "id": "ir_014",
    "question": "Define Minority Interest. Why is it included in EV?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Minority Interest (Non-Controlling Interest, NCI) represents the portion of a subsidiary's equity that is NOT owned by the parent company. For example, if Company A owns 80% of Company B, the remaining 20% held by outside shareholders is the minority interest. It's included in EV because: When a parent consolidates a subsidiary, 100% of the subsidiary's revenue and EBITDA flow into the parent's consolidated income statement (not just 80%). Since EV/EBITDA uses 100% of EBITDA, the EV must also reflect 100% of the subsidiary's value. Adding minority interest ensures consistency - the EV represents the full enterprise value of all consolidated operations, even though the parent doesn't own 100% of every subsidiary. Without adding NCI, the EV/EBITDA multiple would be artificially deflated.",
    "relatedIds": [
      "ir_016",
      "ir_045",
      "ir_018",
      "ir_044"
    ]
  },
  {
    "id": "ir_015",
    "question": "Differentiate between Payback method and Discounted Payback Method.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "The Payback Period is the time required to recover the initial investment from undiscounted cash flows. It simply accumulates raw cash flows until they equal the initial outlay. Advantages: simple, intuitive, favors liquidity. Disadvantages: ignores time value of money, ignores cash flows after payback period, no profitability measure. The Discounted Payback Method addresses the TVM limitation by discounting each future cash flow at the project's required rate of return (WACC) before accumulating them. It answers: how long until the project's NPV turns positive? The discounted payback is always longer than the simple payback because discounted cash flows are smaller. Both methods share the flaw of ignoring post-payback cash flows. Neither is a substitute for NPV or IRR for investment decisions.",
    "relatedIds": [
      "ir_065",
      "ir_026",
      "ir_057",
      "ir_016"
    ]
  },
  {
    "id": "ir_016",
    "question": "What is Capital Budgeting? Name the key techniques.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Capital budgeting is the process of evaluating and selecting long-term investment projects that are expected to generate cash flows over multiple years. It determines how a firm allocates its scarce capital resources. Key techniques: (1) Net Present Value (NPV) - Sum of discounted future cash flows minus initial investment. Accept if NPV > 0. Gold standard. (2) Internal Rate of Return (IRR) - Discount rate that makes NPV = 0. Accept if IRR > WACC. (3) Payback Period - Time to recover initial investment. (4) Discounted Payback - Payback using discounted cash flows. (5) Profitability Index (PI) - PV of future cash flows / Initial investment. Accept if PI > 1. (6) Modified IRR (MIRR) - Addresses IRR's reinvestment rate assumption. NPV is theoretically superior because it directly measures value creation in dollar terms.",
    "relatedIds": [
      "ir_060",
      "ir_059",
      "ir_006",
      "ir_018"
    ]
  },
  {
    "id": "ir_017",
    "question": "Define WACC. Show CAPM formula and explain cost of debt calculation.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "WACC (Weighted Average Cost of Capital) is the blended required return across all sources of financing, weighted by their proportion in the capital structure. WACC = (E/V \u00d7 Re) + (D/V \u00d7 Rd \u00d7 (1-T)). Cost of Equity via CAPM: Re = Rf + \u03b2(Rm - Rf), where Rf = risk-free rate (10Y government bond yield), \u03b2 = systematic risk relative to market, (Rm - Rf) = equity market risk premium (typically 5-7%). Cost of Debt: Rd = yield-to-maturity on existing debt, or the interest rate a company would pay on new debt issuance today. It's tax-adjusted by (1-T) because interest expense is tax-deductible, creating a 'tax shield' that reduces the effective cost. In practice, Rd can be estimated from: credit spreads over risk-free rate based on the company's credit rating, or actual interest expense / average total debt.",
    "formula": "WACC = (E/V \u00d7 Re) + (D/V \u00d7 Rd \u00d7 (1-T)); Re = Rf + \u03b2(Rm - Rf)",
    "relatedIds": [
      "ir_011",
      "ir_010",
      "ir_058",
      "ir_044"
    ]
  },
  {
    "id": "ir_018",
    "question": "What is terminal value? DCF vs Relative Valuation - which is superior?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Terminal Value captures the value of a company beyond the explicit forecast period (typically 5-10 years) in a DCF. Two methods: (1) Gordon Growth Model: TV = FCF \u00d7 (1+g) / (WACC - g), where g = perpetual growth rate (typically 2-3%, aligned with long-term GDP/inflation). (2) Exit Multiple Method: TV = Final Year EBITDA \u00d7 Exit EV/EBITDA multiple. Terminal value typically represents 60-80% of total enterprise value, making growth rate and multiple assumptions critical. DCF vs Relative Valuation: DCF is theoretically superior because it values intrinsic cash flow generation independent of market sentiment. However, it's highly sensitive to assumptions (WACC, growth rate). Relative valuation (comps, precedent transactions) is faster and reflects market pricing but assumes the market is pricing comparable companies correctly. Best practice: use both approaches and triangulate.",
    "formula": "TV = FCF(1+g) / (WACC - g)",
    "relatedIds": [
      "ir_038",
      "ir_052",
      "ir_048",
      "ir_057"
    ]
  },
  {
    "id": "ir_019",
    "question": "What are ESOPs, share repurchases, and stock splits?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "ESOPs (Employee Stock Ownership Plans): Compensation plans granting employees rights to buy company shares at a predetermined price. They align employee interests with shareholders, create tax advantages for the company, and can be used for succession planning. Dilutive to existing shareholders. Share Repurchases (Buybacks): Company purchases its own outstanding shares from the market, reducing shares outstanding. Increases EPS (fewer shares), signals management believes stock is undervalued, returns excess cash to shareholders tax-efficiently (vs dividends). Funded by free cash flow or debt. Stock Splits: Divides existing shares into more shares (e.g., 2-for-1 split), reducing per-share price proportionally without changing market capitalization or ownership percentages. Purpose: improve trading liquidity and accessibility for retail investors. Reverse splits consolidate shares to increase per-share price.",
    "relatedIds": [
      "ir_057",
      "ir_024",
      "ir_020",
      "ir_058"
    ]
  },
  {
    "id": "ir_020",
    "question": "NPV vs IRR: Which is superior? When do they conflict?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "NPV is theoretically superior. Conflicts arise when: (1) Projects differ in scale - IRR favors smaller projects with higher percentage returns, while NPV correctly identifies larger absolute value creation. (2) Cash flow timing differs - IRR assumes reinvestment at the IRR rate, which is unrealistic for high-IRR projects; NPV assumes reinvestment at WACC, which is more realistic. (3) Non-conventional cash flows - projects with alternating positive/negative cash flows can produce multiple IRRs or no IRR. When NPV and IRR conflict, always choose the project with higher NPV because NPV directly measures wealth creation in dollar terms. IRR is useful for quick screening and comparing projects of similar scale, but should not be the sole decision criterion.",
    "relatedIds": [
      "ir_030",
      "ir_010",
      "ir_076",
      "ir_023"
    ]
  },
  {
    "id": "ir_021",
    "question": "What is the difference between CAGR and IRR?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "CAGR (Compound Annual Growth Rate) measures the smoothed annual return between two endpoints, assuming steady compounding. Formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1. It ignores intermediate cash flows. IRR (Internal Rate of Return) is the discount rate that makes the NPV of all cash flows (including intermediate inflows and outflows) equal to zero. IRR accounts for timing and magnitude of every cash flow. Example: If a bond has a 6-month IRR vs a CAGR of 10%, the 6-month IRR annualized would be (1+IRR_6m)^2 - 1. If the 6-month IRR is 5%, annualized IRR \u2248 10.25%, slightly better than CAGR of 10% due to compounding frequency. IRR is preferred for investment analysis with multiple cash flows; CAGR is simpler for comparing point-to-point growth.",
    "formula": "CAGR = (End/Begin)^(1/n) - 1",
    "relatedIds": [
      "ir_050",
      "ir_048",
      "ir_001",
      "ir_040"
    ]
  },
  {
    "id": "ir_022",
    "question": "What is Private Credit? Why is it expanding globally?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Private credit refers to non-bank lending where institutional investors (pension funds, insurance companies, private debt funds) directly provide loans to companies outside the public syndicated loan or bond markets. It's expanding due to: (1) Post-2008 bank regulatory tightening (Basel III/IV) increased capital requirements for risky lending, pushing banks to retreat from middle-market lending. (2) Speed and execution certainty - direct lenders can close deals in 2-4 weeks vs 6-12 weeks for syndicated markets. (3) Customization - bespoke loan structures tailored to borrower needs (delayed draw, PIK toggles, covenant-lite options). (4) Yield premium - private credit offers 200-400 bps spread over broadly syndicated loans, attractive in low-rate environments. (5) Growing PE/LBO activity requiring acquisition financing. Global private credit AUM exceeded $1.7 trillion in 2024.",
    "relatedIds": [
      "ir_003",
      "ir_057",
      "ir_033",
      "ir_035"
    ]
  },
  {
    "id": "ir_023",
    "question": "What is Securitization? How does it benefit banks? Who buys?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Securitization is the process of pooling illiquid financial assets (mortgages, auto loans, credit card receivables, student loans) and converting them into tradeable securities sold to investors. Process: Originator pools assets \u2192 sells to a Special Purpose Vehicle (SPV) \u2192 SPV issues tranched securities (Senior AAA, Mezzanine BBB, Equity/First Loss unrated). Benefits to banks: (1) Off-balance sheet treatment - frees regulatory capital. (2) Liquidity generation - converts illiquid loans into immediate cash. (3) Credit risk transfer - shifts default risk to investors. (4) Fee income from origination and servicing. (5) Reduced concentration risk. Buyers: Senior tranches \u2192 pension funds, insurance companies, central banks. Mezzanine \u2192 hedge funds, asset managers. Equity/first loss \u2192 originator retains (skin-in-the-game rules) or hedge funds seeking high yields.",
    "relatedIds": [
      "ir_051",
      "ir_014",
      "ir_023",
      "ir_074"
    ]
  },
  {
    "id": "ir_024",
    "question": "What is ABL? What process does a bank follow when providing a corporate loan?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Asset-Backed Lending (ABL) is a form of secured lending where the borrower pledges specific assets (accounts receivable, inventory, equipment, real estate) as collateral, with loan size determined by a borrowing base formula. Bank lending process: (1) Application and credit request from borrower. (2) Financial statement analysis - income statement, balance sheet, cash flow for 3-5 years. (3) Industry and management assessment. (4) Collateral valuation and field audit. (5) Credit scoring and risk rating. (6) Loan structuring - amount, tenor, interest rate, covenants, security package. (7) Credit committee approval. (8) Documentation and legal review. (9) Disbursement. (10) Ongoing monitoring - covenant compliance, borrowing base certificates, field audits. The borrowing base typically advances 80-85% against eligible receivables and 50-65% against eligible inventory.",
    "relatedIds": [
      "ir_029",
      "ir_054",
      "ir_011",
      "ir_014"
    ]
  },
  {
    "id": "ir_025",
    "question": "Explain SPVs, bankruptcy remoteness, and collateral insurance.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "An SPV (Special Purpose Vehicle) is a legally separate entity created specifically to hold the pooled assets in a securitization. It has no employees, no operations, and its sole purpose is to own assets and issue securities. Bankruptcy remoteness means the SPV is legally isolated from the originator - if the originator goes bankrupt, the originator's creditors cannot seize assets held by the SPV. This is achieved through: (1) True sale legal opinion confirming assets were sold, not pledged. (2) Non-petition covenants preventing SPV creditors from forcing involuntary bankruptcy. (3) Independent director requirement. Collateral insurance: The originator or servicer typically maintains insurance on the underlying collateral (e.g., hazard insurance on mortgage properties). The cost is either borne by the borrowers (built into loan terms) or by the servicer as part of servicing obligations. Force-placed insurance covers gaps when borrowers lapse on their own policies.",
    "relatedIds": [
      "ir_025",
      "ir_013",
      "ir_067",
      "ir_058"
    ]
  },
  {
    "id": "ir_026",
    "question": "What is loan servicing? What KPIs matter for consumer vs corporate pools?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Loan servicing encompasses all administrative activities related to managing a loan portfolio post-origination: collecting payments, managing escrows, sending statements, handling delinquencies, executing modifications, and managing defaults/foreclosures. Consumer credit pool KPIs: (1) 30/60/90+ day delinquency rates. (2) Roll rates (probability of moving from one delinquency bucket to the next). (3) Cumulative Net Loss rate (CNL). (4) Constant Prepayment Rate (CPR). (5) Recovery rates on defaulted loans. (6) Loss severity. Corporate credit pool KPIs: (1) Debt Service Coverage Ratio (DSCR). (2) Leverage ratio (Debt/EBITDA). (3) Covenant compliance rate. (4) Interest coverage ratio. (5) Revenue and EBITDA trends. (6) Watchlist and credit migration metrics.",
    "relatedIds": [
      "ir_060",
      "ir_023",
      "ir_042",
      "ir_036"
    ]
  },
  {
    "id": "ir_027",
    "question": "What key fields do you extract from a credit agreement to monitor covenants?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Critical fields from credit agreements/note purchase agreements: (1) Financial Covenants - maximum leverage ratio (Debt/EBITDA), minimum interest coverage, minimum fixed charge coverage, maximum capital expenditure limits, minimum liquidity/cash balance requirements. (2) Reporting Requirements - frequency of financial statement delivery, compliance certificate deadlines. (3) Events of Default - cross-default provisions, material adverse change clauses, change of control triggers. (4) Cure Periods - time allowed to remedy covenant breaches. (5) Basket Amounts - permitted debt, permitted investments, restricted payment capacity. (6) Definitions Section - how EBITDA is defined (add-backs allowed), what constitutes 'debt', pro forma adjustment rules. (7) Amendment/Waiver Provisions - voting thresholds for modifications. (8) Collateral Description - asset types, priority, perfection requirements.",
    "relatedIds": [
      "ir_020",
      "ir_075",
      "ir_023",
      "ir_034"
    ]
  },
  {
    "id": "ir_028",
    "question": "What warehouse facility metrics would you track?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Key warehouse facility metrics: (1) Borrowing Base - calculated as sum of eligible collateral \u00d7 advance rates; updated monthly or more frequently. (2) Advance Rate - percentage of collateral value the lender will fund (e.g., 85% for receivables, 50% for inventory). (3) Overcollateralization (OC) Test - collateral value must exceed outstanding debt by a set margin. Breach triggers cash trapping or early amortization. (4) Interest Coverage (IC) Test - interest income from collateral must exceed interest expense on warehouse borrowing. (5) Concentration Limits - maximum exposure to any single obligor, industry, or geography. (6) Eligibility Criteria - asset-level requirements (e.g., maximum loan-to-value, minimum credit score, maximum delinquency status). (7) Delinquency and Default Rate Triggers - facility may accelerate if portfolio performance deteriorates beyond thresholds. (8) Utilization Rate - how much of the facility is drawn.",
    "relatedIds": [
      "ir_014",
      "ir_036",
      "ir_017",
      "ir_070"
    ]
  },
  {
    "id": "ir_029",
    "question": "How do you calculate delinquency and default rates using cohort/seasoning trends?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Cohort analysis groups loans by origination period (vintage) and tracks their performance over time (months on book/seasoning). Delinquency Rate = (Outstanding Balance of Loans 30+ Days Past Due / Total Outstanding Balance) \u00d7 100. Default Rate = (Outstanding Balance of Defaulted Loans / Total Original Balance of Cohort) \u00d7 100. Seasoning curves plot delinquency/default rates against months since origination, revealing: (1) Peak default periods (most consumer loans peak at 12-24 months seasoning). (2) Vintage quality comparison - newer vintages may show faster or slower loss emergence. (3) Loss timing for cash flow modeling. Cumulative Net Loss (CNL) = Total Defaults - Total Recoveries, expressed as percentage of original pool balance. Loss curves help predict terminal losses early by comparing actual performance against expected curves from prior vintages.",
    "relatedIds": [
      "ir_005",
      "ir_020",
      "ir_012",
      "ir_021"
    ]
  },
  {
    "id": "ir_030",
    "question": "What is Bond Yield? How do interest rates impact bond prices, duration, and modified duration?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Fixed Income & Derivatives",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Bond Yield (Yield to Maturity, YTM) is the total annualized return an investor earns if holding the bond to maturity, accounting for coupon payments, face value redemption, and purchase price. Interest Rate Impact on Bond Prices: Inverse relationship - when rates rise, existing bond prices fall because newly issued bonds offer higher coupons, making older bonds less attractive. A 1% rate increase causes a ~7% price decline for a 10-year bond. Duration (Macaulay Duration): Weighted average time to receive all cash flows, measured in years. Higher duration = greater price sensitivity to rate changes. Formula: D = \u03a3[t \u00d7 PV(CFt)] / Bond Price. Modified Duration: Measures percentage price change for a 1% (100 bps) change in yield. Modified Duration = Macaulay Duration / (1 + YTM/n). Example: Modified Duration of 5 means a 1% rate increase causes approximately 5% price decline.",
    "formula": "Modified Duration = Macaulay Duration / (1 + YTM/n)",
    "relatedIds": [
      "ir_024",
      "ir_017",
      "ir_011",
      "ir_046"
    ]
  },
  {
    "id": "ir_031",
    "question": "How would you structure a hedging strategy to protect against falling collateral values or dropping interest rates?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Fixed Income & Derivatives",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Against falling collateral values: (1) Credit Default Swaps (CDS) - buy protection on the underlying assets or similar credits. (2) Total Return Swaps - exchange total return of risky assets for a fixed payment. (3) Put options on collateral indexes. (4) Overcollateralization - maintain excess collateral cushion. Against dropping interest rates (protecting floating-rate asset returns): (1) Interest Rate Floors - buy a floor that pays out when rates fall below the strike level, protecting minimum yield. (2) Interest Rate Swaps - receive fixed / pay floating to lock in a fixed return regardless of rate movements. (3) Swaptions - option to enter a swap, providing flexibility. (4) Duration matching - match asset and liability duration to immunize against rate movements. Cost-benefit analysis is critical: hedging costs reduce net returns, so the hedge ratio should balance protection with carry.",
    "relatedIds": [
      "ir_069",
      "ir_010",
      "ir_016",
      "ir_039"
    ]
  },
  {
    "id": "ir_032",
    "question": "Do you know about the 2008 Financial Crisis? What led to it? Impact on India?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Fixed Income & Derivatives",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "The 2008 crisis was triggered by the collapse of the US subprime mortgage market. Key causes: (1) Excessive subprime lending to unqualified borrowers with adjustable-rate mortgages. (2) Securitization of these mortgages into complex MBS and CDO products spread risk globally. (3) Credit rating agencies assigned AAA ratings to risky tranches. (4) Overleveraged investment banks (Lehman Brothers 30:1 leverage). (5) Inadequate regulatory oversight and capital requirements. (6) Housing bubble burst \u2192 mortgage defaults \u2192 MBS/CDO losses \u2192 bank insolvencies \u2192 global credit freeze. Impact on India: (1) FII outflows of $13B in 2008, Sensex dropped 52%. (2) Rupee depreciated 20% against USD. (3) Export sectors (IT, textiles, gems) hit by demand contraction. (4) Credit tightening - ECB borrowings dried up. (5) GDP growth slowed from 9%+ to 6.7%. (6) RBI responded with aggressive rate cuts and liquidity injections. India's relatively insulated banking system (limited subprime exposure) prevented a full-scale banking crisis.",
    "relatedIds": [
      "ir_006",
      "ir_070",
      "ir_048",
      "ir_042"
    ]
  },
  {
    "id": "ir_033",
    "question": "Walk through a basic DCF structure. How do you estimate discount rate and terminal growth rate?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "DCF Steps: (1) Project free cash flows for 5-10 years using revenue growth, margin, capex, and NWC assumptions. (2) Calculate terminal value at end of projection period. (3) Discount all cash flows to present using WACC. (4) Sum = Enterprise Value. (5) Subtract net debt to get equity value. (6) Divide by diluted shares for per-share value. Discount Rate = WACC, calculated from cost of equity (CAPM) and after-tax cost of debt, weighted by target capital structure. Terminal Growth Rate: Should not exceed long-term nominal GDP growth (typically 2-3% for developed markets, 4-5% for emerging). It represents the rate at which FCF grows in perpetuity. A rate above GDP implies the company eventually becomes larger than the economy, which is unsustainable. Sensitivity analysis on terminal growth rate and WACC is essential since TV often represents 60-80% of total EV.",
    "relatedIds": [
      "ir_054",
      "ir_025",
      "ir_069",
      "ir_015"
    ]
  },
  {
    "id": "ir_034",
    "question": "Give a scenario where the same transaction is CFO for one entity and CFI for another.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Example 1 - Automobile: For a car dealership (inventory is cars), buying and selling vehicles is the core business operation - cash flows from vehicle transactions are Cash Flow from Operations (CFO). For a manufacturing company, purchasing a car as a company vehicle is acquiring a fixed asset - the cash outflow is Cash Flow from Investing (CFI). Example 2 - Real Estate: For a real estate developer, buying land, constructing, and selling properties is operational inventory - proceeds are CFO. For a software company, purchasing an office building is a capital investment - the outflow is CFI. Example 3 - Securities: For a trading desk at an investment bank, buying and selling securities is the core business - CFO. For a manufacturing company, purchasing shares as a strategic investment is CFI. The classification depends on the entity's principal revenue-generating activity.",
    "relatedIds": [
      "ir_060",
      "ir_042",
      "ir_005",
      "ir_171"
    ]
  },
  {
    "id": "ir_035",
    "question": "Can a borrower's quick ratio be less than 1? What does it mean?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Yes, a quick ratio below 1 is common and not necessarily alarming. The quick ratio = (Cash + Short-term Investments + Accounts Receivable) / Current Liabilities. A ratio < 1 means liquid assets (excluding inventory) don't fully cover current liabilities. This is typical for: (1) Retailers like Walmart or Amazon - they operate with negative working capital cycles, collecting cash from customers before paying suppliers. (2) Subscription/SaaS companies - high deferred revenue (current liability) but strong recurring cash generation. (3) Fast-food chains and grocery stores - minimal receivables, rapid cash conversion. However, for asset-heavy borrowers (manufacturing, construction), a quick ratio < 1 indicates liquidity stress and potential inability to meet short-term obligations without selling inventory or obtaining new financing. Context matters: the quality and convertibility of current assets is more important than the ratio in isolation.",
    "formula": "Quick Ratio = (Cash + Receivables + Short-term Investments) / Current Liabilities",
    "relatedIds": [
      "ir_171",
      "ir_014",
      "ir_040",
      "ir_048"
    ]
  },
  {
    "id": "ir_036",
    "question": "Solvency ratios vs liquidity ratios - formulas for both.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Liquidity Ratios measure short-term ability to pay obligations coming due within 12 months: Current Ratio = Current Assets / Current Liabilities. Quick Ratio = (Current Assets - Inventory) / Current Liabilities. Cash Ratio = Cash & Equivalents / Current Liabilities. Operating Cash Flow Ratio = CFO / Current Liabilities. Solvency Ratios measure long-term ability to sustain operations and meet all obligations: Debt-to-Equity = Total Debt / Total Shareholders' Equity. Debt-to-Assets = Total Debt / Total Assets. Interest Coverage = EBITDA / Interest Expense. Debt-to-EBITDA = Total Debt / EBITDA (indicates years to repay debt from operations). Equity Ratio = Total Equity / Total Assets. Key difference: Liquidity = can you pay bills this year? Solvency = can you survive long-term?",
    "relatedIds": [
      "ir_025",
      "ir_065",
      "ir_074",
      "ir_060"
    ]
  },
  {
    "id": "ir_037",
    "question": "How do you value an unlisted, private middle-market target?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Valuation approaches for private companies: (1) DCF Analysis - Project FCFF using management forecasts and industry research, discount at WACC (use comparable public company betas, unlevered and relevered). Apply a private company discount (10-30%) for illiquidity. (2) Comparable Company Analysis - Select publicly traded peers, calculate EV/EBITDA, EV/Revenue, P/E multiples. Apply median or mean multiples to target's metrics. Adjust for size discount (small companies trade at lower multiples). (3) Precedent Transaction Analysis - Find recent M&A deals of similar companies. Calculate implied multiples. (4) Asset-Based Approach - For asset-heavy businesses, sum fair market value of all assets minus liabilities. Adjustments needed: normalize earnings for owner compensation, related-party transactions, one-time items. Private company valuations typically require engagement with management for quality-of-earnings data.",
    "relatedIds": [
      "ir_021",
      "ir_003",
      "ir_010",
      "ir_037"
    ]
  },
  {
    "id": "ir_038",
    "question": "Walk through adjusting historical EBITDA to establish normalized QofE.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Quality of Earnings (QofE) normalization process: Step 1: Start with reported EBITDA. Step 2: Add back non-recurring expenses - restructuring charges, litigation settlements, transaction costs, one-time severance, asset impairments, natural disaster costs. Step 3: Remove non-recurring revenue - one-time contract wins, insurance proceeds, asset sale gains. Step 4: Correct out-of-period items - expenses or revenue recorded in wrong fiscal year. Step 5: Adjust for non-cash items - excessive bad debt provisions, stock-based compensation, unrealized FX gains/losses. Step 6: Pro forma adjustments - annualize partial-year acquisitions or divestitures, normalize owner/related party compensation to market rates, adjust for recent price increases or cost savings initiatives. Step 7: Apply run-rate adjustments for contracted revenue not yet reflected. The result is a sustainable, recurring EBITDA that represents the true economic earning power of the business for transaction pricing.",
    "relatedIds": [
      "ir_047",
      "ir_035",
      "ir_059",
      "ir_010"
    ]
  },
  {
    "id": "ir_039",
    "question": "How do you identify debt-like items not formally categorized as bank loans?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Debt-like items requiring cash settlement post-close: (1) Unfunded pension liabilities - shortfall between PBO and plan assets. (2) Deferred tax liabilities (DTL) - when expected to reverse and require cash payment. (3) Accrued bonuses and deferred compensation owed to employees. (4) Restructuring reserves for announced but incomplete programs. (5) Environmental remediation liabilities. (6) Litigation reserves for probable claims. (7) Customer deposits that must be returned. (8) Capital lease obligations (now all on-balance-sheet under ASC 842). (9) Overdue trade payables beyond normal terms (stretch payables). (10) Earn-out obligations from prior acquisitions. (11) Tax liabilities from audit exposures. Verification process: Review aging schedules, reconcile general ledger to bank statements, interview management, examine footnotes to financial statements, review board minutes for undisclosed obligations.",
    "relatedIds": [
      "ir_020",
      "ir_059",
      "ir_066",
      "ir_071"
    ]
  },
  {
    "id": "ir_040",
    "question": "What is cash-free, debt-free transaction vs standard working capital adjustment?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Cash-Free Debt-Free (CFDF): The seller retains all cash on the balance sheet and pays off all outstanding debt at closing. The buyer pays a purchase price reflecting the debt-free enterprise value, receiving a company with zero financial debt and zero excess cash. The purchase price may be adjusted post-close based on actual debt and cash at closing versus estimates. Working Capital Adjustment: Ensures the target company retains sufficient operating liquidity (accounts receivable, inventory, prepayments minus accounts payable, accrued expenses) at closing. A target Net Working Capital (NWC) 'peg' is established based on historical averages (typically trailing 12-month average). If actual NWC at closing > peg, buyer pays seller the difference. If actual NWC < peg, purchase price is reduced. Most transactions use both mechanisms together: CFDF for balance sheet items plus NWC adjustment for operational adequacy.",
    "relatedIds": [
      "ir_036",
      "ir_075",
      "ir_049",
      "ir_033"
    ]
  },
  {
    "id": "ir_041",
    "question": "Hard DD vs Soft DD in cross-border M&A.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Hard Due Diligence: Quantitative, numbers-driven analysis. Financial DD (FDD) - QofE analysis, NWC assessment, debt-like items, capex analysis. Tax DD - historical tax compliance, exposure quantification, structuring opportunities. Legal DD - contract review, litigation risk, IP ownership, regulatory compliance. Commercial DD - market sizing, competitive dynamics, customer concentration. IT DD - systems assessment, cybersecurity, integration costs. Soft Due Diligence: Qualitative assessment of intangible factors. Management assessment - leadership capability, depth, succession planning. Cultural fit - corporate values alignment between acquirer and target. Employee evaluation - key person dependencies, retention risk, compensation benchmarks. Customer relationships - satisfaction levels, switching costs, stickiness. In cross-border deals, soft DD gains extra importance: cultural differences between countries, labor law variations, management communication styles, and local business practices can make or break integration success.",
    "relatedIds": [
      "ir_002",
      "ir_005",
      "ir_004",
      "ir_065"
    ]
  },
  {
    "id": "ir_042",
    "question": "Sudden NWC drop in 3 months before closing - what does it indicate? How to investigate?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "A sudden, uncharacteristic NWC decline pre-closing is a major red flag indicating potential manipulation to extract cash from the business before sale. Possible causes: (1) Accelerated receivable collections or factoring to pull forward cash. (2) Delayed inventory purchases to reduce working capital. (3) Extended payable terms / stretched supplier payments. (4) Recognized revenue earlier than normal. (5) Reduced capex or deferred maintenance. Investigation steps: (1) Compare NWC components month-by-month against 2-3 year historical trends. (2) Analyze DSO, DIO, DPO trends for anomalies. (3) Review accounts receivable aging for unusual collection patterns. (4) Check inventory purchase orders and delivery schedules. (5) Interview management about changes in purchasing or collection policies. (6) Review bank statements for unusual cash movements. (7) Examine credit terms with suppliers for recent modifications. Impact: If confirmed, the NWC peg should be adjusted upward to reflect normalized levels, effectively increasing the purchase price adjustment in the buyer's favor.",
    "relatedIds": [
      "ir_023",
      "ir_061",
      "ir_074",
      "ir_003"
    ]
  },
  {
    "id": "ir_043",
    "question": "Tax basis step-up in asset acquisition - impact on buyer's cash flows?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "In an asset acquisition, the buyer allocates the purchase price across individual assets at their fair market values, creating a 'stepped-up' tax basis. This new, higher tax basis generates increased depreciation and amortization deductions for tax purposes. Impact: (1) Higher annual D&A expense reduces taxable income. (2) Lower tax payments increase after-tax cash flow. (3) The present value of these tax savings (the 'depreciation tax shield') can be significant - typically 10-25% of the step-up amount depending on asset lives and tax rates. Example: If equipment is stepped up by $50M with a 10-year life and 25% tax rate, annual tax savings = ($50M/10) \u00d7 25% = $1.25M per year for 10 years. For intangible assets (goodwill, customer relationships), Section 197 allows 15-year amortization. Buyers pay a premium for asset deals partly because of this tax benefit.",
    "formula": "Annual Tax Shield = Step-up Amount \u00d7 (1/Asset Life) \u00d7 Tax Rate",
    "relatedIds": [
      "ir_016",
      "ir_033",
      "ir_035",
      "ir_039"
    ]
  },
  {
    "id": "ir_044",
    "question": "How would you value a customer relationship or brand intangible in PPA?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Purchase Price Allocation (PPA) requires identifying and valuing all acquired intangible assets at fair value. Customer Relationships: Valued using the Multi-Period Excess Earnings Method (MPEEM). Steps: (1) Project revenue/cash flows attributable to existing customer relationships. (2) Apply attrition rate (customer churn) to model declining contribution over time. (3) Deduct 'contributory asset charges' - returns attributable to other assets (working capital, fixed assets, workforce) used to generate revenue. (4) Discount remaining excess earnings at appropriate rate. Brand/Trademark: Typically valued using the Relief-from-Royalty method. Steps: (1) Estimate what the company would pay in royalties if it licensed the brand from a third party (based on comparable royalty rate databases like RoyaltySource). (2) Apply the royalty rate to projected revenue. (3) Tax-affect the royalty savings. (4) Discount to present value. Useful lives: Customer relationships 5-15 years; brands may have indefinite lives (no amortization, annual impairment test).",
    "relatedIds": [
      "ir_061",
      "ir_071",
      "ir_064",
      "ir_021"
    ]
  },
  {
    "id": "ir_045",
    "question": "Asset purchase vs stock purchase - when to recommend asset purchase?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Recommend asset purchase when: (1) Target has significant contingent or unknown liabilities (litigation, environmental, tax) - asset purchase allows buyer to cherry-pick assets and leave unwanted liabilities behind. (2) Tax benefits of step-up are material - significant depreciation/amortization tax shields from stepping up asset basis to fair value. (3) Target has net operating loss (NOL) carryforwards that would be limited under Section 382 in a stock deal. (4) Target has problematic contracts or relationships the buyer wants to exclude. (5) Target has significant goodwill or intangible assets that can generate amortization deductions. Recommend stock purchase when: (1) Target has valuable non-assignable contracts, licenses, or permits. (2) Target operates in a regulated industry where transferring licenses is difficult. (3) Ease of execution - no need to individually transfer every asset and contract. (4) Target has favorable tax attributes (NOLs) the buyer wants to utilize. (5) Seller demands stock deal for tax deferral.",
    "relatedIds": [
      "ir_059",
      "ir_010",
      "ir_028",
      "ir_017"
    ]
  },
  {
    "id": "ir_046",
    "question": "Merger of Equals vs Hostile Acquisition - key differences?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Merger of Equals: (1) Negotiated, consensual transaction between similar-sized companies. (2) Management of both companies involved in deal structuring. (3) Governance: shared leadership, combined board representation. (4) Integration: collaborative approach, cultural alignment emphasized. (5) Premium: minimal or no acquisition premium (exchange ratio at market parity). (6) Examples: Exxon-Mobil, Dow-DuPont. Hostile Acquisition: (1) Uninvited bid made directly to target's shareholders, bypassing the board. (2) Tactics: tender offer (direct to shareholders), proxy fight (replace board), bear hug letter. (3) Target defenses: poison pill (shareholder rights plan), white knight (preferred acquirer), crown jewel defense, staggered board, golden parachutes. (4) Premium: typically 30-50% over market price to overcome resistance. (5) Higher regulatory and antitrust scrutiny. (6) Integration risks amplified due to hostile nature - key employee departures, cultural resistance.",
    "relatedIds": [
      "ir_034",
      "ir_038",
      "ir_016",
      "ir_007"
    ]
  },
  {
    "id": "ir_047",
    "question": "Write a SQL query: average Debt/Equity ratio for Baa-rated industrials.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "SELECT AVG(f.debt_to_equity) AS avg_debt_equity FROM company_financials f INNER JOIN company_ratings r ON f.company_id = r.company_id WHERE r.rating = 'Baa' AND r.industry_sector = 'Industrial'; Key concepts: INNER JOIN matches rows where company_id exists in both tables. WHERE filters for specific rating and sector. AVG() is an aggregate function. In practice, you might also add date filters (AND r.rating_date = (SELECT MAX(rating_date) FROM company_ratings)) to use the most recent rating.",
    "formula": "SELECT AVG(metric) FROM table1 JOIN table2 ON key WHERE conditions",
    "relatedIds": [
      "ir_070",
      "ir_051",
      "ir_008",
      "ir_022"
    ]
  },
  {
    "id": "ir_048",
    "question": "SQL Joins - Left, Right, Inner. Write query with subqueries on loan tables.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "INNER JOIN: Returns only rows with matching keys in both tables. LEFT JOIN: Returns all rows from left table + matching rows from right (NULLs where no match). RIGHT JOIN: Returns all rows from right table + matching rows from left. Example with subquery: SELECT l.loan_id, l.borrower_name, l.outstanding_balance, p.total_payments FROM loans l LEFT JOIN (SELECT loan_id, SUM(payment_amount) AS total_payments FROM payments GROUP BY loan_id) p ON l.loan_id = p.loan_id WHERE l.status = 'Active' ORDER BY l.outstanding_balance DESC; This query gets all active loans with their cumulative payments. The subquery aggregates payment data before joining, which is more efficient than joining then aggregating.",
    "relatedIds": [
      "ir_038",
      "ir_008",
      "ir_019",
      "ir_028"
    ]
  },
  {
    "id": "ir_049",
    "question": "INDEX/MATCH advantages over VLOOKUP. VLOOKUP vs XLOOKUP.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "INDEX/MATCH advantages: (1) Can look up values in any direction (left, right, up, down) - VLOOKUP only looks right. (2) Doesn't break when columns are inserted/deleted - VLOOKUP uses column index numbers that shift. (3) Faster calculation speed on large datasets. (4) Can return values from multiple columns without repeating the lookup. Formula: =INDEX(return_range, MATCH(lookup_value, lookup_range, 0)). XLOOKUP (Excel 365/2021+) advantages over VLOOKUP: (1) Searches any direction. (2) Exact match is default (VLOOKUP defaults to approximate). (3) Supports wildcards and binary search. (4) Built-in error handling with if_not_found parameter. (5) Returns arrays without specifying column index. Formula: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode]).",
    "formula": "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
    "relatedIds": [
      "ir_025",
      "ir_013",
      "ir_006",
      "ir_041"
    ]
  },
  {
    "id": "ir_050",
    "question": "INDIRECT and OFFSET functions - when to use in financial models?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "INDIRECT(ref_text) converts a text string into a live cell reference. Use cases: (1) Dynamic sheet references - =INDIRECT(A1&\"!B2\") pulls from whatever sheet is named in cell A1. (2) Scenario switching - reference different scenarios (Base, Bull, Bear) by changing a single cell. (3) Building dynamic named ranges. OFFSET(reference, rows, cols, [height], [width]) returns a range offset from a starting cell. Use cases: (1) Dynamic rolling averages - =AVERAGE(OFFSET(A1, COUNT(A:A)-12, 0, 12, 1)) averages last 12 data points. (2) Dynamic chart ranges that auto-expand as data is added. (3) Creating variable-size ranges in data validation dropdowns. Warning: Both are volatile functions - they recalculate every time Excel recalculates, potentially slowing large models. Use sparingly and consider non-volatile alternatives (INDEX) where possible.",
    "formula": "=INDIRECT(ref_text); =OFFSET(ref, rows, cols, [height], [width])",
    "relatedIds": [
      "ir_066",
      "ir_044",
      "ir_024",
      "ir_009"
    ]
  },
  {
    "id": "ir_051",
    "question": "SUMPRODUCT for complex valuation calculations.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "SUMPRODUCT multiplies corresponding elements of arrays and sums the results. Formula: =SUMPRODUCT(array1, array2, ...). Financial modeling applications: (1) Weighted average calculations - =SUMPRODUCT(weights, values)/SUM(weights). Example: WACC = SUMPRODUCT(capital_weights, costs). (2) Multi-criteria conditional logic (before SUMIFS existed) - =SUMPRODUCT((criteria1_range=value1)*(criteria2_range=value2)*sum_range). (3) Weighted scoring models - =SUMPRODUCT(factor_scores, factor_weights). (4) Portfolio return calculation - =SUMPRODUCT(asset_weights, asset_returns). (5) Bond portfolio duration - =SUMPRODUCT(bond_durations, bond_values)/SUM(bond_values). SUMPRODUCT is array-formula capable without Ctrl+Shift+Enter, making it versatile for complex calculations in a single cell.",
    "formula": "=SUMPRODUCT(array1, array2)",
    "relatedIds": [
      "ir_032",
      "ir_052",
      "ir_022",
      "ir_017"
    ]
  },
  {
    "id": "ir_052",
    "question": "Excel shortcut to apply/remove filters.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Ctrl + Shift + L toggles filters on and off for the selected data range. Other essential Excel shortcuts for finance: Ctrl+1 = Format Cells. F4 = Toggle absolute/relative references ($). Alt+= = AutoSum. Ctrl+` = Show/hide formulas. Ctrl+[ = Trace precedents (navigate to source cells). F2 = Edit cell. Ctrl+Shift+~ = General number format. Ctrl+D = Fill down. Alt+E+S = Paste Special. Ctrl+Page Up/Down = Switch between sheets.",
    "relatedIds": [
      "ir_062",
      "ir_004",
      "ir_019",
      "ir_001"
    ]
  },
  {
    "id": "ir_053",
    "question": "Linear regression vs logistic regression - when to use each?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Linear Regression: Predicts a continuous numerical outcome. Model: Y = \u03b2\u2080 + \u03b2\u2081X\u2081 + \u03b2\u2082X\u2082 + \u03b5. Assumptions: linear relationship, normally distributed residuals, homoscedasticity. Use cases in finance: predicting revenue, forecasting stock prices, estimating cost functions, yield curve modeling. Logistic Regression: Predicts a binary/categorical outcome (probability between 0 and 1). Model: log(p/(1-p)) = \u03b2\u2080 + \u03b2\u2081X\u2081 + \u03b2\u2082X\u2082. Output is probability via sigmoid function. Use cases in finance: credit default prediction (default/no-default), fraud detection (fraud/legitimate), loan approval (approve/reject), customer churn prediction. Key difference: Linear regression minimizes squared errors for continuous targets; logistic regression maximizes likelihood for classification. Using linear regression for binary outcomes violates assumptions and can predict probabilities outside [0,1].",
    "formula": "Linear: Y = \u03b2\u2080 + \u03b2\u2081X; Logistic: log(p/(1-p)) = \u03b2\u2080 + \u03b2\u2081X",
    "relatedIds": [
      "ir_069",
      "ir_010",
      "ir_066",
      "ir_071"
    ]
  },
  {
    "id": "ir_054",
    "question": "How do you handle missing data? Mean imputation vs deleting records.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Missing data handling strategies: Mean/Median Imputation: Replace missing values with the column's mean or median. Advantages: preserves sample size, simple to implement. Disadvantages: reduces variance, can distort correlations between variables, assumes data is Missing Completely At Random (MCAR). Deletion (Listwise): Remove entire rows with any missing values. Advantages: preserves distributional accuracy of remaining data, maintains variable relationships. Disadvantages: reduces sample size (can be severe if missing data is widespread), biases results if data is not MCAR. Other approaches: (1) Multiple Imputation - creates multiple plausible datasets and pools results. (2) Regression Imputation - predicts missing values from other variables. (3) K-Nearest Neighbors - uses similar observations to fill gaps. (4) Forward/Backward Fill - for time series. Best practice: first understand the missing data mechanism (MCAR, MAR, MNAR), then choose the appropriate technique.",
    "relatedIds": [
      "ir_011",
      "ir_074",
      "ir_022",
      "ir_042"
    ]
  },
  {
    "id": "ir_055",
    "question": "Explain p-value and its significance in hypothesis testing.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "The p-value is the probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true. It quantifies the strength of evidence against the null hypothesis. Interpretation: p-value < 0.05 (standard threshold): Reject the null hypothesis - the result is 'statistically significant.' There is less than a 5% probability that the observed result occurred by chance. p-value > 0.05: Fail to reject the null hypothesis - insufficient evidence to claim significance. Common misconceptions: (1) p-value is NOT the probability that the null hypothesis is true. (2) Statistical significance \u2260 practical significance - a large sample can make tiny, meaningless effects 'significant.' (3) p-value depends on sample size. In finance applications: testing whether a stock's alpha is significantly different from zero, whether a trading strategy's returns are statistically significant, or whether a risk factor has a significant impact on credit default.",
    "relatedIds": [
      "ir_042",
      "ir_076",
      "ir_054",
      "ir_021"
    ]
  },
  {
    "id": "ir_056",
    "question": "Short-term financing gap: 47 receivables days + 68 inventory days - 63 payables days = ?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "The short-term financing gap (also called the Cash Conversion Cycle, CCC) is calculated as: CCC = Days Receivables + Days Inventory - Days Payables = 47 + 68 - 63 = 52 days. This means the company needs 52 days of external financing to bridge the gap between paying suppliers and receiving cash from customers. A positive CCC indicates the company must fund working capital through short-term borrowing or internal cash reserves. Strategies to reduce: (1) Accelerate collections (reduce DSO). (2) Improve inventory turnover (reduce DIO). (3) Negotiate longer payment terms with suppliers (increase DPO). Companies like Amazon operate with negative CCC (-30 days), meaning they collect cash before paying suppliers.",
    "formula": "CCC = DSO + DIO - DPO = 47 + 68 - 63 = 52 days",
    "relatedIds": [
      "ir_010",
      "ir_049",
      "ir_036",
      "ir_016"
    ]
  },
  {
    "id": "ir_057",
    "question": "Special Mention Accounts were introduced as a new asset category between which two categories?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Special Mention Accounts (SMA) were introduced by the Reserve Bank of India (RBI) as early-warning asset quality categories between Standard Assets and Sub-Standard Assets (which is the first category of Non-Performing Assets, NPAs). SMA classification: SMA-0: Principal or interest payment not overdue but signs of financial stress (e.g., deteriorating financials, delayed filings). SMA-1: Principal or interest payment overdue between 31-60 days. SMA-2: Principal or interest payment overdue between 61-90 days. Once overdue crosses 90 days, the asset is classified as NPA (Sub-Standard). Purpose: Enable early identification of stressed accounts for corrective action before they become NPAs. This classification was strengthened after the 2015 Strategic Debt Restructuring (SDR) and Prompt Corrective Action (PCA) framework reforms.",
    "relatedIds": [
      "ir_069",
      "ir_011",
      "ir_012",
      "ir_172"
    ]
  },
  {
    "id": "ir_058",
    "question": "Which type of charge is appropriate when the security is a factory?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Mortgage is the correct charge for a factory (immovable property). Types of security charges: (1) Mortgage: Charge on immovable property (land, buildings, factory premises). Transfer of interest in the property without physical delivery. Governed by Transfer of Property Act, 1882 in India. (2) Hypothecation: Charge on movable assets (plant & machinery, vehicles, inventory, receivables) where the borrower retains physical possession. (3) Pledge: Charge on movable assets where physical possession is transferred to the lender (e.g., gold, securities, goods deposited with bank). (4) Lien: Right to retain possession of goods/assets already held by the lender until a debt is paid. (5) Assignment: Transfer of right, title, and interest in an asset (commonly used for life insurance policies, book debts). For a factory: the land and building = mortgage; the plant and machinery inside = hypothecation.",
    "relatedIds": [
      "ir_033",
      "ir_017",
      "ir_171",
      "ir_005"
    ]
  },
  {
    "id": "ir_059",
    "question": "Which type of security can be used in a pledge charge?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "A pledge involves movable goods or securities where physical possession is transferred to the lender (pledgee) as security. Common pledged assets: (1) Gold jewelry and bullion - most common in retail banking. (2) Stock market securities (shares, bonds, debentures) - held in demat account with lender's lien. (3) Fixed deposits and certificates of deposit. (4) Warehouse receipts representing stored commodities (cotton, sugar, grain). (5) Government securities. Key characteristic: the lender takes constructive or actual possession. If the borrower defaults, the lender has the right to sell the pledged asset after giving reasonable notice. Unlike hypothecation, where the borrower retains possession, pledge provides stronger security because the lender controls the collateral. Governed by the Indian Contract Act, 1872 (Sections 172-179).",
    "relatedIds": [
      "ir_036",
      "ir_067",
      "ir_022",
      "ir_010"
    ]
  },
  {
    "id": "ir_060",
    "question": "Who issues a letter of credit in a trade transaction?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "The Letter of Credit (LC) is issued by the buyer's bank (also called the Issuing Bank or Opening Bank) on behalf of the buyer (applicant). The LC guarantees payment to the seller (beneficiary) upon presentation of specified shipping and trade documents proving that goods have been dispatched as per agreed terms. Parties involved: (1) Applicant (Buyer) - requests the LC. (2) Issuing Bank (Buyer's Bank) - issues the LC and guarantees payment. (3) Beneficiary (Seller) - receives the LC guarantee. (4) Advising Bank (Seller's Bank) - authenticates and forwards the LC to the seller. (5) Confirming Bank (optional) - adds its own guarantee, providing double assurance to the seller. Types: Sight LC (immediate payment), Usance LC (deferred payment), Standby LC (backup guarantee), Revolving LC (recurring shipments).",
    "relatedIds": [
      "ir_047",
      "ir_075",
      "ir_006",
      "ir_071"
    ]
  },
  {
    "id": "ir_061",
    "question": "What type of opinion does an auditor provide when it disagrees with the information or conclusions in a financial report?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "When an auditor disagrees with the conclusions or presentation in a company's financial report, they issue either a Qualified Opinion or an Adverse Opinion. Qualified Opinion: Issued when financial statements are materially misstated or insufficient evidence exists for specific items, but the issues are not pervasive - the rest of the financial statements are fairly presented. Language: 'Except for...' Adverse Opinion: Issued when the auditor concludes that misstatements are both material AND pervasive - the financial statements as a whole do not present a true and fair view. This is the most severe opinion and signals serious accounting issues. Other opinions: (1) Unqualified (Clean): No material misstatements found - statements present a true and fair view. (2) Disclaimer of Opinion: Auditor cannot form an opinion due to inability to obtain sufficient evidence (e.g., scope limitations).",
    "relatedIds": [
      "ir_008",
      "ir_042",
      "ir_021",
      "ir_023"
    ]
  },
  {
    "id": "ir_062",
    "question": "Tell me about a time you identified an error in someone else's analysis, especially a senior team member's. How did you handle it?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Answer Strategy (STAR Method): Situation: During my MBA project/internship, I was reviewing a DCF model prepared by a senior team member for client presentation. Task: Ensure accuracy of all analytical deliverables before client submission. Action: I noticed the terminal growth rate was set at 6%, significantly above the target's GDP growth rate, inflating the valuation by ~30%. Rather than flagging it publicly, I scheduled a private 10-minute conversation. I said: 'I wanted to double-check my understanding - the terminal growth rate seems higher than industry benchmarks. Could you walk me through the assumption?' This framing showed respect while surfacing the issue. The senior acknowledged it was a copy-paste error from a previous model. Result: The error was corrected, the client received accurate analysis, and the senior appreciated the diplomatic approach. I was given additional review responsibilities going forward. Key principles: (1) Verify your understanding before asserting error. (2) Private conversation, never public embarrassment. (3) Frame as a question, not accusation. (4) Focus on output quality, not blame.",
    "relatedIds": [
      "ir_064",
      "ir_017",
      "ir_067",
      "ir_003"
    ]
  },
  {
    "id": "ir_063",
    "question": "Why Moody's/Oxane/Ironsides vs an investment bank or Big 4?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Framework - show genuine understanding of the firm's unique positioning. For Moody's: 'Credit rating agencies sit at the intersection of global financial markets and corporate analysis. Unlike investment banking where you're transaction-focused and advisory, Moody's provides independent, analytical opinions that shape capital allocation globally. I'm drawn to the intellectual rigor of credit methodology, the exposure to diverse industries, and the ability to develop deep sector expertise. The analytical frameworks here - probability of default, loss given default, recovery rate modeling - are foundational to fixed income markets.' For Oxane: 'Oxane's focus on private credit and alternative assets places me at the fastest-growing segment of financial services. Unlike Big 4 audit work, here I engage with complex structured credit instruments and develop practical transaction skills.' For Ironsides: 'Transaction advisory at a specialized firm offers direct client interaction and deal exposure from day one, versus being siloed in a large Big 4 practice.'",
    "relatedIds": [
      "ir_015",
      "ir_066",
      "ir_040",
      "ir_025"
    ]
  },
  {
    "id": "ir_064",
    "question": "How do credit markets evolve with rising interest rates? Which Indian sectors face greatest default risk?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Rising interest rate impact on credit markets: (1) Increased borrowing costs compress margins for leveraged companies. (2) Floating-rate borrowers face immediate debt service pressure. (3) Refinancing risk rises - maturing debt must be rolled at higher rates. (4) Bond prices fall as yields rise, creating mark-to-market losses. (5) Credit spreads typically widen in anticipation of higher defaults. (6) Weaker credits get crowded out of capital markets first. Indian sectors at highest risk: (1) Real Estate & Construction - heavily leveraged, sensitive to mortgage rate increases and demand slowdown. (2) Infrastructure/Power - long-gestation projects with high debt loads, many at floating rates. (3) Telecom - already stressed balance sheets (AGR dues, high capex for 5G), intense competition. (4) NBFCs/Housing Finance - asset-liability mismatch, vulnerable to wholesale funding squeeze. (5) Small & Medium Enterprises (SMEs) - limited pricing power, high leverage, thin margins. (6) Airlines - fuel and forex volatility, high operating leverage.",
    "relatedIds": [
      "ir_025",
      "ir_012",
      "ir_074",
      "ir_058"
    ]
  },
  {
    "id": "ir_065",
    "question": "If you discover a material error 30 minutes before a client presentation, what steps?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "(1) Immediately assess severity and scope - is it a calculation error, data error, or methodological issue? How many outputs does it affect? (2) Alert the project lead/senior immediately - transparency is non-negotiable. Never try to fix silently. (3) If fixable in 30 minutes: Fix it, verify the correction, update all affected exhibits. Have a second person verify. (4) If NOT fixable in 30 minutes: Prepare a brief verbal disclosure for the presentation - 'We identified an item requiring additional analysis in section X. We'll provide the corrected analysis within 24 hours.' (5) Never present known incorrect analysis to a client. (6) After the presentation: conduct root-cause analysis, implement quality controls to prevent recurrence (peer review checklist, formula audit trail). Key principle: Integrity and accuracy always trump convenience. A 24-hour delay with correct analysis builds trust; presenting wrong analysis destroys credibility permanently.",
    "relatedIds": [
      "ir_024",
      "ir_012",
      "ir_071",
      "ir_033"
    ]
  },
  {
    "id": "ir_066",
    "question": "A senior stakeholder disputes your transaction analysis. How do you defend while preserving the relationship?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "(1) Listen completely before responding - understand their specific objection. (2) Acknowledge their perspective: 'I appreciate that perspective, and I can see why that interpretation is reasonable.' (3) Walk through your methodology step-by-step with supporting data: 'Let me share the assumptions and sources behind our analysis.' (4) If their challenge reveals a valid point: 'That's an excellent point. Let me re-examine this assumption and update the analysis within [timeframe].' (5) If your analysis is correct: Present corroborating evidence (comparable transactions, industry benchmarks, third-party data) without being combative. (6) Propose compromise where possible: 'We could present both scenarios - our base case and the sensitivity case reflecting your assumption.' (7) Document the discussion and follow up with a written summary. Never: become defensive, dismiss their concern, or capitulate without analytical basis. The goal is shared understanding, not winning an argument.",
    "relatedIds": [
      "ir_049",
      "ir_039",
      "ir_053",
      "ir_015"
    ]
  },
  {
    "id": "ir_067",
    "question": "How do you present complex technical analysis to a non-finance client?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "(1) Lead with the conclusion/recommendation: 'Based on our analysis, the target is fairly valued at $X, and we recommend proceeding with the following conditions...' (2) Use visual aids: charts, waterfall diagrams, and simple tables instead of spreadsheet screenshots. (3) Analogies: Compare financial concepts to everyday equivalents. 'EBITDA is like your take-home pay before you pay rent and car payments.' (4) The 'so what' bridge: After every technical point, explain the business implication. 'The 3x leverage ratio means the company is carrying 3 years of earnings in debt, which limits its ability to invest in growth.' (5) Layer complexity: Start with the executive summary, then offer appendix-level detail for those who want to drill down. (6) Anticipate questions: Prepare simple answers for likely follow-ups. (7) Test understanding: 'Does this framing make sense? Would it be helpful if I walked through the numbers differently?'",
    "relatedIds": [
      "ir_033",
      "ir_064",
      "ir_052",
      "ir_059"
    ]
  },
  {
    "id": "ir_068",
    "question": "Why did you transition from accounting/operations to transaction advisory?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "'My accounting foundation gave me the technical rigor to understand financial statements at a granular level, but I realized that audit and compliance work is backward-looking and verification-focused. Transaction advisory is where financial analysis becomes forward-looking and decision-making. In M&A advisory, you're not just verifying numbers - you're interpreting what those numbers mean for a $500M acquisition decision. I want to be in the room where strategic recommendations are made, where my analysis directly influences whether a deal closes and at what price. The combination of analytical depth from accounting plus strategic thinking in advisory is where I can create the most value.'",
    "relatedIds": [
      "ir_032",
      "ir_026",
      "ir_074",
      "ir_076"
    ]
  },
  {
    "id": "ir_069",
    "question": "If you have two ropes that burn in 60 seconds but not at the same rate, how would you figure out the 45-second mark?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Logical Puzzles",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Step 1: Light Rope A at BOTH ends and Rope B at ONE end simultaneously. Step 2: Rope A (burning from both ends) burns out in exactly 30 seconds regardless of uneven burn rate (the total burn material is consumed at 2x speed). Step 3: At the instant Rope A burns out (30 seconds elapsed), Rope B has exactly 30 seconds of burn time remaining (it has been burning from one end for 30 seconds). Step 4: Immediately light the unlit end of Rope B. Step 5: Rope B is now burning from both ends, so its remaining 30 seconds of burn material is consumed in 15 seconds. Step 6: When Rope B burns out: 30 + 15 = 45 seconds have elapsed. Key insight: Lighting from both ends halves the burn time regardless of uneven burn rate, because both ends are consuming the same fixed total material.",
    "relatedIds": [
      "ir_054",
      "ir_043",
      "ir_016",
      "ir_046"
    ]
  },
  {
    "id": "ir_070",
    "question": "If I give you a balance weighing scale and 10 balls, and one of them is heavier than the others, how will you find the heavier ball? In how many tries can you find it?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Logical Puzzles",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Minimum weighings needed: 3 (in worst case, can be done in 2 in best case). Method using trinary division: Weighing 1: Divide into groups of 3, 3, and 4. Weigh 3 vs 3. Case A: Scale balances \u2192 heavy ball is in the group of 4. Weighing 2: Take the 4 remaining balls, weigh 2 vs 2. Whichever pair is heavier contains the target ball. Weighing 3: From the heavier pair, weigh 1 vs 1. The heavier one is the answer. Case B: Scale tilts \u2192 heavy ball is in the heavier group of 3. Weighing 2: From the heavier group of 3, weigh 1 vs 1 (leave 1 aside). If scale balances, the set-aside ball is heaviest. If scale tilts, the heavier ball on the scale is the answer. Total: 3 weighings maximum. With 12 balls, the problem can still be solved in 3 weighings (information theory: 3 weighings can distinguish among 3\u00b3 = 27 outcomes).",
    "relatedIds": [
      "ir_048",
      "ir_008",
      "ir_050",
      "ir_039"
    ]
  },
  {
    "id": "ir_071",
    "question": "Explain Time Value of Money to a 12-year-old.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Logical Puzzles",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "The Chocolate Analogy: 'Imagine I offer you a choice: 10 chocolates TODAY, or 10 chocolates ONE YEAR FROM NOW. Which would you choose? Obviously today! Three reasons: (1) You can enjoy them right now instead of waiting. (2) I might forget my promise or not be around next year - there's uncertainty. (3) If each chocolate costs \u20b910 today, next year they might cost \u20b911 due to inflation - so your 10 chocolates next year are actually worth less. Now, what if I offered you 12 chocolates next year instead? You might think about it, because the extra 2 chocolates compensate you for waiting. That extra amount (the 2 chocolates) is like interest - it's the reward for being patient with your money. Banks work the same way: they give you interest for letting them use your money today, because money today is always worth more than the same amount tomorrow.'",
    "relatedIds": [
      "ir_066",
      "ir_064",
      "ir_009",
      "ir_053"
    ]
  },
  {
    "id": "ir_074",
    "question": "CAPM Formula and components.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Formulas & Ratios",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Re = Rf + \u03b2 \u00d7 (Rm - Rf). Re = Cost of Equity (required return for equity investors). Rf = Risk-Free Rate, typically the yield on 10-year government bonds (US Treasury or India Government Securities). \u03b2 (Beta) = Systematic risk coefficient measuring the stock's volatility relative to the market. \u03b2 = 1 means same volatility as market; \u03b2 > 1 = more volatile; \u03b2 < 1 = less volatile. \u03b2 is calculated from regression of stock returns against market returns. (Rm - Rf) = Equity Market Risk Premium (EMRP), the expected excess return of the market over the risk-free rate. Historical EMRP is approximately 5-7% for developed markets, 7-9% for emerging markets. Example: If Rf = 7%, \u03b2 = 1.2, EMRP = 6%, then Re = 7% + 1.2 \u00d7 6% = 14.2%.",
    "formula": "Re = Rf + \u03b2 \u00d7 (Rm - Rf)",
    "relatedIds": [
      "ir_020",
      "ir_034",
      "ir_060",
      "ir_023"
    ]
  },
  {
    "id": "ir_075",
    "question": "WACC Formula with full component breakdown.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Formulas & Ratios",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "WACC = (E/V \u00d7 Re) + (D/V \u00d7 Rd \u00d7 (1-T)). E = Market value of equity (shares outstanding \u00d7 current share price). D = Market value of debt (book value is often used as proxy for private companies). V = E + D = Total capital. Re = Cost of equity (from CAPM). Rd = Pre-tax cost of debt (YTM on existing bonds, or current borrowing rate). T = Marginal corporate tax rate. (1-T) reflects the tax deductibility of interest expense - the 'interest tax shield.' Example: E = $600M, D = $400M, V = $1B, Re = 12%, Rd = 6%, T = 25%. WACC = (600/1000 \u00d7 12%) + (400/1000 \u00d7 6% \u00d7 0.75) = 7.2% + 1.8% = 9.0%.",
    "formula": "WACC = (E/V \u00d7 Re) + (D/V \u00d7 Rd \u00d7 (1-T))",
    "relatedIds": [
      "ir_004",
      "ir_033",
      "ir_059",
      "ir_065"
    ]
  },
  {
    "id": "ir_076",
    "question": "Enterprise Value Formula with all adjustments.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Formulas & Ratios",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "EV = Market Capitalization + Total Debt + Preferred Stock + Minority Interest + Unfunded Pension Liabilities - Excess Cash & Cash Equivalents. Each component explained: Market Cap = Equity Value = Shares Outstanding \u00d7 Stock Price. Total Debt = Short-term debt + Long-term debt + Capital leases. Preferred Stock = Acts like debt (fixed dividend), added to capture full claims. Minority Interest = Value of subsidiaries not owned by parent (ensures consistency with consolidated EBITDA). Unfunded Pension = Contractual obligation requiring future cash = debt-like. Excess Cash = Subtracted because it reduces the effective acquisition cost (cash beyond operating needs). EV is used in multiples: EV/EBITDA, EV/Revenue, EV/EBIT. It represents what an acquirer would theoretically pay to acquire the entire business.",
    "formula": "EV = Equity Value + Debt + Preferred Stock + Minority Interest + Unfunded Pensions - Excess Cash",
    "relatedIds": [
      "ir_039",
      "ir_011",
      "ir_024",
      "ir_058"
    ]
  },
  {
    "question": "How would you make sure the data you collect is accurate?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Step 1: Cross-verify data across at least two independent primary sources (regulatory filings like SEC 10-K/10-Q, official company press releases, audited financial reports). Step 2: Validate against historical baseline trends to flag anomalies. Step 3: Check for definitions - confirm reported metrics match standardized agency definitions. Step 4: Consult primary exchange data for corporate action notifications. Step 5: Document source links and timestamp audit logs for model traceability.",
    "relatedIds": [
      "ir_054",
      "ir_055",
      "ir_065"
    ],
    "id": "ir_077"
  },
  {
    "question": "What would you do if you found two different sources giving different information about the same deal?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Step 1: Bypass secondary news aggregators and go directly to authoritative primary sources: regulatory filings (SEC 8-K, stock exchange disclosures, audited deal documents). Step 2: Identify the cause of discrepancy - differing metrics (e.g., Enterprise Value vs Equity Value, headline purchase price vs net cash price). Step 3: Check if one source includes contingent earn-outs or debt assumption while the other does not. Step 4: If primary filings are unavailable, contact company IR or flag the discrepancy to senior analysts. Step 5: Use conservative estimates in rating models until confirmed by audited filings.",
    "relatedIds": [
      "ir_065",
      "ir_066",
      "ir_077"
    ],
    "id": "ir_078"
  },
  {
    "question": "How do you maintain 100% data integrity when processing large volumes of financial news daily under tight deadlines?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Strategy: (1) Systematized SOPs - use standardized data entry checklists and validation templates in Excel/SQL. (2) Automated validation rules - implement range checks, data type constraints, and formula audit trails. (3) Prioritization matrix - categorize incoming news by market impact. (4) Dual-pass verification - double-check critical numerical inputs (debt amounts, EBITDA, leverage ratios). (5) Audit trail logging - record source links, publication times, and input rationale.",
    "relatedIds": [
      "ir_050",
      "ir_051",
      "ir_077"
    ],
    "id": "ir_079"
  },
  {
    "question": "What projected financial statement information is best to use when assessing working capital credit limits?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "The projected Balance Sheet and Cash Flow Statement (specifically Net Working Capital schedule) are the most critical. Best metrics: (1) Projected monthly peak working capital requirements based on seasonality. (2) Projected Accounts Receivable and Inventory turnover days (DSO and DIO). (3) Projected peak short-term cash deficits from cash budget projections. (4) Projected Operating Cash Flow (CFO). Sales revenue alone is insufficient because revenue growth can mask deteriorating cash conversion cycles.",
    "relatedIds": [
      "ir_001",
      "ir_042",
      "ir_056"
    ],
    "id": "ir_080"
  },
  {
    "question": "Within what period of the creation of a security charge must it be registered under the Indian Companies Act, including maximum condonable delay?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Under Section 77 of the Indian Companies Act, 2013: Standard Period: A company creating a charge on its property or assets must register the charge with the Registrar of Companies (ROC) within 30 days of creation. Extension / Condonable Delay: If not registered within 30 days, the ROC may allow registration within an additional 30 days (total 60 days) upon payment of specified additional fees. Further extension up to a maximum of 120 days from creation can be granted by the ROC under special applications.",
    "relatedIds": [
      "ir_058",
      "ir_059",
      "ir_060"
    ],
    "id": "ir_081"
  },
  {
    "question": "How do you identify early warning indicators of working capital deterioration in corporate borrowers?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Early warning indicators: (1) Elongating Days Sales Outstanding (DSO) - customers taking longer to pay. (2) Rising inventory turnover days (DIO) - unsold stock accumulating. (3) Stretched payables (DPO) - borrower delaying vendor payments to preserve cash. (4) Deteriorating Cash Conversion Cycle (CCC = DSO + DIO - DPO). (5) Frequent utilization of short-term bank credit lines at or near 100% capacity. (6) Rising short-term debt relative to operating cash flow.",
    "relatedIds": [
      "ir_001",
      "ir_042",
      "ir_056"
    ],
    "id": "ir_082"
  },
  {
    "question": "What are the key elements and stages of India's Corporate Debt Restructuring (CDR) and Insolvency and Bankruptcy Code (IBC) framework?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Hard",
    "answer": "Key stages under IBC 2016: Step 1: Filing of application by financial/operational creditor or corporate applicant upon default threshold. Step 2: Admission by NCLT and appointment of Interim Resolution Professional (IRP). Step 3: Moratorium period (180 days, extendable to 270/330 days) preventing asset stripping. Step 4: Formation of Committee of Creditors (CoC). Step 5: Inviting Resolution Plans. Step 6: Approval of plan by CoC (66% voting share required) and NCLT. Step 7: Liquidation if no plan approved.",
    "relatedIds": [
      "ir_003",
      "ir_027",
      "ir_057"
    ],
    "id": "ir_083"
  },
  {
    "question": "If an alternative asset or bond has a 6-month IRR vs a CAGR of 10%, which will yield better returns in absolute terms?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Hard",
    "answer": "Analysis: A 6-month IRR measures return over half a year. To annualize a 6-month rate of 10%, the effective annual rate (EAR) is (1 + 0.10)^2 - 1 = 21.00%. If the 6-month period return is 5%, annualized IRR is approximately 10.25%, which exceeds a 10% CAGR due to compounding frequency. Shorter compounding periods yield higher absolute returns over multi-year horizons due to reinvestment velocity.",
    "relatedIds": [
      "ir_021",
      "ir_030",
      "ir_033"
    ],
    "id": "ir_084"
  },
  {
    "question": "How do you arrive at the terminal growth rate while preparing a financial model?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Step 1: Align with long-term macroeconomic constraints - perpetual growth rate (g) should never exceed the long-term nominal GDP growth rate of the country (2-3% for developed, 4-5% for emerging). Step 2: Consider long-term industry inflation and volume growth expectations. Step 3: Reconcile with Exit Multiple Method to ensure implied valuation multiples align. Step 4: Perform sensitivity analysis testing WACC vs terminal growth rate grid.",
    "relatedIds": [
      "ir_018",
      "ir_033",
      "ir_075"
    ],
    "id": "ir_085"
  },
  {
    "question": "How do you transpose a row matrix into a column matrix in Excel practically?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Oxane Partners",
    "difficulty": "Easy",
    "answer": "Methods: (1) Copy & Paste Special: Copy row data \u2192 Select target cell \u2192 Right-click \u2192 Paste Special (Alt + E + S) \u2192 Check Transpose box \u2192 Click OK. (2) Dynamic Formula: Use =TRANSPOSE(array) entered as an array formula (or native dynamic array in Excel 365/2021+). (3) Power Query: Load table into Power Query Editor \u2192 Transform tab \u2192 Transpose \u2192 Close & Load.",
    "relatedIds": [
      "ir_049",
      "ir_050",
      "ir_052"
    ],
    "formula": "=TRANSPOSE(array)",
    "id": "ir_086"
  },
  {
    "question": "How do you split a merged data cell containing unformatted names and loan IDs into separate columns in Excel?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Methods: (1) Text to Columns: Select column \u2192 Data tab \u2192 Text to Columns \u2192 Choose Delimited or Fixed Width \u2192 Set destination columns \u2192 Finish. (2) Excel 365 Formulas: Use =TEXTBEFORE(cell, delimiter) and =TEXTAFTER(cell, delimiter) or =TEXTSPLIT(cell, delimiter). (3) Legacy Formulas: Use =LEFT(A1, FIND(\"-\", A1)-1) and =RIGHT(A1, LEN(A1)-FIND(\"-\", A1)). (4) Flash Fill: Type desired output in adjacent column and press Ctrl + E.",
    "relatedIds": [
      "ir_048",
      "ir_049",
      "ir_050"
    ],
    "formula": "=TEXTSPLIT(cell, delimiter)",
    "id": "ir_087"
  },
  {
    "question": "How do you integrate VBA macros with pivot slicers to build an interactive credit surveillance dashboard?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "SQL & Excel",
    "firm": "Oxane Partners",
    "difficulty": "Hard",
    "answer": "Step 1: Build underlying Pivot Tables connected to the loan surveillance database. Step 2: Insert Slicers for key dimensions (Rating, Industry, Borrower, Vintage). Step 3: Connect Slicers across all pivot tables using Report Connections. Step 4: Write VBA event macros (e.g., Worksheet_PivotTableUpdate) to trigger custom charts or refresh dynamic data ranges. Step 5: Add macro-assigned buttons for user actions like Reset All Filters.",
    "relatedIds": [
      "ir_048",
      "ir_050",
      "ir_051"
    ],
    "id": "ir_088"
  },
  {
    "question": "Relocation logic: Why did you choose to move to Delhi NCR over locations like Dehradun or Nainital that offer highly rated schools?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Logical Puzzles",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Strategy: Demonstrate structured economic decision-making and career prioritization. Example response: \"Delhi NCR is a primary financial hub offering unmatched exposure to corporate credit, private debt funds, and M&A advisory firms. Moving to NCR was a conscious professional decision to position myself at the center of institutional finance and accelerate my career growth.\"",
    "relatedIds": [
      "ir_063",
      "ir_068",
      "ir_171"
    ],
    "id": "ir_091"
  },
  {
    "question": "Industry tracking: Which football club do you follow, who is the manager, and what is your analysis of their strategic transfer market decisions?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Logical Puzzles",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Strategy: Apply structured analytical frameworks (ROI, capital allocation, squad depth) to non-finance subjects. Example response: \"I follow Real Madrid. Their strategic transfer market approach focuses on long-term capital allocation - acquiring young high-potential talent before peak valuation rather than overpaying for short-term fixes. This disciplined wage-structure management ensures financial sustainability.\"",
    "relatedIds": [
      "ir_063",
      "ir_067",
      "ir_071"
    ],
    "id": "ir_092"
  },
  {
    "question": "Candidate comparison: Name two other candidates interviewing today whom we should hire instead of you, and explain what superior skills they have.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Logical Puzzles",
    "firm": "Oxane Partners",
    "difficulty": "Hard",
    "answer": "Strategy: Demonstrate humility, peer respect, and self-awareness while reinforcing your unique value proposition. Example response: \"I had great conversations with Candidate X and Candidate Y. Candidate X brings exceptional Python scripting skills, and Candidate Y has extensive real estate underwriting experience. However, my strength lies in bridging deep accounting quality-of-earnings analysis with structured credit modeling.\"",
    "relatedIds": [
      "ir_063",
      "ir_066",
      "ir_171"
    ],
    "id": "ir_093"
  },
  {
    "question": "How would you evaluate the quality of a target's internal financial controls and ERP systems if their general ledger is highly unorganized?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Hard",
    "answer": "Step 1: Reconcile sub-ledgers (AR, AP, fixed assets) to the trial balance and bank statements to identify unmapped variances. Step 2: Sample major revenue transactions directly to bank deposits and shipping documents. Step 3: Test user access controls and posting authorization limits in the ERP. Step 4: Perform analytical review of journal entries near period-end. Step 5: Quantify risk reserves for unverified accounts.",
    "relatedIds": [
      "ir_038",
      "ir_039",
      "ir_041"
    ],
    "id": "ir_094"
  },
  {
    "question": "Walk through the components of Net Working Capital. How do variations in NWC seasonality impact the final purchase price mechanism of a transaction?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Hard",
    "answer": "Components: Operating Current Assets (AR, Inventory, Prepayments) minus Operating Current Liabilities (AP, Accrued Expenses). Seasonality impact: A business with peak working capital in Q4 requires a higher NWC peg if closing in Q4 vs Q2. Setting an unadjusted trailing 12-month average peg during a seasonal peak can unfairly penalize the seller or starve the buyer of operating liquidity post-close.",
    "relatedIds": [
      "ir_040",
      "ir_042",
      "ir_056"
    ],
    "id": "ir_095"
  },
  {
    "question": "If you identify unrecorded liabilities on a target's ledger that a seller claims are normal prepayments, how do you verify and document the error?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Hard",
    "answer": "Verification steps: (1) Inspect underlying vendor contracts and invoices to confirm performance obligations. (2) Reconcile cash payments against bank statements to verify whether services were delivered. (3) Request vendor confirmation statements. (4) Document as a debt-like item in the QofE bridge if confirmed. (5) Insist on specific seller indemnities in the purchase agreement.",
    "relatedIds": [
      "ir_038",
      "ir_039",
      "ir_040"
    ],
    "id": "ir_096"
  },
  {
    "question": "Walk through how you would establish the fair value of acquired intangible assets for financial and tax reporting purposes post-transaction.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "M&A Tax & Structuring",
    "firm": "Ironsides Advisory",
    "difficulty": "Hard",
    "answer": "Methodology: (1) Customer Relationships - Multi-Period Excess Earnings Method (MPEEM). (2) Brand / Trademarks - Relief-from-Royalty Method. (3) Technology / Software - Re-creation Cost Method. Steps: Project cash flows attributable to the asset, apply attrition/obsolescence rates, deduct contributory asset charges, discount at appropriate risk-adjusted rate.",
    "relatedIds": [
      "ir_043",
      "ir_044",
      "ir_045"
    ],
    "id": "ir_097"
  },
  {
    "question": "Why did you choose not to accept a full-time offer from your Summer Internship (SIP) company?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Strategy: Frame positively around career alignment. Example response: \"I had a highly productive summer internship and received strong positive feedback. However, the role was primarily focused on routine audit compliance. My long-term career focus is transaction advisory, credit underwriting, and M&A consulting where analysis directly informs strategic investment decisions.\"",
    "relatedIds": [
      "ir_063",
      "ir_068",
      "ir_171"
    ],
    "id": "ir_098"
  },
  {
    "question": "Describe a time you had to make a critical analytical decision under an extremely tight deadline with highly incomplete data.",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Hard",
    "answer": "STAR Method: Situation: Target management provided incomplete revenue schedules 2 hours before an investment committee meeting. Task: Deliver a credible valuation range despite missing customer-level data. Action: Used top-down industry benchmarks and run-rate historical averages to establish base-case assumptions, clearly highlighted data gaps as sensitivity variables, and built a scenario model. Result: Committee approved moving to next stage contingent on phase 2 validation.",
    "relatedIds": [
      "ir_065",
      "ir_066",
      "ir_067"
    ],
    "id": "ir_099"
  },
  {
    "question": "Why did you choose to relocate to Delhi NCR or Hyderabad for your corporate career, rather than pursuing opportunities in your hometown?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Easy",
    "answer": "Strategy: Emphasize proactive career ambition and commitment to financial hubs. Example response: \"Relocating to major financial hubs like Delhi NCR / Hyderabad was a deliberate career decision. These markets house the headquarters of top credit rating agencies, private debt funds, and transaction advisory firms, providing superior learning and deal exposure.\"",
    "relatedIds": [
      "ir_063",
      "ir_068",
      "ir_091"
    ],
    "id": "ir_100"
  },
  {
    "question": "What information in a credit agency report can help a bank assess a company's management integrity?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Key indicators in credit report: (1) Governance rating and management track record. (2) History of regulatory non-compliance, tax litigation, or auditor qualifications. (3) Related-party transactions and promoter share pledging history. (4) Frequency of management changes or auditor resignations. (5) Accuracy of past management guidance vs actual performance.",
    "relatedIds": [
      "ir_057",
      "ir_061",
      "ir_077"
    ],
    "id": "ir_101"
  },
  {
    "question": "What primary factor causes market overcapacity in an industry?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Written Assessment",
    "firm": "Moody's",
    "difficulty": "Easy",
    "answer": "Market overcapacity occurs when total industry production capacity significantly exceeds market demand. Primary causes: (1) Rapid demand decline due to macroeconomic slowdown or technological substitution. (2) Excessive capital investment during boom periods. (3) Government subsidies encouraging over-building. (4) High exit barriers preventing weak firms from shutting down.",
    "relatedIds": [
      "ir_002",
      "ir_004",
      "ir_064"
    ],
    "id": "ir_102"
  },
  {
    "question": "How do you handle a situation where a key project team member is severely underperforming?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "STAR Method: Situation: During a diligence project, a team member missed critical section deadlines. Task: Ensure client deliverable stayed on schedule without alienating the peer. Action: Held a private 1-on-1 to understand bottlenecks, redistributed immediate sub-tasks to meet deadline, and spent 30 minutes coaching them. Result: Project delivered on time; peer improved performance.",
    "relatedIds": [
      "ir_062",
      "ir_066",
      "ir_171"
    ],
    "id": "ir_103"
  },
  {
    "question": "If a client is unhappy with a deliverable, how would you address their concerns while managing internal team morale?",
    "category": "Interview Ready",
    "tag": "archive",
    "subcategory": "Behavioral & Situational",
    "firm": "All Firms",
    "difficulty": "Hard",
    "answer": "Strategy: (1) Listen actively to client feedback without defensive reactions. (2) Acknowledge specific gaps and commit to a clear corrective action plan with a tight turnaround time. (3) Internally, brief the team constructively - focus on specific fixes rather than assigning blame. (4) Conduct peer review of revised deliverable before re-submitting.",
    "relatedIds": [
      "ir_065",
      "ir_066",
      "ir_067"
    ],
    "id": "ir_104"
  },
  ...interviewReadyArchiveExpansion,
  {
    "id": "ir_r001",
    "question": "What is the difference between gross margin and EBITDA margin?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Credit & Underwriting",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Gross margin = (Revenue - COGS) / Revenue, measuring production efficiency. EBITDA margin = EBITDA / Revenue, measuring overall operational profitability after operating expenses but before D&A, interest, and taxes. Gross margin isolates production costs; EBITDA margin captures SG&A and other operating costs too. A company can have strong gross margins but weak EBITDA margins if overhead/SG&A is bloated.",
    "relatedIds": [
      "ir_002",
      "ir_011",
      "ir_044",
      "ir_022"
    ]
  },
  {
    "id": "ir_r002",
    "question": "What is the Altman Z-Score and how is it used in credit analysis?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "The Altman Z-Score is a multivariate formula predicting the probability of bankruptcy within 2 years. Z = 1.2(WC/TA) + 1.4(RE/TA) + 3.3(EBIT/TA) + 0.6(MVE/BVD) + 1.0(Sales/TA). Z > 2.99 = Safe zone. 1.81 < Z < 2.99 = Grey zone. Z < 1.81 = Distress zone. Used as a screening tool in credit analysis alongside traditional ratio analysis. formula: Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E",
    "relatedIds": [
      "ir_017",
      "ir_172",
      "ir_062",
      "ir_057"
    ]
  },
  {
    "id": "ir_r003",
    "question": "Explain the concept of credit migration and rating transition matrices.",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Credit migration tracks how credit ratings change over time. A rating transition matrix shows the probability of a credit moving from one rating to another within a specified period (typically 1 year). For example, a Baa-rated company might have a 90% probability of remaining Baa, 4% of upgrading to A, and 6% of downgrading to Ba or below. These matrices are central to credit portfolio management, pricing credit derivatives, and calculating expected losses.",
    "relatedIds": [
      "ir_055",
      "ir_023",
      "ir_034",
      "ir_012"
    ]
  },
  {
    "id": "ir_r004",
    "question": "What is the difference between LTV (Loan-to-Value) and LTC (Loan-to-Cost)?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "LTV = Loan Amount / Appraised Fair Market Value of the asset. Used in mortgage lending and real estate finance. LTC = Loan Amount / Total Project Cost (including acquisition + development costs). Used primarily in construction and development lending. LTV is based on current market value; LTC is based on total investment cost. Both measure leverage; lenders typically cap at 70-80% LTV or 65-75% LTC.",
    "relatedIds": [
      "ir_030",
      "ir_054",
      "ir_056",
      "ir_060"
    ]
  },
  {
    "id": "ir_r005",
    "question": "What is an intercreditor agreement and why does it matter in leveraged finance?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "An intercreditor agreement governs the rights and priorities between different classes of creditors (senior vs. junior lenders) when a borrower has multiple layers of debt. Key provisions: payment waterfall (who gets paid first), standstill periods (junior creditors can't accelerate during senior cure periods), lien subordination, turnover provisions, and voting rights on amendments. Critical in leveraged buyouts where a company has first lien, second lien, and mezzanine debt.",
    "relatedIds": [
      "ir_069",
      "ir_016",
      "ir_002",
      "ir_055"
    ]
  },
  {
    "id": "ir_r006",
    "question": "What are the key differences between GAAP and IFRS for revenue recognition?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Financial Due Diligence",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Post-convergence (ASC 606 / IFRS 15), both standards follow the same 5-step model: (1) Identify contract, (2) Identify performance obligations, (3) Determine transaction price, (4) Allocate price, (5) Recognize revenue when obligations are satisfied. Key remaining differences: IFRS allows revaluation of assets (GAAP doesn't), LIFO is permitted under GAAP but prohibited under IFRS, development costs can be capitalized under IFRS but are mostly expensed under GAAP. In cross-border M&A, these differences affect normalized earnings calculations.",
    "relatedIds": [
      "ir_037",
      "ir_008",
      "ir_014",
      "ir_071"
    ]
  },
  {
    "id": "ir_r007",
    "question": "How do you calculate the breakeven EBITDA for a leveraged company?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Breakeven EBITDA is the minimum EBITDA required to service all fixed obligations. Breakeven EBITDA = Interest Expense + Mandatory Debt Amortization + Maintenance Capex + Cash Taxes + Minimum Working Capital Requirements. If actual EBITDA falls below breakeven, the company cannot meet its obligations from operations and must draw on reserves, sell assets, or restructure. This metric is critical for stress testing in credit analysis and LBO models.",
    "relatedIds": [
      "ir_016",
      "ir_020",
      "ir_066",
      "ir_021"
    ]
  },
  {
    "id": "ir_r008",
    "question": "What is the difference between a waterfall structure and a pro-rata structure in debt repayment?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "In a waterfall structure, cash flows are distributed sequentially: senior tranches are paid in full before any payment flows to junior tranches. This is standard in securitization (ABS/MBS/CDO). In a pro-rata structure, all lenders are repaid proportionally based on their outstanding balances. This is common in syndicated revolving credit facilities. Waterfall provides stronger protection for senior tranches but means junior holders bear disproportionate risk.",
    "relatedIds": [
      "ir_057",
      "ir_059",
      "ir_031",
      "ir_002"
    ]
  },
  {
    "id": "ir_r009",
    "question": "Explain earn-outs in M&A. When are they used and what are the risks?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "M&A Tax & Structuring",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "An earn-out is a contingent purchase price mechanism where a portion of the total consideration is deferred and paid based on the target achieving specific financial milestones post-closing (revenue targets, EBITDA thresholds, customer retention metrics). Used when: buyer and seller disagree on valuation, target's future performance is uncertain, or seller wants upside participation. Risks: (1) Disputes over metric measurement. (2) Buyer may deliberately suppress earn-out metrics post-close. (3) Integration changes may affect standalone performance measurement. (4) Accounting complexity under ASC 805.",
    "relatedIds": [
      "ir_044",
      "ir_043",
      "ir_075",
      "ir_023"
    ]
  },
  {
    "id": "ir_r010",
    "question": "What is the difference between operating leverage and financial leverage?",
    "category": "Interview Ready",
    "tag": "related",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "Operating leverage measures the proportion of fixed costs in a company's cost structure. High operating leverage means small revenue changes cause large EBITDA swings (airlines, hotels, software). DOL = % Change in EBIT / % Change in Revenue. Financial leverage measures the proportion of debt in a company's capital structure. High financial leverage means small EBITDA changes cause large EPS swings. DFL = % Change in EPS / % Change in EBIT. Combined leverage = DOL \u00d7 DFL. High combined leverage means extreme earnings sensitivity to revenue changes.",
    "formula": "DOL = %\u0394EBIT / %\u0394Revenue; DFL = %\u0394EPS / %\u0394EBIT",
    "relatedIds": [
      "ir_056",
      "ir_021",
      "ir_046",
      "ir_006"
    ]
  },
  ...interviewReadyRelatedExpansion,
  {
    "id": "ir_g001",
    "question": "What is the difference between covenant-lite and covenant-heavy loan structures?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Covenant-lite (cov-lite) loans have minimal or no maintenance financial covenants (tested only upon certain trigger events like incurrence of new debt). They are borrower-friendly and have become prevalent in the leveraged loan market (over 80% of institutional term loans by 2024). Covenant-heavy loans include maintenance covenants tested quarterly regardless of any triggering event (e.g., leverage ratio must stay below 4.5x at all times). Lenders prefer maintenance covenants for early warning of financial deterioration; borrowers prefer cov-lite for operational flexibility. In downturns, cov-lite structures may delay creditor intervention, leading to lower recovery rates.",
    "relatedIds": [
      "ir_043",
      "ir_062",
      "ir_048",
      "ir_025"
    ]
  },
  {
    "id": "ir_g002",
    "question": "How does a credit rating agency assign sovereign credit ratings?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Sovereign ratings assess a government's ability and willingness to repay debt. Key factors: (1) Economic strength - GDP growth, diversification, per capita income. (2) Institutional strength - governance quality, rule of law, policy effectiveness. (3) Fiscal strength - government debt/GDP, deficit trajectory, debt affordability. (4) Susceptibility to event risk - political risk, banking sector health, external vulnerability (current account, FX reserves). Moody's uses a scorecard combining these factors with qualitative judgment. Sovereign ceiling: typically, no corporate in a country can be rated above the sovereign (with rare exceptions for companies with significant foreign operations).",
    "relatedIds": [
      "ir_075",
      "ir_030",
      "ir_061",
      "ir_016"
    ]
  },
  {
    "id": "ir_g003",
    "question": "What is subordination in the context of structured finance?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Subordination is the key credit enhancement mechanism in securitization where junior tranches absorb losses before senior tranches are impacted. The amount of subordination for a given tranche equals the total par value of all tranches junior to it. Example: In a $100M securitization with $80M Senior (AAA), $12M Mezzanine (BBB), and $8M Equity, the Senior tranche has 20% subordination ($12M + $8M), meaning the portfolio must lose more than 20% before the Senior tranche incurs any loss. Subordination is determined by rating agency models based on expected loss distributions.",
    "relatedIds": [
      "ir_025",
      "ir_068",
      "ir_026",
      "ir_075"
    ]
  },
  {
    "id": "ir_g004",
    "question": "What is the Gordon Growth Model and when does it fail?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "All Firms",
    "difficulty": "Medium",
    "answer": "The Gordon Growth Model (Dividend Discount Model for constant growth): P = D\u2081 / (r - g), where P = stock price, D\u2081 = next year's dividend, r = required return, g = constant dividend growth rate. Terminal value variant: TV = FCF\u2081 / (WACC - g). Fails when: (1) g \u2265 r, making the denominator zero or negative (mathematical impossibility). (2) Company doesn't pay dividends. (3) Growth rate is not constant (high-growth companies). (4) The assumption of perpetual growth at rate g is unrealistic. Best suited for mature, stable companies with predictable dividend policies (utilities, large banks).",
    "formula": "P = D\u2081 / (r - g); TV = FCF\u2081 / (WACC - g)",
    "relatedIds": [
      "ir_041",
      "ir_059",
      "ir_171",
      "ir_015"
    ]
  },
  {
    "id": "ir_g005",
    "question": "Explain the concept of credit enhancement in securitization.",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Credit enhancement mechanisms that improve the credit quality of securitized tranches: Internal: (1) Subordination/tranching - junior tranches absorb losses first. (2) Overcollateralization - collateral value exceeds issued securities. (3) Excess spread - interest income from collateral exceeds interest paid to investors. (4) Reserve accounts - cash set aside for loss absorption. External: (1) Financial guaranty insurance (monoline insurance). (2) Letters of credit from banks. (3) Corporate guarantee from originator. (4) Cash collateral accounts. These mechanisms enable senior tranches to achieve higher credit ratings than the underlying collateral pool on its own.",
    "relatedIds": [
      "ir_055",
      "ir_060",
      "ir_071",
      "ir_011"
    ]
  },
  {
    "id": "ir_g006",
    "question": "What is the difference between a going-concern valuation and a liquidation valuation?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Corporate Finance & Valuation",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "Going-concern valuation assumes the business continues operating indefinitely and values the present value of future cash flows. Methods: DCF, comparable companies, precedent transactions. Typically yields higher values because it captures the value of intangible assets, growth potential, and operational synergies. Liquidation valuation assumes the business ceases operations and assets are sold individually (orderly liquidation = 6-12 months; forced/fire sale = immediate). Values are typically 30-50% below going-concern because: (1) Assets may be specialized with limited buyers. (2) Fire-sale discounts apply. (3) Intangible assets (brand, customer relationships) have little standalone value. Used in bankruptcy analysis and credit risk assessment.",
    "relatedIds": [
      "ir_052",
      "ir_004",
      "ir_049",
      "ir_016"
    ]
  },
  {
    "id": "ir_g007",
    "question": "What is the difference between a revolver and a term loan?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "Revolving Credit Facility (Revolver): Flexible borrowing facility that can be drawn, repaid, and re-drawn during the commitment period (typically 3-5 years). Like a corporate credit card. Used for working capital and general corporate purposes. Borrower pays a commitment fee on undrawn amounts. Term Loan: Fixed borrowing with scheduled repayment (amortizing or bullet maturity). Cannot be re-borrowed once repaid. Types: Term Loan A (TLA) - amortizing, held by banks. Term Loan B (TLB) - minimal amortization (1% annual), bullet maturity, sold to institutional investors (CLOs, hedge funds). TLB is the workhorse of leveraged finance.",
    "relatedIds": [
      "ir_009",
      "ir_057",
      "ir_056",
      "ir_050"
    ]
  },
  {
    "id": "ir_g008",
    "question": "What are the main differences between equity research and credit research?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Credit & Underwriting",
    "firm": "Moody's",
    "difficulty": "Medium",
    "answer": "Equity research focuses on upside potential - stock price target, earnings growth, and return on equity. Key question: 'Will this stock go up?' Uses P/E, EV/EBITDA, DCF for upside scenarios. Credit research focuses on downside protection - ability to repay debt and avoid default. Key question: 'Will this company pay me back?' Uses leverage ratios, coverage ratios, cash flow adequacy, recovery analysis. Equity analysts care about growth; credit analysts care about stability. Equity is asymmetric upside (unlimited gain, limited loss to zero); credit is asymmetric downside (limited upside to par, full loss possible). Same company can be an equity 'Buy' and a credit 'Sell' if growth is being funded by excessive leverage.",
    "relatedIds": [
      "ir_028",
      "ir_030",
      "ir_011",
      "ir_041"
    ]
  },
  {
    "id": "ir_g009",
    "question": "What is a PIK (Payment-in-Kind) toggle and when is it used?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "Structured Finance & Private Credit",
    "firm": "Oxane Partners",
    "difficulty": "Medium",
    "answer": "PIK (Payment-in-Kind) is a feature allowing the borrower to pay interest by adding it to the principal balance rather than paying cash. A PIK toggle gives the borrower the option to switch between cash interest and PIK interest. Used in: (1) Highly leveraged transactions where initial cash flow is insufficient to cover full cash interest. (2) Growth-stage companies reinvesting all cash into operations. (3) Mezzanine and subordinated debt structures. Risk for lenders: PIK compounds the outstanding principal, increasing credit exposure over time without cash returns. If the borrower's business doesn't grow as planned, the escalating debt burden can accelerate default. PIK rates are typically 200-400 bps higher than cash-pay rates to compensate for the added risk.",
    "relatedIds": [
      "ir_059",
      "ir_035",
      "ir_033",
      "ir_038"
    ]
  },
  {
    "id": "ir_g010",
    "question": "What is a MAC clause and how does it affect M&A transactions?",
    "category": "Interview Ready",
    "tag": "gen",
    "subcategory": "M&A Tax & Structuring",
    "firm": "Ironsides Advisory",
    "difficulty": "Medium",
    "answer": "A Material Adverse Change (MAC) or Material Adverse Effect (MAE) clause allows the buyer to terminate or renegotiate an acquisition agreement if the target experiences a significant negative event between signing and closing. Typical MAC carve-outs (events that do NOT constitute a MAC): general economic conditions, industry-wide changes, changes in law, pandemic effects (post-COVID), and effects of the announced transaction itself. MAC litigation is rare but significant - the Delaware Chancery Court has historically set a very high bar for invoking MAC (Akorn v. Fresenius, 2018 was the first Delaware case to uphold a MAC termination). Sellers seek narrow MAC definitions; buyers want broad ones.",
    "relatedIds": [
      "ir_060",
      "ir_049",
      "ir_026",
      "ir_047"
    ]
  },
  ...interviewReadyGeneratedExpansion,
];
