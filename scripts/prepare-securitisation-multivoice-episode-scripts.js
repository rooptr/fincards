import fs from 'node:fs';
import { deepDiveLessons } from '../src/data/deepDiveLessons.js';

const inputFile = 'scratch/securitisation_masterclass_episode_scripts.json';
const outputFile = 'scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json';
const textDirectory = 'scratch/securitisation_masterclass_multivoice_episode_audio_text_v3';
const episodeOneOverride = 'scripts/content/securitisation/episode-01-documentary.txt';

const source = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
fs.mkdirSync(textDirectory, { recursive: true });

const openings = {
  1: [
    ['DIYA', 'A lender has a book of loans, but the balance sheet is not a vault. It has funding needs, capital limits, and investors asking what exactly they are buying.'],
    ['ARJUN', 'And I am here before you turn that into a neat little diagram and forget the borrower.'],
    ['DIYA', 'Good. Then let us begin with the borrower payment itself, because securitisation is a financing structure built around a defined cash flow, not a fashionable label.'],
  ],
  2: [
    ['ARJUN', 'Today we are talking about the institutions that sit around a securitisation. The obvious place to start is the issuing vehicle and the rating label attached to it.'],
    ['DIYA', 'Dude, that is not the topic we are discussing yet. Before we catalogue institutions or ratings, we need the uncomfortable question: if the originator fails tomorrow, who is still entitled to the collections?'],
    ['ARJUN', 'Fair. I tried to start with the furniture before checking whether the house had a foundation.'],
  ],
  3: [
    ['DIYA', 'Two pools can carry the same headline asset label and have completely different risk. A vehicle loan, a credit card receivable, and a distressed loan do not pay in the same way.'],
    ['ARJUN', 'But the pool average should give us a useful first answer.'],
    ['DIYA', 'A first answer, perhaps. A defensible answer, no. The distribution behind the average is where the risk lives.'],
  ],
  4: [
    ['ARJUN', 'A securitisation pays investors according to a waterfall, so the main issue is who gets paid first.'],
    ['DIYA', 'Wait. That jumps straight to priority and skips the cash itself. This episode begins with how borrower cash is collected, filtered, prioritised, and sometimes redirected.'],
    ['ARJUN', 'Right. I opened with the queue before asking where the money came from.'],
  ],
  5: [
    ['DIYA', 'One pool can create claims with sharply different outcomes. The difference is not the collateral. It is where each claim sits when cash arrives and losses appear.'],
    ['ARJUN', 'Senior means safe, mezzanine means risky, and residual means whatever is left. That is the short version.'],
    ['DIYA', 'It is also too short to survive an interview. We need to trace attachment, detachment, enhancement, triggers, and payment priority.'],
  ],
  6: [
    ['ARJUN', 'The bank says the risk has moved, so the capital problem is probably solved.'],
    ['DIYA', 'No. That is exactly the conclusion we must earn, not assume. Risk transfer is not one thing. We must separate the legal form, retained exposure, counterparty, and regulatory rule that recognises the transfer.'],
    ['ARJUN', 'Understood. I tried to claim the regulatory conclusion before identifying the exposure.'],
  ],
  7: [
    ['DIYA', 'A security can remain current and still disappoint its investor. The borrower may pay earlier, later, or into a market that will not finance the position.'],
    ['ARJUN', 'So this is a credit problem.'],
    ['DIYA', 'Not necessarily. It may be prepayment, extension, reinvestment, duration, funding, or market liquidity. We will keep those risks separate.'],
  ],
};

const lessonMoves = {
  1: [
    ['That sounds like a standard bank funding exercise.', 'Only if the investor is relying on the bank’s general promise. The defining question is whether a specified contractual cash flow has been transferred and used to support an investable claim.'],
    ['If the loans are sold, every related risk leaves the originator.', 'A transfer of cash flows does not erase servicing, representation, repurchase, counterparty, or residual risks. Identify the right that moved and the risks that remained.'],
    ['A term security has a maturity date, so timing is fixed.', 'The security has contractual terms, but collateral payments can arrive early, late, or at a lower recovery value. Expected maturity is a cash flow question, not a label.'],
    ['A conduit diversifies everything because it combines many pools.', 'Aggregation can diversify idiosyncratic risk, but it can also hide common underwriting, seller, servicing, and liquidity exposures.'],
  ],
  2: [
    ['The SPV owns the assets, so bankruptcy remoteness is automatic.', 'Ownership must be legally effective and operationally controlled. The test includes separateness, transfer enforceability, account control, and the treatment of collections.'],
    ['A true sale means the originator has no further exposure.', 'True sale addresses transfer classification and insolvency isolation. It does not eliminate representations, servicing duties, repurchase obligations, retained interests, or counterparty exposure.'],
    ['Bankruptcy remoteness protects the deal from every failure.', 'It is designed primarily to reduce the risk that originator insolvency captures transferred assets. Borrower default, weak recoveries, servicer failure, and data failure remain separate risks.'],
    ['The original servicer knows the loans best, so replacement is unnecessary.', 'Knowledge is useful, but dependence is a structural vulnerability. Continuity requires data, reconciliation, remittance, commingling controls, and a credible replacement path.'],
  ],
  3: [
    ['An auto loan pool pays through scheduled instalments and vehicle recoveries.', 'Yes, and the analysis must add seasoning, geography, borrower quality, repossession, recovery severity, recovery timing, and prepayment. The collateral label is only the starting point.'],
    ['Card receivables are just short term loans with a different name.', 'A revolving card pool has replenishment, utilisation, payment rate, dilution, charge-offs, and early amortisation risk. Its cash-flow engine is behavioural and revolving.'],
    ['A non-performing loan is worth its carrying value until recovery proves otherwise.', 'Carrying value is an accounting measure. Recoverable value depends on enforcement, restructuring, collateral, timing, costs, and the probability distribution of outcomes.'],
    ['The mortgage crisis proves every non-qualified mortgage pool is unfinanceable.', 'It proves that underwriting heterogeneity, documentation, borrower capacity, collateral value, and correlation must be tested. It does not replace transaction evidence with a category verdict.'],
    ['Whole business securitisation is simply a larger receivables pool.', 'The cash source depends on the operating business continuing to function. Contracts, customers, suppliers, management, disruption, and concentration become part of the payment analysis.'],
  ],
  4: [
    ['In a pass through, investors receive whatever the collateral pays.', 'That preserves more of the collateral timing, so the investor bears more timing variation. It does not mean the investor receives gross collections without servicing, fees, or structural rules.'],
    ['A pay through removes timing risk because the issuer designs the payment profile.', 'It reshapes timing; it does not abolish uncertainty. Reserves, triggers, prepayment, default, and recovery assumptions determine whether the designed profile remains credible.'],
    ['The waterfall is just fees first, then interest, then principal.', 'That is only a sequence. We must identify the exact accounts, permitted deductions, reserve tests, loss allocation, trigger states, and residual conditions.'],
    ['Once the normal waterfall is understood, the stress case is obvious.', 'Stress can change priority. Early amortisation, sequential payment, excess spread redirection, reserve use, and trigger breaches may alter who controls cash and who absorbs deterioration.'],
  ],
  5: [
    ['The senior note is protected because it is paid first.', 'Payment priority protects senior cash flow only while available collections and enhancement support it. Loss attachment and the depletion of protection determine the actual outcome.'],
    ['Pro rata principal is fair because every tranche receives its share.', 'Fairness is not the objective. Pro rata payment can reduce the speed at which senior protection builds, while sequential payment can preserve senior protection and extend junior exposure.'],
    ['Credit enhancement means the underlying credit risk has been removed.', 'Enhancement reallocates or absorbs losses. Subordination, excess spread, reserves, guarantees, and liquidity support fail through different mechanisms and must not be treated as interchangeable.'],
  ],
  6: [
    ['Cash securitisation and synthetic securitisation are different names for the same transfer.', 'Cash securitisation transfers asset cash flows or interests. Synthetic securitisation transfers credit risk through protection while the assets may remain on the balance sheet.'],
    ['Synthetic protection means the bank no longer bears the loss.', 'The bank may retain counterparty, collateral, basis, documentation, concentration, and protection-provider risks. The protection contract must be tested under default and termination.'],
    ['Re-securitisation creates diversification because it pools existing tranches.', 'It can create a second layer of correlation and opacity. The underlying tranche exposures, triggers, model assumptions, and dependency structure must be reopened.'],
    ['Regulatory recognition proves the transaction reduced economic risk.', 'Recognition is conditional on the applicable framework. It may require retention, disclosure, operational standards, eligible protection, and enforceable risk transfer. Economic risk and capital treatment are separate conclusions.'],
  ],
  7: [
    ['A higher PSA speed means the collateral is performing better.', 'It means principal is arriving faster under the prepayment convention. That may create contraction and reinvestment risk rather than a credit improvement.'],
    ['A slower prepayment speed is safer because the investor receives income for longer.', 'It may extend duration and delay principal. The investor must distinguish yield, expected life, extension risk, and the opportunity cost of delayed cash.'],
    ['TALF guaranteed the credit quality of asset backed securities.', 'It supplied non-recourse funding against eligible collateral. Funding support can improve market liquidity without guaranteeing borrower payment, recovery, or market value.'],
  ],
};

const humor = {
  1: ['ARJUN', 'I was hoping the diagram would do the speaking for me.', 'DIYA', 'The diagram is innocent. The shortcut is yours.'],
  2: ['ARJUN', 'I have officially stopped trusting boxes.', 'DIYA', 'Good. In structured finance, the arrows deserve more suspicion than the boxes.'],
  3: ['ARJUN', 'So the average is not the hero of this story.', 'DIYA', 'It can be a useful supporting actor. It is a poor lead witness.'],
  4: ['ARJUN', 'The waterfall has more opinions than our investment committee.', 'DIYA', 'At least the waterfall writes its opinions into the deal documents.'],
  5: ['ARJUN', 'I would like to apologise to every senior tranche I called safe.', 'DIYA', 'Apology accepted. Now show where the protection attaches.'],
  6: ['ARJUN', 'So “risk transfer” needs a footnote the size of a textbook.', 'DIYA', 'Only when the transaction is complicated enough to deserve one.'],
  7: ['ARJUN', 'The borrower paid, and somehow that still caused trouble.', 'DIYA', 'Timing is often the quiet member of the risk committee.'],
};

