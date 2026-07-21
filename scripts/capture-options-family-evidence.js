import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const chainUrl = 'https://www.nseindia.com/option-chain?symbol=NIFTY';
const contractUrl = 'https://www.nseindia.com/static/products-services/equity-derivatives-contract-specifications';
const vixUrl = 'https://www.nseindia.com/static/products-services/indices-indiavix-index';
const image = '/evidence/nse-options-excerpt.svg';
const optionRows = [
  { item: 'Underlying', value: 'NIFTY 50', source: 'nse_equity_derivatives_contracts', sourceField: 'NSE NIFTY 50 F&O contract specification' },
  { item: 'Option types', value: 'CE and PE, European call and put', source: 'nse_equity_derivatives_contracts', sourceField: 'NSE NIFTY 50 F&O contract specification' },
  { item: 'Required contract fields', value: 'Underlying, expiry date, option type, and strike price', source: 'nse_equity_derivatives_contracts', sourceField: 'NSE NIFTY 50 F&O contract specification' },
  { item: 'Option-chain fields', value: 'Open interest, volume, implied volatility, last traded price, bid, ask, and strike', source: 'nse_nifty_option_chain', sourceField: 'NSE NIFTY option chain' },
  { item: 'Implied-volatility convention', value: 'NSE applies a 10% interest rate while computing implied volatility on the displayed chain', source: 'nse_nifty_option_chain', sourceField: 'NSE option-chain note' },
  { item: 'Displayed IV status', value: 'For reference only and dynamic, using last traded price, underlying value, and other parameters', source: 'nse_nifty_option_chain', sourceField: 'NSE option-chain note' },
  { item: 'Theoretical pricing fallback', value: 'NSE NIFTY 50 F&O page states that a theoretical option price may use Black Scholes when a contract is not traded for the day', source: 'nse_equity_derivatives_contracts', sourceField: 'NSE NIFTY 50 F&O contract specification' },
];
const ids = ['black_scholes_assumptions', 'implied_volatility', 'put_call_parity', 'sticky_strike_vs_sticky_delta', 'volatility_smile', 'covered_call', 'gamma_scalping', 'gamma_squeeze', 'long_straddle', 'protective_put', 'straddle', 'strangle', 'zero_days_to_expiration_option', 'delta', 'delta_neutral_hedging', 'gamma', 'option_greeks', 'theta', 'vega'];
for (const topicId of ids) {
  catalog[topicId] = { status: 'captured_for_editorial_review', documentTitle: 'NSE NIFTY 50 option-chain and equity-derivatives contract specifications', sourceUrl: chainUrl, summary: 'NSE defines the option contract fields and publishes the market-data fields used to interpret option price, volatility, open interest, and sensitivity. Dynamic values are not frozen into this lesson without a dated capture.', rows: optionRows, image, imageSource: chainUrl };
}
catalog.vix_index = {
  status: 'captured_for_editorial_review', documentTitle: 'NSE India VIX index methodology', sourceUrl: vixUrl,
  summary: 'NSE defines India VIX as an annualized expected-volatility measure for the next 30 calendar days, derived from NIFTY option bid and ask prices.',
  rows: [
    { item: 'Underlying option market', value: 'NIFTY Index options', source: 'nse_india_vix_methodology', sourceField: 'NSE India VIX methodology' },
    { item: 'Forecast horizon', value: 'Next 30 calendar days', source: 'nse_india_vix_methodology', sourceField: 'NSE India VIX product page' },
    { item: 'Quote inputs', value: 'Best bid and ask prices of NIFTY options', source: 'nse_india_vix_methodology', sourceField: 'NSE India VIX methodology' },
    { item: 'Output convention', value: 'Annualized expected volatility expressed as a percentage', source: 'nse_india_vix_methodology', sourceField: 'NSE India VIX product page' },
    { item: 'Method note', value: 'Uses the Cboe methodology with amendments for the NIFTY option order book and cubic-spline interpolation', source: 'nse_india_vix_methodology', sourceField: 'NSE India VIX product page and computation methodology' },
  ], image: '/evidence/nse-options-excerpt.svg', imageSource: vixUrl,
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: [...ids, 'vix_index'], status: 'captured_for_editorial_review' }));
