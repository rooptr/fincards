import fs from 'node:fs';
import { deepDiveLessons } from '../src/data/deepDiveLessons.js';
import { SECURITISATION_MASTERCLASS } from '../src/data/securitisationMasterclass.js';

const lessonScriptFile = 'scratch/securitisation_masterclass_audio_scripts.json';
const outputFile = 'scratch/securitisation_masterclass_episode_scripts.json';
const lessonScripts = JSON.parse(fs.readFileSync(lessonScriptFile, 'utf8'));
const generatedLessons = deepDiveLessons.filter((lesson) => (
  lesson.kind === 'securitisation-desk' && lesson.id !== 'securitization_desk_pilot'
));

const allSources = new Map();
for (const lesson of generatedLessons) {
  for (const source of Object.values(lesson.sources ?? {})) allSources.set(source.id, source);
}

const episodeBriefs = {
  1: {
    thesis: 'Securitisation begins by converting a defined and legally enforceable stream of asset cash flows into an investable claim. The central distinction is between financing a pool of contractual rights and merely borrowing against the reputation or general revenue of an operating institution.',
    opening: 'A lender may own a large book of loans and still need funding, risk distribution, or balance-sheet capacity. Securitisation addresses that problem by converting specified contractual cash flows into claims that investors can buy. The transaction is a chain of rights and obligations: an identified asset pool, an enforceable payment claim, a transfer, an issuing vehicle, and securities whose payment depends on the collateral rather than the originator’s general promise.',
    closing: 'The episode closes with the governing test: no securitisation conclusion is defensible until the analyst can identify the precise cash-flow right, its obligor, the transfer mechanism, the issuing vehicle, the collection path, and the claim that receives the cash. A security label cannot substitute for those facts.',
  },
  2: {
    thesis: 'Legal isolation is the condition that allows investors to look through the originator to the transferred collateral, while servicing is the operational condition that allows the collateral to keep producing cash after closing.',
    opening: 'The assets can be transferred on paper and still fail to produce an independent investor claim. The decisive questions are legal ownership, cash control, insolvency exposure, servicing continuity, and the remedies available when a party fails. An originator, special purpose vehicle, servicer, trustee, and account bank perform different functions; the transaction works only when those functions remain separable and enforceable under stress.',
    closing: 'The episode closes with a failure test. Ask what happens if the originator becomes insolvent, the servicer stops performing, collections are commingled, the transfer is challenged, or the data becomes unreliable. If the documents do not answer those questions, legal isolation and servicing continuity remain unproven.',
  },
  3: {
    thesis: 'Collateral is not a category name. It is a distribution of obligor behaviour, asset value, recovery timing, servicing quality, and cash-flow volatility that determines what the structure can pay.',
    opening: 'Collateral is not a label. It is a population of borrowers, contracts, recoveries, payment dates, servicing practices, and sources of volatility. An amortising auto-loan pool, a revolving credit-card pool, a distressed loan portfolio, a heterogeneous mortgage pool, and a whole business generate different cash-flow distributions. The correct evidence therefore begins with eligibility, seasoning, concentration, delinquency, default, recovery, prepayment, dilution, servicing, and reporting date.',
    closing: 'The episode closes with the discipline that collateral analysis must preserve. A pool average cannot conceal concentration, a carrying value cannot stand in for a recovery value, and a historical performance number cannot be carried forward without testing underwriting, servicing, borrower mix, and legal resolution conditions.',
  },
  4: {
    thesis: 'The transaction does not pay investors from collateral in the abstract. It pays them through a defined cash-flow form and a contractual waterfall that determines timing, priority, and shortfall allocation.',
    opening: 'Borrower collections do not reach every investor in the same form or at the same time. A pass-through structure preserves more of the collateral’s timing; a pay-through structure reshapes timing through a priority of payments. The waterfall determines which fees, reserves, interest, principal, and residual claims are paid first, and which class absorbs the shortfall when collections deteriorate.',
    closing: 'The episode closes with a tracing rule. Start with borrower collections and follow every permitted deduction, reserve test, interest payment, principal payment, loss allocation, and residual distribution. If a unit of cash cannot be traced from source to recipient under each relevant trigger state, the structure has not been understood.',
  },
  5: {
    thesis: 'Tranching divides one collateral cash-flow distribution into claims with different priority, timing, loss attachment, and control rights. Credit enhancement changes the loss capacity of those claims; it does not eliminate the underlying risk.',
    opening: 'One collateral pool can create materially different outcomes for senior, mezzanine, and residual investors because each claim occupies a different position in the loss and payment sequence. Subordination, excess spread, reserves, guarantees, liquidity support, attachment points, detachment points, sequential amortisation, and pro-rata pay determine when protection is consumed and when a tranche begins to absorb losses.',
    closing: 'The episode closes with a capital-structure test. Identify where losses attach, where they stop, what protects senior claims, what consumes that protection, and how the structure changes after a trigger breach. A rating or enhancement percentage is not a conclusion until those transitions are traced through the waterfall.',
  },
  6: {
    thesis: 'Risk transfer has several legal forms. A cash securitisation transfers asset cash flows, a synthetic securitisation transfers credit risk through protection, a re-securitisation transforms already structured exposures, and a regulatory framework determines whether the transfer is recognised and under what constraints.',
    opening: 'The legal form of a transaction does not always reveal where the credit risk sits. A cash securitisation transfers asset cash flows; a synthetic securitisation transfers credit risk while the loans remain on the balance sheet; a re-securitisation builds a second structure on top of existing structured claims. Capital relief and STS treatment therefore require separate tests for legal transfer, economic risk transfer, disclosure, retention, and regulatory recognition.',
    closing: 'The episode closes with a separation of questions. First ask what exposure moved. Then ask how it moved, who retained it, what protection was purchased, what happens under counterparty failure, and whether the applicable capital regime recognises the result. Regulatory relief is not evidence that credit risk disappeared.',
  },
  7: {
    thesis: 'Timing risk can dominate credit risk. Prepayment changes the life and reinvestment profile of a security, market liquidity determines whether a position can be financed or sold, and public liquidity facilities can support funding without guaranteeing collateral performance.',
    opening: 'A structured security can remain current on its collateral and still create a serious timing or funding problem. Prepayment changes expected life and reinvestment exposure; extension changes duration; market illiquidity changes the price and financing available to the investor. The PSA convention and TALF provide two distinct lenses: one describes expected principal timing, while the other supports funding against eligible asset-backed securities without guaranteeing their credit performance.',
    closing: 'The episode closes with the masterclass decision. A structured-finance conclusion is complete only when the reader can connect legal rights, collateral performance, servicing, cash-flow timing, waterfall priority, credit enhancement, counterparty risk, and market liquidity into one traceable transaction view. No single ratio, rating, facility, or benchmark can replace that chain.',
  },
};