const episodeCulturalTurns = {
  1: {
    opening: [
      ['DIYA', 'Krishna does not ask Arjuna to memorise the entire battlefield before acting. He asks him to identify the decisive duty. Here, that means following one borrower payment and asking who owns the right to it at every handoff.'],
    ],
    close: [
      ['MEERA', 'The Iron Bank would not be impressed by the name of the sponsor. It would ask who pays, from which cash flow, and what remedy survives when the borrower or the lender fails.'],
    ],
  },
  2: {
    opening: [
      ['DIYA', 'The Wall was useful only because the gates, the Night\'s Watch, and command still worked under pressure. An S P V is the same kind of promise: legal separation matters only when records, accounts, servicing, and governance still work after distress.'],
    ],
    close: [
      ['MEERA', 'Abhimanyu knew how to enter the Chakravyuha but not how to leave it. A transaction that has closing mechanics but no credible replacement-servicer or failure plan has the same weakness.'],
    ],
  },
  3: {
    opening: [
      ['DIYA', 'Krishna forces Arjuna to isolate the decisive fact. In collateral analysis, that means separating borrower capacity, recovery value, payment timing, and servicing quality instead of trusting an asset-class label.'],
    ],
    close: [
      ['MEERA', 'The Red Wedding is a warning against false diversification. Different borrowers, products, or pools can still fail together when the same underwriting weakness, geography, or funding condition sits underneath them.'],
    ],
  },
  4: {
    opening: [
      ['MEERA', 'The line of succession to the Iron Throne is not a perfect analogy, but the priority logic is exact: one pot of value can support many claimants, and the order of entitlement determines who waits when the pot is too small.'],
    ],
    close: [
      ['DIYA', 'The Iron Bank would trace the payment order before trusting the headline collection number. The amount of cash is only the beginning; priority determines whose claim is actually paid.'],
    ],
  },
  5: {
    opening: [
      ['DIYA', 'A tranche is not a personality trait called safe or risky. It is a position in a loss sequence. The Chakravyuha is useful here because each ring changes who encounters the loss first and who remains protected behind it.'],
    ],
    close: [
      ['MEERA', 'Succession to the Iron Throne also changes when a claimant disappears. In a capital structure, enhancement is that buffer: once it is consumed, the next claim inherits the loss.'],
    ],
  },
  6: {
    opening: [
      ['MEERA', 'Littlefinger built influence by making appearances and underlying obligations diverge. Synthetic risk transfer requires the opposite discipline: identify what legally moved, what economically moved, and what exposure remains hidden beneath the presentation.'],
    ],
    close: [
      ['DIYA', 'Varys would ask whether the information reaches the person who can act when the credit event occurs. In a synthetic deal, the protection wording, collateral terms, and counterparty reporting decide whether the claimed transfer works under stress.'],
    ],
  },
  7: {
    opening: [
      ['DIYA', 'At the Wall, timing mattered as much as strength. Supplies arriving after winter had already bitten did not solve the immediate problem. Prepayment and extension risk have the same logic: cash arriving at the wrong time can still damage the investor.'],
    ],
    close: [
      ['MEERA', 'The Iron Bank survives by respecting liquidity as well as credit. T A L F could support funding markets, but it could not force borrowers to pay or eliminate the investor\'s remaining exposure.'],
    ],
  },
};

function appendEpisodeCulturalTurns(lines, number, phase) {
  for (const [speaker, text] of episodeCulturalTurns[number]?.[phase] ?? []) push(lines, speaker, text);
}

const spokenEventContext = {
  1: 'During the U.S. mortgage boom, loans were originated, pooled, transferred, financed, rated, and sold at extraordinary scale. The useful question is whether the cash flows, underwriting, incentives, and legal claims were understood before investors relied on them.',
  2: 'When Lehman Brothers entered distress, structured finance faced a practical test. Investors needed to know whether transferred assets, collection records, servicing operations, and payment accounts would remain usable when a major institution failed.',
  3: 'The 2008 mortgage crisis showed why two pools with the same broad label can produce very different losses. Borrower capacity, documentation, collateral value, servicing, concentration, and recovery timing shape the cash flow distribution.',
  4: 'During the 2008 to 2009 market freeze, asset backed securities could still contain performing loans while becoming difficult to finance or sell. The event makes the cash path and payment waterfall impossible to treat as clerical detail.',
  5: 'The structured credit losses of 2008 exposed the difference between a collateral pool and the claims written against it. Senior, mezzanine, and residual investors did not experience the same cash flow or loss, even when they referenced the same assets.',
  6: 'The crisis and its regulatory response forced a harder question: what risk actually moved, what risk stayed behind, and what conditions must be met before a regulator recognises the transfer?',
  7: 'Asset backed markets also showed that a borrower can repay exactly as promised and still create an investor problem. Faster repayment can force reinvestment. Slower repayment can extend duration. Funding support can improve liquidity without guaranteeing credit performance.',
};

const spokenIndiaBridge = {
  1: 'Apply the same test to a vehicle loan pool originated across Mumbai and Pune. Identify the borrower payment, the transfer, the issuing vehicle, the collection route, and the risks that remain.',
  2: 'Imagine the same failure in an Indian housing loan pool serviced from Chennai. Who owns the cash, who can move it, and who takes over if the original servicer stops?',
  3: 'Compare a Pune two wheeler pool, a Delhi card pool, and a distressed loan portfolio. They are all collateral, but they do not produce the same default, recovery, or timing behaviour.',
  4: 'Apply the trace to an Indian auto loan transaction whose collections arrive from Chennai and Hyderabad. Follow one rupee through the accounts and ask which payment changes when performance weakens.',
  5: 'Draw a housing loan structure with senior, mezzanine, and residual claims. Mark where losses attach, what protection is consumed first, and what happens after a trigger changes the payment order.',
  6: 'Use an Indian bank as the setting, but keep the questions universal: what moved, what remained, who provided protection, and what failure could make the conclusion wrong?',
  7: 'Apply the timing test to home loan borrowers in Chennai and Mumbai. Do not guess a prepayment rate. Identify the data required before estimating expected life or reinvestment exposure.',
};

const episodeOneCaseEvidence = [
  'In the U.S. mortgage market before the 2008 crisis, lenders originated mortgages, pooled them, transferred interests, and issued securities whose payment depended on borrower mortgage cash flows.',
  'The cash flow was not a claim on every dollar of a bank’s revenue. It was a defined right connected to mortgage payments, subject to the transfer terms, servicing process, and performance of the borrowers.',
  'The securities had contractual terms, but the cash did not arrive on a perfectly fixed timetable. Prepayment, delinquency, foreclosure, and recovery changed the timing and amount investors received.',
  'Structured vehicles and conduit arrangements aggregated mortgage exposures and funded them through capital markets. Scale did not eliminate common underwriting, servicing, or funding dependencies.',
];

const episodeOneDetailedEvidence = [
  'Case teaching: In the U.S. mortgage market before the 2008 crisis, a household signed a mortgage and promised periodic payments. A lender originated or acquired that loan. An aggregator could assemble many such loans. A sponsor could transfer the pool into an issuing vehicle, and that vehicle could issue securities whose payments were supported by the mortgage cash flows. The important point is the chain of rights: borrower to lender, lender to vehicle, vehicle to investor. If one arrow is unclear, the financing structure is not yet understood.',
  'Case teaching: The mortgage pool did not give investors a claim on every dollar of the originator business. It gave them a defined claim connected to mortgage principal and interest, subject to the transfer terms, servicing process, collection account, borrower performance, and payment priority. This is why the distinction between cash securitisation and secured borrowing matters. In secured borrowing, the lender remains the borrower and its creditor relies on the lender obligation, supported by collateral. In cash securitisation, the investor claim is designed around identified asset cash flows.',
  'Case teaching: Mortgage securities had contractual payment terms, but the collateral did not pay on a perfectly fixed timetable. Borrowers could refinance or prepay. Delinquency could delay collections. Foreclosure could turn a scheduled payment into a recovery process. Recovery could arrive later and at a different value. The legal maturity of a security therefore did not answer its expected life, its duration, or its reinvestment exposure.',
  'Case teaching: Structured vehicles and conduit arrangements allowed mortgage exposures from multiple sellers or pools to be funded through capital markets. That scale could lower funding friction, but it did not erase common underwriting, servicing, documentation, or liquidity dependence. A platform is diversified only when the risk drivers are genuinely different and the rules prevent one weak pool or common service provider from becoming a shared point of failure.',
];

function clean(value) {
  return String(value ?? '')
    .replace(/^\[pause\]\s*/i, '')
    .replace(/\bthe local question is\b/gi, 'What matters now is')
    .replace(/\b([a-z]+)-level\b/gi, '$1 level')
    .replace(/\bthis structure\b/gi, 'the transaction')
    .replace(/\bthis arrangement\b/gi, 'the transaction')
    .replace(/\bthis lesson\b/gi, 'here')
    .replace(/\bthe lesson\b/gi, 'the explanation')
    .replace(/\bthis topic\b/gi, 'here')
    .replace(/\bthe topic\b/gi, 'the idea')
    .replace(/\bWhat is the financial consequence if that assumption is wrong\?/gi, 'What changes if that assumption fails?')
    .replace(/\bThe evidence boundary for ([^.]+) begins with ([^.]+)\./gi, 'To judge $1, start with $2.')
    .replace(/\bThe cited primary artifact establishes ([^.]+)\./gi, 'The available source confirms $1.')
    .replace(/\bThat completes [^.]+\.\s*/gi, '')
    .replace(/\bI know the label, but I want the decision behind it\.\s*/gi, '')
    .replaceAll('—', ', ')
    .replaceAll('–', ' to ')
    .replaceAll('â€™', '’')
    .replaceAll('â€œ', '“')
    .replaceAll('â€', '”')
    .replaceAll('â€“', '–')
    .replaceAll('â€”', '—')
    .replaceAll('â€¦', '…')
    .replaceAll('Ã‚', '')
    .replaceAll('â€™', '’')
    .replaceAll('â€œ', '“')
    .replaceAll('â€', '”')
    .replaceAll('â€“', '–')
    .replaceAll('â€”', '—')
    .replaceAll('â€¦', '…')
    .trim();
}

function push(lines, speaker, text) {
  const normalizedSpeaker = speaker === 'ARJUN' ? 'MEERA' : speaker;
  lines.push(`[${normalizedSpeaker}] ${clean(text)}`);
}

function answerFor(lesson, step) {
  const endSentence = (value) => {
    const text = clean(value);
    return /[.!?]$/.test(text) ? text : `${text}.`;
  };
  const question = endSentence(lesson.governingQuestion || 'what cash flow or risk does this concept isolate');
  const decision = endSentence(lesson.decision || 'the conclusion must follow the documented transaction mechanics');
  const stress = clean(lesson.stress?.trace || 'trace the changed assumption through collections, protection, triggers, payment priority, and investor cash flow').replace(/[.]+$/, '');
  const stressSequence = stress.replace(/^trace\s+/i, '');
  return `The governing question is this: ${question} The decision implication is: ${decision} Under stress, follow this sequence: ${stressSequence}.`;
}

