import { useState } from 'react';

const sections = [
  {
    id: 'foundation',
    title: 'Foundation',
    icon: '🧱',
    blocks: [
      { type: 'h3', text: 'What is Securitization?' },
      { type: 'p', text: 'At its core, securitization is the financial alchemy of turning illiquid assets (like a 20-year home loan) into liquid cash today. It is the process of bundling together hundreds or thousands of individual loans, putting them into a dedicated financial box, and selling ownership of that box to investors as tradeable securities.' },
      { type: 'h3', text: 'Why Does It Exist?' },
      { type: 'p', text: 'Historically, banking relied on the "Originate and Hold" model — a bank gave you a loan and held it for 15 years. The modern "Originate and Distribute" model lets banks sell loans to investors, get cash back immediately, and originate more loans.' },
      { type: 'callout', text: 'Securitization acts as a pressure relief valve — by selling loans, the bank clears space on its balance sheet to lend again without raising new equity.' },
      { type: 'h3', text: 'Real-Life Analogy' },
      { type: 'p', text: 'Imagine Ramesh, who runs a wholesale flour business. He sells ₹10 Lakh of flour on credit (60-day IOUs). He needs cash today to buy wheat. He bundles the IOUs and sells them to investor Suresh for ₹9.5 Lakh. Ramesh gets cash now; Suresh collects ₹10 Lakh in 60 days. Ramesh just "securitized" his receivables.' },
      { type: 'h3', text: 'The Indian Banking Marriage' },
      { type: 'p', text: 'NBFCs like Shriram Finance have massive ground reach to originate tractor loans but lack cheap deposits. Commercial banks like SBI have trillions in deposits but lack rural underwriting manpower — plus they must meet RBI\'s Priority Sector Lending (PSL) targets.' },
      { type: 'list', items: ['Shriram originates tractor loans and securitizes them', 'SBI buys the securitized pool to meet PSL targets', 'Shriram gets cash to lend again; SBI avoids opening rural branches'] },
    ],
  },
  {
    id: 'plumbing',
    title: 'Banking Plumbing',
    icon: '🔧',
    blocks: [
      { type: 'h3', text: 'The Balance Sheet View' },
      { type: 'table', headers: ['Liabilities (Money Source)', 'Assets (Money Destination)'], rows: [['Deposits (Savings, Current, FDs)', 'Loans given (Retail, Corporate)'], ['Equity Capital (Shareholder money)', 'Investments (Government Bonds)'], ['Borrowings (from RBI or markets)', 'Cash balance']] },
      { type: 'h3', text: 'CRR & SLR Drag' },
      { type: 'p', text: 'In India, a bank cannot lend 100% of its deposits. The RBI mandates statutory reserves:' },
      { type: 'list', items: ['CRR (~4.5%): Cash kept with RBI, earns ZERO interest', 'SLR (~18%): Must be invested in ultra-safe Government Securities, earns low interest', 'If you deposit ₹100, ₹22.50 is locked away. The bank has only ₹77.50 to lend.'] },
      { type: 'h3', text: 'Basel Capital Adequacy' },
      { type: 'code', text: 'CAR = (Tier 1 Capital + Tier 2 Capital) / Risk-Weighted Assets (RWA)' },
      { type: 'p', text: 'Not all loans are equal. A home loan has 35% risk weight; an unsecured personal loan has 125%. If a bank issues ₹100 in personal loans, RWA is ₹125. At 9% CAR, the bank must hold ₹11.25 of shareholder capital. When capital runs low, securitization removes the loans, wipes the RWA, and frees capital instantly.' },
    ],
  },
  {
    id: 'process',
    title: 'The Process',
    icon: '⚙️',
    blocks: [
      { type: 'p', text: 'Securitization follows a strict chronological mechanism. If these steps aren\'t followed precisely, the legal protection (bankruptcy remoteness) collapses.' },
      { type: 'h3', text: 'Step 1: Origination' },
      { type: 'p', text: 'The Originator (e.g., HDFC Bank) gives out thousands of auto loans. The bank holds these as assets on its balance sheet.' },
      { type: 'h3', text: 'Step 2: Pool Formation' },
      { type: 'p', text: 'The bank filters its portfolio to create a homogenous pool. You cannot mix a 20-year home loan with a 6-month microfinance loan. Only "standard" (performing) loans are selected; NPAs are removed.' },
      { type: 'h3', text: 'Step 3: SPV Creation' },
      { type: 'p', text: 'A Special Purpose Vehicle (SPV) is created — in India, almost always as a Trust under the Indian Trusts Act, 1882. It is "bankruptcy-remote": if HDFC goes bankrupt, assets inside the SPV cannot be touched by HDFC\'s creditors.' },
      { type: 'h3', text: 'Step 4: True Sale' },
      { type: 'p', text: 'The bank transfers the pool to the SPV via an Assignment Agreement. This must be a "True Sale" — the bank completely gives up ownership. The loans are permanently wiped from the bank\'s balance sheet.' },
      { type: 'h3', text: 'Step 5: Credit Enhancement' },
      { type: 'p', text: 'To make the pool attractive, it gets internal or external support: Cash Collateral (extra cash in a reserve) or Over-collateralization (₹110 of loans backing ₹100 of securities). This acts as a shock absorber.' },
      { type: 'h3', text: 'Step 6–10' },
      { type: 'list', items: ['Credit Rating: CRISIL/ICRA analyze the pool and assign ratings (AAA, AA)', 'Issuing Securities: The SPV issues Pass-Through Certificates (PTCs)', 'Investors Purchase: Mutual funds and banks buy PTCs; cash flows back to the Originator', 'Servicing: The Originator continues collecting EMIs from borrowers', 'Cash Flow Waterfall: Monthly EMIs are distributed in strict priority order'] },
      { type: 'h3', text: 'The Waterfall Priority Order' },
      { type: 'table', headers: ['Priority', 'Who Gets Paid'], rows: [['1st', 'Statutory & Trust Expenses (taxes, trustee fees, legal)'], ['2nd', 'Senior Tranche (Class A) — AAA investors'], ['3rd', 'Mezzanine Tranche (Class B) — AA/A investors'], ['4th', 'Equity Tranche / First Loss — Originator retains this'], ['5th', 'Servicer Fee & Excess Spread — Originator\'s profit']] },
    ],
  },
  {
    id: 'players',
    title: 'The Players',
    icon: '👥',
    blocks: [
      { type: 'h3', text: '1. The Originator' },
      { type: 'p', text: 'The bank or NBFC that originally gave out the loans. Indian examples: Shriram Finance (CVs), Muthoot Finance (Gold), CreditAccess Grameen (MFI), HDFC (Mortgages).' },
      { type: 'h3', text: '2. The SPV (Trust)' },
      { type: 'p', text: 'A legally independent entity created solely for this transaction. In India, almost exclusively a Trust under the Indian Trusts Act, 1882. Its sole purpose: buy loans from the Originator and issue PTCs to Investors. Provides bankruptcy remoteness.' },
      { type: 'h3', text: '3. The Trustee' },
      { type: 'p', text: 'An independent, SEBI-registered fiduciary (e.g., Catalyst Trusteeship, IDBI Trusteeship). They legally own the SPV Trust on behalf of investors. If the Servicer stops passing EMIs, the Trustee has the legal power to fire them and appoint a new one.' },
      { type: 'h3', text: '4. The Servicer' },
      { type: 'p', text: 'Collects EMIs from borrowers. In 99% of Indian deals, the Originator is the Servicer. They send SMS reminders, chase defaulters, and deposit collections into the SPV\'s escrow account. Earn a "Servicing Fee" (0.5–1% of pool).' },
      { type: 'h3', text: '5. Rating Agencies' },
      { type: 'p', text: 'CRISIL, ICRA, CARE — they run statistical models on the pool to predict defaults and assign ratings (e.g., AAA(SO)). The "SO" suffix means Structured Obligation.' },
      { type: 'h3', text: '6. Investors' },
      { type: 'p', text: 'Commercial Banks (for PSL compliance) and Mutual Funds (for yield pickup) are the biggest buyers in India.' },
      { type: 'h3', text: '7. Regulators' },
      { type: 'list', items: ['RBI: Regulates banks/NBFCs (the Originators). Dictates securitization rules.', 'SEBI: Steps in if PTCs are listed on BSE/NSE or sold to mutual funds.'] },
    ],
  },
  {
    id: 'assets',
    title: 'Asset Types',
    icon: '🏦',
    blocks: [
      { type: 'p', text: 'In India, securitization is dominated by specific asset classes, largely driven by the Priority Sector Lending (PSL) hunger of large banks.' },
      { type: 'h3', text: 'Commercial Vehicle (CV) Loans — The King' },
      { type: 'p', text: 'Trucks are income-generating assets. If a borrower defaults, the NBFC seizes the truck and sells it. Medium tenure (3–5 years), solid yield. The undisputed king of Indian securitization.' },
      { type: 'h3', text: 'Microfinance (MFI) Loans' },
      { type: 'p', text: 'Unsecured loans to low-income women in rural areas (Joint Liability Groups). Short tenure (1–2 years), high interest (~22–25%). Despite being unsecured, historical default rates are incredibly low. Huge demand from banks for PSL compliance.' },
      { type: 'h3', text: 'Gold Loans' },
      { type: 'p', text: 'Bullet repayment structures. Extremely safe because the gold collateral is highly liquid and held in the Originator\'s vault.' },
      { type: 'h3', text: 'Home Loans (MBS)' },
      { type: 'p', text: 'Long tenure (15–20 years), low interest rates. Safe but highly sensitive to prepayment risk (borrowers paying off early with bonuses).' },
      { type: 'h3', text: 'Other Asset Classes' },
      { type: 'list', items: ['Two-Wheeler / Car Loans: High volume, highly standardized', 'MSME / Machinery Loans: Tied to economic cycles', 'Tractor & Agriculture Loans: Seasonal cash flows (Kharif/Rabi harvest)', 'Credit Card Receivables: Rarely securitized in India', 'Trade / Lease Receivables: From long-term corporate rental agreements'] },
    ],
  },
  {
    id: 'abs',
    title: 'ABS',
    icon: '📦',
    blocks: [
      { type: 'p', text: 'When you securitize anything other than a home loan, it\'s an Asset Backed Security (ABS). ABS makes up the vast majority of the Indian market because NBFCs dominate vehicle and microfinance lending.' },
      { type: 'h3', text: 'Amortizing vs. Revolving Structure' },
      { type: 'list', items: ['Amortizing (95% of India): Fixed EMI loans. Principal decreases monthly. PTC investors get principal + interest until pool drops to zero.', 'Revolving (Rare in India): Used for credit cards. Borrowers repay and re-borrow. SPV uses incoming cash to buy new receivables, keeping pool size constant during a "revolving period."'] },
      { type: 'h3', text: 'Pricing & Yield' },
      { type: 'p', text: 'ABS is priced at a "spread" over a risk-free benchmark. If a 3-year G-Sec yields 7.0%, a AAA-rated Auto Loan ABS might price at 7.75% (75 bps spread). The extra yield compensates for Complexity Risk and Illiquidity Premium.' },
      { type: 'h3', text: 'Risks Unique to ABS' },
      { type: 'list', items: ['Prepayment Risk: Borrowers pay early → investor must reinvest at lower rates (Reinvestment Risk)', 'Commingling Risk: Servicer collects EMIs in own account before transferring to SPV. If Servicer goes bankrupt, SPV money gets mixed.', 'Macro-Economic Risk: Diesel prices double → truck drivers\' margins vanish → CV-backed ABS sees default spike'] },
    ],
  },
  {
    id: 'mbs',
    title: 'MBS',
    icon: '🏠',
    blocks: [
      { type: 'p', text: 'A Mortgage-Backed Security (MBS) is a pool of home loans (mortgages) or commercial real estate loans. While structurally similar to ABS, MBS behaves uniquely because of Real Estate.' },
      { type: 'h3', text: 'Why MBS is Different' },
      { type: 'list', items: ['Extremely Long Tenures: 15–30 years amplifies Interest Rate Risk and Prepayment Risk', 'Asset Appreciation: Real estate generally appreciates. If a borrower defaults, the bank can often recover the full amount by auctioning the property.', 'Types: RMBS (Residential — individuals) vs CMBS (Commercial — offices, malls, hotels)'] },
      { type: 'h3', text: 'The Prepayment Headache' },
      { type: 'p', text: 'US context: If rates drop from 7% to 4%, millions of homeowners refinance. MBS investors get a flood of cash back when rates are low — terrible for reinvestment.' },
      { type: 'p', text: 'Indian context: Most home loans are floating rate, so the refinancing trigger is weaker. But Indian borrowers have a strong cultural aversion to debt — when they get a Diwali bonus or stock payout, they aggressively prepay.' },
    ],
  },
  {
    id: 'ptc',
    title: 'PTCs & DA',
    icon: '📜',
    blocks: [
      { type: 'h3', text: 'Pass-Through Certificates (PTCs)' },
      { type: 'p', text: 'PTCs are the physical (or dematerialized) receipts that investors buy. They are the backbone of Indian securitization. When an SPV buys ₹100 Cr of auto loans, it raises money by issuing PTCs — e.g., 1,000 certificates worth ₹10 Lakh each.' },
      { type: 'callout', text: 'The magic is in the name: the SPV is a hollow pipeline. It does not retain any profit. Cash flows pass straight through to PTC investors. Under Indian law, the SPV is largely tax-neutral; tax falls on the final investor.' },
      { type: 'h3', text: 'Direct Assignment (DA) — India\'s Unique Tool' },
      { type: 'p', text: 'In a DA, there is no SPV and no securities are issued. It\'s a direct bilateral sale of a loan portfolio from one bank/NBFC to another. Why does it exist? Because large banks need to urgently meet PSL targets.' },
      { type: 'h3', text: 'PTC vs DA' },
      { type: 'table', headers: ['Feature', 'PTC (Securitization)', 'Direct Assignment'], rows: [['Intermediary', 'SPV (Trust) created', 'No SPV. Bilateral sale.'], ['Instrument', 'Tradeable Securities', 'Legal Assignment only'], ['Credit Enhancement', 'Yes (Cash collateral, subordination)', 'NO — RBI bans CE in DA'], ['Investors', 'Multiple (MFs, banks, FIIs)', 'Usually one bank'], ['Complexity', 'High (rating, trustee needed)', 'Low (two parties agree)']] },
      { type: 'callout', text: 'Because RBI bans credit enhancement in DA, the buying bank takes 100% of default risk. This forces severe due diligence.' },
    ],
  },
  {
    id: 'tranching',
    title: 'Tranching',
    icon: '🥂',
    blocks: [
      { type: 'p', text: 'Tranching (from the French for "slice") is the process of taking a single pool and slicing it into different risk layers to sell to different types of investors.' },
      { type: 'h3', text: 'The Champagne Glass Analogy' },
      { type: 'p', text: 'Think of stacked champagne glasses. Cash from borrower EMIs is poured from the top. The top glass must be completely full before a single drop falls into the glass below.' },
      { type: 'h3', text: 'The Three Tranches' },
      { type: 'list', items: ['Senior (Class A): Gets paid FIRST. Extremely low risk. AAA rated. Yield ~7.5%. Buyers: Pension funds, conservative MFs.', 'Mezzanine (Class B): Paid after Class A. Medium risk. AA/A rated. Yield ~9.5%. Buyers: Wealth management, specialized funds.', 'Equity (Class C / First Loss): Gets whatever is left. Highest risk. If ANY borrower defaults, this tranche takes the loss first. Held by Originator ("skin in the game").'] },
      { type: 'h3', text: 'How Tranching Absorbs Loss' },
      { type: 'p', text: '₹100 Cr Pool: Class A ₹80 Cr, Class B ₹15 Cr, Class C ₹5 Cr.' },
      { type: 'list', items: ['Normal (₹2 Cr defaults): Class C takes the hit. A and B untouched.', 'Economic Crash (₹10 Cr defaults): Class C wiped out (₹5 Cr). Class B takes remaining ₹5 Cr. Class A STILL untouched — protected by ₹20 Cr "credit cushion."'] },
    ],
  },
  {
    id: 'credit-enhancement',
    title: 'Credit Enhancement',
    icon: '🛡️',
    blocks: [
      { type: 'h3', text: 'Internal Credit Enhancement' },
      { type: 'list', items: ['Subordination (Tranching): Junior/equity tranche absorbs first losses', 'Over-Collateralization: Transfer ₹110 Cr of loans, issue only ₹100 Cr PTCs. Extra ₹10 Cr is buffer.', 'Excess Spread: Borrowers pay 14%, PTC investors get 8%, SPV expenses 1%. The remaining 5% is trapped monthly to cover defaults.'] },
      { type: 'h3', text: 'External Credit Enhancement' },
      { type: 'list', items: ['Cash Collateral (FD): Originator puts ₹5 Cr in an FD marked to the SPV Trustee. If collections fall short, Trustee dips into this FD.', 'Corporate Guarantee: A parent company (e.g., Tata Sons) promises to step in. Rarely used because it hurts the parent\'s balance sheet.'] },
      { type: 'callout', text: 'In India, the most common combination is Cash Collateral (FD) + Excess Spread.' },
    ],
  },
  {
    id: 'ratings',
    title: 'Credit Ratings',
    icon: '⭐',
    blocks: [
      { type: 'p', text: 'You cannot sell a PTC to a Mutual Fund without a rating. CRISIL, ICRA, and CARE are the gatekeepers.' },
      { type: 'h3', text: 'How PTC Ratings Differ' },
      { type: 'p', text: 'Rating a PTC is totally different from rating a corporate bond. For a PTC, the Originator\'s balance sheet is irrelevant (bankruptcy remoteness). The rating agency only cares about: historical pool performance, borrower credit quality, and credit enhancement adequacy.' },
      { type: 'h3', text: 'The "SO" Suffix' },
      { type: 'callout', text: 'CRISIL AAA(SO) means "Structured Obligation" — highest safety because of structural enhancements (cash collateral, subordination), NOT because the underlying borrowers are billionaires.' },
      { type: 'h3', text: 'AAA Doesn\'t Always Mean "Safe"' },
      { type: 'p', text: 'The harsh lesson of 2008: if the rating agency\'s models are wrong (e.g., assuming housing prices never drop nationwide), the AAA rating is an illusion. If defaults eat through Equity and Mezzanine faster than expected, even the AAA tranche takes a loss.' },
    ],
  },
  {
    id: 'risks',
    title: 'Risks',
    icon: '⚠️',
    blocks: [
      { type: 'h3', text: '1. Credit Risk (Default Risk)' },
      { type: 'p', text: 'The risk that borrowers stop paying EMIs. Mitigated by cash collateral, over-collateralization, and rigorous underwriting.' },
      { type: 'h3', text: '2. Prepayment Risk (The Silent Yield Killer)' },
      { type: 'p', text: 'Borrowers pay off loans early. If investors expected 9% over 5 years but borrowers prepay in year 2, investors must reinvest at lower current rates (Reinvestment Risk). High in microfinance (bonus seasons) and agriculture (bumper crops).' },
      { type: 'h3', text: '3. Commingling Risk' },
      { type: 'p', text: 'The Servicer collects EMIs into its own bank account before transferring to SPV. If the Servicer goes bankrupt while holding that cash, the SPV\'s money gets mixed with the bankrupt company\'s assets. Mitigation: RBI mandates rapid fund transfer (1–3 days).' },
      { type: 'h3', text: '4. Servicer Risk' },
      { type: 'p', text: 'The risk that the Originator/Servicer goes bankrupt or stops doing a good job. Mitigation: The Trustee can fire the Servicer and appoint a back-up.' },
      { type: 'h3', text: '5. Legal & Documentation Risk' },
      { type: 'p', text: 'If the assignment agreement is drafted incorrectly, the "True Sale" might be challenged in court. If ruled not a True Sale, assets are pulled back into the Originator\'s bankrupt estate.' },
      { type: 'h3', text: '6. Interest Rate Risk' },
      { type: 'p', text: 'Mismatch between the interest rate of underlying loans (e.g., floating) and the rate promised to PTC investors (e.g., fixed).' },
    ],
  },
  {
    id: 'regulations',
    title: 'RBI Regulations',
    icon: '📋',
    blocks: [
      { type: 'p', text: 'After the 2008 crisis, the RBI introduced strict Master Directions to ensure the Indian market never suffered the same fate.' },
      { type: 'h3', text: '1. Minimum Holding Period (MHP)' },
      { type: 'p', text: 'An Originator cannot securitize a loan on the same day they originate it. They must hold it for 3–6 months (depending on loan type) to prove the borrower is genuine.' },
      { type: 'h3', text: '2. Minimum Retention Requirement (MRR)' },
      { type: 'callout', text: '"Skin in the Game" — The Originator cannot sell 100% of the pool. They must retain 5–10%, usually by holding the risky Equity Tranche. If they share the risk, they won\'t originate garbage loans.' },
      { type: 'h3', text: '3. True Sale Criteria' },
      { type: 'p', text: 'The sale must be absolute. The Originator cannot retain any right to buy back assets if they turn profitable, nor can investors force the Originator to buy them back.' },
      { type: 'h3', text: '4. No Credit Enhancement in DA' },
      { type: 'p', text: 'If a bank buys via Direct Assignment (no SPV), the Originator cannot provide a safety net. The buying bank takes 100% of the credit risk.' },
    ],
  },
  {
    id: 'sarfaesi',
    title: 'SARFAESI vs Securitization',
    icon: '⚖️',
    blocks: [
      { type: 'callout', text: 'This is where 90% of Indian finance students get confused. SARFAESI has "Securitisation" in its title, but it does NOT govern PTCs and ABS.' },
      { type: 'h3', text: 'Capital Market Securitization (What this guide covers)' },
      { type: 'list', items: ['Goal: Liquidity and Capital Relief', 'Assets: Good, performing loans (Standard Assets)', 'Process: Bundle good loans → Trust (SPV) → Sell PTCs to mutual funds', 'Regulator: RBI Master Directions on Securitisation of Standard Assets'] },
      { type: 'h3', text: 'The SARFAESI Act (Debt Recovery)' },
      { type: 'list', items: ['Goal: Recovering money from bad debts', 'Assets: Bad loans / NPAs where borrower has defaulted', 'Process: Banks bypass slow civil courts and directly seize collateral', 'The "Securitisation" in SARFAESI = selling bad loans to ARCs, not good loans to mutual funds'] },
      { type: 'callout', text: 'If HDFC Bank securitizes 1,000 paying auto loans → Capital Market Securitization. If HDFC Bank uses SARFAESI → they\'re sending bouncers to auction a defaulter\'s house.' },
    ],
  },
  {
    id: 'arcs',
    title: 'ARCs & NPAs',
    icon: '🏚️',
    blocks: [
      { type: 'p', text: 'An ARC (Asset Reconstruction Company) is a specialized institution (like the government-backed NARCL) that buys bad loans from banks at a massive discount.' },
      { type: 'h3', text: 'How ARC Securitization Works' },
      { type: 'list', items: ['SBI has a ₹1,000 Cr NPA (defaulted steel plant loan)', 'SBI wants it off the balance sheet', 'ARC buys the NPA at ₹300 Cr (not full value)', 'ARC sets up a Trust, transfers the bad loan, issues Security Receipts (SRs) to SBI', 'SBI gets SRs, NOT cash', 'ARC restructures, fires management, auctions machinery', 'If ARC recovers ₹400 Cr → management fee, rest flows back to SBI via SRs', 'If ARC recovers nothing → SRs become worthless'] },
      { type: 'callout', text: 'Key Difference: Capital Market Securitization issues PTCs backed by GOOD loans. ARC Securitization issues SRs backed by BAD loans.' },
    ],
  },
  {
    id: 'crisis-2008',
    title: 'The 2008 Crisis',
    icon: '💥',
    blocks: [
      { type: 'h3', text: 'The Deadly Chain Reaction' },
      { type: 'list', items: ['Hunger for Yield: Global rates were low. Investors desperate for higher yields. MBS paid well and were rated AAA.', 'Originator Greed: Wall Street begged for more mortgages. But everyone with good credit already had a house.', 'Subprime Lending: Originators gave loans to people with no income, no job, no assets (NINJA loans). Zero skin in the game — they sold loans to SPVs within days.', 'Rating Agency Failure: Moody\'s/S&P kept slapping AAA on subprime MBS. Their models assumed housing prices always go up.', 'CDOs: Wall Street took toxic MBS tranches, bundled them into new SPVs, tranched them AGAIN. Turned BBB toxic waste into "new" AAA securities.', 'The Collapse: Housing prices stalled in 2007 → subprime defaults en masse → MBS/CDOs worthless → Lehman, Bear Stearns bankrupt → global financial system froze.'] },
      { type: 'h3', text: 'Why India Survived' },
      { type: 'list', items: ['RBI Conservatism: RBI (Dr. Y.V. Reddy) did not allow synthetic securitization or complex derivatives.', 'Skin in the Game: MRR forced Indian Originators to hold a chunk of risk.', 'No Subprime Housing: India didn\'t have a culture of giving 100% LTV loans to unverified borrowers.', 'The underlying assets in Indian pools were actually good.'] },
    ],
  },
  {
    id: 'case-studies',
    title: 'Indian Case Studies',
    icon: '📊',
    blocks: [
      { type: 'h3', text: 'Case 1: The Microfinance PSL Bridge' },
      { type: 'list', items: ['Originator: Large MFI in rural Karnataka. 50,000 loans to women\'s self-help groups. Pool: ₹200 Cr. Yield: 24%.', 'Problem: MFI has exhausted borrowing limits, needs cash to expand.', 'Buyer: Axis Bank is falling short of PSL target for "Weaker Sections."', 'Deal: Direct Assignment. Axis buys ₹200 Cr pool at 11% yield.', 'Result: MFI gets ₹200 Cr cash. Axis instantly meets PSL target without opening rural branches.'] },
      { type: 'h3', text: 'Case 2: The Commercial Vehicle PTC' },
      { type: 'list', items: ['Originator: Shriram Finance. ₹500 Cr pool of truck loans.', 'Structure: Trust (SPV) created. Pool tranched.', 'Senior Tranche (₹450 Cr): AAA(SO), 8.0%. Sold to Mutual Funds.', 'Equity Tranche (₹50 Cr): Unrated. Held by NBFC for MRR compliance.', 'Credit Enhancement: ₹25 Cr FD held by Trustee.', 'Result: MFs get secure 8.0% yield. NBFC gets ₹450 Cr cash to finance more trucks.'] },
    ],
  },
  {
    id: 'waterfall-math',
    title: 'Waterfall Math',
    icon: '🔢',
    blocks: [
      { type: 'p', text: 'Pool: ₹10,000,000 (100 Auto Loans @ ₹100K each). Borrower Rate: 12%. Tranche A (Senior): ₹8M @ 8%. Tranche B (Equity): ₹2M. Servicing Fee: 1%.' },
      { type: 'h3', text: 'Month 1: Perfect (No Defaults)' },
      { type: 'p', text: 'Cash Collected: ₹300,000 (₹100K interest + ₹200K principal)' },
      { type: 'table', headers: ['Step', 'Payout', 'Amount', 'Remaining'], rows: [['1. Servicing Fee', 'Originator', '₹3,000', '₹297,000'], ['2. Tranche A Interest', '8% on ₹8M/12', '₹53,333', '₹243,667'], ['3. Tranche A Principal', '80% of principal', '₹160,000', '₹83,667'], ['4. Tranche B Principal', '20% of principal', '₹40,000', '₹43,667'], ['5. Excess Spread', 'Originator profit', '₹43,667', '₹0']] },
      { type: 'h3', text: 'Month 2: Disaster (Defaults Spike)' },
      { type: 'p', text: 'Cash Collected: Only ₹100,000' },
      { type: 'table', headers: ['Step', 'Payout', 'Amount', 'Remaining'], rows: [['1. Servicing Fee', 'Originator', '₹1,000', '₹99,000'], ['2. Tranche A Interest', 'Full amount', '₹53,333', '₹45,667'], ['3. Tranche A Principal', 'All remaining', '₹45,667', '₹0'], ['4. Tranche B', 'Nothing', '₹0', '₹0'], ['5. Excess Spread', 'Nothing', '₹0', '₹0']] },
      { type: 'callout', text: 'Tranche A (the Mutual Fund) still got their full interest payment despite massive defaults. The loss was absorbed by Tranche B and Excess Spread.' },
    ],
  },
  {
    id: 'interview',
    title: 'Interview Prep',
    icon: '🎯',
    blocks: [
      { type: 'h3', text: 'Q1: Walk me through a cash flow waterfall. Why is the Equity Tranche necessary?' },
      { type: 'p', text: 'The waterfall dictates strict payment priority. Statutory dues and Trustee fees first, then Senior (Class A), then Mezzanine, then Equity. The Equity tranche absorbs first losses, providing internal credit enhancement so Senior tranches can achieve AAA.' },
      { type: 'h3', text: 'Q2: If interest rates drop, what happens to RMBS yield?' },
      { type: 'p', text: 'Borrowers refinance (prepay) expensive mortgages for cheaper ones. The RMBS investor gets a flood of principal earlier than expected. Forced to reinvest at lower rates → overall realized yield drops (Reinvestment Risk).' },
      { type: 'h3', text: 'Q3: Why choose DA over PTCs?' },
      { type: 'p', text: 'DA is cheaper, faster, less complex — no SPV, no rating agency, no formal securities. Used when a bank urgently needs to buy a pool to meet PSL targets before financial year-end.' },
      { type: 'h3', text: 'Q4: What is MRR and why did RBI mandate it?' },
      { type: 'p', text: 'Minimum Retention Requirement: Originator must keep 5–10% on their books (usually the Equity Tranche). Post-2008 reform to ensure "skin in the game" — if Originators share default risk, they won\'t originate garbage loans.' },
      { type: 'h3', text: 'Q5: SARFAESI vs Securitization?' },
      { type: 'p', text: 'RBI guidelines = Capital Market Securitization (pooling good, performing Standard Assets → PTCs → raise liquidity). SARFAESI = Asset Reconstruction (selling Bad Loans/NPAs to ARCs → Security Receipts → clean up balance sheets).' },
      { type: 'h3', text: 'Q6: What is Commingling Risk?' },
      { type: 'p', text: 'Since the Originator usually acts as Servicer, they collect EMIs into their own accounts first. If the Originator goes bankrupt before transferring funds to SPV, the SPV\'s money gets legally tangled in the bankruptcy proceedings.' },
    ],
  },
  {
    id: 'memory-tricks',
    title: 'Memory Tricks',
    icon: '🧠',
    blocks: [
      { type: 'h3', text: '1. The "Water Filter" Analogy (Tranching)' },
      { type: 'p', text: 'Pour muddy river water (raw EMIs with defaults) into a multi-tier filter. Bottom filter (Equity) catches heavy mud — gets ruined but protects the rest. Middle filter (Mezzanine) catches pebbles. Clean glass at bottom (Senior) gets pure water. AAA returns for mutual funds.' },
      { type: 'h3', text: '2. The "Pizza" Analogy (PTC vs DA)' },
      { type: 'list', items: ['Direct Assignment: Bake a pizza, sell the ENTIRE pizza to your neighbor (SBI).', 'Securitization (PTCs): Bake a pizza, put it in a display case (SPV), slice it into 8 pieces (tranches), sell premium slices to MFs, keep the burnt crust (Equity) yourself.'] },
      { type: 'h3', text: '3. Mnemonic for the Players' },
      { type: 'callout', text: 'Only Smart Trustees See Real Investments\nO — Originator\nS — SPV (Trust)\nT — Trustee\nS — Servicer\nR — Rating Agency\nI — Investors' },
      { type: 'h3', text: '4. The SARFAESI Trick' },
      { type: 'callout', text: 'S — A — R — F — A — E — S — I\nStriking At Ruthless Faulters\nONLY for defaulters (NPAs). NOT for good loans.' },
      { type: 'h3', text: '5. The Waterfall Rule of Thumb' },
      { type: 'callout', text: 'Losses flow UP. Cash flows DOWN.\nDefault → hits Equity (bottom) first, moves UP.\nEMI collection → hits Senior (top) first, moves DOWN.' },
    ],
  },
];

