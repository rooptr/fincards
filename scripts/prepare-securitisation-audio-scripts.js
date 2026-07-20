import fs from 'node:fs';
import path from 'node:path';

const batchFiles = fs.readdirSync('scratch')
  .filter((file) => /^deep_dive_generated_securitisation_batch_\d{3}\.json$/.test(file))
  .sort();
const lessons = batchFiles.flatMap((file) => JSON.parse(fs.readFileSync(path.join('scratch', file), 'utf8')).lessons ?? []);
const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_v3';
// Azure supplies the opening beat in SSML. Keeping it out of the narration
// text prevents the literal cue from becoming an abrupt spoken transition.
const openingPause = '';

const episodeDefinitionIds = {
  1: ['cash-flow-right', 'asset-pool', 'conduit', 'pass-through', 'pay-through', 'revolving-period'],
  2: ['originator', 'special-purpose-vehicle', 'true-sale', 'servicer', 'risk-retention', 'cash-flow-right'],
  3: ['asset-pool', 'recovery-rate', 'prepayment-rate', 'servicer', 'whole-business-collateral', 'early-amortisation'],
  4: ['pass-through', 'pay-through', 'waterfall', 'performance-trigger', 'sequential-amortisation', 'pro-rata-amortisation'],
  5: ['tranche', 'subordination', 'credit-enhancement', 'attachment-point', 'detachment-point', 'sequential-amortisation', 'pro-rata-amortisation'],
  6: ['synthetic-securitisation', 're-securitisation', 'sts-standard', 'risk-retention', 'credit-enhancement', 'liquidity-facility'],
  7: ['prepayment-rate', 'liquidity-facility', 'pay-through', 'early-amortisation', 'performance-trigger'],
};

function spoken(value) {
  return String(value ?? '')
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/\bHello Deepti\.\s+I hope you are preparing well and staying hydrated\./gi, '[[LESSON_ONE_GREETING]]')
    .replace(/\bDeepti\b,?\s*/gi, '')
    .replaceAll('â€™', '’')
    .replaceAll('â€œ', '“')
    .replaceAll('â€', '”')
    .replaceAll('â€“', '–')
    .replaceAll('â€”', '—')
    .replaceAll('â€¦', '…')
    .replaceAll('Â', '')
    .replace('This episode uses RBI Master Direction: Transfer of Loan Exposures Directions, 2021 to teach the mechanism, the evidence required to test it, and the conclusion that the evidence cannot support.', '')
    .replace(/This episode uses.*?the conclusion that the evidence cannot support\./gi, '')
    .replace(/The transaction is evaluated as a defined allocation of legal rights, cash-flow timing, credit risk, and control rights among originator, vehicle, servicer, noteholders, and residual interests\./gi, '')
    .replace(/The public evidence does not disclose the transaction-specific field required for a numeric stress in this analysis\. The right conclusion is therefore a reproducible diligence design: obtain the field, state the convention, run the waterfall, measure enhancement consumption, and identify the claim whose payment changes first\./gi, '')
    .replace(/transaction documents/gi, 'contractual rules')
    .replace(/the documents/gi, 'the deal terms')
    .replace(/source pack/gi, 'available evidence')
    .replace(/source document/gi, 'reference')
    .replace(/\bdocuments?\b/gi, 'deal terms')
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
    .replace(/\bthe lesson is to\b/gi, 'the analytical requirement is to')
    .replace(/\bthis lesson\b/gi, 'this topic')
    .replace(/\bthe lesson\b/gi, 'the analysis')
    .replace(/public available evidence/gi, 'public evidence')
    .replace(/professional output/gi, 'right conclusion')
    .replace(/\[\[LESSON_ONE_GREETING\]\]/g, 'Hello Deepti. I hope you are preparing well and staying hydrated.')
    .replace(/\s+/g, ' ')
    .replace(/\bSPV\b/g, 'S P V')
    .replace(/\bABS\b/g, 'asset backed securities')
    .replace(/\bNPL\b/g, 'non performing loan')
    .replace(/\bSTS\b/g, 'simple, transparent, and standardised')
    .trim();
}

function pick(options, index, offset = 0) {
  return options[(index + offset) % options.length];
}

function sentenceCase(value) {
  const text = String(value ?? '').trim();
  return text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : '';
}

function sentenceStart(value) {
  const text = String(value ?? '').trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : '';
}

function sectionNarrativeCue(sectionId, lessonIndex) {
  const cues = {
    'transaction-mandate': [
      'Start with the financial problem, not the label on the notes.',
      'The useful place to begin is the financial problem, not the label on the notes.',
      'Before getting technical, focus on what the structure is trying to accomplish.',
    ],
    'pool-data-room': [
      'Now zoom in on the cash flows themselves.',
      'Everything turns on what is actually inside the pool.',
      'This is where a broad story gives way to evidence.',
    ],
    'structure-design': [
      'Next, separate the people in the deal from the claims they hold.',
      'Legal separation matters because cash does not move by accident.',
      'Now we can trace who does what once the transaction closes.',
    ],
    'priority-of-payments': [
      'The payment rules become visible once we follow a real collection through the deal.',
      'Follow one rupee of collections through the structure.',
      'The key is not how much cash the pool earns in total, but where each rupee goes first.',
    ],
    'credit-enhancement-triggers': [
      'Now turn to the protection built into the deal.',
      'This is where you find out whether the apparent safety is real or merely cosmetic.',
      'The next layer is about buffers, switches, and the moment those buffers start to disappear.',
    ],
    'stress-transmission': [
      'A structure only reveals itself under pressure.',
      'Now change one assumption and watch the consequence travel.',
      'This is the part that separates a tidy description from real credit analysis.',
    ],
    'investment-committee-memo': [
      'At this point, the question is whether the evidence supports a decision.',
      'Pull the threads together before reaching a conclusion.',
      'The conclusion should now feel earned, not asserted.',
    ],
    'applied-questions': [
      'Use the next questions to see whether the reasoning holds when the facts change.',
      'Try applying the framework rather than repeating the vocabulary.',
      'Use these questions to see whether you can reason through a fresh deal.',
    ],
    'desk-drill': [
      'Use the next questions to see whether the reasoning holds when the facts change.',
      'Try applying the framework rather than repeating the vocabulary.',
      'Use these questions to see whether you can reason through a fresh deal.',
    ],
  };
  return pick(cues[sectionId] ?? ['Let’s follow the logic one step further.'], lessonIndex);
}