function buildEpisodeOne(episode) {
  const lessons = episode.lessonOrder;
  const fullLessons = episode.lessonIds.map((lessonId) => deepDiveLessons.find((lesson) => lesson.id === lessonId)).filter(Boolean);
  const event = episode.eventAssessment;
  const lines = [];
  const lesson = (index) => lessons[index];
  const fullLesson = (index) => fullLessons[index] || {};
  const step = (index) => event.steps[index]?.[1] || '';

  push(lines, 'DIYA', 'Let us make this a finance interview, not a vocabulary test. You are reviewing a lender that wants funding, balance sheet capacity, and a way to place defined loan cash flows with investors.');
  push(lines, 'MEERA', 'Before you call it securitisation, ask the question candidates often skip: what exactly is the investor entitled to receive?');
  push(lines, 'DIYA', 'Good. That question controls the whole discussion. We will build the transaction from the borrower payment upward, and I will stop you whenever a label tries to do the thinking for you.');
  push(lines, 'MEERA', 'And I will make the tempting wrong assumption first. Someone has to make the interview uncomfortable.');
  push(lines, 'DIYA', 'Our evidence comes from the U.S. mortgage market before the 2008 crisis. We will use the case to teach the transaction, then put you in the decision maker seat.');
  push(lines, 'MEERA', 'Good. Start with the receivable, the obligor, the transfer, the issuing vehicle, the cash route, the maturity profile, and the investor claim.');

  push(lines, 'DIYA', episodeOneDetailedEvidence[0]);
  push(lines, 'DIYA', `Now the interview question. ${lesson(0).canonicalName}. ${step(0)}`);
  push(lines, 'MEERA', 'A lender already owns the loans. If it needs funding, why not just borrow against them and call the result securitisation?');
  push(lines, 'DIYA', 'That is the first distinction. Secured borrowing leaves the lender as the borrower and gives the lender\'s creditor a security interest. Securitisation creates claims supported by specified asset cash flows through a defined transfer and issuing structure. In the interview, identify the contractual payment right, the transfer, the issuing vehicle, and the source of investor payment.');
  push(lines, 'MEERA', 'So the first interview answer is not "the bank sold loans." It is "identify the contractual payment right and the claim built around it."');
  push(lines, 'DIYA', 'Exactly. If you cannot identify the payment right, you are describing a product name rather than analysing a transaction.');

  push(lines, 'MEERA', episodeOneDetailedEvidence[1]);
  push(lines, 'DIYA', `Now narrow the interview question. ${lesson(1).canonicalName}. ${step(1)}`);
  push(lines, 'MEERA', 'If the lender transfers the loans, all the related risk leaves with them. The originator can walk away.');
  push(lines, 'DIYA', 'No. The transferred cash flow and the retained risk are separate questions. Servicing failure, representations, repurchase obligations, counterparty exposure, residual interests, and weak collateral can remain. Your answer must say what moved and then name what stayed behind.');
  push(lines, 'MEERA', 'That is the trap. A legal transfer can change who receives the cash without making every risk disappear.');
  push(lines, 'DIYA', 'Correct. In an interview, say what moved and then name what stayed behind. Never stop at "the assets were sold."');

  push(lines, 'DIYA', episodeOneDetailedEvidence[2]);
  push(lines, 'DIYA', `Now test the timing question. ${lesson(2).canonicalName}. ${step(2)}`);
  push(lines, 'MEERA', 'A term security has a maturity date, so the timing of the investment is fixed.');
  push(lines, 'DIYA', 'The legal maturity may be fixed while the economic timing remains uncertain. Borrowers can prepay. Defaults delay collections. Recoveries can arrive later and at a lower value. Separate contractual maturity from expected amortisation, prepayment, default, and recovery timing.');
  push(lines, 'MEERA', 'So maturity is not one number. We need contractual maturity, expected amortisation, prepayment, default, and recovery timing.');
  push(lines, 'DIYA', 'Yes. The interview-quality answer separates the promise written in the note from the cash flow the collateral is likely to produce.');

  push(lines, 'MEERA', episodeOneDetailedEvidence[3]);
  push(lines, 'DIYA', `Now test the scale question. ${lesson(3).canonicalName}. ${step(3)}`);
  push(lines, 'MEERA', 'A conduit combines multiple pools, so diversification removes concentration risk.');
  push(lines, 'DIYA', 'It can reduce some idiosyncratic exposure, but it can also create common seller, servicer, underwriting, liquidity, and funding concentrations. Diversification is a property of the risk drivers, not a count of the pools.');
  push(lines, 'MEERA', 'So many pools do not automatically mean many independent risks. We have to test what they share.');
  push(lines, 'DIYA', 'That is the answer. Diversification is a property of the risk drivers, not a count of the pools.');

  push(lines, 'MEERA', 'Let me try the full answer. A securitisation turns identified asset cash flows into investor claims through a transfer and issuing vehicle. The analysis must still test originator exposure, timing, collateral performance, servicing, concentration, and the payment route.');
  push(lines, 'DIYA', 'Good. Now apply it to a vehicle loan pool originated across Mumbai and Pune. Identify the borrower payment, the transfer, the issuing vehicle, the collection route, and the risks that remain.');
  push(lines, 'MEERA', 'Your interview challenge is simple: draw the transaction without using the word “safe.” Replace that word with a specific legal right, cash flow, assumption, or protection mechanism.');
  push(lines, 'DIYA', 'That is where we stop. Next time, we can examine what happens when the institution that originated the loans is no longer there to support the structure.');
  return lines.join('\n\n');
}

function buildEpisodeOneHuman(episode) {
  const lessons = episode.lessonOrder;
  const event = episode.eventAssessment;
  const lines = [];
  const step = (index) => event.steps[index]?.[1] || '';

  push(lines, 'DIYA', 'It starts with a payment that looks ordinary. A family sends money to a mortgage lender. Part of it is interest. Part of it reduces principal. Month after month, that payment is a small contractual promise. Millions of those promises, taken together, become something the capital markets want to buy.');
  push(lines, 'MEERA', 'And that is where the story becomes dangerous. The payment is real, but by the time it reaches an investor it may have passed through an originator, an aggregator, an issuing vehicle, a servicer, a trustee, and a waterfall.');
  push(lines, 'DIYA', 'Exactly. The question is not whether the original borrower exists. The question is whether every handoff preserves the right to the cash, the information needed to assess it, and the controls needed to collect it.');
  push(lines, 'MEERA', 'So let us go back to the U.S. mortgage market before the 2008 crisis. Not as a history lecture. Let us follow the money and see where the confidence entered the structure.');
  push(lines, 'DIYA', 'A lender originated a mortgage. An aggregator could buy or assemble mortgages. A sponsor could transfer them into a special purpose vehicle. The vehicle issued securities. Investors bought those securities because the documents gave them a claim on the mortgage cash flows. That is the chain of claims.');
  push(lines, 'MEERA', 'And the first temptation is to say that chain made the loans safer. It did not. It changed how the loans were funded, who held the claim, how cash was prioritised, and how risk was divided.');
  push(lines, 'DIYA', 'Good. Keep that distinction in mind. Securitisation is not a magic improvement in borrower quality. It is a way to convert a defined stream of asset cash flows into investable claims. The structure can distribute risk. It cannot repeal default, delay, weak documentation, or bad incentives.');
  appendEpisodeCulturalTurns(lines, 1, 'opening');

  push(lines, 'DIYA', `Look at the first question now. ${lessons[0].canonicalName}. ${step(0)}`);
  push(lines, 'MEERA', 'Wait. If the lender already owns the mortgages, why borrow against them instead of creating an issuing vehicle and a new set of securities?');
  push(lines, 'DIYA', 'Because those are not the same financing claim. In secured borrowing, the lender remains the borrower. Its creditor has a security interest in the assets, but the lender’s general promise remains central. In securitisation, the transaction is built around identified mortgage cash flows transferred into an issuing structure. The investor is not automatically relying on every dollar of the lender’s business.');
  push(lines, 'MEERA', 'So we do not begin by giving the deal a label. We begin with the borrower, the payment right, the transfer, the issuing vehicle, and the investor claim.');
  push(lines, 'DIYA', 'Yes. The arrow from borrower to lender represents the original obligation. The arrow from lender to vehicle represents a transfer of rights or interests. The arrow from vehicle to investor represents a security whose payment is governed by the transaction documents. If the arrow is only a commercial intention and not an enforceable right, the structure is weaker than its presentation suggests.');
  push(lines, 'MEERA', 'That is the part people skip when they look only at the label. They see “mortgage backed” and assume the label tells them what the investor owns.');
  push(lines, 'DIYA', 'It does not. The investor needs to know the obligor, the asset pool, the transfer terms, the collection route, the issuing entity, and the priority of payment. Securitisation exists because a defined pool can be financed separately from the originator’s wider balance sheet. That separation is useful only when the rights and controls are real.');

  push(lines, 'MEERA', 'Now imagine we are reviewing the mortgage pool as it moves through the market. A loan officer originates the mortgage. A different institution buys it. An investment bank assembles it with other loans. A trust issues securities. Who is responsible for the original credit decision now?');
  push(lines, 'DIYA', 'The originator still matters. A transfer can move the cash flow without erasing the originator’s underwriting history, representations, repurchase obligations, servicing role, retained interest, or incentives. That is why the analysis asks two questions separately: what cash flow moved, and what risk remained attached to the parties.');
  push(lines, 'MEERA', 'Let me interrupt there. If the mortgages were legally transferred, why should the investor care how the originator behaved after closing?');
  push(lines, 'DIYA', 'Because the quality of the transferred pool was created before closing, and the cash is collected after closing. Weak underwriting affects default. Weak documentation affects enforceability. Weak servicing affects collection and reporting. A legal transfer can change ownership without repairing a poor asset.');
  push(lines, 'MEERA', 'That is cash securitisation, then. Not a vague pool of “assets,” but a defined right to receive principal and interest from identified borrowers.');
  push(lines, 'DIYA', 'Correct. Cash securitisation is about asset cash flows moving into the structure. The cash may come from mortgage payments, auto loan instalments, credit card receivables, or other contracted collections. But the investor claim is limited to what the transaction actually identifies and transfers. Total company revenue is not automatically collateral.');

  push(lines, 'DIYA', `Now take the timing problem. ${lessons[2].canonicalName}. ${step(2)}`);
  push(lines, 'MEERA', 'The security has a maturity date. Surely that tells the investor when the money comes back.');
  push(lines, 'DIYA', 'It tells the investor one contractual boundary. It does not tell the whole cash flow story. Mortgage borrowers may refinance when rates fall. They may prepay when they sell a property. They may stop paying. A foreclosure can delay recovery. A recovery can be less than the outstanding balance.');
  push(lines, 'MEERA', 'So a security can have a long legal maturity but a short expected life. And if defaults rise, it can also run longer than expected because principal is not arriving.');
  push(lines, 'DIYA', 'Exactly. Faster principal creates contraction and reinvestment risk. Slower principal creates extension and duration risk. Credit deterioration creates loss and recovery risk. Those are different mechanisms, and a good explanation keeps them separate.');
  push(lines, 'MEERA', 'This is why a mortgage security can be current and still be difficult to value. The investor has to forecast whether borrowers pay, when they pay, and what arrives after a default.');
  push(lines, 'DIYA', 'Yes. Term securitisation gives investors a designed payment profile, but that profile is produced by uncertain collateral behaviour. The note terms describe the claim. The collateral determines whether the promised timing can be met.');

  push(lines, 'MEERA', `Now the scale question. ${lessons[3].canonicalName}. ${step(3)}`);
  push(lines, 'DIYA', 'If one pool is useful, a platform with many pools must be safer. More borrowers, more sellers, more diversification.');
  push(lines, 'MEERA', 'That sounds convincing until the same servicer, the same underwriting model, the same funding market, or the same housing assumption sits underneath all of them. More pools do not automatically create independent risks.');
  push(lines, 'DIYA', 'Right. A conduit can lower funding friction and aggregate assets at scale. It can also create common points of failure. The analyst must ask whether eligibility rules are consistent, whether reporting is comparable, whether collections are segregated, whether liquidity is shared, and whether one weak seller can affect the platform.');
  push(lines, 'MEERA', 'So diversification is not a headcount. It is a question about correlation and control.');
  push(lines, 'DIYA', 'Exactly. If five sellers use the same weak underwriting standard, they may be five names but one risk. If five pools depend on one servicer, the platform has a common operational dependency. If one funding market closes, diversification does not create liquidity by itself.');

  push(lines, 'DIYA', 'Now let us put the whole story together. A mortgage begins as a borrower obligation. It becomes an asset on a lender’s balance sheet. It may be transferred into a vehicle. The vehicle issues claims. Servicing turns borrower payments into collections. The waterfall determines how those collections become interest, principal, reserves, fees, and residual cash.');
  push(lines, 'MEERA', 'And at every step we ask the same five questions. What exactly is the cash flow? Who owes it? Who legally owns the right? Who controls collection? What happens when the expected payment does not arrive?');
  push(lines, 'DIYA', 'Good. That is the mental model. Now you are in the interview. The hiring manager shows you a proposed pool and asks whether it can support securities. Do not start with the rating. Start with the receivable, the obligor, the transfer, the issuing vehicle, the collection account, the maturity profile, and the investor claim.');
  push(lines, 'MEERA', 'And if the candidate says, “The pool is diversified,” I ask, diversified by what? Borrower? Geography? Product? Servicer? Underwriting? Funding source?');
  push(lines, 'DIYA', 'If the candidate says, “The loan was sold,” I ask, sold as what? A true transfer of the cash-flow right, or collateral supporting a borrowing?');
  push(lines, 'MEERA', 'If the candidate says, “The note matures in thirty years,” I ask, what is the expected life under prepayment, default, and recovery assumptions?');
  push(lines, 'DIYA', 'And if the candidate says, “The issuing vehicle protects investors,” I ask, protects them from which failure? Originator insolvency? Borrower default? Servicer failure? Commingling? Weak recovery? A vehicle is a legal structure, not a substitute for analysis.');
  push(lines, 'MEERA', 'Now bring the same reasoning to India. Imagine a vehicle loan pool originated across Mumbai and Pune. The locations make it familiar, but the questions do not change. Identify the borrower payment, transfer, issuing vehicle, collection route, servicing dependence, expected timing, and loss path.');
  push(lines, 'DIYA', 'Your task is to draw the transaction and label every arrow. Then write one sentence explaining why securitisation can redistribute risk without eliminating it. If you use the word “safe,” replace it with the exact protection, assumption, or legal right you mean.');
  appendStandaloneMasterclass(lines, episode, 1);
  appendEpisodeCulturalTurns(lines, 1, 'close');
  push(lines, 'MEERA', 'That is the point where the story stops being a mortgage story. It becomes a way of thinking about every structured claim built from someone else’s cash flow.');
  push(lines, 'DIYA', 'And the next question is the one that keeps the whole structure awake at night: what happens when the institution that originated the loans is no longer there to support the machine?');
  return lines.join('\n\n');
}