const eventAssessments = {
  1: {
    eventTitle: 'The U.S. mortgage securitisation failure that preceded the 2008 crisis',
    eventDescription: 'Use the Financial Crisis Inquiry Commission record to examine how mortgage loans were originated, pooled, transferred, financed, rated, and sold. The event is not a history lecture. It is the evidence file for deciding whether a cash-flow stream was understood as a legally enforceable investment claim or treated as a scalable product label.',
    evidenceRule: 'Use the FCIC report for the historical sequence, the SEC material for transaction parties and disclosure, and RBI directions for the Indian comparison. State clearly when a rule belongs to the United States or India.',
    decision: 'You are reviewing a proposed pool. Before approving it, can you identify the receivable, the obligor, the transfer, the issuing vehicle, the cash path, the maturity profile, and the investor claim?',
    steps: [
      ['Securitisation', 'What made the mortgage pool an investable claim rather than merely a bank asset? Answer by identifying the contractual cash-flow right, transfer, issuing vehicle, and payment source.'],
      ['Cash Securitisation', 'Which cash flows were actually transferred, and which risks still belonged to the originator, servicer, or collateral? Do not confuse general business revenue with an enforceable receivable.'],
      ['Term Securitisation', 'What did the security promise about maturity, and what could make the collateral cash arrive on a different schedule? Test prepayment, default, recovery timing, and early amortisation.'],
      ['Conduit Securitisation', 'What changes when multiple pools or sellers use one funding platform? Test common eligibility rules, liquidity, concentration, servicing, and the possibility that diversification is only apparent.'],
    ],
    outcome: 'The historical lesson is not that securitisation itself is defective. It is that scale can hide weak underwriting, weak disclosure, misaligned incentives, and dependence on assumptions that were never tested under stress.',
    indiaBridge: 'Now translate the test to an Indian vehicle-loan pool originated in Mumbai and Pune. Use the RBI directions to ask what must be eligible, transferred, retained, serviced, and disclosed. Do not invent pool figures.',
  },
  2: {
    eventTitle: 'Lehman Brothers and the failure of confidence around structured vehicles',
    eventDescription: 'Use the FCIC record and SEC servicing and disclosure rules to examine what happens when the institution associated with a transaction enters distress. The exercise focuses on ownership, control, servicing, records, and enforceability rather than on retelling Lehman’s corporate history.',
    evidenceRule: 'Separate historical evidence from legal inference. The sources can show the crisis and the governing disclosure framework; they do not automatically prove the legal outcome of every individual transaction.',
    decision: 'The originator has entered insolvency. You are responsible for the investor file. Who owns the cash, who collects it, where is it held, and what happens if the servicer or account bank fails?',
    steps: [
      ['Originator', 'What obligations survive the transfer? Test underwriting, representations, repurchase, servicing, risk retention, and residual exposure.'],
      ['Special Purpose Vehicle', 'What does the SPV legally isolate? Test limited purpose, separateness, ownership, issuance, account control, and the difference between a structure and a genuine legal boundary.'],
      ['Bankruptcy Remoteness', 'Which failure is bankruptcy remoteness designed to reduce, and which failures remain? Separate originator insolvency from borrower default, servicing failure, and weak recoveries.'],
      ['Servicer', 'Can collections continue if the original servicer stops performing? Test data integrity, reconciliation, commingling, remittance, replacement servicing, and operational control.'],
    ],
    outcome: 'The decision is not “the deal is safe because an SPV exists.” The decision is whether the legal and operational controls keep the payment route identifiable, enforceable, and functioning after a critical party fails.',
    indiaBridge: 'Apply the same failure test to a hypothetical Indian housing-loan pool serviced from Chennai after the originator becomes distressed. Use RBI rules for the jurisdictional comparison and identify every fact that still requires transaction-level evidence.',
  },
  3: {
    eventTitle: 'The 2008 U.S. mortgage crisis and the problem of collateral heterogeneity',
    eventDescription: 'Use the FCIC record, SEC disclosure material, and the RBI ARC report to compare how different collateral types produce different default, recovery, timing, and servicing behaviour. The real event supplies evidence; the assessment asks whether you can classify the cash-flow risk correctly.',
    evidenceRule: 'Do not use one U.S. mortgage event as proof about Indian auto loans, cards, or stressed assets. Use it to demonstrate a mechanism, then return to the Indian comparison and state what evidence would be required.',
    decision: 'You have five proposed pools. Which one is amortising, which one revolves, which one is already distressed, which one depends on underwriting heterogeneity, and which one depends on an operating business?',
    steps: [
      ['Auto Loan Securitisation', 'For an Indian vehicle-loan pool in Bengaluru, test borrower payments, vehicle value, repossession, recovery severity, recovery timing, seasoning, geography, and prepayment.'],
      ['Credit Card Securitisation', 'For a revolving card pool in Delhi, test payment rate, utilisation, charge-offs, dilution, replenishment, excess spread, and early amortisation.'],
      ['Non-Performing Loan Securitisation', 'For a stressed-loan portfolio transferred to an Indian ARC, separate carrying value, recoverable value, enforcement, restructuring, recovery rate, and recovery timing.'],
      ['Non-Qualified Mortgage Securitisation', 'Use the crisis evidence to test underwriting heterogeneity, documentation, borrower capacity, collateral value, delinquency migration, and loss severity.'],
      ['Whole Business Securitisation', 'For an operating business in Hyderabad, test revenue continuity, contracts, customer concentration, operating disruption, and whether the business itself can keep producing cash.'],
    ],
    outcome: 'The correct conclusion is that collateral is a behaviour distribution, not an asset-class label. A pool average cannot replace stratification, concentration analysis, recovery evidence, and servicing analysis.',
    indiaBridge: 'Return to the Indian classroom. Compare a Pune two-wheeler pool, a Mumbai card pool, and a distressed loan pool. Do not give them the same stress assumptions merely because all three are called collateral.',
  },
  4: {
    eventTitle: 'TALF and the structured-cash problem during the 2008–09 market freeze',
    eventDescription: 'Use the Federal Reserve’s TALF announcement together with SEC disclosure material and RBI securitisation rules to examine how collateral cash becomes investor cash, and how funding stress can expose a weak waterfall or timing assumption.',
    evidenceRule: 'TALF is a U.S. liquidity facility, not Indian law and not a credit guarantee. Use it to demonstrate funding mechanics, then compare the analytical questions with an Indian transaction.',
    decision: 'Borrower collections are arriving, but not in the amount or timing investors expected. Trace the cash and decide which payment rule changes first.',
    steps: [
      ['Pass-Through Structure', 'What timing risk does the investor inherit when collateral collections pass through with limited reshaping? Test prepayment, recovery delay, servicing deductions, and liquidity.'],
      ['Pay-Through Structure', 'What does the issuer reshape, and what assumptions make the designed payment profile credible? Test reserves, triggers, interest, principal, and expected maturity.'],
      ['Payment Waterfall', 'Trace one rupee through collections, fees, reserves, interest, principal, losses, junior claims, and residual cash. Identify the first point at which an eighty-rupee collection changes later payments.'],
      ['Securitization Waterfall', 'Move the transaction into a trigger state. Test early amortisation, excess-spread redirection, reserve funding, sequential priority, pro-rata conditions, and senior control.'],
    ],
    outcome: 'Liquidity support can keep a market functioning, but it cannot repair a broken waterfall or guarantee weak collateral. The correct assessment follows cash from source to recipient under every relevant state.',
    indiaBridge: 'Apply the same trace to an Indian auto-loan pool with collections from Chennai and Hyderabad. Use rupees only as a conceptual unit unless the uploaded transaction provides real figures.',
  },
  5: {
    eventTitle: 'The collapse of structured-credit confidence in 2008',
    eventDescription: 'Use the FCIC record and official ABS materials to assess how tranching and credit enhancement redistributed losses during the crisis. The task is to reconstruct the loss path, not to repeat the definitions of senior and junior claims.',
    evidenceRule: 'Distinguish documented historical facts from the mechanics of a generic waterfall. Do not claim that one crisis transaction represents every securitisation.',
    decision: 'The collateral is deteriorating. You hold the senior note file. Can you prove where losses attach, what protection remains, when that protection is exhausted, and how principal allocation changes the result?',
    steps: [
      ['Tranching', 'Draw senior, mezzanine, and residual claims. Mark priority, subordination, attachment, detachment, expected timing, control rights, and the first-loss position.'],
      ['Pro-rata Pay', 'Compare shared principal with sequential amortisation. Test how each method changes protection consumption, expected life, principal timing, and the speed at which losses reach senior claims.'],
      ['Credit Enhancement', 'Separate subordination, excess spread, reserves, guarantees, and liquidity support. State why they fail differently and why an enhancement percentage is not a complete conclusion.'],
    ],
    outcome: 'The key assessment is a loss path: collateral deterioration enters the waterfall, enhancement is consumed, a trigger may change priority, and a tranche absorbs impairment according to the deal terms.',
    indiaBridge: 'Apply the loss path to a conceptual Indian housing-loan structure. Keep the structure realistic, but do not invent a rating, loss rate, or tranche balance.',
  },
  6: {
    eventTitle: 'The structured-credit crisis and the regulatory response to layered risk',
    eventDescription: 'Use the FCIC record, Basel framework, EUR-Lex STS regulation, RBI directions, and SEC material to examine how cash, synthetic, re-securitised, and regulated structures distribute risk and recognition.',
    evidenceRule: 'Every regulatory statement must carry its jurisdiction. RBI, Basel, European STS, and SEC materials answer different questions and are not interchangeable.',
    decision: 'A bank claims it has reduced risk and earned capital relief. You must decide what moved legally, what moved economically, who retained the exposure, what protection can fail, and what rule recognises the transfer.',
    steps: [
      ['Re-Securitization', 'Identify the original structured claim and the second structure built on it. Test correlation, model dependence, disclosure, opacity, and tranche-on-tranche exposure.'],
      ['Regulatory Capital Relief Securitization', 'Separate accounting derecognition, funding, economic transfer, legal transfer, risk retention, and prudential capital treatment.'],
      ['Synthetic Securitization', 'Trace the reference portfolio, credit event, protection provider, guarantee or credit-linked note, collateral, counterparty risk, and settlement.'],
      ['STS Securitization', 'Explain what simple, transparent, and standardised status requires and what it cannot guarantee about credit performance, liquidity, or investor losses.'],
    ],
    outcome: 'Capital relief is a regulatory result, not proof that economic risk vanished. The conclusion must identify the retained risk and the failure point that could reverse the regulatory or investment judgement.',
    indiaBridge: 'Use an Indian bank as the classroom subject and ask which claims can be made under RBI rules, which require Basel interpretation, and which cannot be imported from SEC or European standards.',
  },
  7: {
    eventTitle: 'TALF and the prepayment and funding pressures in asset-backed markets',
    eventDescription: 'Use the Federal Reserve TALF announcement, SIFMA’s PSA convention, and SEC ABS material to assess how borrower timing becomes investor reinvestment risk and how liquidity facilities support funding without guaranteeing collateral performance.',
    evidenceRule: 'PSA is a U.S. market convention and TALF is a U.S. facility. Do not present either as an Indian rule. Use Indian borrower examples only to explain the mechanism.',
    decision: 'The collateral is still paying, but borrowers repay at a different speed and the security becomes harder to finance. Is the problem credit, timing, duration, liquidity, or a combination?',
    steps: [
      ['PSA Prepayment Model', 'Define PSA, CPR, scheduled and unscheduled principal, benchmark convention, expected life, and the difference between a convention and a forecast.'],
      ['Term Asset-Backed Securities Loan Facility', 'Explain eligible collateral, haircuts, non-recourse funding, liquidity support, and why a facility can improve market functioning without guaranteeing default or recovery.'],
      ['Integrated Assessment', 'Trace early repayment into contraction and reinvestment risk. Trace slow repayment into extension and duration risk. Then separate both from credit performance and market liquidity.'],
    ],
    outcome: 'A complete judgement connects borrower timing, security duration, investor reinvestment, funding availability, collateral eligibility, and residual credit risk. No single benchmark or facility answers the whole question.',
    indiaBridge: 'Apply the timing test to Indian home-loan borrowers in Chennai and Mumbai. Use no invented prepayment rate. Explain what data would be required before estimating expected life.',
  },
};

