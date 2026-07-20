import {
  securitisationDefinitions,
  securitisationMasterclassDefinitions,
} from './deepDiveDefinitions.js';

const teachingCopy = {
  originator: {
    aliases: ['originators'],
    definition: 'The lender that creates the loans or receivables before they enter the transaction.',
    example: 'A vehicle-finance company approves scooter loans and later transfers a selected group of them to an issuing vehicle.',
  },
  'asset-pool': {
    aliases: ['asset pools', 'pool of assets', 'loan pool'],
    definition: 'The specific collection of loans or receivables whose payments support the securities.',
    example: 'Ten thousand vehicle loans with identified balances, instalments, and borrowers form one asset pool.',
  },
  'special-purpose-vehicle': {
    aliases: ['special purpose vehicles', 'SPV', 'S P V', 'securitisation vehicle'],
    definition: 'A separate legal entity that holds the transferred assets for the transaction.',
    example: 'The lender transfers vehicle-loan receivables to an S P V, which issues notes backed by those receivables.',
  },
  'true-sale': {
    aliases: ['true sales'],
    definition: 'A transfer intended to move real ownership of the assets, not merely pledge them for a loan.',
    example: 'If the originator becomes insolvent, a valid true sale helps keep the transferred mortgages outside its general creditor estate.',
  },
  servicer: {
    aliases: ['servicers', 'servicing'],
    definition: 'The operating party that bills borrowers, collects money, maintains records, and reports performance.',
    example: 'The original lender keeps collecting monthly instalments and sends the transaction collections to the controlled account.',
  },
  tranche: {
    aliases: ['tranches', 'senior tranche', 'junior tranche'],
    definition: 'One layer of the issued securities with its own payment priority and loss exposure.',
    example: 'The senior tranche receives principal before the junior tranche and starts taking losses only after junior protection is exhausted.',
  },
  subordination: {
    aliases: ['subordinate', 'subordinated'],
    definition: 'Protection created by making one claim wait or absorb losses before another claim.',
    example: 'A junior note absorbs the first ten crore rupees of pool loss before the senior note loses principal.',
  },
  'credit-enhancement': {
    aliases: ['credit enhancement', 'enhancement', 'credit enhancements'],
    definition: 'Extra protection placed between collateral problems and the investor being protected.',
    example: 'A reserve account, excess collateral, and a junior tranche can protect senior investors from early losses.',
  },
  waterfall: {
    aliases: ['waterfall', 'payment waterfall', 'priority of payments', 'securitisation waterfall'],
    definition: 'The binding order that decides where each period of available cash goes.',
    example: 'Monthly collections pay trustee fees first, senior interest second, senior principal third, and the residual last.',
  },
  'performance-trigger': {
    aliases: ['performance triggers', 'trigger', 'triggers'],
    definition: 'A contractual test that changes how cash or control works when performance crosses a threshold.',
    example: 'If delinquencies exceed the stated limit, a trigger can stop junior principal and redirect cash to senior notes.',
  },
  'recovery-rate': {
    aliases: ['recovery rates', 'recoveries', 'recovery'],
    definition: 'The share of a defaulted amount that is eventually collected after costs and enforcement.',
    example: 'A defaulted car loan has one lakh rupees outstanding, but repossession and sale produce sixty thousand rupees after costs.',
  },
  'prepayment-rate': {
    aliases: ['prepayment rates', 'prepayments', 'prepayment'],
    definition: 'The speed at which borrowers return principal earlier than their scheduled maturity.',
    example: 'Homeowners refinance after rates fall, so mortgage principal reaches investors sooner than the original schedule predicted.',
  },
  'cash-flow-right': {
    aliases: ['contractual cash flow right', 'cash-flow right', 'cash flow right', 'payment right'],
    definition: 'An enforceable claim to receive a particular payment from an identified contract or borrower.',
    example: 'The right to receive monthly scanner-lease rentals can be transferred even though the equipment company keeps operating.',
  },
  'revolving-period': {
    aliases: ['revolving periods', 'revolving pool'],
    definition: 'The phase when collections can fund replacement receivables instead of immediately paying down all notes.',
    example: 'A credit-card trust uses principal collections to buy new eligible card receivables during its revolving period.',
  },
  'early-amortisation': {
    aliases: ['early amortization', 'early amortisation event', 'early amortization event'],
    definition: 'A protective switch that ends replenishment and starts paying investors down early.',
    example: 'A sharp fall in credit-card payment rates triggers early amortisation, so principal is redirected to the notes.',
  },
  conduit: {
    aliases: ['conduits', 'securitisation conduit', 'multi-seller conduit'],
    definition: 'A shared funding platform that finances eligible receivables from several sellers or pools.',
    example: 'Several equipment lessors sell eligible rentals into one conduit that raises common short-term funding.',
  },
  'pass-through': {
    aliases: ['pass through', 'pass-through', 'pass through structure', 'pass-through structures'],
    definition: 'A structure that sends collected collateral cash to investors with limited reshaping of principal timing.',
    example: 'When homeowners prepay, the mortgage pass-through sends that principal to certificate holders earlier than expected.',
  },
  'pay-through': {
    aliases: ['pay through', 'pay-through', 'pay through structure', 'pay-through structures'],
    definition: 'A structure that uses the waterfall to reshape collateral collections into a designed note-payment schedule.',
    example: 'Irregular lease collections enter the issuer, which then pays two note classes according to their stated priorities.',
  },
  'pro-rata-amortisation': {
    aliases: ['pro rata amortisation', 'pro-rata amortization', 'pro rata pay', 'pro-rata pay'],
    definition: 'A principal rule that pays eligible note classes together according to stated proportions.',
    example: 'A hundred rupees of principal is divided eighty rupees to senior notes and twenty to junior notes while the test passes.',
  },
  'sequential-amortisation': {
    aliases: ['sequential amortisation', 'sequential amortization', 'sequential pay'],
    definition: 'A principal rule that retires one class before principal begins paying the next class.',
    example: 'Every rupee of available principal pays Class A until it reaches zero, after which Class B begins to amortise.',
  },
  'attachment-point': {
    aliases: ['attachment points', 'attaches', 'attachment'],
    definition: 'The collateral-loss level at which a tranche begins losing its own principal.',
    example: 'A tranche with a ten percent attachment point is untouched by the first ten percent of defined pool loss.',
  },
  'detachment-point': {
    aliases: ['detachment points', 'detaches', 'detachment'],
    definition: 'The collateral-loss level at which a tranche has lost all of its allocated principal.',
    example: 'A tranche running from ten to fifteen percent is fully exhausted when cumulative defined loss reaches fifteen percent.',
  },
  'risk-retention': {
    aliases: ['risk retention', 'retained risk', 'skin in the game'],
    definition: 'An economic interest the sponsor keeps so it remains exposed to part of the securitised risk.',
    example: 'The originator retains a vertical slice of every tranche instead of selling the entire economic exposure.',
  },
  'synthetic-securitisation': {
    aliases: ['synthetic securitization', 'synthetic transaction', 'synthetic securitisations'],
    definition: 'A transaction that transfers defined credit losses while the original loans remain on the lender’s balance sheet.',
    example: 'A bank keeps its corporate loans but buys protection that pays when specified borrowers suffer defined credit events.',
  },
  're-securitisation': {
    aliases: ['re-securitization', 'resecuritisation', 'resecuritization'],
    definition: 'A new securitisation whose collateral is made mainly from interests in earlier securitisations.',
    example: 'A new vehicle buys mezzanine mortgage tranches from several older deals and issues another set of notes against them.',
  },
  'sts-standard': {
    aliases: ['STS', 'S T S', 'simple transparent and standardised securitisation', 'simple transparent and standardized securitisation'],
    definition: 'A regulatory label for transactions that satisfy stated simplicity, transparency, and standardisation conditions.',
    example: 'A European transaction may qualify as S T S after meeting asset, disclosure, retention, and structural criteria.',
  },
  'whole-business-collateral': {
    aliases: ['whole business collateral', 'whole-business securitisation', 'whole business securitisation'],
    definition: 'A controlled claim on cash generated by an operating business rather than a static pool of ordinary loans.',
    example: 'A restaurant chain routes franchise fees through controlled accounts while covenants protect the business that produces them.',
  },
  'liquidity-facility': {
    aliases: ['liquidity facilities', 'liquidity support', 'funding facility'],
    definition: 'Committed financing that supplies eligible short-term cash under specified conditions and limits.',
    example: 'A facility lends against eligible asset-backed securities with stated haircuts when ordinary market funding becomes scarce.',
  },
};

const sourceDefinitions = [...securitisationDefinitions, ...securitisationMasterclassDefinitions];

export const SECURITISATION_PODCAST_GLOSSARY = sourceDefinitions.map((source) => {
  const teaching = teachingCopy[source.id];
  if (!teaching) throw new Error('Missing podcast glossary teaching copy for ' + source.id);
  return Object.freeze({
    id: source.id,
    term: source.term,
    aliases: [...teaching.aliases],
    definition: teaching.definition,
    example: teaching.example,
    technicalMeaning: source.formalDefinition,
  });
});