const humanEpisodeModules = {
  2: {
    opening: [
      ['MEERA', 'The originator has failed overnight. Borrower payments are still arriving, but the people who used to collect them are no longer answering the phone.'],
      ['DIYA', 'This is the point where the paper promise meets a live failure. Who owns the cash? Who can move it? Who can prove which borrower paid?'],
      ['MEERA', 'The Lehman episode makes the question concrete. Confidence in structured vehicles depends on more than the existence of an SPV. It depends on whether the legal boundary and the operating machinery work after a critical institution is impaired.'],
      ['DIYA', 'We will follow that failure through four people and four risks: the originator, the special purpose vehicle, bankruptcy remoteness, and the servicer.'],
    ],
    lessons: [
      {
        lead: 'Start with the originator. In the mortgage chain, this is the institution that created or acquired the loans and put them into the financing machine.',
        question: 'What does the originator still matter for after the loans have been transferred?',
        wrong: 'If the assets have been sold, the originator has disappeared from the credit analysis.',
        answer: 'That is the shortcut that breaks the analysis. The originator shaped underwriting, documentation, servicing, representations, repurchase obligations, risk retention, and the quality of the data delivered with the pool. A transfer can change the legal owner of the cash flow while leaving the originator exposed to obligations and incentives that still affect performance.',
        bridge: 'So we separate ownership from responsibility. The first tells us who has the right. The second tells us who can still damage or repair the cash flow.',
      },
      {
        lead: 'Now put the special purpose vehicle in the middle of the transaction. It is meant to hold the transferred assets and issue claims supported by them.',
        question: 'What does an SPV actually accomplish, and what does it not accomplish?',
        wrong: 'The SPV is a new box. Once the assets are inside it, the originator cannot affect the investors.',
        answer: 'An SPV can create legal separation, limited purpose, and a defined issuing entity. It does not automatically make a transfer effective, isolate every risk, control every account, or guarantee that the vehicle remains operational. Separateness must be supported by documents, governance, asset records, account arrangements, and the applicable insolvency framework.',
        bridge: 'A box can hold assets. Only enforceable rights and disciplined operations make the box useful.',
      },
      {
        lead: 'That brings us to bankruptcy remoteness. The point is not that the transaction becomes immune from failure. The point is that one particular failure should not capture assets that investors were meant to own or control.',
        question: 'Which failure is bankruptcy remoteness designed to reduce, and which failures remain?',
        wrong: 'Bankruptcy remoteness protects the securities from every form of loss.',
        answer: 'It is primarily designed to reduce the risk that the originator’s insolvency brings transferred assets into the originator’s estate. It does not prevent borrower default, weak recovery, servicer failure, commingling, data loss, counterparty failure, or a defective transfer. Each risk needs its own control and evidence.',
        bridge: 'The word remote is not the word safe. It tells us which legal exposure the structure is trying to reduce.',
      },
      {
        lead: 'Finally, follow the servicer. Borrowers do not send cash to a rating. They send it to a system that bills, collects, reconciles, reports, and remits.',
        question: 'What happens when the original servicer stops performing?',
        wrong: 'The trustee can simply appoint another servicer and nothing important changes.',
        answer: 'Replacement is possible only if the records, payment history, borrower files, collection accounts, reconciliation process, and operational instructions can be transferred. A replacement servicer may also need different systems, incentives, and borrower communication. Commingling can create another problem: cash collected for investors may sit with a failed institution before it is remitted.',
        bridge: 'Servicing is not administrative decoration. It is the mechanism that turns a legal payment right into money that investors can receive.',
      },
    ],
    close: 'Draw the post failure structure. Mark the legal owner, the collecting party, the account holding the cash, the trustee or control party, and the replacement route. If one answer is missing, the structure is not operationally proven.',
    india: 'Apply the same test to an Indian housing loan pool serviced from Chennai after its originator becomes distressed. Ask who owns the receivables, who can access the collection account, who holds the borrower records, and what evidence supports the transfer.',
  },
  3: {
    opening: [
      ['DIYA', 'The same word can hide five different cash flow businesses. “Collateral” might mean a vehicle loan, a credit card receivable, a distressed loan, a mortgage that fails an underwriting screen, or the revenue of an operating company.'],
      ['MEERA', 'And if we give all five the same default rate, we have not simplified the analysis. We have destroyed it.'],
      ['DIYA', 'The 2008 mortgage crisis showed what happens when a pool label becomes more important than the distribution of borrower behaviour underneath it.'],
      ['MEERA', 'We need to separate what pays, what interrupts payment, what recovers after default, and what changes the timing.'],
    ],
    lessons: [
      {
        lead: 'Begin with an auto loan pool. The borrower pays instalments, but the vehicle is also a recovery asset if the borrower defaults.',
        question: 'What must you understand before treating auto loan receivables as predictable collateral?',
        wrong: 'The vehicle is collateral, so the recovery rate is the vehicle’s resale value.',
        answer: 'Recovery is not a sticker price. It depends on repossession, location, condition, time to sale, legal costs, dealer discounts, insurance, and the outstanding balance. Pool analysis must also consider seasoning, borrower quality, geography, prepayment, delinquency migration, and concentration by vehicle type. The same vehicle can produce different recoveries under different enforcement conditions.',
        bridge: 'The asset label tells us what the loan is secured by. It does not tell us how quickly or how completely cash comes back.',
      },
      {
        lead: 'Now switch to credit card receivables. There is no fixed amortising loan balance in the same way. The customer can draw, repay, revolve, and change payment behaviour.',
        question: 'Why does a revolving card pool behave differently from an instalment loan pool?',
        wrong: 'Credit cards are short term because the borrower can repay at any time.',
        answer: 'A revolving pool depends on payment rate, utilisation, new receivables, charge offs, dilution, replenishment quality, and early amortisation triggers. The collateral can change after closing. That makes seller behaviour and eligibility controls central. If new receivables enter the structure, the transaction is exposed to future origination quality, not only the original pool.',
        bridge: 'With an instalment loan, the pool runs down. With a revolving pool, the transaction keeps asking whether the next receivable deserves to enter.',
      },
      {
        lead: 'Now take a non performing loan portfolio. The cash flow has already broken. The question becomes recovery, resolution, and time.',
        question: 'Why is carrying value not the same as securitisation value for a distressed loan pool?',
        wrong: 'The lender has already recognised the asset, so its carrying value is a reasonable recovery estimate.',
        answer: 'Carrying value is an accounting measurement, not a promise of cash. Recoverable value depends on collateral, borrower capacity, legal enforcement, restructuring, costs, timing, and the probability of different outcomes. A delayed recovery can be materially less valuable than a faster recovery even if both eventually produce the same nominal amount.',
        bridge: 'With stressed assets, a delayed recovery changes the value of the loss. The recovery percentage alone does not settle the question.',
      },
      {
        lead: 'The mortgage crisis gives us the next warning. A non qualified mortgage pool is not defined only by the word mortgage. It is defined by the quality and heterogeneity of the underwriting.',
        question: 'What does a broad mortgage category conceal?',
        wrong: 'If the properties are similar, the loans should behave similarly.',
        answer: 'Borrower income, documentation, loan to value, debt service capacity, property value, geography, rate structure, and servicing can differ sharply. Averages can hide weak segments and correlated defaults. The lesson from the crisis is not that every mortgage pool is identical. It is that the analyst must test the distribution rather than rely on the category name.',
        bridge: 'A pool average is a summary. It is not a substitute for stratification.',
      },
      {
        lead: 'Finally, consider whole business securitisation. The collateral is not a static receivable. It is the operating cash flow of a business.',
        question: 'What makes whole business securitisation different from a receivables pool?',
        wrong: 'It is just a larger pool of invoices, so ordinary receivables analysis is enough.',
        answer: 'The payment source depends on the business continuing to operate. Customers, contracts, suppliers, management, premises, regulation, technology, and concentration all become part of the credit analysis. If the business is interrupted, there may be no separate receivable engine waiting to collect cash.',
        bridge: 'When the business itself is collateral, continuity is a payment assumption.',
      },
    ],
    close: 'Choose one pool and write four lines: what pays, what interrupts payment, what recovers after default, and what changes the timing. Do not use the same stress assumptions for every asset type.',
    india: 'Compare a Pune two wheeler pool, a Delhi card portfolio, and a distressed loan portfolio. They all produce financial claims, but their borrowers, collections, recoveries, and servicing risks are different.',
  },
  4: {
    opening: [
      ['MEERA', 'Money comes into a securitisation in one form and leaves in another. Borrower collections arrive as principal, interest, fees, recoveries, and sometimes late payments. Investors receive whatever the transaction rules allow them to receive.'],
      ['DIYA', 'During the 2008 to 2009 market freeze, that difference mattered. Assets could still be paying while the market questioned the timing, priority, and liquidity of the securities built from them.'],
      ['MEERA', 'The loan matters, but the fight is over what happens to the cash after it arrives.'],
      ['DIYA', 'The payment order decides who gets paid, who waits, and whose protection is being used.'],
    ],
    lessons: [
      {
        lead: 'Start with a pass through structure. Borrower collections, after permitted deductions, are passed to investors with limited reshaping.',
        question: 'What risk does the investor accept in a pass through?',
        wrong: 'Pass through means the investor receives the collateral cash without structural risk.',
        answer: 'It gives the investor a more direct exposure to collateral timing, prepayment, default, servicing, and recovery. It does not remove fees, collection risk, or liquidity risk. The investor may receive principal earlier or later than expected, and the value of that timing depends on reinvestment conditions.',
        bridge: 'Direct exposure is not the same as complete transparency. The cash still passes through accounts and rules.',
      },
      {
        lead: 'A pay through structure reshapes collateral collections into a designed payment profile.',
        question: 'Why does reshaping cash flow create both value and dependence?',
        wrong: 'Once the issuer designs the payment schedule, collateral timing no longer matters.',
        answer: 'The issuer can create different maturities and payment priorities, but the design depends on collateral performance, reserves, triggers, and assumptions. A promise to pay investors on a schedule is credible only if collections, liquidity, and enhancement can support it when the pool behaves differently from the base case.',
        bridge: 'Reshaping timing can make a security useful. It can also make the structure more dependent on the rules doing exactly what the documents say.',
      },
      {
        lead: 'Now follow the ordinary waterfall. Collections may pay taxes, servicing fees, trustee fees, interest, principal, reserves, and residual claims in a stated order.',
        question: 'Why is saying “fees, interest, then principal” not enough?',
        wrong: 'The sequence is obvious, so a high level description captures the risk.',
        answer: 'The actual terms decide which account receives the money, which deductions are permitted, how reserves are funded, how shortfalls are allocated, and whether excess cash reaches junior or residual claims. A one line summary can hide the point where the investor actually loses control of cash.',
        bridge: 'A waterfall must be traced like a transaction, not recited like a heading.',
      },
      {
        lead: 'The stress case changes the conversation. A trigger can stop replenishment, redirect excess spread, move the deal to sequential principal, or increase reserve funding.',
        question: 'What does a trigger do economically?',
        wrong: 'A trigger is just a warning indicator for the investor report.',
        answer: 'A trigger is a contractual state change. It can alter payment priority, control rights, amortisation, reserve requirements, or the use of excess cash. The important question is not whether the trigger was breached. It is what cash flow moved after the breach and which claim absorbed the pressure.',
        bridge: 'The waterfall is normal only until the contract says it is not. Then the trigger becomes the transaction.',
      },
    ],
    close: 'Trace one unit of collection through the normal waterfall and then through a trigger state. Name the first deduction, the first protected claim, the first exposed claim, and the cash that no longer reaches the residual.',
    india: 'Apply the exercise to an Indian auto loan transaction receiving collections from Chennai and Hyderabad. Ask how the payment order changes when collections arrive late or the pool enters an early amortisation state.',
  },
  5: {
    opening: [
      ['DIYA', 'A single collateral pool can produce several securities, and those securities can experience completely different outcomes. One investor receives cash first. Another waits. A third may absorb the first loss.'],
      ['MEERA', 'Which means “the pool performed” is not a complete sentence. We need to know which claim we are talking about.'],
      ['DIYA', 'The structured credit losses of 2008 made that uncomfortable distinction impossible to ignore. The assets, the waterfall, and the capital structure interacted under stress.'],
      ['MEERA', 'We need to see how protection is consumed before we treat a tranche label as a conclusion.'],
    ],
    lessons: [
      {
        lead: 'Begin with tranching. The structure divides the collateral cash flow into claims with different priority, timing, and loss exposure.',
        question: 'Why do senior, mezzanine, and residual investors experience the same pool differently?',
        wrong: 'The senior note is safe because it is paid first.',
        answer: 'Payment priority protects senior cash flow only while collections and enhancement remain available. The senior claim has a position in the waterfall, not immunity from collateral loss. Mezzanine claims absorb more exposure before senior impairment, while residual claims are paid after obligations and may absorb volatility first.',
        bridge: 'Priority is protection. It is not a guarantee. The next question is how much protection exists and when it is consumed.',
      },
      {
        lead: 'Now compare pro rata and sequential principal. Both allocate principal, but they change the speed at which protection builds and junior exposure remains outstanding.',
        question: 'Why does principal allocation change risk even when total collateral is unchanged?',
        wrong: 'Pro rata is fair, so it should offer the same protection as sequential payment.',
        answer: 'Pro rata payment distributes principal across eligible classes. Sequential payment directs principal to one class until it is retired. Sequential payment can deleverage senior claims faster and preserve subordination, while pro rata payment may leave more senior and junior claims outstanding together. Expected life, enhancement, and loss timing all change.',
        bridge: 'The amount of collateral has not changed. The order in which claims disappear has changed, and that changes the risk.',
      },
      {
        lead: 'Credit enhancement is the protection that absorbs or reallocates deterioration before it reaches a specified tranche.',
        question: 'Why can two transactions with the same enhancement percentage behave differently?',
        wrong: 'Ten percent enhancement means the first ten percent of losses are covered in the same way everywhere.',
        answer: 'Subordination, excess spread, reserves, guarantees, and liquidity support do different jobs. Some absorb principal loss. Some cover timing shortfalls. Some depend on a counterparty. Some are replenished and some are depleted. The percentage is meaningful only after the mechanism and the trigger conditions are identified.',
        bridge: 'Protection has a source, a capacity, a priority, and a failure mode. Ignore any one of those and the percentage becomes decoration.',
      },
    ],
    close: 'Draw the loss path. Mark the attachment point, detachment point, first loss position, enhancement source, trigger state, and the claim that receives the next rupee of principal.',
    india: 'Apply the loss path to an Indian housing loan structure. Do not begin with a rating. Begin with where loss attaches, which protection is available, and what happens when that protection is exhausted.',
  },
  6: {
    opening: [
      ['MEERA', 'A bank says it has transferred risk. That sentence sounds complete until someone asks: transferred what risk, by what instrument, to whom, and under which rule?'],
      ['DIYA', 'The financial crisis and the regulatory response made that distinction central. Legal transfer, economic risk transfer, investor protection, and capital recognition are related, but they are not identical conclusions.'],
      ['MEERA', 'So we will not let the word “synthetic” or “regulatory” do the work of the analysis.'],
      ['DIYA', 'Good. We will separate cash securitisation, synthetic securitisation, re-securitisation, and the framework that recognises the result.'],
    ],
    lessons: [
      {
        lead: 'Cash securitisation moves asset cash flows or interests into a structure that issues claims supported by those assets.',
        question: 'What is different when the assets themselves move?',
        wrong: 'If a bank sells the loans, it has eliminated its credit exposure.',
        answer: 'The bank may still retain representations, servicing, residual interests, risk retention, counterparty exposure, or other obligations. The investor receives the transferred claim, but the originator’s remaining exposure must be identified separately. Cash transfer is not the same as complete economic separation.',
        bridge: 'The asset can move while the institution still has reasons to care about its performance.',
      },
      {
        lead: 'Synthetic securitisation uses a protection contract to transfer credit risk while the reference assets may remain on the bank balance sheet.',
        question: 'What does the protection contract change?',
        wrong: 'Synthetic protection means the bank no longer bears the loss.',
        answer: 'The bank may transfer specified credit losses, but it introduces protection provider risk, collateral risk, basis risk, documentation risk, termination risk, and the possibility that the contract does not respond as expected. The loans remain part of the bank’s balance sheet, so the legal and accounting consequences differ from a cash transfer.',
        bridge: 'Synthetic means the risk transfer is created by a contract, not by moving the loan file into another vehicle.',
      },
      {
        lead: 'Re-securitisation adds another layer. The new structure references claims that were already created by a prior structured transaction.',
        question: 'Why does layering make the analysis harder?',
        wrong: 'Pooling existing tranches creates diversification automatically.',
        answer: 'The second structure inherits dependencies from the first. Correlation, model assumptions, triggers, attachment points, servicing, and cash flow priorities can interact across layers. A diversified list of tranches can still contain concentrated exposure to one collateral behaviour or one common assumption.',
        bridge: 'A second wrapper does not erase the first structure. It adds another set of terms that must be opened and traced.',
      },
      {
        lead: 'Finally, consider regulatory recognition. A rule may recognise a transaction for capital purposes only if specified conditions are met.',
        question: 'Why is capital relief not proof that credit risk disappeared?',
        wrong: 'If the regulator recognises the transfer, the investment risk is gone.',
        answer: 'Regulatory recognition is conditional and jurisdiction specific. It may depend on risk retention, eligible protection, disclosure, operational standards, enforceability, and counterparty quality. It answers a capital treatment question. It does not guarantee collateral performance, market liquidity, or investor repayment.',
        bridge: 'The final discipline is to state two conclusions: what the regulation recognises and what economic risk remains.',
      },
    ],
    close: 'For one transaction, write four answers: what moved, what stayed, who absorbed the loss, and what condition could reverse the regulatory conclusion.',
    india: 'Use an Indian bank as the setting and keep the jurisdiction clear. Separate the cash transfer, synthetic protection, retained exposure, counterparty, and applicable capital rule before making a conclusion.',
  },
  7: {
    opening: [
      ['DIYA', 'The borrower paid. The security still disappointed the investor. That sounds impossible until you separate credit risk from timing and liquidity risk.'],
      ['MEERA', 'A payment arriving early can be a problem if the investor has to reinvest at a lower yield. A payment arriving late can be a problem if the investor needs duration or funding certainty.'],
      ['DIYA', 'The mortgage market and the TALF period make the distinction visible. A performing asset can still trade at a difficult price when the market cannot finance it easily.'],
      ['MEERA', 'Let us separate prepayment, extension, expected life, funding, and market liquidity before they get mixed into one vague word: risk.'],
    ],
    lessons: [
      {
        lead: 'Start with the PSA prepayment model. It is a market convention for describing assumed prepayment speeds on certain mortgage pools.',
        question: 'What does a higher PSA speed actually tell you?',
        wrong: 'A higher PSA speed means the collateral is performing better.',
        answer: 'It means principal is assumed to return faster under the convention. That can shorten expected life, create reinvestment risk, reduce the period over which a spread is earned, and change the value of the security. A prepayment convention is an assumption about timing, not a credit quality score.',
        bridge: 'Faster cash is not automatically better cash. Its value depends on what the investor can do with it next.',
      },
      {
        lead: 'Now reverse the assumption. Slow prepayment can preserve income, but it can also extend the investor’s exposure to rates, duration, and uncertain principal timing.',
        question: 'Why is slower repayment not automatically safer?',
        wrong: 'The investor receives interest for longer, so the slower the principal returns, the better.',
        answer: 'Longer life can increase duration and delay the return of principal. It can also leave the investor exposed to a changing rate environment, weaker collateral performance, or a funding need that matures before the security does. Yield and liquidity are not the same thing.',
        bridge: 'The investor has to manage a schedule as well as the coupon.',
      },
      {
        lead: 'During the market freeze, TALF supported funding against eligible asset backed securities. That makes it a useful example of liquidity support, not a replacement for credit analysis.',
        question: 'What did a funding facility change and what did it leave unchanged?',
        wrong: 'A facility such as TALF guaranteed the collateral and removed the investor’s credit risk.',
        answer: 'A non recourse facility can improve financing availability against eligible collateral and help a market function. It does not guarantee that borrowers pay, that recoveries are sufficient, or that market value will not fall. Eligibility, haircut, funding terms, and residual credit exposure still matter.',
        bridge: 'Funding support can keep the bridge open. It does not repair the road underneath it.',
      },
    ],
    close: 'Write three separate conclusions for one security: what happens if borrowers prepay faster, what happens if they repay slower, and what happens if the security remains current but cannot be financed easily.',
    india: 'Apply the timing test to home loan borrowers in Chennai and Mumbai. Do not invent a prepayment rate. State the data needed before estimating expected life, reinvestment exposure, or funding value.',
  },
};