// These are deliberately maintained separately from the lesson source records.
// The lesson records preserve the research provenance used during generation;
// the episode pack needs links that a learner can open directly in NotebookLM.
// In particular, the RBI-hosted PDFs are protected by an automated human check,
// so the readable RBI HTML directions page is the primary link for those sources.
const VERIFIED_SOURCES = {
  rbi_securitisation_standard_assets_2021: {
    title: 'Master Direction: RBI (Securitisation of Standard Assets) Directions, 2021',
    publisher: 'Reserve Bank of India',
    tier: 1,
    url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12165',
    fallbackUrl: 'https://www.rbi.org.in/scripts/BS_ViewMasterDirections.aspx',
    accessType: 'official_html',
    useFor: 'Definitions, eligibility, minimum retention, bankruptcy remoteness, tranches, synthetic securitisation, and structural requirements.',
  },
  rbi_transfer_loan_exposures_2021: {
    title: 'Master Direction: RBI (Transfer of Loan Exposures) Directions, 2021',
    publisher: 'Reserve Bank of India',
    tier: 1,
    url: 'https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12166',
    fallbackUrl: 'https://www.rbi.org.in/scripts/BS_ViewMasterDirections.aspx',
    accessType: 'official_html',
    useFor: 'Loan-transfer mechanics, economic interest, servicing, minimum holding period, representations, stressed-loan transfers, and transferor obligations.',
  },
  sec_structured_finance: {
    title: 'Asset-Backed Securities: Corporation Finance Interpretations',
    publisher: 'U.S. Securities and Exchange Commission',
    tier: 1,
    url: 'https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations-cfis/asset-backed-securities',
    accessType: 'official_html',
    useFor: 'ABS parties, transaction disclosure, servicer reporting, significant obligors, and the mechanics visible in public filings.',
  },
  sec_regulation_ab_final_rule: {
    title: 'Asset-Backed Securities Disclosure and Registration',
    publisher: 'U.S. Securities and Exchange Commission',
    tier: 1,
    url: 'https://www.sec.gov/rules-regulations/2014/09/s7-08-10',
    accessType: 'official_html',
    useFor: 'Regulation AB disclosure, asset-level information, transaction documents, servicing, and investor reporting requirements.',
  },
  rbi_arc_report: {
    title: 'Report of the Committee on the Functioning of Asset Reconstruction Companies',
    publisher: 'Reserve Bank of India',
    tier: 1,
    url: 'https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?ID=1188&UrlPage=',
    fallbackUrl: 'https://www.rbi.org.in/',
    accessType: 'official_html',
    useFor: 'Asset reconstruction, distressed-loan resolution, recovery timing, valuation, and ARC incentives.',
  },
  sifma_uniform_practices_psa: {
    title: 'Uniform Practices: Chapter 2',
    publisher: 'Securities Industry and Financial Markets Association',
    tier: 2,
    url: 'https://www.sifma.org/wp-content/uploads/2017/08/ch02.pdf',
    accessType: 'direct_pdf',
    useFor: 'Public Securities Association prepayment convention and the meaning of PSA speeds.',
  },
  fcic_report: {
    title: 'The Financial Crisis Inquiry Report',
    publisher: 'Financial Crisis Inquiry Commission',
    tier: 1,
    url: 'https://www.govinfo.gov/content/pkg/GPO-FCIC/pdf/GPO-FCIC.pdf',
    accessType: 'direct_pdf',
    useFor: 'Primary historical record on mortgage securitisation, incentives, opacity, rating dependence, and crisis transmission.',
  },
  bis_synthetic_securitisation: {
    title: 'Basel III: A global regulatory framework for more resilient banks and banking systems',
    publisher: 'Basel Committee on Banking Supervision',
    tier: 1,
    url: 'https://www.bis.org/publ/bcbs189.pdf',
    fallbackUrl: 'https://www.bis.org/fsi/fsisummaries/b3_secframe.pdf',
    accessType: 'direct_pdf',
    useFor: 'Securitisation capital treatment, synthetic risk transfer, hierarchy of protections, and prudential constraints.',
  },
  eu_sts_securitisation: {
    title: 'Regulation (EU) 2017/2402: Securitisation and STS framework',
    publisher: 'European Union, EUR-Lex',
    tier: 1,
    url: 'https://eur-lex.europa.eu/eli/reg/2017/2402/oj/eng?uri=CELEX%3A32017R2402',
    fallbackUrl: 'https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX%3A32017R2402',
    accessType: 'official_html',
    useFor: 'STS definition, simplicity, transparency, standardisation, risk retention, due diligence, repositories, and re-securitisation restrictions.',
  },
  federal_reserve_talf: {
    title: 'Federal Reserve announcement establishing TALF',
    publisher: 'Board of Governors of the Federal Reserve System',
    tier: 1,
    url: 'https://www.federalreserve.gov/monetarypolicy/20081125a.htm',
    fallbackUrl: 'https://www.federalreserve.gov/newsevents/recentactions200811.htm',
    accessType: 'official_html',
    useFor: 'TALF purpose, eligible ABS, non-recourse lending, haircuts, Treasury credit protection, and the distinction between liquidity support and credit risk.',
  },
};