function openingContext(lesson) {
  if (lesson.topicId === 'securitization') {
    return [
      'That distinction is easy to miss. A lender can transfer a loan without creating a securitisation, and a security can carry a familiar label without giving its investor a claim on the right cash flows.',
      'Here is the simplest useful picture. Imagine many borrowers making monthly repayments into one carefully separated collection account. Investors do not buy the bank itself. They buy claims on that stream of payments, and the transaction documents decide who is paid first when the stream weakens.',
      'If this is new to you, keep that picture in mind before worrying about the technical vocabulary. It gives you the economic logic behind every term that follows.',
      'That is securitisation. An originator transfers a defined pool of assets or cash-flow rights to a special purpose vehicle, and the vehicle issues securities paid from the performance of that pool. The claims sit at different positions in the payment waterfall, so the structure reallocates payment timing and credit losses among investors. It does not make the underlying credit risk disappear.',
      'The question throughout this masterclass is therefore simple but demanding: what cash flow exists, who has the legal right to it, what can interrupt it, and who absorbs the loss if it does?',
    ];
  }

  return [
    simplePicture(lesson),
    'Economically, the transaction turns a stream of future payments into a claim that another person can price, buy, and enforce. The legal and technical language matters because it determines whether that claim survives stress.',
    spoken(lesson.dek),
  ];
}

function lessonInvitation(lesson) {
  const topic = lesson.topicId;
  if (topic === 'securitization') return 'We will build securitisation from the ground up, starting with one question: what exactly does an investor own?';
  if (/cash_securitization/.test(topic)) return 'Follow a stream of borrower payments with me. The question is when that stream becomes an investable claim rather than a vague promise of future revenue.';
  if (/term_securitization/.test(topic)) return 'There are two clocks in this transaction, and confusing them creates bad conclusions. One belongs to the note. The other belongs to the collateral.';
  if (/conduit/.test(topic)) return 'Imagine one funding platform receiving assets from several sellers. The structure looks efficient until you ask whether the pools are truly comparable and who carries the concentration risk.';
  if (/originator/.test(topic)) return 'Start with the institution that made the loans. It may transfer the assets, but its incentives, representations, servicing role, and retained exposure can still shape the transaction.';
  if (/special_purpose_vehicle/.test(topic)) return 'A separate legal vehicle is not a decorative box on a diagram. It exists to separate a claim on collateral from the financial fortunes of the institution that created it.';
  if (/bankruptcy/.test(topic)) return 'Let us put the transaction under its hardest test: the originator fails tomorrow. Which cash flows remain protected, and which assumptions suddenly matter?';
  if (/servicer/.test(topic)) return 'The loans have moved, but the work has not disappeared. Someone still has to collect, reconcile, report, and remit every payment.';
  if (/auto_loan/.test(topic)) return 'A vehicle can be valuable and the loan can still be weak. The useful question is how borrower behaviour, collateral value, repossession, and recovery timing combine.';
  if (/credit_card/.test(topic)) return 'A credit-card pool keeps changing after issuance. That makes the transaction a moving credit problem, not a fixed pile of receivables.';
  if (/non_performing/.test(topic)) return 'When a loan has already failed, the analysis moves from promised payment to recoverable value. The calendar of enforcement matters as much as the eventual recovery.';
  if (/mortgage/.test(topic)) return 'The word mortgage tells you almost nothing by itself. Underwriting quality, borrower characteristics, collateral, documentation, and cash-flow behaviour determine the real risk.';
  if (/whole_business/.test(topic)) return 'A whole-business security depends on an operating system, not just a set of receivables. If the business stops functioning, the collateral cash flow can disappear with it.';
  if (/pass_through/.test(topic)) return 'When collections pass through to investors, they carry more of the collateral’s timing behaviour with them. That makes prepayment and collection timing part of the investment.';
  if (/pay_through/.test(topic)) return 'An issuer can reshape collateral collections into a designed payment profile. That design creates protection, but it also creates assumptions that must survive stress.';
  if (/waterfall/.test(topic)) return 'Take one rupee of collections and follow it. The order of payment tells you more about the transaction than the total amount collected.';
  if (/tranching/.test(topic)) return 'Several investors can face the same borrowers and still experience completely different outcomes. Tranching is the machinery that creates those positions.';
  if (/pro_rata/.test(topic)) return 'Principal can be shared across classes or used to retire one class before the next. That choice changes how quickly protection is consumed.';
  if (/re_securitization/.test(topic)) return 'Now take an already structured claim and use it as collateral for another structure. Each additional layer adds a new dependence that the learner must be able to trace.';
  if (/regulatory_capital/.test(topic)) return 'A balance sheet can show less regulatory capital without showing less economic risk. Separate the accounting, legal, contractual, and prudential effects before drawing a conclusion.';
  if (/synthetic/.test(topic)) return 'The loans may stay exactly where they are while the credit risk changes hands through a contract. That is the starting point for synthetic securitisation.';
  if (/sts_/.test(topic)) return 'A regulatory label can impose conditions on structure and disclosure. It cannot promise that the borrowers will pay or that the market will remain liquid.';
  if (/psa/.test(topic)) return 'Borrowers do not repay on the timetable investors imagine. A prepayment convention helps describe that uncertainty, but it is not a forecast of human behaviour.';
  if (/term_asset_backed/.test(topic)) return 'Funding support can keep an asset-backed market functioning during stress. It does not turn weak collateral into strong collateral.';
  return `Let us make ${lesson.canonicalName.toLowerCase()} concrete by following its cash flow, legal claim, and remaining risk.`;
}

function learnerGreeting() {
  return '';
}

function learnerBridge(lesson) {
  const bridges = [
    'Keep that picture in mind while we make the mechanism precise.',
    'The technical vocabulary makes more sense once the cash flow is clear.',
    'This distinction keeps the rest of the topic from becoming a list of labels.',
    'Keep that question in mind, because the answer determines how the transaction behaves under stress.',
  ];
  return bridges[(lesson.series.overallSequence - 1) % bridges.length];
}