// These are deliberately written as a conversation, not as a sequence of definitions.
// Each room slows the pace down around the point at which an analyst would have to make
// a judgement call. That is where the vocabulary becomes useful rather than decorative.
const caseRooms = {
  2: [
    ['MEERA', 'Picture the Monday after a large originator fails. Borrowers do not pause their standing instructions because a bank is in trouble. Money still leaves their accounts. The hard part is whether that money reaches the deal account cleanly, whether anyone can reconcile it, and whether the investors can prove their claim before the cash gets trapped in somebody else’s insolvency process.'],
    ['DIYA', 'That is why I care about the boring operational facts. Where does the borrower pay? Is there a collection account in the originator’s name? How often is money swept to the vehicle? Who holds the payment files? If the servicer’s staff disappear on Friday, can a replacement tell which borrower is current, which payment was reversed, and which loan is already in default?'],
    ['MEERA', 'So bankruptcy remoteness is not a force field around an SPV. It gives the transferred pool a better chance of staying outside the originator’s estate. It does not collect a rupee, reconcile a ledger, or answer a borrower who has been charged twice.'],
    ['DIYA', 'Exactly. A good deal has legal separation and an operating handover plan. If either one is vague, the investor has a problem long before a court reaches the elegant parts of the documents.'],
  ],
  3: [
    ['MEERA', 'Take two vehicle pools. The headline numbers can look almost identical: similar average loan size, similar average rate, similar average loan-to-value. Then you open the tapes. One pool has seasoned borrowers who have already made twelve payments. The other is new originations concentrated in one city, with thin documentation and a recovery process that takes twice as long. Calling both pools “auto ABS” tells you almost nothing useful.'],
    ['DIYA', 'That is the discipline. Ask what an average is hiding. Look at the tails: the borrowers with high leverage, the regions where repossession is slow, the dealers with weak underwriting, the segment where prepayments disappear just as delinquencies rise. Losses do not arrive as an average. They arrive through the borrowers who fail first and the recovery system that has to deal with them.'],
    ['MEERA', 'And a revolving card pool adds a different problem. The pool is still changing after closing. New receivables can enter. That means the investor is partly relying on tomorrow’s underwriting and tomorrow’s seller behaviour, as well as the loans that existed on day one.'],
    ['DIYA', 'Right. When the collateral keeps renewing, you need to ask who controls eligibility, what happens after a trigger, and whether weak new receivables can quietly replace old good ones. The label is the beginning of the work. It is never the conclusion.'],
  ],
  4: [
    ['MEERA', 'Let us make one collection tangible. A borrower pays one hundred rupees. That does not mean an investor receives one hundred rupees. The documents may first pay taxes, a servicer, a trustee, hedging costs, overdue expenses, interest, reserve top-ups, and principal. The residual may see nothing. On a bad month, the order matters more than the total collection.'],
    ['DIYA', 'And you cannot read that order like a school timetable. You have to ask what changes when collections are lower than expected. Does interest get deferred? Does principal stop flowing to junior notes? Does excess spread get trapped? Does the deal switch from sharing principal across classes to paying one class first? Those are economic decisions written into contract language.'],
    ['MEERA', 'The phrase “the waterfall protects the senior note” is incomplete until you can say how much cash it protects, for how long, and what has to happen before the protection moves.'],
    ['DIYA', 'That is why a trigger matters. It is not an alarm bell in a monthly report. It is a switch. When it trips, someone who expected cash may wait, and someone who thought they had time may discover that the deal has changed its priorities.'],
  ],
  5: [
    ['MEERA', 'Suppose a pool starts at one hundred. The junior piece absorbs the first losses, then the mezzanine piece, then the senior notes. That sounds simple until you add principal payments. If principal pays the senior notes down first, the senior class gets smaller while the same junior cushion remains underneath it. If everyone receives principal together, that cushion may not build in the same way.'],
    ['DIYA', 'Which is why “senior” is a position, not a personality trait. A senior note can be well protected, poorly protected, or protected only in the base case. The answer sits in the attachment point, the current balance, the loss curve, the speed of amortisation, and the terms that change when performance worsens.'],
    ['MEERA', 'And enhancement is not one bucket of money. Excess spread depends on future collections. A reserve account can run down. A guarantee depends on the guarantor. Liquidity support may cover a timing gap without absorbing a credit loss. Put all of that under one percentage and you have made the analysis less clear.'],
    ['DIYA', 'Say what the protection is supposed to do. Then ask whether it is still there in the stress case. That is how you stop a tranche label from doing more work than it deserves.'],
  ],
  6: [
    ['MEERA', 'A bank can sell loans for cash, or it can keep the loans and buy protection against defined losses. Those transactions may sound similar in a meeting because both are described as risk transfer. They leave very different trails. In a cash transaction, you inspect the sale, the accounts, the retained interests, and the servicing. In a synthetic transaction, you inspect the protection contract with the same suspicion you would bring to an insurance claim.'],
    ['DIYA', 'Start with the uncomfortable questions. Who must pay when the reference pool defaults? What counts as a credit event? Is collateral posted? What happens if the protection provider is downgraded, disputes the event, or cannot perform? A contract can transfer loss in a model and fail to transfer it at the moment it matters.'],
    ['MEERA', 'Then someone says regulatory capital has fallen, as if that settles the economics. It does not. Capital treatment answers a rule-based question. The investor, the bank, and the regulator can all look at the same transaction and care about different failure paths.'],
    ['DIYA', 'Give each conclusion its own sentence. Legal ownership. Economic exposure. Counterparty exposure. Capital treatment. If you blend them, you make the transaction sound cleaner than it is.'],
  ],
  7: [
    ['MEERA', 'A mortgage investor can get paid too quickly and still lose money relative to the price they paid. That is the part beginners resist. They hear “principal came back” and assume good news. But if the investor bought a high coupon bond and rates have fallen, that principal may come back precisely when there is nowhere equally attractive to put it.'],
    ['DIYA', 'Now flip the world. Rates rise, borrowers stop refinancing, and principal stays out longer. The investor keeps earning the coupon, but the bond’s life stretches just when duration is painful and the funding desk may want its money back. Faster and slower cash create different risks. Neither is a moral victory.'],
    ['MEERA', 'TALF belongs in this conversation because financing can disappear even while underlying borrowers keep paying. A facility can make an eligible security easier to fund. It cannot make a weak pool strong or turn market value into a promise.'],
    ['DIYA', 'That is the habit to build. When someone says “liquidity risk,” ask whether they mean the borrower’s ability to pay, the investor’s ability to sell, or the investor’s ability to finance the position. Those are different problems, and they have different fixes.'],
  ],
};