const episodeSourceIds = {
  1: ['rbi_transfer_loan_exposures_2021', 'rbi_securitisation_standard_assets_2021', 'sec_structured_finance', 'fcic_report'],
  2: ['rbi_transfer_loan_exposures_2021', 'rbi_securitisation_standard_assets_2021', 'sec_regulation_ab_final_rule', 'fcic_report'],
  3: ['rbi_securitisation_standard_assets_2021', 'rbi_transfer_loan_exposures_2021', 'rbi_arc_report', 'sec_structured_finance', 'sec_regulation_ab_final_rule', 'fcic_report'],
  4: ['rbi_securitisation_standard_assets_2021', 'sec_structured_finance', 'sec_regulation_ab_final_rule', 'federal_reserve_talf'],
  5: ['rbi_securitisation_standard_assets_2021', 'sec_structured_finance', 'sec_regulation_ab_final_rule', 'fcic_report'],
  6: ['rbi_securitisation_standard_assets_2021', 'bis_synthetic_securitisation', 'eu_sts_securitisation', 'sec_structured_finance', 'fcic_report'],
  7: ['sifma_uniform_practices_psa', 'federal_reserve_talf', 'sec_structured_finance'],
};

const teachingPlans = {
  1: {
    objective: 'Build the learner’s transaction map before introducing legal, credit, or rating detail.',
    openingMove: 'Begin with the financing problem: a lender owns contractual cash flows but needs funding, risk distribution, or balance-sheet capacity. Put the learner inside the transaction before naming the structure.',
    sequence: ['Identify the receivable or loan cash flow.', 'Separate the originator from the issuing vehicle.', 'Show the transfer of rights and the issuance of claims.', 'Compare cash, term, revolving, and conduit forms.', 'Return to the question of what the investor legally owns and how that claim is paid.'],
    mustExplain: ['asset pool versus operating business', 'cash securitisation versus secured borrowing', 'term versus revolving collateral', 'conduit aggregation and concentration', 'cash-flow rights, obligor, issuer, and investor claim'],
    teachingRule: 'Every definition must be followed by the economic reason the structure exists and the risk that the structure isolates or leaves behind.',
    caseRule: 'Use the RBI and SEC materials as evidence of how the structure is defined and disclosed. The case is supporting evidence, not the lesson’s subject.',
    closeTest: 'The learner should be able to draw the transaction from borrower to originator to issuing vehicle to investor and explain every arrow.',
  },
  2: {
    objective: 'Make legal isolation and operational control concrete enough that the learner can diagnose a transaction after originator failure.',
    openingMove: 'Start with the uncomfortable question: if the originator enters insolvency tomorrow, who is legally entitled to the collections and who can still move the money?',
    sequence: ['Define originator, SPV, servicer, trustee, and account bank.', 'Trace legal ownership and economic interest separately.', 'Explain true sale, separateness, bankruptcy remoteness, and cash control.', 'Show servicing, commingling, replacement, and representation risks.', 'Stress the structure under originator insolvency and servicer failure.'],
    mustExplain: ['true sale versus risk transfer', 'bankruptcy remoteness', 'servicing continuity', 'commingling and collection-account risk', 'representations, repurchase, and replacement rights', 'why a legal opinion is evidence, not a substitute for mechanics'],
    teachingRule: 'Teach each legal term through the failure it is designed to prevent. Do not present legal isolation as a corporate org chart.',
    caseRule: 'Use the RBI directions and SEC servicing guidance to anchor the duties. State clearly when the public source does not disclose a transaction-level legal opinion.',
    closeTest: 'The learner should be able to answer who owns the cash, who collects it, where it sits, and what happens if each critical party fails.',
  },
  3: {
    objective: 'Teach collateral as a distribution of behaviour and recoverability rather than as a label attached to an asset class.',
    openingMove: 'Open with the decisive distinction: the same waterfall behaves differently when the collateral is an amortising auto loan, a revolving card receivable, a distressed loan, a heterogeneous mortgage, or a live operating business.',
    sequence: ['Classify the collateral’s contractual cash flow.', 'Identify the borrower or customer behaviour that drives payment.', 'Separate default, recovery, prepayment, dilution, and servicing effects.', 'Test concentration, seasoning, data quality, and legal enforceability.', 'Compare how each collateral type changes the structure’s stress case.'],
    mustExplain: ['amortising versus revolving pools', 'standard versus non-performing exposures', 'recovery value versus carrying value', 'underwriting heterogeneity', 'whole-business continuity risk', 'pool averages and concentration risk'],
    teachingRule: 'For every collateral type, answer what pays, what interrupts payment, what recovers after default, and which variable changes the expected timing of cash.',
    caseRule: 'Use RBI, SEC, and ARC materials to distinguish documented requirements from analytical inference. Never invent pool statistics when the public source does not provide them.',
    closeTest: 'The learner should be able to choose the correct evidence pack for a collateral pool and explain why a single headline default rate is insufficient.',
  },
  4: {
    objective: 'Make the cash-flow engine visible by tracing collections through the payment waterfall under more than one trigger state.',
    openingMove: 'Begin with a collection dollar and ask where it goes first, what can delay it, and which claim absorbs the shortfall when the dollar never arrives.',
    sequence: ['Start with borrower collections and permitted deductions.', 'Compare pass-through and pay-through timing.', 'Build the ordinary-period waterfall.', 'Change one trigger and trace the altered allocation.', 'Separate interest, principal, reserves, fees, and residual cash.'],
    mustExplain: ['pass-through versus pay-through', 'priority of payments', 'sequential versus pro-rata principal', 'reserve accounts and liquidity support', 'early amortisation and trigger mechanics', 'cash available to the issuer versus cash payable to each class'],
    teachingRule: 'Never describe a waterfall only in prose. State the order, the condition that changes it, and the consequence for each class.',
    caseRule: 'Use regulatory and disclosure sources for the permitted mechanics. If no public transaction waterfall is supplied, use the structure described in the lesson and label the missing deal-specific field rather than fabricating it.',
    closeTest: 'The learner should be able to trace one period of collections under normal performance and one period after a trigger breach.',
  },
  5: {
    objective: 'Teach tranching as loss sequencing and timing allocation, not as a list of senior, mezzanine, and equity labels.',
    openingMove: 'Present one collateral pool and ask why two investors can own claims on the same borrowers yet face different loss attachment, payment timing, and control rights.',
    sequence: ['Define tranche, seniority, subordination, attachment, and detachment.', 'Show how credit enhancement protects one claim by exposing another.', 'Trace losses through the capital structure.', 'Compare sequential and pro-rata principal allocation.', 'Test protection after a trigger and after enhancement is exhausted.'],
    mustExplain: ['loss allocation', 'credit enhancement versus credit quality', 'attachment and detachment points', 'excess spread, reserve, guarantee, and subordination', 'pro-rata pay and switching conditions', 'why rating is an output, not a risk analysis'],
    teachingRule: 'Use a loss path and a cash path. The learner must see both who is paid first and who absorbs deterioration first.',
    caseRule: 'Use RBI and SEC disclosure rules to ground the terminology. Do not imply that a rating or enhancement percentage alone proves protection.',
    closeTest: 'The learner should be able to say exactly where a loss attaches, when it reaches the senior claim, and what changes after a trigger.',
  },
  6: {
    objective: 'Separate legal transfer, economic risk transfer, and regulatory recognition, then show why additional structure can increase opacity.',
    openingMove: 'Start with the apparent paradox: the loans can remain on the bank’s balance sheet while the credit risk moves, or the risk can be packaged again without becoming simpler.',
    sequence: ['Define cash versus synthetic securitisation.', 'Explain protection providers, credit events, collateral, and counterparty risk.', 'Show how capital rules test risk transfer.', 'Explain STS as a regulatory designation with conditions.', 'Use re-securitisation and the crisis record to show how layered structures compound dependence.'],
    mustExplain: ['synthetic securitisation', 'credit-linked notes and guarantees', 'capital relief', 'risk retention', 'STS simplicity, transparency, and standardisation', 're-securitisation and correlation risk', 'legal, accounting, economic, and regulatory tests'],
    teachingRule: 'Keep four questions separate throughout: what asset moved, what risk moved, who retained it, and what the rule recognises.',
    caseRule: 'Use Basel, RBI, EUR-Lex, SEC, and FCIC sources for different claims. State the jurisdiction and date before making a regulatory statement.',
    closeTest: 'The learner should be able to explain why capital relief is not the same as economic risk elimination and why STS is not a guarantee of credit performance.',
  },
  7: {
    objective: 'Finish the curriculum by connecting borrower timing, security duration, and market funding without confusing liquidity support with credit protection.',
    openingMove: 'Begin with the timing problem: a security can repay early, repay late, or become difficult to finance even when its collateral has not defaulted.',
    sequence: ['Define prepayment and the PSA convention.', 'Explain expected life, legal maturity, duration, extension, and contraction risk.', 'Connect collateral timing to investor reinvestment and liquidity.', 'Explain TALF eligibility, haircuts, and non-recourse lending.', 'Return to the master transaction and integrate credit, legal, operational, timing, and market risk.'],
    mustExplain: ['CPR and PSA', 'benchmark convention versus forecast', 'expected versus legal maturity', 'extension and contraction', 'duration and reinvestment risk', 'haircut and collateral eligibility', 'liquidity facility versus credit guarantee'],
    teachingRule: 'For every timing concept, state what moves, why it moves, who bears the consequence, and which source supports the claim.',
    caseRule: 'Use SIFMA for the convention and the Federal Reserve release for TALF. Use SEC disclosure material to explain why prepayment and maturity assumptions matter to investors.',
    closeTest: 'The learner should be able to explain how one collateral pool can create different outcomes through credit, timing, and market-liquidity channels.',
  },
};

