import fs from 'node:fs';

const catalogFile = 'scripts/content/securitisation/documentary-catalog.json';
const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));

const lessonOrder = [
  'generated_securitisation_securitization',
  'generated_securitisation_cash_securitization',
  'generated_securitisation_term_securitization',
  'generated_securitisation_conduit_securitization',
  'generated_securitisation_securitization_originator',
  'generated_securitisation_special_purpose_vehicle',
  'generated_securitisation_bankruptcy_remoteness',
  'generated_securitisation_securitization_servicer',
  'generated_securitisation_asset_backed_security',
  'generated_securitisation_auto_loan_securitization',
  'generated_securitisation_credit_card_securitization',
  'generated_securitisation_student_loan_abs',
  'generated_securitisation_equipment_auto_lease_abs',
  'generated_securitisation_trade_accounts_receivable',
  'generated_securitisation_asset_backed_commercial_paper',
  'generated_securitisation_multi_seller_conduits_liquidity',
  'generated_securitisation_mortgage_backed_security',
  'generated_securitisation_residential_mortgage_backed_security',
  'generated_securitisation_commercial_mortgage_backed_security',
  'generated_securitisation_agency_non_agency_mortgage_security',
  'generated_securitisation_non_performing_loan_securitization',
  'generated_securitisation_non_qualified_mortgage_securitization',
  'generated_securitisation_whole_business_securitization',
  'generated_securitisation_pass_through_structure',
  'generated_securitisation_pay_through_structure',
  'generated_securitisation_payment_waterfall',
  'generated_securitisation_securitization_waterfall',
  'generated_securitisation_tranching',
  'generated_securitisation_pro_rata_pay',
  'generated_securitisation_clo_foundation',
  'generated_securitisation_broadly_syndicated_loan_clo',
  'generated_securitisation_middle_market_private_credit_clo',
  'generated_securitisation_clo_manager_ramp_reinvestment_equity',
  'generated_securitisation_cash_flow_cdo',
  'generated_securitisation_synthetic_cdo',
  'generated_securitisation_market_value_single_tranche_cdo',
  'generated_securitisation_cdo_squared_re_securitisation',
  'generated_securitisation_re_securitization',
  'generated_securitisation_regulatory_capital_relief_securitization',
  'generated_securitisation_synthetic_securitization',
  'generated_securitisation_sts_securitization',
  'generated_securitisation_psa_prepayment_model',
  'generated_securitisation_term_asset_backed_securities_loan_facility',
  'generated_securitisation_future_flow',
  'generated_securitisation_whole_business_operating_revenue',
  'generated_securitisation_royalty_music_media_ip',
  'generated_securitisation_solar_infrastructure_aircraft_utility',
  'generated_securitisation_covered_bonds_vs_securitisation',
  'generated_securitisation_abs_trustee_wrap_monoline_guarantees',
  'generated_securitisation_warehouse_servicing_advances_repurchase',
  'generated_securitisation_static_managed_pools_triggers',
];

const episodeDefinitions = [
  { number: 1, id: 'financing-architecture', title: 'The financing architecture', range: [1, 4] },
  { number: 2, id: 'legal-isolation-and-control', title: 'Legal isolation and control', range: [5, 8] },
  { number: 3, id: 'abs-and-consumer-receivables', title: 'ABS and consumer receivables', range: [9, 16] },
  { number: 4, id: 'mortgage-and-collateral-families', title: 'Mortgage and collateral families', range: [17, 23] },
  { number: 5, id: 'cash-flow-forms', title: 'How collateral cash becomes security cash', range: [24, 25] },
  { number: 6, id: 'waterfalls-and-payment-priority', title: 'Waterfalls and payment priority', range: [26, 27] },
  { number: 7, id: 'tranching-and-loss-allocation', title: 'Tranching and loss allocation', range: [28, 29] },
  { number: 8, id: 'loan-collateral-clos', title: 'CLOs: loan collateral, managers, and equity', range: [30, 33] },
  { number: 9, id: 'cdos-and-layered-credit', title: 'CDOs and layered credit', range: [34, 37] },
  { number: 10, id: 'advanced-risk-transfer', title: 'Re-securitisation and advanced risk transfer', range: [38, 41] },
  { number: 11, id: 'prepayment-duration-market-liquidity', title: 'Prepayment, duration, and market liquidity', range: [42, 43] },
  { number: 12, id: 'esoteric-and-future-flow', title: 'Esoteric and future-flow securitisation', range: [44, 47] },
  { number: 13, id: 'adjacent-structures-and-infrastructure', title: 'Adjacent structures and transaction infrastructure', range: [48, 51] },
];

const lessonsById = new Map(catalog.lessons.map((lesson) => [lesson.id, lesson]));
if (lessonOrder.length !== catalog.lessons.length || lessonOrder.some((id) => !lessonsById.has(id))) {
  throw new Error('The reorder map must contain every catalog lesson exactly once.');
}
if (new Set(lessonOrder).size !== lessonOrder.length) throw new Error('The reorder map contains duplicate lessons.');

const reorderedLessons = lessonOrder.map((id, index) => ({
  ...lessonsById.get(id),
  number: index + 1,
}));

const episodeByLessonNumber = new Map();
for (const episode of episodeDefinitions) {
  for (let number = episode.range[0]; number <= episode.range[1]; number += 1) episodeByLessonNumber.set(number, episode.number);
}
if (episodeByLessonNumber.size !== reorderedLessons.length) throw new Error('Episode ranges do not cover all lessons.');

const lessons = reorderedLessons.map((lesson) => ({ ...lesson, episodeNumber: episodeByLessonNumber.get(lesson.number) }));
const episodes = episodeDefinitions.map((definition) => ({
  number: definition.number,
  id: definition.id,
  briefId: `episode-${String(definition.number).padStart(2, '0')}`,
  lessonIds: lessons.filter((lesson) => lesson.episodeNumber === definition.number).map((lesson) => lesson.id),
  sourceFile: `scripts/content/securitisation/episode-${String(definition.number).padStart(2, '0')}-documentary.txt`,
  title: definition.title,
}));

fs.writeFileSync(catalogFile, `${JSON.stringify({ ...catalog, lessons, episodes }, null, 2)}\n`);
console.log(JSON.stringify({ lessons: lessons.length, episodes: episodes.length, episodeLessonCounts: episodes.map((episode) => episode.lessonIds.length) }));