const decisionRooms = {
  1: [
    ['MEERA', 'If I were buying the notes, I would ask for the loan tape before I asked for a rating. I want to see who the borrowers are, how the loans were made, what happens when a payment is late, and whether the seller has any reason to keep weak loans out of the pool.'],
    ['DIYA', 'Good. Then follow one mortgage all the way through. A payment is scheduled. It is collected. It enters an account. Fees and interest are paid under the documents. Principal is allocated. If any step depends on a party that can fail, write that down. The deal is only as clean as that chain on a bad month.'],
    ['MEERA', 'And if the seller says the pool is diversified, I should ask what would make many borrowers behave badly at the same time. The answer might be falling house prices, loose underwriting, a rate reset, one weak geography, or the same servicing failure across the book.'],
    ['DIYA', 'Exactly. An investor is not buying a noun called mortgages. The investor is buying a changing set of payment promises and a legal route through which those promises become cash.'],
  ],
  2: [
    ['MEERA', 'The practical test is brutal. Imagine the originator, the servicer, and the account bank are all under stress in the same week. Can the trustee identify the assets, take control of the accounts, obtain the records, and appoint somebody who can collect without losing the borrowers?'],
    ['DIYA', 'That is the right stress. A legal opinion matters, but it is not the last page of the review. Read the servicing agreement. Read the account control terms. Check the sweep timing. Check whether records can be exported. Ask how long a replacement really takes. A sixty day transition can be a very long time when cash is due every month.'],
    ['MEERA', 'Then bankruptcy remoteness has a much narrower meaning than people give it. It deals with the originator’s insolvency boundary. It does not make every payment, every file, or every service provider reliable.'],
    ['DIYA', 'Right. The best answer names the boundary and then lists what sits outside it. That is how you avoid selling legal comfort as if it were operational certainty.'],
  ],
  3: [
    ['MEERA', 'For each pool, I would build a different question list. For vehicle loans: how quickly can collateral be recovered and sold? For cards: what is happening to payment rates and new receivables? For distressed loans: who can enforce, at what cost, and how long will it take?'],
    ['DIYA', 'That is why broad statistics can make an analyst lazy. A weighted average rate does not tell you whether the weakest tail is growing. A recovery percentage does not tell you whether the cash arrives in six months or three years. A delinquency ratio does not tell you whether the delinquent loans sit in one city or one dealer channel.'],
    ['MEERA', 'And with a whole business deal, a healthy looking receivable can vanish if the business loses its licence, its biggest customer, or the people who know how to run it.'],
    ['DIYA', 'Precisely. Begin with the way cash is earned. Then ask what can interrupt that process. The right stress is not a generic “downside.” It is the particular way this pool can stop paying.'],
  ],
  4: [
    ['MEERA', 'I would never approve a deal after reading only the base case payment schedule. I want the same schedule after a missed collection, after a reserve breach, after a servicer advance fails, and after a trigger flips the deal into a different mode.'],
    ['DIYA', 'That is how you find the investor’s real position. On paper, two notes may both pay eight percent. Under stress, one may have interest deferred, another may stop receiving principal, and the residual may be shut out entirely. The coupon alone does not tell you who bears the pressure.'],
    ['MEERA', 'So we should talk about accounts as well as classes. Cash can be in a collection account, a reserve account, a principal account, or a distribution account. The label on the account matters only when the documents say who controls it and what it can be used for.'],
    ['DIYA', 'Exactly. Read the payment date rules closely enough that you can say where the next rupee goes if the month is worse than expected. That is a far better test than reciting the order of the notes.'],
  ],
  5: [
    ['MEERA', 'If the pool loses five rupees, I want to know the exact route of those five rupees. Does excess spread absorb them first? Does the reserve account take the hit? Does the junior note write down? When does the mezzanine begin to lose money? When can the senior note no longer pretend it is distant from the damage?'],
    ['DIYA', 'And then repeat the exercise after principal has paid down for a year. The same original subordination percentage can mean something different once balances have changed. Protection is not a brochure figure. It is a moving relationship between the remaining collateral and the remaining claims.'],
    ['MEERA', 'That also explains why a guarantee and a reserve cannot be treated as twins. One is money already set aside. The other is a promise from someone who may have their own problems when the pool is under pressure.'],
    ['DIYA', 'Good. Ask what absorbs the loss, when it is available, and whether it can fail for a reason unrelated to the borrowers. That is the difference between describing enhancement and relying on it.'],
  ],
  6: [
    ['MEERA', 'If a synthetic deal pays after a credit event, the definition of that event is not a footnote. It decides whether the protection exists. A delayed restructuring, a dispute over documentation, or a termination clause can matter as much as the default rate in the reference pool.'],
    ['DIYA', 'Yes. People often say the bank has hedged the losses, when what they mean is that the bank has bought a contract which may pay under stated conditions. Read those conditions. Then ask whether the protection seller can perform in the same market stress that hurts the loans.'],
    ['MEERA', 'And when a regulator recognises capital relief, I should still ask whether investors face an opaque pool, whether the bank has kept a residual piece, and whether the protection provider is concentrated.'],
    ['DIYA', 'Exactly. Capital relief may be appropriate under the rule. It is not a synonym for a risk-free transaction. The words are close in a presentation and very far apart in a crisis.'],
  ],
  7: [
    ['MEERA', 'When I model prepayment, I should not stop at the speed assumption. I should ask what rates do after the cash comes back, what the bond was bought for, whether the investor has matching liabilities, and whether the financing desk expects the position to stay outstanding.'],
    ['DIYA', 'Correct. A yield calculation can look respectable while the investor is quietly losing the timing they needed. That is why expected life, duration, spread income, reinvestment, and funding must be spoken about separately. They pull in different directions.'],
    ['MEERA', 'Then if a market facility improves financing, I should ask what collateral qualifies, what haircut applies, how long the financing lasts, and what happens when that support ends.'],
    ['DIYA', 'Good. Liquidity support buys time and access to funding. It does not turn a difficult security into an easy one forever. The investor still has to live with the cash flow after the facility is gone.'],
  ],
};