const sourceRoles = {
  rbi_securitisation_standard_assets_2021: 'Indian governing framework for securitisation of standard assets, transfer conditions, structural requirements, and payment mechanics.',
  rbi_transfer_loan_exposures_2021: 'Indian governing framework for transfer of loan exposures, including transfer conditions, originator obligations, and legal treatment.',
  sec_structured_finance: 'SEC primer and regulatory context for asset-backed securities, transaction parties, collateral, and disclosure.',
  sec_regulation_ab_final_rule: 'SEC final rule governing asset-backed securities registration, disclosure, servicing, and transaction reporting.',
  rbi_financial_markets: 'RBI publication context for Indian financial-market instruments and structured-finance terminology.',
  rbi_arc_report: 'RBI committee report for distressed assets, asset reconstruction, recovery strategy, and recovery timing.',
  sifma_uniform_practices_psa: 'SIFMA reference for the Public Securities Association standard prepayment model and its interpretation.',
  fcic_report: 'Official U.S. Financial Crisis Inquiry Commission record for mortgage securitisation, structured-credit incentives, and crisis transmission.',
  bis_synthetic_securitisation: 'Basel Committee material for securitisation, synthetic risk transfer, capital treatment, and prudential safeguards.',
  eu_sts_securitisation: 'European Commission framework for simple, transparent, and standardised securitisation.',
  federal_reserve_talf: 'Federal Reserve announcement establishing TALF, including the distinction between market liquidity support and collateral credit risk.',
};