function RenderBlock({ block }) {
  switch (block.type) {
    case 'h3':
      return <h3 className="text-[15px] md:text-[17px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mt-6 mb-2">{block.text}</h3>;
    case 'p':
      return <p className="text-[13px] md:text-[14px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6] mb-3">{block.text}</p>;
    case 'callout':
      return (
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-[#0066cc]/10 to-[#5ac8fa]/10 dark:from-[#0066cc]/20 dark:to-[#5ac8fa]/5 border border-[#0066cc]/15 dark:border-[#2997ff]/15">
          <p className="text-[13px] md:text-[14px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6] whitespace-pre-wrap font-medium">{block.text}</p>
        </div>
      );
    case 'list':
      return (
        <ul className="space-y-1.5 my-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-[13px] md:text-[14px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              <span className="text-[#0066cc] dark:text-[#2997ff] font-bold mt-0.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div className="my-4 rounded-2xl bg-[#1c1c1e] dark:bg-black p-4 overflow-x-auto">
          <code className="text-[12px] md:text-[13px] text-[#5ac8fa] font-mono whitespace-pre">{block.text}</code>
        </div>
      );
    case 'table':
      return (
        <div className="my-4 overflow-x-auto rounded-2xl border border-black/5 dark:border-white/10">
          <table className="w-full text-[12px] md:text-[13px]">
            <thead>
              <tr className="bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2.5 text-left font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-black/5 dark:border-white/5">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-[#1d1d1f] dark:text-[#a1a1a6] whitespace-nowrap">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function SecuritizationView({ onOpenFlashcards, globalMode, onToggleMode }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showToc, setShowToc] = useState(false);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="w-full min-h-full overflow-y-auto bg-[#f5f5f7] dark:bg-black pb-24 rounded-t-3xl md:rounded-t-none">
      {/* Hero Section */}
      <div className="px-6 py-12 md:py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-[12px] md:text-[14px] font-semibold tracking-widest uppercase text-[#86868b] mb-3">
          Securitization & Structured Finance
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#3399ff]">Complete Guide.</span>
        </h1>
        <p className="text-base md:text-lg font-medium text-[#86868b] max-w-2xl mx-auto leading-relaxed mb-6">
          From zero to mastery — 22 parts covering ABS, MBS, tranching, Indian regulations, the 2008 crisis, and interview prep.
        </p>

        {/* Mode Toggle + Flashcards Button */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={onToggleMode}
            className="px-4 py-2 text-[13px] font-medium rounded-full bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c] transition-colors"
          >
            {globalMode === 'focus' ? 'Focus Mode' : 'Cram Mode'}
          </button>
          <button
            onClick={onOpenFlashcards}
            className="px-5 py-2 text-[13px] font-semibold rounded-full bg-[#0066cc] text-white hover:bg-[#2997ff] transition-all active:scale-95"
          >
            Open Flashcards →
          </button>
        </div>
      </div>

      {/* Table of Contents Toggle */}
      <div className="px-4 md:px-8 max-w-4xl mx-auto mb-6">
        <button
          onClick={() => setShowToc(!showToc)}
          className="flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] dark:text-[#2997ff] hover:opacity-80 transition-opacity"
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${showToc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showToc ? 'Hide' : 'Table of Contents'} ({sections.length} parts)
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${showToc ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setExpandedSection(s.id); setShowToc(false); }}
                  className="px-3 py-1.5 text-[12px] font-medium rounded-full bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/5 dark:border-white/10 hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-colors"
                >
                  {s.icon} {i + 1}. {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-4 md:px-8 max-w-4xl mx-auto space-y-4">
        {sections.map((section, index) => {
          const isExpanded = expandedSection === section.id;
          return (
            <div
              key={section.id}
              className="group relative bg-white dark:bg-[#1c1c1e] rounded-[24px] overflow-hidden apple-shadow hover:shadow-2xl transition-all duration-500"
            >
              {/* Subtle gradient accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066cc]/20 to-[#3399ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-xl flex-shrink-0">{section.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold tracking-wide text-[#86868b] uppercase">
                      Part {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                      {section.title}
                    </h3>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-[#86868b] flex-shrink-0 ml-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expandable Content */}
              <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-6 md:pb-8 border-t border-black/5 dark:border-white/5 pt-4">
                    {section.blocks.map((block, bi) => (
                      <RenderBlock key={bi} block={block} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