const caseAnchors = {
  2: 'Lehman left investors with this exact question: after a major institution fails, do the legal rights and the collection process still hold?',
  3: 'The mortgage crisis matters here because a broad label hid sharp differences in borrower quality, documentation, and recovery prospects.',
  4: 'The market freeze in 2008 and 2009 exposed how quickly payment priority and funding access can matter more than a familiar asset label.',
  5: 'The 2008 losses made investors confront an uncomfortable fact: people holding claims on the same pool can experience entirely different outcomes.',
  6: 'The crisis and the rules that followed forced banks to separate what moved on paper from the exposure they still carried.',
  7: 'The TALF period shows why a performing pool and a financeable security are not the same thing when markets are under pressure.',
};

const workedRooms = {
  3: [
    ['DIYA', 'Put five files on the table. File one is a two-wheeler loan. The borrower misses two instalments. The lender can repossess the vehicle, but the recovery depends on where it is, what condition it is in, how quickly the legal process works, and what the resale market will pay. A default rate tells you only where the problem begins.'],
    ['MEERA', 'File two is a credit-card pool. The borrower can pay the minimum, pay in full, draw again, or stop paying. New receivables may enter during the revolving period. Here the analyst watches payment rate, utilisation, charge-offs, dilution, eligibility, and the trigger that ends replenishment. The pool has a memory, but it also has a future.'],
    ['DIYA', 'File three is distressed debt. There is no scheduled instalment story left to trust. You need a recovery map: collateral, borrower cash generation, legal route, restructuring terms, costs, and time. Two recoveries of sixty can be radically different if one arrives in six months and the other after three years of litigation.'],
    ['MEERA', 'File four is a mortgage pool. Do not say the houses look alike and move on. Split the pool by documentation, loan-to-value, debt burden, rate type, geography, and borrower income. Then ask which groups fail together when prices fall or rates reset.'],
    ['DIYA', 'File five is a whole business deal. There may be strong historical cash flow, but the debt is exposed to customers leaving, a lease problem, a lost licence, a broken supply chain, or management failure. That is why collateral analysis begins with the way cash is earned.'],
  ],
  4: [
    ['DIYA', 'Run one ordinary month. The pool collects one hundred rupees. Assume five goes to tax and servicing, four goes to trustee and other senior costs, twelve goes to note interest, ten refills a reserve, and the remaining sixty-nine is available for principal. Those numbers are only an illustration. The point is that the investor who hears “the pool collected one hundred” still does not know what they receive.'],
    ['MEERA', 'Now make the month worse. Collections fall to seventy. The same fees may still be due. Interest may be senior to principal. The reserve may be below its required amount. The junior note may receive nothing even though borrowers are still paying. This is why cash flow is not a straight line from borrower to investor.'],
    ['DIYA', 'Then the trigger trips. The deal may stop buying new receivables. Excess spread may be trapped. Principal may go sequentially to the senior note. The language in the report might say “early amortisation” or “performance trigger.” The economic meaning is simpler: the deal has changed who waits and who gets protected.'],
    ['MEERA', 'When you read a waterfall, take one payment date and work it line by line. Name the account that receives cash. Name the test that must be met. Name the class that receives the next rupee. If you cannot do that, you have not read the payment terms yet.'],
  ],
  5: [
    ['DIYA', 'Use a pool of one hundred rupees. It has seventy senior notes, twenty mezzanine notes, and ten junior notes. Start with a twelve-rupee collateral loss. The first ten wipes out the junior piece. The next two hits mezzanine. The senior note has not lost money, but its protection has changed from thirty to eighteen. That is the information a tranche label hides.'],
    ['MEERA', 'Now compare principal allocation. Suppose the pool returns ten rupees of principal while performance is healthy. Under sequential payment, the senior balance falls from seventy to sixty while the mezzanine and junior pieces remain at twenty and ten. The senior note now has thirty of subordination beneath sixty. Its percentage protection has improved.'],
    ['DIYA', 'Under pro-rata payment, each eligible class may reduce together. The senior balance, mezzanine balance, and junior balance all shrink. The cash has returned, but the senior note may not have deleveraged as quickly relative to the junior cushion. Same pool. Same ten rupees. Different protection path.'],
    ['MEERA', 'Then stress the enhancement. A reserve account is cash already set aside. Excess spread depends on future collections. A guarantee depends on the guarantor. Liquidity support may pay an interest shortfall without absorbing a principal loss. Do not add those percentages together until you know what each one can actually cover.'],
    ['DIYA', 'That is the exercise: state where a tranche attaches, where it is fully written down, how much support remains today, and what happens after the next ten rupees of loss. If you can answer that, you are analysing a capital structure rather than repeating a rating.'],
  ],
  6: [
    ['MEERA', 'We have one missing piece to put on the table: STS. It means simple, transparent, and standardised securitisation. It is a regulatory classification with defined criteria around the transaction, disclosure, and safeguards. It can make a deal easier to compare and may affect regulatory treatment. It does not turn weak collateral into strong collateral.'],
    ['DIYA', 'Say that again because people get this wrong. STS is not a promise that nobody will default. It is not a promise that the notes will trade easily. It tells you the transaction has met a specified regulatory standard. The borrower pool can still deteriorate, and the investor still has to assess it.'],
    ['MEERA', 'Now take a synthetic transfer. A bank keeps a reference pool of corporate loans and buys protection against losses above an agreed point. In a model, the transfer looks clean. Then a borrower restructures. The protection contract has a narrow definition of credit event. The bank says the loss is real. The protection seller says the contract has not been triggered.'],
    ['DIYA', 'That dispute is not an edge case to hide in the annex. It is part of the risk transfer. Read the credit-event definition, settlement method, collateral terms, termination rights, and the financial strength of the protection provider. A protection contract is valuable only if it responds when the loan loss occurs.'],
    ['MEERA', 'Keep four conclusions separate. A cash sale changes ownership. A synthetic deal can shift specified loss. STS describes regulatory classification. Capital relief describes a rule-based outcome. None of those sentences alone tells you the full economic risk.'],
  ],
  7: [
    ['DIYA', 'Take a mortgage-backed security bought at a premium because it pays a high coupon. The investor expects to hold it for five years. Rates fall, borrowers refinance, and principal comes back in two years. The borrower paid. The investor still has a problem because the returned cash may earn much less when reinvested.'],
    ['MEERA', 'Now rates rise. Refinancing slows and the expected five-year life stretches toward eight. The investor keeps the coupon, but the bond has become longer precisely when longer duration hurts and funding may be harder to renew. That is extension risk. It is a timing problem with real mark-to-market and funding consequences.'],
    ['DIYA', 'PSA gives the analyst a convention for describing the assumed speed. It is not a verdict on credit quality. Change the prepayment speed in a model, then watch expected life, principal timing, and reinvestment income move. That is the useful way to talk about it.'],
    ['MEERA', 'TALF adds the funding layer. An eligible security could be financed subject to the facility terms and a haircut. If the investor owns one hundred of securities and the haircut is ten, the facility finances less than the full purchase price. The investor still has capital at risk and still owns the credit exposure after the financing is in place.'],
    ['DIYA', 'The questions are concrete: is the collateral eligible, how large is the haircut, when does funding mature, what happens if market value falls, and can the investor refinance when the facility ends? Funding support can keep a market functioning. It does not make the underlying cash flow certain.'],
  ],
};