function cleanLessonScript(script) {
  return repairText(String(script ?? '').replace(/^\[pause\]\s*/i, '').trim());
}

function episodeTransition(lesson, index) {
  const transitions = [
    `Let’s make that concrete with ${lesson.canonicalName.toLowerCase()}.`,
    `That gives us the frame. Now look at ${lesson.canonicalName.toLowerCase()} and see how the frame behaves in practice.`,
    `Keep that mechanism in mind as we turn to ${lesson.canonicalName.toLowerCase()}.`,
    `Here is the next piece of the puzzle: ${lesson.canonicalName.toLowerCase()}.`,
    `Now follow the same cash flow through ${lesson.canonicalName.toLowerCase()}.`,
  ];
  return transitions[index % transitions.length];
}

function naturalClosing(value) {
  return repairText(value)
    .replace(/^The episode closes with [^.]+\.\s*/i, 'Before you move on, ')
    .replace(/^Before you move on, Ask\b/, 'Before you move on, ask')
    .replace(/\bthe analyst\b/gi, 'you')
    .replace(/\bthe documents\b/gi, 'the deal terms')
    .replace(/\bsource pack\b/gi, 'available evidence');
}

function episodeAssignment(number) {
  const tasks = {
    1: 'Before you move on, draw the full transaction from borrower to investor and label every legal claim and cash-flow handoff.',
    2: 'Before continuing, write the failure sequence for an originator, servicer, collection account, and issuing vehicle. State who controls cash at each point.',
    3: 'Before the next episode, choose one collateral pool and list the data needed to distinguish default risk, recovery risk, timing risk, and concentration risk.',
    4: 'Before moving forward, trace one period of collections under normal performance and then again after a trigger changes the waterfall.',
    5: 'Before you continue, draw the loss path through senior, mezzanine, and residual claims and mark where each form of enhancement is consumed.',
    6: 'Before the next episode, answer four questions for one transaction: what moved, who retained it, what rule recognises it, and what could reverse that conclusion?',
    7: 'Before leaving the masterclass, write a one-page transaction view connecting legal rights, pool performance, servicing, timing, waterfall priority, enhancement, and liquidity.',
  };
  return tasks[number];
}