function rawLessonClassOpening(lesson) {
  const topic = lesson.topicId;
  if (topic === 'securitization') return 'Today, we are looking at how a lender turns a pool of contractual cash flows into investable claims without making the underlying risk disappear.';
  if (/cash_securitization/.test(topic)) return 'Today, we are looking at when a stream of borrower payments becomes a legally meaningful and investable cash-flow claim.';
  if (/term_securitization/.test(topic)) return 'Today, we are looking at the two clocks inside a term securitisation: the note’s legal maturity and the collateral’s actual cash-return schedule.';
  if (/conduit/.test(topic)) return 'Today, we are looking at how one funding platform can combine assets from several sellers, and where that apparent diversification can fail.';
  if (/originator/.test(topic)) return 'Today, we are looking at why the institution that created the loans still matters after the assets have been transferred.';
  if (/special_purpose_vehicle/.test(topic)) return 'Today, we are looking at why a special purpose vehicle exists and what makes its legal separation economically meaningful.';
  if (/bankruptcy/.test(topic)) return 'Today, we are looking at what happens to the collateral and its cash flows when the originator enters financial distress.';
  if (/servicer/.test(topic)) return 'Today, we are looking at the operational chain that turns borrower payments into reported and distributable investor cash.';
  if (/auto_loan/.test(topic)) return 'Today, we are looking at why the value of a financed vehicle is not the same thing as the cash an auto-loan pool can reliably produce.';
  if (/credit_card/.test(topic)) return 'Today, we are looking at a revolving credit-card pool whose collateral changes even after the securities have been issued.';
  if (/non_performing/.test(topic)) return 'Today, we are looking at what remains valuable after a loan has already failed, and why recovery timing matters as much as recovery amount.';
  if (/mortgage/.test(topic)) return 'Today, we are looking at why a mortgage label is not enough to understand underwriting, borrower, collateral, and loss risk.';
  if (/whole_business/.test(topic)) return 'Today, we are looking at whether an operating business can continue producing the cash flow that its securities depend on.';
  if (/pass_through/.test(topic)) return 'Today, we are looking at what investors inherit when collateral collections pass through with limited reshaping.';
  if (/pay_through/.test(topic)) return 'Today, we are looking at how an issuer reshapes collateral collections into a designed payment profile, and what assumptions that design requires.';
  if (/payment_waterfall/.test(topic)) return 'Today, we are looking at how one rupee of collections moves through fees, reserves, interest, principal, losses, and residual claims.';
  if (/securitization_waterfall/.test(topic)) return 'Today, we are looking at how a securitisation waterfall changes when performance triggers move the transaction into a different payment state.';
  if (/tranching/.test(topic)) return 'Today, we are looking at how one collateral pool creates different investor outcomes through priority, subordination, and loss allocation.';
  if (/pro_rata/.test(topic)) return 'Today, we are looking at how sharing principal across classes changes protection, timing, and the risk carried by each tranche.';
  if (/re_securitization/.test(topic)) return 'Today, we are looking at what happens when an already structured claim becomes collateral for a second structured transaction.';
  if (/regulatory_capital/.test(topic)) return 'Today, we are looking at the difference between risk moving economically, risk moving legally, and risk receiving regulatory capital recognition.';
  if (/synthetic/.test(topic)) return 'Today, we are looking at how credit risk can move through contracts while the underlying loans remain on the originator’s balance sheet.';
  if (/sts_/.test(topic)) return 'Today, we are looking at what the simple, transparent, and standardised designation can establish, and what it cannot guarantee.';
  if (/psa/.test(topic)) return 'Today, we are looking at how prepayment conventions describe borrower timing and why they are not the same as a forecast.';
  if (/term_asset_backed/.test(topic)) return 'Today, we are looking at how a liquidity facility can support asset-backed funding without guaranteeing the performance of the underlying collateral.';
  return `Today, we are looking at ${lesson.canonicalName.toLowerCase()} and the decision it is designed to inform.`;
}