function appendStandaloneMasterclass(lines, episode, number) {
  const fullLessons = episode.lessonIds
    .map((lessonId) => deepDiveLessons.find((lesson) => lesson.id === lessonId))
    .filter(Boolean);
  const roboticSourcePatterns = [
    /evidence boundary/i,
    /cited primary artifact/i,
    /transaction is evaluated as a defined allocation/i,
    /design is defensible only when/i,
    /public source pack does not disclose/i,
    /^what decision does /i,
    /professional output is therefore/i,
  ];
  const followUps = [
    'Put that into the cash path for me.',
    'Where would an investor feel that first?',
    'Why would that matter in a bad month rather than a normal one?',
    'What fact would make that conclusion change?',
  ];
  for (const lesson of fullLessons) {
    const title = lesson.canonicalName;
    const details = (lesson.sections ?? [])
      .filter((section) => !['desk-drill', 'applied-questions', 'interview-perspective'].includes(section.id))
      .flatMap((section) => section.body ?? [])
      .map((paragraph) => clean(paragraph))
      .filter((paragraph) => paragraph && !roboticSourcePatterns.some((pattern) => pattern.test(paragraph)))
      .slice(0, 5);
    if (!details.length) continue;
    push(lines, 'DIYA', `${title} becomes practical here. ${details[0]}`);
    for (const [index, detail] of details.slice(1).entries()) {
      push(lines, 'MEERA', followUps[index % followUps.length]);
      push(lines, 'DIYA', detail);
    }
  }
}

function appendFocusedWorkshop(lines, number) {
  const workshops = {
    5: [
      ['MEERA', 'Let me make the common mistake plainly. If the senior class is paid first, why not call it safe and move on?'],
      ['DIYA', 'Because payment priority is a conditional protection, not a guarantee. Start with subordination, reserve support, excess spread, and any other enhancement. Then ask how losses are allocated, when protection is depleted, and whether a trigger changes the principal-payment rule before the senior note faces loss.'],
      ['MEERA', 'So I should not ask only who is first in line. I should ask how long the line of protection in front of that claim actually is.'],
      ['DIYA', 'Exactly. Add time as well. Sequential principal payment can build senior protection as collateral pays down. Pro-rata payment can release principal to several classes at once. Neither is morally better. Each creates a different path for credit enhancement and expected maturity under stress.'],
      ['MEERA', 'Give me the decision-room version.'],
      ['DIYA', 'If defaults increase, model the loss timing, not only lifetime loss. A reserve may cover early shortfalls. Excess spread may disappear before principal losses arrive. A trigger may redirect cash. The senior class can appear insulated in a base case and become exposed because the structure loses its ability to replenish protection.'],
      ['MEERA', 'And the residual holder?'],
      ['DIYA', 'The residual is not an afterthought. It often absorbs volatility first and may carry the incentive to originate, service, or structure the pool conservatively. The residual claim tells you where the transaction has placed first economic loss and therefore where behaviour can change.'],
    ],
    7: [
      ['MEERA', 'Here is another tempting shortcut. If borrowers repay early, the security is performing, so the investor should be happy.'],
      ['DIYA', 'Only if the investor needed cash early and can reinvest at an acceptable return. Prepayment changes principal timing. A premium security can lose expected income when high-coupon cash returns into a lower-rate market. That is contraction risk, and it is a timing problem rather than a borrower-default problem.'],
      ['MEERA', 'Then the opposite is true when rates rise?'],
      ['DIYA', 'Yes. Refinancing may slow, expected life may extend, and the investor can be left holding a longer-duration claim when market yields are higher. The collateral may remain current while valuation, hedge effectiveness, and financing become more difficult. That is extension risk.'],
      ['MEERA', 'Where does the funding facility enter that analysis?'],
      ['DIYA', 'A facility can make financing available against eligible collateral, subject to its own terms and haircut. It does not replace pool analysis. The investor still has to ask whether the collateral performs, whether funding matures before the assets, whether a market-value change creates pressure, and whether refinancing remains available after the facility ends.'],
      ['MEERA', 'So the right answer separates three clocks: borrower payment, investor liability, and funding maturity.'],
      ['DIYA', 'Precisely. A liquidity solution can be valuable and still leave a duration mismatch. A strong credit pool can be valuable and still be hard to finance. A complete analysis keeps cash-flow, valuation, and funding conclusions separate before combining them into a decision.'],
    ],
  };
  for (const [speaker, text] of workshops[number] ?? []) push(lines, speaker, text);
}

function buildHumanEpisode(episode, number) {
  const module = humanEpisodeModules[number];
  const lines = [];
  for (const [speaker, text] of module.opening) push(lines, speaker, text);
  push(lines, 'DIYA', caseAnchors[number] || episode.eventAssessment.eventTitle);
  appendEpisodeCulturalTurns(lines, number, 'opening');
  for (let index = 0; index < module.lessons.length; index += 1) {
    const item = module.lessons[index];
    push(lines, index % 2 === 0 ? 'DIYA' : 'MEERA', item.lead);
    push(lines, 'MEERA', item.question);
    push(lines, index % 2 === 0 ? 'DIYA' : 'MEERA', item.wrong);
    push(lines, index % 2 === 0 ? 'MEERA' : 'DIYA', item.answer);
    push(lines, index % 2 === 0 ? 'DIYA' : 'MEERA', item.bridge);
  }
  for (const [speaker, text] of caseRooms[number] || []) push(lines, speaker, text);
  for (const [speaker, text] of decisionRooms[number] || []) push(lines, speaker, text);
  for (const [speaker, text] of workedRooms[number] || []) push(lines, speaker, text);
  appendStandaloneMasterclass(lines, episode, number);
  appendFocusedWorkshop(lines, number);
  appendEpisodeCulturalTurns(lines, number, 'close');
  push(lines, 'DIYA', `All right. Here is the situation. ${episode.eventAssessment.decision}`);
  push(lines, 'MEERA', 'Work it through aloud. Start with the cash flow, the legal claim, the timing, and the failure condition. A rating or a product label can wait.');
  push(lines, 'DIYA', module.india);
  push(lines, 'MEERA', module.close);
  push(lines, 'DIYA', 'You understand the deal when you can explain the cash, name the assumption, and follow the consequence to the investor who has to live with it.');
  return lines.join('\n\n');
}

function buildEpisode(episode, number) {
  if (number === 1 && fs.existsSync(episodeOneOverride)) {
    return fs.readFileSync(episodeOneOverride, 'utf8').replace(/\r/g, '').trim();
  }
  if (number === 1) return buildEpisodeOneHuman(episode);
  if (humanEpisodeModules[number]) return buildHumanEpisode(episode, number);
  const lessons = episode.lessonOrder;
  const fullLessons = episode.lessonIds.map((lessonId) => deepDiveLessons.find((lesson) => lesson.id === lessonId)).filter(Boolean);
  const event = episode.eventAssessment;
  const lines = [];
  for (const [speaker, text] of openings[number]) push(lines, speaker, text);
  appendEpisodeCulturalTurns(lines, number, 'opening');
  push(lines, 'ARJUN', `This is episode ${number} of seven. We are working through ${lessons.map((item) => item.canonicalName).join(', ')}.`);
  push(lines, 'DIYA', `The real event is ${event.eventTitle}. ${spokenEventContext[number]}`);
  push(lines, 'ARJUN', event.decision);

  const episodeMoves = lessonMoves[number];
  for (let index = 0; index < lessons.length; index += 1) {
    const lesson = lessons[index];
    const fullLesson = fullLessons[index] || {};
    const step = event.steps[index];
    const move = episodeMoves[index % episodeMoves.length];
    push(lines, 'DIYA', `Start with ${lesson.canonicalName}. ${step?.[1] || `Ask what ${lesson.canonicalName} is designed to isolate.`}`);
    push(lines, 'MEERA', move[0]);
    push(lines, 'DIYA', `That is the trap. ${move[1]} ${answerFor(fullLesson, step)}`);
    push(lines, 'MEERA', index % 2 === 0 ? 'So the label is only the entry point. The decision depends on the cash flow and the failure condition.' : 'Understood. I was treating a convenient description as if it were proof.');
    push(lines, 'DIYA', index === lessons.length - 1 ? 'Exactly. Once these distinctions connect, we can trace the transaction instead of memorising its vocabulary.' : 'Keep that distinction. The next concept adds a different risk to the same transaction.');
  }

  const joke = humor[number];
  push(lines, joke[0], joke[1]);
  push(lines, joke[2], joke[3]);
  appendEpisodeCulturalTurns(lines, number, 'close');
  appendStandaloneMasterclass(lines, episode, number);
  push(lines, 'DIYA', `Now return to the event. ${event.outcome}`);
  push(lines, 'MEERA', `Bring it back to India. ${spokenIndiaBridge[number]}`);
  push(lines, 'DIYA', 'Final challenge. Explain what moved, who owned the cash, who controlled collection, which assumption was exposed, and which claim absorbed the consequence first.');
  push(lines, 'MEERA', episode.teachingPlan?.closeTest || 'Your answer is not complete until the transaction can be traced from the borrower to the investor under both normal and stressed conditions.');
  push(lines, 'DIYA', 'For your written follow up, draw the transaction, mark the first wrong assumption in our discussion, and replace it with the evidence or deal term that should have been tested.');
  push(lines, 'MEERA', 'Then test the structure once more. If one arrow, account, trigger, or assumption is missing, the conclusion is not finished.');
  return lines.join('\n\n');
}

const episodes = source.episodes.map((episode) => {
  const script = buildEpisode(episode, episode.number);
  const textFile = `${textDirectory}/episode-${String(episode.number).padStart(2, '0')}.txt`;
  fs.writeFileSync(textFile, `${script}\n`);
  return {
    number: episode.number,
    id: episode.id,
    title: episode.title,
    lessonIds: episode.lessonIds,
    lessonOrder: episode.lessonOrder,
    eventTitle: episode.eventAssessment.eventTitle,
    format: 'Two voice real event assessment and transaction decision dialogue',
    teachingOrder: ['human-scale-example', 'named-real-event', 'formal-mechanism', 'decision-challenge'],
    depthCoverage: {
      standaloneOpening: true,
      realEventSpine: true,
      mappedLessons: true,
      mechanismWalkthrough: true,
      decisionChallenge: true,
      adversarialCorrection: true,
    },
    voices: {
      diya: 'en-IN-Diya:DragonHDLatestNeural',
      meera: 'en-IN-Meera:DragonHDLatestNeural',
    },
    speakerMarkup: '[DIYA] and [MEERA] markers are renderer instructions and must not be spoken.',
    script,
    audioTextFile: textFile,
    teachingRules: [
      'The dialogue must teach every assigned sub lesson, not narrate the production plan.',
      'Each disagreement must expose a plausible finance error and the correction must explain the mechanism without derailing the lesson.',
      'The real event is evidence. Return to the general concept after each event reference.',
      'Use humor sparingly and only after the technical correction is complete.',
      'Keep the tone rigorous, conversational, and appropriate for MBA finance students.',
    ],
  };
});

const output = {
  schemaVersion: 'securitisation-masterclass-multivoice-dialogue-scripts.v3',
  series: {
    title: source.series.title,
    totalEpisodes: episodes.length,
    totalLessons: source.series.totalLessons,
    oldScriptsUntouched: true,
    speakerProtocol: 'Each paragraph begins with [DIYA] or [MEERA]. The Azure renderer must route the paragraph to the corresponding voice and must never speak the marker.',
    openingPauseSeconds: 1,
  },
  episodes,
};

fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, textDirectory, episodes: episodes.length, characters: episodes.map((episode) => episode.script.length) }, null, 2));