function repairText(value) {
  return String(value ?? '')
    .replaceAll('â€™', '’')
    .replaceAll('â€œ', '“')
    .replaceAll('â€', '”')
    .replaceAll('â€“', '–')
    .replaceAll('â€”', '—')
    .replaceAll('â€¦', '…')
    .replaceAll('Â', '');
}

function repairValue(value) {
  if (typeof value === 'string') return repairText(value);
  if (Array.isArray(value)) return value.map(repairValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairValue(item)]));
  }
  return value;
}

function lessonForTopic(topicId) {
  return generatedLessons.find((lesson) => lesson.topicId === topicId);
}

function sourcePackForLessons(lessons) {
  const episodeNumber = lessons[0]?.series?.episodeNumber;
  const sourceIds = episodeSourceIds[episodeNumber] ?? [...new Set(lessons.flatMap((lesson) => Object.keys(lesson.sources ?? {})))];
  return sourceIds.map((sourceId) => {
    const source = allSources.get(sourceId);
    const verified = VERIFIED_SOURCES[sourceId];
    if (!verified) throw new Error(`No verified source mapping for ${sourceId}`);
    return {
      id: sourceId,
      tier: verified.tier ?? source?.tier,
      title: repairText(verified.title ?? source?.title),
      publisher: repairText(verified.publisher ?? source?.publisher),
      url: verified.url,
      fallbackUrl: verified.fallbackUrl,
      accessType: verified.accessType,
      useFor: repairText(verified.useFor),
      role: repairText(sourceRoles[sourceId] ?? 'Primary or governing source used by the episode lessons.'),
    };
  });
}

function notebookPrompt(episode, brief, teachingPlan, lessons) {
  const lessonNames = lessons.map((lesson) => `${lesson.series.overallSequence}. ${lesson.canonicalName}`).join('; ');
  return [
    `Generate Episode ${episode.number} of 7 of the Securitisation Masterclass for MBA finance students.`,
    `Episode title: ${episode.title}.`,
    `Required intellectual thesis: ${brief.thesis}`,
    `Teaching objective: ${teachingPlan.objective}`,
    `Opening method: ${teachingPlan.openingMove}`,
    `Teach the lessons in this exact order: ${lessonNames}.`,
    `Required teaching sequence: ${teachingPlan.sequence.join(' | ')}.`,
    `Terms and mechanisms that must be taught: ${teachingPlan.mustExplain.join(', ')}.`,
    `Teaching rule: ${teachingPlan.teachingRule}`,
    `Case rule: ${teachingPlan.caseRule}`,
    `Closing test: ${teachingPlan.closeTest}`,
    'Use the episode script as the canonical teaching sequence. Use only the verified official sources in this packet to explain and verify claims. Do not invent a transaction number, benchmark, date, legal conclusion, or performance statistic that is absent from the sources.',
    'The audio must teach the concept, not merely narrate the case. Define every technical term on first use, explain the economic mechanism, state the decision implication, identify the assumption, and name the failure condition.',
    'Speak directly to the learner as a strong teacher. Do not mention the lesson plan, source packet, document pack, production process, or these instructions in the audio. Do not announce sections or say what the episode will do next.',
    'Maintain a rigorous graduate finance register for MBA students. Avoid filler, motivational language, casual phrasing, generic analyst commentary, and unexplained acronyms. Do not skip any lesson, term, mechanism, source boundary, or applied question in the episode script.',
    'Use the case or historical event only when it proves a mechanism. Return from the evidence to the general concept before moving on.',
    'If a source link fails, use its listed fallback URL or the local file supplied with this episode. Do not replace a primary source with a search-result page, a scraped summary, or an unverified secondary article.',
    'When sources disagree or leave a field undisclosed, state the conflict or evidence gap directly. Do not smooth it over with an approximation.',
    'The bracketed pause at the beginning is intentional. Preserve it before generating audio, but do not announce the token.',
  ].join(' ');
}

function assessmentAnswer(lesson, event) {
  const governingQuestion = repairText(lesson.governingQuestion ?? 'what cash flow, right, or risk does this concept isolate');
  const decision = repairText(lesson.decision ?? 'the decision must be bounded by the available evidence');
  const stress = repairText(lesson.stress?.trace ?? 'trace the changed assumption through collections, protection, triggers, payment priority, and investor cash flow').replace(/[.]+$/, '');
  return `The answer begins with this governing question: ${governingQuestion} The decision implication is: ${decision} Under stress, the trace is: ${stress}.`;
}