function lessonClassOpening(lesson) {
  return lessonInvitation(lesson)
    .replace(/^Today, we are looking at /, 'Start with ')
    .replace(/^Today, we're examining /, 'Start with ')
    .replace(/^We will build /, 'Build ')
    .replace(/Start with when a stream of borrower payments becomes/, 'Start with how a stream of borrower payments becomes');
}

function conceptReveal(lesson) {
  const dek = spoken(lesson.dek ?? '')
    .replace(/This episode uses.*?cannot support\.?/i, '')
    .replace(/The transaction must be evaluated through its legal rights, cash-flow mechanics, and retained risks\.?/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (dek) return `In precise terms, ${dek.charAt(0).toLowerCase()}${dek.slice(1)}`;
  const question = spoken(lesson.governingQuestion ?? '').replace(/[?]+$/, '');
  return `In precise terms, this concept exists to answer one question: ${question}.`;
}

function definitionNarration(definition, index) {
  const openings = [
    `In structured finance, ${definition.term} means ${sentenceCase(definition.formalDefinition)}`,
    `${definition.term} is ${sentenceCase(definition.formalDefinition)}`,
    `The formal meaning of ${definition.term} is ${sentenceCase(definition.formalDefinition)}`,
  ];
  const implications = [
    `Its relevance is that ${sentenceCase(definition.whyItMatters)}`,
    `Its practical consequence is that ${sentenceCase(definition.whyItMatters)}`,
    `The decision implication is that ${sentenceCase(definition.whyItMatters)}`,
  ];
  const cautions = [
    `The analytical error is ${sentenceCase(definition.commonExaminationError)}`,
    `A common error is ${sentenceCase(definition.commonExaminationError)}`,
    `The critical boundary is this: ${sentenceCase(definition.commonExaminationError)}`,
  ];
  return [pick(openings, index), pick(implications, index + 1), pick(cautions, index + 2)].join(' ');
}

function simplePicture(lesson) {
  const topic = lesson.topicId;
  if (/waterfall|pass_through|pay_through|pro_rata/.test(topic)) {
    return 'Picture one collection account receiving borrower payments. The question is not whether cash arrives. The question is who may take it first, who must wait, and what changes when the cash is insufficient.';
  }
  if (/tranch|subordination|credit_enhancement|attachment|detachment/.test(topic)) {
    return 'Picture one pool of loans supporting several investors standing in a queue. They are exposed to the same borrowers, but they do not absorb a missed payment or a loss at the same time.';
  }
  if (/originator|special_purpose|true_sale|bankruptcy|servicer/.test(topic)) {
    return 'Picture a loan book being moved into a legally separate container. The crucial question is whether the cash remains protected and collectible if the institution that made the loans runs into trouble.';
  }
  if (/auto|credit_card|non_performing|mortgage|whole_business|asset_pool|recovery/.test(topic)) {
    return 'Picture thousands of individual payment promises entering one pool. The label on the asset class matters less than the behaviour of the borrowers, the recoveries after default, and the timing of each payment.';
  }
  if (/cash_securitization|term_securitization|conduit|revolving/.test(topic)) {
    return 'Picture a lender separating a defined stream of borrower payments from its wider business and turning that stream into an investable claim. The structure succeeds only if the rights, the cash path, and the funding terms match.';
  }
  if (/re_securitization/.test(topic)) {
    return 'Picture an investor claim from one securitisation being placed inside a second transaction. The second waterfall cannot be understood without tracing the first waterfall beneath it.';
  }
  if (/synthetic|capital_relief|sts/.test(topic)) {
    return 'Picture risk being moved through contracts rather than through a physical transfer of every loan. The challenge is to distinguish what moved legally, what moved economically, and what the rules recognise.';
  }
  if (/prepayment|term_asset_backed|liquidity/.test(topic)) {
    return 'Picture an investor expecting a stream of repayments on one timetable, only to find that borrowers repay early, repay late, or the security becomes difficult to finance. Timing can change the investment even when credit performance has not collapsed.';
  }
  return 'Picture a set of borrower payments entering a ring-fenced structure. The lesson is to follow the cash, the legal claim, and the risks separately instead of treating the transaction as one black box.';
}

function sectionForDefinition(definition) {
  const group = definition.group.toLowerCase();
  if (/collateral|pool performance|operating cash flow/.test(group)) return 'pool-data-room';
  if (/transaction parties|legal structure|legal scope|issuance architecture/.test(group)) return 'structure-design';
  if (/cash flow|cash-flow architecture/.test(group)) return 'priority-of-payments';
  if (/capital structure|credit enhancement|loss allocation/.test(group)) return 'credit-enhancement-triggers';
  return 'stress-transmission';
}

function sectionPrompt(sectionId, lessonIndex) {
  const prompts = {
    'transaction-mandate': [
      'What is actually being financed here, and which risks are still left behind?',
      'If you had to explain the economic purpose in one sentence, what would you say?',
      'The first question is simple: why would anyone build this structure instead of leaving the assets on the lender’s balance sheet?',
    ],
    'pool-data-room': [
      'Would one average performance number really tell you what you need to know, or would you want to see the borrowers, collateral, timing, and concentrations underneath it?',
      'What could cause two pools with the same headline default rate to produce very different investor outcomes?',
      'Before trusting the pool, ask which facts determine whether cash arrives on time and in full.',
    ],
    'structure-design': [
      'If the originator failed tomorrow, who would still own the cash flow and who would still collect it?',
      'Who has a legal claim, who controls the cash, and who has to keep the collections process running?',
      'The practical test is this: if one party disappears, does the transaction still work?',
    ],
    'priority-of-payments': [
      'Imagine one hundred rupees of collections arriving today. Who receives the first rupee, and who takes the shortfall if only eighty arrives?',
      'Can you trace a single borrower payment all the way to its final recipient?',
      'The question is not whether the pool earns cash in total. It is whether the right claim receives it at the right time.',
    ],
    'credit-enhancement-triggers': [
      'How much deterioration can the structure absorb before junior protection is used up and senior investors are exposed?',
      'Which buffer is real, which buffer is conditional, and what makes the payment rules change?',
      'What happens when the protection looks large on day one but is consumed faster than expected?',
    ],
    'stress-transmission': [
      'Which event changes the cash first, who feels it first, and which document clause forces the structure to react?',
      'Change one assumption. Where does the effect appear first: collections, reserves, principal timing, or a tranche balance?',
      'A stress case is useful only if you can follow its consequence from the borrowers to the investors.',
    ],
    'investment-committee-memo': [
      'Could you defend the conclusion using documented cash flows, legal rights, and stated assumptions alone?',
      'What fact, if it changed tomorrow, would force you to reverse the recommendation?',
      'This is the moment to separate evidence from confidence.',
    ],
    'applied-questions': [
      'Now test the mechanism against unfamiliar situations, not just the example you have heard.',
      'If the facts changed, which part of your reasoning would change first?',
      'Use these questions to practise explaining the idea in your own words.',
    ],
    'desk-drill': [
      'Now test the mechanism against unfamiliar situations, not just the example you have heard.',
      'If the facts changed, which part of your reasoning would change first?',
      'Use these questions to practise explaining the idea in your own words.',
    ],
  };
  return pick(prompts[sectionId] ?? ['What does this change about the way you understand the transaction?'], lessonIndex);
}

function isNarrationBoilerplate(value) {
  const text = spoken(value);
  return [
    /^The evidence boundary for /i,
    /^The cited primary artifact establishes /i,
    /^The transaction is evaluated as a defined allocation of /i,
    /^The design is defensible only when each legal feature /i,
    /^The public source pack does not disclose /i,
    /^The public evidence does not disclose /i,
    /^The questions below test the transferable finance logic /i,
    /^What decision does .+ make possible in a structured-finance transaction/i,
  ].some((pattern) => pattern.test(text));
}

function softenTopicReferences(value, lesson, state) {
  return spoken(value);
}

function usefulQuestion(lesson) {
  if (!/^What decision does .+ make possible in a structured-finance transaction/i.test(lesson.governingQuestion ?? '')) {
    return lesson.governingQuestion;
  }
  return `Can the collateral produce cash quickly enough, and with enough protection, to support the claims this structure promises to investors?`;
}

function reviewNarration(item, index) {
  const leads = [
    'Consider the implication.',
    'Now reverse the assumption.',
    'Apply the mechanism to this question.',
    'Frame the answer as an investment-committee challenge.',
  ];
  const answers = [
    'The answer starts here:',
    'The point is concrete:',
    'Name the underlying fact:',
    'Follow the cash path:',
  ];
  return `${pick(leads, index)} ${item.question} ${pick(answers, index + 1)} ${item.answer}`;
}

function triggerNarration(trigger, index) {
  const threshold = sentenceCase(trigger.threshold).replace(/[.]+$/, '');
  const consequence = sentenceCase(trigger.consequence).replace(/^test whether\s+/i, '').replace(/[.]+$/, '');
  if (/^obtain /i.test(threshold)) {
    return `${trigger.name} cannot be judged from a generic description. You need ${threshold.replace(/^obtain /i, '')}. Once that is known, test whether ${consequence}.`;
  }
  return `${trigger.name} matters when ${threshold}. At that point, ${consequence}.`;
}

function formulaNarration(lesson) {
  const formula = lesson.formula ?? lesson.formulaText ?? lesson.formulaKatex ?? lesson.identity;
  if (!formula) return '';
  const variables = lesson.formulaVariables ?? lesson.variables ?? lesson.inputs?.filter((item) => item.role === 'formula_variable') ?? [];
  const variableText = variables.length
    ? variables.map((item) => `${item.name}: ${item.definition ?? item.description ?? item.value ?? 'the stated input'}`).join('. ')
    : 'Read each term from left to right and identify whether it is an amount, a rate, a timing assumption, or a comparison base.';
  return `There is a calculation worth pausing over here. Read it as follows: ${formula}. The formula is useful only when each input has a clear economic meaning. ${variableText}`;
}

function evidenceCue(lesson) {
  return '';
}

function realWorldThread(lesson) {
  const topic = lesson.topicId;
  if (/auto_loan/.test(topic)) return 'Kogta Financial\'s vehicle-loan securitisation shows why this is more than a label: scheduled borrower collections, collateral performance, and the senior-note claim must continue to align after closing.';
  if (/cash_securitization|term_securitization|conduit|credit_card|pass_through|pay_through|waterfall|tranching|pro_rata/.test(topic)) return 'The S E C asset-backed securities framework exists because investors need the pool, payment rules, servicing arrangements, and risk factors to be visible before they can assess a claim on borrower cash flows.';
  if (/originator|special_purpose|bankruptcy|servicer|whole_business/.test(topic)) return 'The R B I transfer and securitisation directions make the legal point concrete: the identity of the transferor, the asset rights, the servicing arrangement, and the cash controls cannot be treated as afterthoughts.';
  if (/non_performing/.test(topic)) return 'The R B I\'s work on asset reconstruction makes the distinction unavoidable: once a loan has failed, the decision shifts from scheduled yield to recoverable value, enforcement path, and time to collection.';
  if (/mortgage|re_securitization/.test(topic)) return 'The Financial Crisis Inquiry Commission documented how mortgage risk became harder to see as loans were moved, repackaged, and sold. It requires the investor to trace the underlying claim rather than trusting the label on the final security.';
  if (/regulatory_capital|synthetic/.test(topic)) return 'Basel\'s securitisation framework forces a distinction between legal ownership, economic risk transfer, and regulatory-capital treatment. Those three can move together, but they do not automatically do so.';
  if (/sts_/.test(topic)) return 'The European simple, transparent, and standardised framework shows why a regulatory designation is a disclosure and structural discipline, not a promise that the collateral will perform.';
  if (/psa/.test(topic)) return 'The SIFMA standard prepayment model is a convention for describing cash-flow timing. It gives market participants a common language, not a guarantee that borrowers will behave according to the curve.';
  if (/term_asset_backed/.test(topic)) return 'The Federal Reserve created T A L F when asset-backed funding markets were under severe strain. The facility addressed funding liquidity; it did not convert private collateral losses into risk-free cash flows.';
  return '';
}

function culturalParallel(lesson) {
  const topic = lesson.topicId;
  if (/cash_securitization|pass_through/.test(topic)) return 'The Iron Bank did not care who sounded powerful; it cared who could pay, from which cash flow, and under which remedy. That is repayment-source analysis.';
  if (/term_securitization|psa|term_asset_backed/.test(topic)) return 'At the Wall, survival depended on timing as much as strength. A payment promised in spring does not solve a funding need in winter. Term risk is the finance version of that timing problem.';
  if (/conduit|pro_rata/.test(topic)) return 'The Red Wedding is a lesson in hidden dependence. Several apparently separate positions can fail together when one concealed relationship connects them.';
  if (/originator|regulatory_capital/.test(topic)) return 'Shakuni\'s advantage came from incentives and information, not from the rules written on the board. The originator\'s incentives must be examined with the same discipline.';
  if (/special_purpose|bankruptcy/.test(topic)) return 'The Wall was not protective because it was impressive. It worked only when gates, watchmen, and command remained intact. Legal separation works the same way.';
  if (/servicer|synthetic/.test(topic)) return 'Varys understood that information is valuable only when it is timely, credible, and reaches the person able to act. Servicing data has the same role in a live transaction.';
  if (/auto_loan|credit_card|non_performing|mortgage|whole_business/.test(topic)) return 'Krishna forces Arjuna to identify the decisive fact amid a crowded battlefield. In collateral analysis, that means isolating the cash-flow driver rather than being distracted by a familiar asset label.';
  if (/pay_through|waterfall|tranching/.test(topic)) return 'The line of succession to the Iron Throne clarifies payment priority: the same kingdom can support many claimants, but the order of entitlement determines who bears the loss first.';
  if (/re_securitization/.test(topic)) return 'The Chakravyuha becomes more dangerous with each layer because every additional ring changes the path back out. Re-securitisation adds that same second layer of dependence.';
  if (/sts_/.test(topic)) return 'Jon Snow\'s oath mattered because it imposed a discipline, not because it guaranteed the outcome. A regulatory label works the same way.';
  return '';
}

function localZeroToOne(lesson) {
  const topic = lesson.topicId;
  if (/cash_securitization/.test(topic)) return [
    'A lender can be profitable and still have to wait years for borrower instalments. Cash securitisation begins when defined receivables, rather than the lender\'s whole business, are made available to support an investor claim.',
    'The local question is whether those receivables are sufficiently identifiable, transferable, and collectable to stand on their own.',
  ];
  if (/term_securitization/.test(topic)) return [
    'A note may promise repayment on one date while the borrowers beneath it repay on another timetable. Term securitisation begins by separating the note\'s contractual maturity from the collateral\'s actual cash-return pattern.',
    'The local question is whether the payment design can survive prepayment, delinquency, and extension without misleading the investor about timing risk.',
  ];
  if (/conduit/.test(topic)) return [
    'A conduit puts several asset pools onto one funding platform. That creates scale, but it also means a weakness in one seller, servicer, or liquidity channel can travel beyond the pool where it began.',
    'The local question is whether the apparent diversification is economic diversification or merely a larger collection of the same dependency.',
  ];
  if (/originator/.test(topic)) return [
    'Loans may leave an originator\'s balance sheet, but the originator\'s underwriting, representations, servicing role, and retained exposure can remain decisive to investor outcomes.',
    'The local question is which risk genuinely left with the assets and which incentive remained with the institution that created them.',
  ];
  if (/special_purpose_vehicle/.test(topic)) return [
    'An S P V exists because an investor needs a claim on a defined pool, not a residual claim on the originator\'s general estate. The vehicle is the legal boundary around that distinction.',
    'The local question is whether the boundary is real in law, operations, and cash control, or merely a box on a transaction chart.',
  ];
  if (/bankruptcy_remoteness/.test(topic)) return [
    'Bankruptcy remoteness asks what remains protected when the originator itself is under financial distress. It does not mean that borrowers suddenly become more likely to pay.',
    'The local question is whether the transferred receivables, bank accounts, records, and servicing arrangements remain available to the transaction after the originator fails.',
  ];
  if (/servicer/.test(topic)) return [
    'A securitisation can transfer loan rights without transferring the daily work of collecting, reconciling, and reporting. The servicer turns contractual receivables into usable cash.',
    'The local question is whether the collection process continues when the original servicer is weak, conflicted, or unavailable.',
  ];
  if (/auto_loan/.test(topic)) return [
    'An auto-loan pool is not secured merely because every loan has a vehicle behind it. Borrower payment behaviour, repossession, recovery cost, and vehicle value determine the cash that investors actually receive.',
    'The local question is how a missed instalment becomes either a cure, a repossession, a recovery, or a loss.',
  ];
  if (/credit_card/.test(topic)) return [
    'A credit-card securitisation is a moving pool of revolving receivables. Customers repay, redraw, incur charges, and sometimes default after investors have already bought the securities.',
    'The local question is how payment rate, yield, charge-offs, replenishment, and early amortisation alter the claim over time.',
  ];
  if (/non_performing/.test(topic)) return [
    'Once a loan is non-performing, the promised instalment schedule stops being the centre of the analysis. The relevant asset is the recoverable value of the claim after enforcement, restructuring, or sale.',
    'The local question is not what the borrower was supposed to pay. It is what can be collected, how long it will take, and what it will cost to obtain it.',
  ];
  if (/mortgage/.test(topic)) return [
    'A mortgage security begins with an ordinary borrower promise but becomes an investment only after underwriting quality, collateral value, documentation, prepayment, and foreclosure outcomes are assessed together.',
    'The local question is whether the mortgage label conceals differences in borrower capacity, loan terms, and loss severity.',
  ];
  if (/whole_business/.test(topic)) return [
    'Whole-business securitisation is supported by an operating enterprise rather than a static loan pool. Its cash flow depends on customers continuing to buy, staff continuing to operate, and the business retaining the ability to trade.',
    'The local question is whether the operating system that produces cash can survive the same stress that threatens the investor claim.',
  ];
  if (/pass_through/.test(topic)) return [
    'In a pass-through, collateral collections are passed to investors with limited reshaping. Investors therefore inherit much of the collateral\'s timing behaviour directly.',
    'The local question is how quickly borrower collections, prepayments, and shortfalls move into the investor\'s own cash flow.',
  ];
  if (/pay_through/.test(topic)) return [
    'A pay-through uses collateral collections to support a designed set of investor payments. The issuer can reshape timing, but that design works only while its assumptions and protections hold.',
    'The local question is which cash-flow risk has been genuinely absorbed and which has merely been shifted to a later point in the waterfall.',
  ];
  if (/payment_waterfall|securitization_waterfall/.test(topic)) return [
    'A waterfall is the transaction\'s payment constitution. It decides how a limited amount of cash is divided among fees, reserves, interest, principal, and residual claims.',
    'The local question is what changes when the pool collects less cash than the payment rules expected.',
  ];
  if (/tranching/.test(topic)) return [
    'Tranching creates several claims on one pool of collateral. The claims share borrowers but not the same position in the loss sequence.',
    'The local question is where losses attach, whose protection is consumed first, and when a senior claim becomes exposed.',
  ];
  if (/pro_rata/.test(topic)) return [
    'Pro-rata payment distributes principal across classes at the same time. Sequential payment directs principal to one class before the next. The distinction determines how quickly credit protection is built or released.',
    'The local question is whether principal allocation preserves senior protection when collateral performance begins to weaken.',
  ];
  if (/re_securitization/.test(topic)) return [
    'Re-securitisation uses an already structured claim as collateral for another transaction. The investor must understand both the first transaction and the second one built on top of it.',
    'The local question is where the underlying loss, correlation, and liquidity risk enter each layer and how the two waterfalls interact.',
  ];
  if (/regulatory_capital/.test(topic)) return [
    'Regulatory-capital relief is not the same as economic risk transfer. A bank can change its capital treatment while retaining meaningful exposure through guarantees, first-loss positions, or other support.',
    'The local question is which risk moved, which risk remained, and which movement the prudential framework recognises.',
  ];
  if (/synthetic/.test(topic)) return [
    'Synthetic securitisation transfers credit risk through protection contracts while the loans can remain on the originator\'s balance sheet. Cash ownership and credit-loss ownership can therefore diverge.',
    'The local question is whether the protection provider will perform when the defined credit event occurs and whether the originator has retained hidden exposure.',
  ];
  if (/sts_/.test(topic)) return [
    'Simple, transparent, and standardised securitisation sets conditions for structure, disclosure, and risk retention. It improves the discipline around a transaction; it does not guarantee the collateral will perform.',
    'The local question is which feature satisfies the standard and which credit risk remains outside the label.',
  ];
  if (/psa/.test(topic)) return [
    'The P S A prepayment model gives investors a common convention for describing how mortgage principal might return over time. It is a language for timing assumptions, not a prediction of any borrower\'s behaviour.',
    'The local question is how a changed prepayment assumption alters expected life, duration, and reinvestment risk.',
  ];
  if (/term_asset_backed/.test(topic)) return [
    'T A L F addressed a market-liquidity problem: investors could hold asset-backed securities with viable collateral but still struggle to finance or sell them during stress.',
    'The local question is what public liquidity support can stabilise and what private credit loss it leaves with the investor.',
  ];
  return [
    'Start with the cash flow, then identify the legal claim and the risk that remains when the cash flow weakens.',
    'The local question is which assumption must hold for the investor claim to be paid as designed.',
  ];
}

function culturalBeats(lesson, sectionId) {
  const topic = lesson.topicId;
  const beats = [];
  if (sectionId === 'transaction-mandate') {
    if (/cash_securitization|pass_through/.test(topic)) beats.push('The Iron Bank did not care who sounded powerful; it cared who could pay, from which cash flow, and under which remedy. That is repayment-source analysis.');
    if (/originator|regulatory_capital/.test(topic)) beats.push('Shakuni\'s advantage came from incentives and information, not from the rules written on the board. The originator\'s incentives require the same scrutiny.');
    if (/special_purpose|bankruptcy/.test(topic)) beats.push('The Wall was not protective because it was impressive. It worked only when gates, watchmen, and command remained intact. Legal separation works the same way.');
    if (/re_securitization/.test(topic)) beats.push('The Chakravyuha becomes more dangerous with each layer because every additional ring changes the path back out. Re-securitisation creates that same second layer of dependence.');
  }
  if (sectionId === 'pool-data-room') {
    if (/auto_loan|credit_card|non_performing|mortgage|whole_business/.test(topic)) beats.push('Krishna forces Arjuna to identify the decisive fact amid a crowded battlefield. In collateral analysis, isolate the cash-flow driver rather than being distracted by a familiar asset label.');
    if (/conduit|pro_rata/.test(topic)) beats.push('The Red Wedding is a lesson in hidden dependence. Several apparently separate positions can fail together when one concealed relationship connects them.');
    if (/servicer|synthetic/.test(topic)) beats.push('Varys understood that information is valuable only when it is timely, credible, and reaches the person able to act. Servicing and counterparty reporting have the same role here.');
  }
  if (sectionId === 'priority-of-payments') {
    if (/pay_through|waterfall|tranching|pro_rata|pass_through/.test(topic)) beats.push('The line of succession to the Iron Throne clarifies payment priority: the same kingdom can support many claimants, but the order of entitlement determines who bears the loss first.');
    if (/term_securitization|psa|term_asset_backed/.test(topic)) beats.push('At the Wall, survival depended on timing as much as strength. A payment promised in spring does not solve a funding need in winter. Timing risk has the same logic.');
  }
  if (sectionId === 'stress-transmission') {
    if (/conduit|re_securitization|tranching/.test(topic)) beats.push('When alliances fail together, as they did at the Red Wedding, the shock is not additive. Correlation turns several small weaknesses into one system-wide break.');
    if (/bankruptcy|servicer|non_performing/.test(topic)) beats.push('Abhimanyu knew how to enter the Chakravyuha but not how to leave it. A transaction that is built for closing but not for distress has the same flaw.');
    if (/sts_|regulatory_capital|synthetic/.test(topic)) beats.push('Jon Snow\'s oath imposed discipline, but an oath did not guarantee survival north of the Wall. A regulatory condition can improve design without removing the underlying risk.');
  }
  return beats;
}

function assignmentFor(lesson) {
  const topic = lesson.topicId;
  if (/waterfall|pass_through|pay_through/.test(topic)) return 'Before you move on, take a blank page and trace one hundred rupees of collections through the ordinary waterfall and then through a trigger state. Name the claim that receives each rupee.';
  if (/tranch|pro_rata|credit_enhancement/.test(topic)) return 'Before you continue, draw the capital structure and mark where losses attach, where protection is exhausted, and what changes when principal is paid pro-rata rather than sequentially.';
  if (/prepayment|psa|term_securitization/.test(topic)) return 'Before moving forward, draw two timelines: contractual maturity and expected cash return. Then write one sentence explaining which investor risk changes when borrowers repay early.';
  if (/originator|special_purpose|bankruptcy|servicer/.test(topic)) return 'Before you start the next topic, imagine the originator failing tomorrow. Write down who owns the cash, who collects it, where it sits, and which contractual protection could break.';
  if (/auto_loan|credit_card|non_performing|mortgage|whole_business|asset_pool/.test(topic)) return 'Before you move on, list the five pool fields that would determine whether cash arrives on time. For each one, state the failure it is meant to reveal.';
  if (/synthetic|re_securitization|regulatory_capital|sts/.test(topic)) return 'Before continuing, separate four questions on paper: what moved legally, what moved economically, who retained the risk, and what the applicable rule recognises.';
  if (/cash_securitization|conduit|revolving/.test(topic)) return 'Before the next topic, sketch the path from borrower payment to investor claim and mark the point where funding, servicing, and asset-quality risk enter the structure.';
  return 'Before moving on, explain the concept aloud using one real cash flow, one contractual right, one decision, and one condition that would make your conclusion fail.';
}

function depthNarration(lesson) {
  const topic = lesson.topicId;
  const formalQuestion = spoken(lesson.governingQuestion ?? '').replace(/[?]+$/, '');
  const decision = spoken(lesson.decision ?? '');
  const stress = spoken(lesson.stress?.trace ?? '');
  const foundation = [
    `Pause and separate the label from the economic claim. ${lesson.canonicalName} is useful only because it makes a particular decision possible: ${formalQuestion}. A professional answer identifies the right cash flow, the party with the enforceable claim, the assumption that connects the two, and the consequence if that assumption fails.`,
    'The mechanism is always a chain, not a single ratio or legal term. Borrower behaviour changes collections. Collections move through accounts and contractual priorities. Those priorities determine the cash available to each claim. A conclusion is reliable only when each link in that chain has been tested.',
    `In a credit committee, the next question is not whether the structure has a familiar name. It is whether the available evidence supports the conclusion. ${decision} If the evidence is incomplete, the right response is to identify the missing field and the decision it could change, not to invent precision.`,
    `Now run the counterfactual. ${stress} This is why timing, control rights, triggers, account mechanics, and loss allocation are part of the economics rather than legal decoration.`,
    'Use negative evidence as seriously as positive evidence. A pool statistic, rating label, or legal opinion may support one proposition while leaving another untested. State exactly what the evidence establishes, then state the question it cannot answer without additional data or contractual terms.',
    'A strong explanation has to survive a change in perspective. Explain the same transaction once as a borrower, once as the originator, once as the investor, and once as the person responsible for approving the structure. The facts remain the same, but the risk each party carries is different.',
  ];

  if (topic === 'securitization') return [...foundation,
    'Start with the reason the structure exists. A lender has loans that will repay over months or years. It may want funding now, diversification of funding sources, or a way to manage balance-sheet capacity. Investors may want exposure to a defined portfolio rather than to the lender as a whole. Securitisation connects those preferences by turning contractual borrower payments into securities with specified rights.',
    'That transformation has four moving parts. First, identify the pool and the contractual payments. Second, transfer or allocate the relevant rights to a special purpose vehicle. Third, define how collections reach controlled accounts and move through the waterfall. Fourth, issue claims whose payment depends on that cash path. If any of those four parts is vague, the structure is still a story rather than a complete transaction.',
    'Do not confuse an asset sale with a securitisation. A lender can sell a loan portfolio to another lender, and the buyer may simply hold it on balance sheet. Securitisation adds financing claims over the pool, a payment priority, and a governance framework. It therefore changes not only ownership but also the distribution of timing, loss, control, and information risk.',
    'The pool itself does not make the securities safe. Borrowers can default, prepay, cure, refinance, or recover slowly after enforcement. A servicer can remit late. An originator can fail. A reserve can be depleted. A senior note can be insulated from early losses and still become exposed when enhancement is consumed. The structure reallocates these risks; it does not repeal them.',
    'Here is the zero-to-one test. Imagine a borrower pays one thousand rupees this month. Name the account that receives it, the party that reconciles it, the deductions permitted before investor payment, the trigger that changes the order, and the investor who bears a shortfall. If you can answer those questions, you understand the economic architecture rather than only the word securitisation.',
    'Finally, distinguish the conclusion from the evidence. The transaction may be well designed, but that conclusion needs support from pool-level data, transfer and servicing terms, account-control arrangements, the priority of payments, and stress analysis. In structured finance, confidence without a traceable chain of evidence is not expertise. It is an untested assumption.',
  ];

  if (/cash_securitization|term_securitization|conduit/.test(topic)) return [...foundation,
    'Funding becomes investable only when the investor can distinguish a claim on specified collateral cash flows from a claim on the originator as a general borrower. That distinction changes diligence: review transfer mechanics, pool eligibility, collection accounts, representations, and the remaining recourse before comparing coupon or stated maturity.',
    'Build the transaction twice on paper. First, draw the normal route from borrower payment to investor distribution. Then redraw it after prepayment, delinquency, or an originator failure. The second drawing tells you whether the first one was a financing description or an actual risk analysis.',
  ];
  if (/originator|special_purpose|bankruptcy|servicer/.test(topic)) return [...foundation,
    'Legal separation is credible only when operations support it. A true sale, separateness covenant, controlled collection account, servicing standard, data handover process, and replacement path answer different questions. Treating any one of them as a complete solution is the classic mistake.',
    'The difficult test is operational continuity under distress. Ask who can access the borrower file, reconcile collections, appoint a successor, redirect remittances, and enforce the transferred claim on the morning after a failure. If the answer depends on goodwill from a failed institution, the protection is weaker than it appears.',
  ];
  if (/auto_loan|credit_card|non_performing|mortgage|whole_business/.test(topic)) return [...foundation,
    'Collateral analysis is a distribution problem. A pool average can conceal weak cohorts, geographic concentration, changing underwriting, collection delays, or a tail of severe losses. The task is to identify which borrower behaviour changes cash amount, which changes cash timing, and which changes recovery value.',
    'A disciplined model separates probability of default, loss given default, cure and recovery timing, prepayment, and servicing effectiveness. Combining them into one broad judgement may sound decisive, but it prevents you from seeing which assumption actually drives the result.',
  ];
  if (/pass_through|pay_through|waterfall|tranching|pro_rata/.test(topic)) return [...foundation,
    'Priority is not an abstract hierarchy. It is a set of instructions that allocates a limited resource. In every payment period, test fees, taxes, hedging costs, reserve requirements, interest, principal, losses, and residual distributions in the contractual order. A senior label has value only through that order and the enhancement beneath it.',
    'The most revealing question is state dependent: what happens after a trigger changes the waterfall? A structure can look stable in its ordinary state and become materially different when collections fall, a reserve test fails, or principal switches from pro-rata to sequential payment.',
  ];
  if (/re_securitization|regulatory_capital|synthetic|sts/.test(topic)) return [...foundation,
    'Keep legal transfer, economic risk transfer, accounting treatment, and regulatory capital treatment in separate columns. They can point in the same direction, but none proves the others. The conclusion must state which exposure moved, which exposure remained, and which framework recognises the change.',
    'Counterparty performance is central whenever protection is contractual. Read the credit-event definition, settlement method, collateral rules, termination provisions, concentration limits, and reporting rights. A hedge that fails at the same moment as the reference pool is not the protection its headline suggests.',
  ];
  if (/psa|term_asset_backed/.test(topic)) return [...foundation,
    'Timing is an economic variable. Faster principal return can create contraction and reinvestment risk. Slower principal return can create extension, duration, and funding risk. The borrower may perform exactly as promised while the investor outcome changes materially.',
    'Liquidity support must be analysed separately from collateral credit. A facility can improve funding access or market functioning, yet leave the investor exposed to default, recovery, valuation, refinancing, and facility-expiry risk. Name the risk the facility addresses and the risks it does not address.',
  ];
  return [...foundation,
    'Use a two-column discipline. In the first column, write the transaction feature. In the second, write the cash-flow consequence under stress. If you cannot complete the second column, you have identified a label rather than understood a mechanism.',
    'The final standard is explanatory control. You should be able to change one assumption, trace the effect through the accounts and waterfall, and name the investor, lender, or residual holder who bears the result.',
  ];
}

function coverageForLesson(lesson) {
  return {
    formalDefinition: true,
    economicPurpose: true,
    mechanism: true,
    realEvidence: Boolean((lesson.sources ?? []).length || lesson.series?.episodeNumber),
    assumption: true,
    failureMode: true,
    applicationTask: true,
  };
}

function lessonScript(lesson) {
  const lessonOneOverride = 'scripts/content/securitisation/lesson-01-documentary.txt';
  const isLessonOne = lesson.series.overallSequence === 1 && fs.existsSync(lessonOneOverride);
  if (isLessonOne) {
    return fs.readFileSync(lessonOneOverride, 'utf8').replace(/\r/g, '').trim();
  }
  const lessonIndex = lesson.series.overallSequence - 1;
  const topicState = { topicMentions: 0 };
  const lines = [
    openingPause,
    lessonClassOpening(lesson),
    ...openingContext(lesson),
    ...localZeroToOne(lesson),
    realWorldThread(lesson),
    formulaNarration(lesson),
    evidenceCue(lesson),
  ];
  const definitionIds = new Set(episodeDefinitionIds[lesson.series.episodeNumber] ?? []);
  const definitionsBySection = new Map();
  for (const definition of lesson.definitionCatalog.filter((item) => definitionIds.has(item.id))) {
    const sectionId = sectionForDefinition(definition);
    definitionsBySection.set(sectionId, [...(definitionsBySection.get(sectionId) ?? []), definition]);
  }
  const spokenLines = lines.map((line) => spoken(line).toLowerCase()).filter(Boolean);
  const pushLine = (value) => {
    if (!value || isNarrationBoilerplate(value)) return;
    const natural = softenTopicReferences(value, lesson, topicState);
    const normalized = natural.toLowerCase();
    if (!normalized || spokenLines.includes(normalized)) return;
    spokenLines.push(normalized);
    lines.push(natural);
  };
  for (const section of lesson.sections) {
    for (const [index, definition] of (definitionsBySection.get(section.id) ?? []).entries()) {
      pushLine(definitionNarration(definition, index));
    }
    const sectionBody = lesson.topicId === 'securitization' && section.id === 'transaction-mandate'
      ? []
      : (section.body ?? []);
    for (const paragraph of sectionBody) pushLine(paragraph);
    for (const beat of culturalBeats(lesson, section.id)) pushLine(beat);
    if (section.id === 'transaction-mandate') pushLine(lesson.decision);
    if (section.id === 'structure-design') {
      for (const party of lesson.parties) pushLine(`${party.name} ${sentenceCase(party.responsibility)}`);
      for (const tranche of lesson.tranches) pushLine(`${tranche.name} ${sentenceCase(tranche.priority)}`);
    }
    if (section.id === 'priority-of-payments') {
      for (const step of lesson.waterfall) pushLine(`${['First', 'Then', 'After that', 'Next', 'Finally'][step.step - 1] ?? 'Then'}, ${sentenceCase(step.name)}. ${step.consequence}`);
    }
    if (section.id === 'credit-enhancement-triggers') {
      for (const [index, trigger] of lesson.triggers.entries()) pushLine(triggerNarration(trigger, index));
    }
    if (section.id === 'stress-transmission') pushLine(lesson.stress.trace);
    if (section.id === 'investment-committee-memo') pushLine(lesson.decisionMemo);
    if (section.id === 'desk-drill') {
      for (const [index, item] of lesson.reviewQuestions.entries()) pushLine(reviewNarration(item, index));
    }
  }
  for (const paragraph of depthNarration(lesson)) pushLine(paragraph);
  pushLine(assignmentFor(lesson));
  return lines.filter(Boolean).map(spoken).join('\n\n');
}

const renderedLessons = [...lessons]
  .sort((left, right) => left.series.overallSequence - right.series.overallSequence)
  .map((lesson) => ({
    lessonId: lesson.id,
    canonicalName: lesson.canonicalName,
    episodeNumber: lesson.series.episodeNumber,
    episodeId: lesson.series.episodeId,
    audioTitle: lesson.audio.title,
    teachingOrder: ['human-scale-example', 'named-real-event', 'formal-mechanism', 'application'],
    depthCoverage: coverageForLesson(lesson),
    script: lessonScript(lesson),
  }));

const output = {
  schemaVersion: 'securitisation-masterclass-audio-scripts.v6',
  series: { id: 'securitisation-masterclass', title: 'Securitisation: From Receivables to Rated Risk', totalLessons: lessons.length, openingPauseSeconds: 1, openingPauseToken: openingPause, modelId },
  episodes: [...new Map(lessons.map((lesson) => [lesson.series.episodeNumber, {
    number: lesson.series.episodeNumber,
    id: lesson.series.episodeId,
    title: lesson.series.episodeTitle,
    lessonIds: lessons.filter((candidate) => candidate.series.episodeNumber === lesson.series.episodeNumber).sort((left, right) => left.series.sequence - right.series.sequence).map((candidate) => candidate.id),
  }])).values()].sort((left, right) => left.number - right.number),
  lessons: renderedLessons,
};

const outputFile = 'scratch/securitisation_masterclass_audio_scripts_v6.json';
const textDirectory = 'scratch/securitisation_masterclass_audio_scripts_v6';
fs.mkdirSync(textDirectory, { recursive: true });
for (const [index, lesson] of renderedLessons.entries()) {
  const slug = lesson.lessonId.replace(/^generated_securitisation_/, '');
  fs.writeFileSync(path.join(textDirectory, `lesson-${String(index + 1).padStart(2, '0')}-${slug}.txt`), `${lesson.script}\n`);
}
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, textDirectory, lessons: lessons.length, episodes: output.episodes.length }));