function assessmentScript(episode, lessons, brief, teachingPlan, event) {
  const names = lessons.map((lesson) => lesson.canonicalName);
  const lessonNames = names.length === 1
    ? names[0]
    : names.length === 2
      ? `${names[0]} and ${names[1]}`
      : `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`;
  const lines = [
    '[pause]',
    'Hey there, Deepti. I hope your preparation is going well and that you are staying hydrated.',
    `This is Episode ${episode.number} of 7. It brings together ${lessons.length} linked concepts: ${lessonNames}.`,
    'Today, we are going to apply those concepts to a real event and make a securitisation decision. We will not repeat the lessons as definitions. We will use them to test what the structure actually does.',
    event.eventTitle + '.',
    event.eventDescription,
    `Here is the decision in front of you: ${event.decision}`,
    `The evidence rule is simple: ${event.evidenceRule}`,
    'Pause here. Before hearing the reasoning, decide what fact, legal right, cash-flow rule, or risk assumption you would test first.',
  ];

  for (const [index, step] of event.steps.entries()) {
    const lesson = lessons[index] ?? lessons[lessons.length - 1];
    lines.push(
      `Now apply sublesson ${lesson.series.overallSequence}, ${step[0]}.`,
      step[1],
      'Take a moment and answer that question before continuing.',
      `The assessment answer is this: ${assessmentAnswer(lesson, event)}`,
      index === event.steps.length - 1 ? 'That is the point at which the sublessons connect: the label matters only after the cash flow, legal claim, timing, and failure condition are identified.' : 'Keep that result in mind. The next decision changes the same transaction from a different angle.',
    );
  }

  lines.push(
    `Now compare your judgement with the real event. ${event.outcome}`,
    `Return to India. ${event.indiaBridge}`,
    'Final assessment. Answer these questions aloud: What moved? Who owned the cash? Who controlled collection? Which assumption failed or was most exposed? Which claim absorbed the consequence first? What evidence would change your conclusion?',
    episodeAssignment(episode.number),
    `The durable lesson is this: ${brief.thesis}`,
    `Before you leave this case, explain why ${teachingPlan.closeTest.toLowerCase()}`,
  );
  return lines.join('\n\n');
}

const episodes = SECURITISATION_MASTERCLASS.episodes.map((episode) => {
  const lessons = episode.topicIds.map(lessonForTopic).filter(Boolean);
  const brief = episodeBriefs[episode.number];
  const teachingPlan = teachingPlans[episode.number];
  const event = eventAssessments[episode.number];
  const script = assessmentScript(episode, lessons, brief, teachingPlan, event);

  return {
    number: episode.number,
    id: episode.id,
    title: episode.title,
    lessonIds: lessons.map((lesson) => lesson.id),
    lessonOrder: lessons.map((lesson) => ({
      overallSequence: lesson.series.overallSequence,
      lessonId: lesson.id,
      canonicalName: lesson.canonicalName,
      headline: lesson.title,
    })),
    thesis: brief.thesis,
    format: 'Real-event assessment and transaction decision lab',
    eventAssessment: event,
    teachingPlan,
    sources: sourcePackForLessons(lessons),
    azurePrompt: `Render this as an instructor-led MBA assessment based on the real event ${event.eventTitle}. Teach the decision questions and answers in the script. Do not repeat the 25 lessons as a glossary. Do not narrate production instructions. Use the script as the canonical spoken content and the listed sources as evidence.`,
    notebookPrompt: notebookPrompt(episode, brief, teachingPlan, lessons),
    script,
  };
});

const repairedEpisodes = repairValue(episodes);
const output = {
  schemaVersion: 'securitisation-masterclass-episode-assessment-scripts.v2',
  series: {
    id: SECURITISATION_MASTERCLASS.id,
    title: SECURITISATION_MASTERCLASS.title,
    totalEpisodes: episodes.length,
    totalLessons: generatedLessons.length,
    openingPauseSeconds: 1,
    openingPauseToken: '[pause]',
    composition: 'Each episode is a real-event assessment and transaction decision lab. The 25 lessons remain the conceptual foundation; the seven episodes apply them to sourced historical events and decision points.',
  },
  episodes: repairedEpisodes,
};

fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);

const sourceMarkdown = [
  `# ${SECURITISATION_MASTERCLASS.title}: Azure Episode Assessment Source Packs`,
  '',
  'Use the matching clean episode text file as the Azure narration source. The official documents listed for each episode are the evidence pack used to research and verify the assessment. Do not narrate the source list, production metadata, or lesson plan.',
  '',
  ...repairedEpisodes.flatMap((episode) => [
    `## Episode ${episode.number}: ${episode.title}`,
    '',
    `Real-event assessment: ${episode.eventAssessment.eventTitle}`,
    `Event context: ${episode.eventAssessment.eventDescription}`,
    '',
    `Lessons: ${episode.lessonOrder.map((lesson) => `${lesson.overallSequence}. ${lesson.canonicalName}`).join('; ')}`,
    '',
    `Teaching objective: ${episode.teachingPlan.objective}`,
    `Opening method: ${episode.teachingPlan.openingMove}`,
    `Teaching sequence: ${episode.teachingPlan.sequence.join(' | ')}`,
    `Must explain: ${episode.teachingPlan.mustExplain.join(', ')}`,
    `Teaching rule: ${episode.teachingPlan.teachingRule}`,
    `Case rule: ${episode.teachingPlan.caseRule}`,
    `Closing test: ${episode.teachingPlan.closeTest}`,
    '',
    ...episode.sources.flatMap((source) => [
      `- **${source.title}**`,
      `  - Publisher: ${source.publisher}`,
      `  - Tier: ${source.tier}`,
      `  - Role: ${source.role}`,
      `  - URL: ${source.url}`,
      source.fallbackUrl ? `  - Fallback URL: ${source.fallbackUrl}` : null,
      `  - Access: ${source.accessType}`,
      `  - Use for: ${source.useFor}`,
    ].filter(Boolean)),
    '',
    `Azure episode instruction: ${episode.azurePrompt}`,
    '',
  ]),
].join('\n');
const sourceMarkdownFile = 'scratch/securitisation_masterclass_episode_sources.md';
fs.writeFileSync(sourceMarkdownFile, `${sourceMarkdown}\n`);

const cleanAudioDirectory = 'scratch/securitisation_masterclass_episode_audio_text';
fs.mkdirSync(cleanAudioDirectory, { recursive: true });
const cleanAudioFiles = repairedEpisodes.map((episode) => {
  const file = `${cleanAudioDirectory}/episode-${String(episode.number).padStart(2, '0')}.txt`;
  fs.writeFileSync(file, `${episode.script}\n`);
  return file;
});

console.log(JSON.stringify({ outputFile, sourceMarkdownFile, cleanAudioDirectory, cleanAudioFiles, episodes: episodes.length, lessons: generatedLessons.length, sourceCounts: episodes.map((episode) => episode.sources.length) }));
