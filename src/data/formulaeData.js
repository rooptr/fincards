export const formulaeData = [
  {
    section: 'Corporate Finance, Valuation & Transactions',
    description: 'The formulas behind cost of capital, free cash flow, valuation, and transaction returns.',
    items: [
      {
        id: 'capm',
        name: 'Capital Asset Pricing Model',
        description: 'CAPM estimates the required return on equity from the risk-free rate and the company beta multiplied by the market risk premium.',
        usage: 'Use it to estimate cost of equity for WACC, DCF, and private-company valuation. Document the risk-free maturity, beta window, and market premium.',
        formula: 'formula: \\text{Re} = \\text{Rf} + \\beta \\times (\\text{Rm} - \\text{Rf})',
        watchOut: 'CAPM is a model, not a directly observed rate. Country, size, liquidity, or company-specific adjustments may be needed.'
      },
      {
        id: 'wacc',
        name: 'Weighted Average Cost of Capital',
        description: 'WACC blends the required returns of debt and equity using their market-value weights and the after-tax cost of debt.',
        usage: 'Discount FCFF in an enterprise-value DCF. Match the capital structure, tax rate, currency, and cash-flow definition to the company being valued.',
        formula: 'formula: \\text{WACC} = \\left(\\frac{E}{V} \\times \\text{Re}\\right) + \\left(\\frac{D}{V} \\times \\text{Rd} \\times (1 - T)\\right)',
        watchOut: 'Add preferred equity or other capital only when it is part of the capital structure and the corresponding cost is available.'
      },
      {
        id: 'cost-of-debt',
        name: 'After-Tax Cost of Debt',
        description: 'The after-tax cost of debt reflects the contractual or market borrowing rate adjusted for the tax shield that is actually usable.',
        usage: 'Use it in WACC and debt pricing. Distinguish a marginal pre-tax rate from the effective cash interest rate in the model.',
        formula: 'formula: \\text{After-Tax Rd} = \\text{Pre-Tax Rd} \\times (1 - T)'
      },
      {
        id: 'cost-of-preferred',
        name: 'Cost of Preferred Equity',
        description: 'For a perpetual preferred share, the cost is often approximated by its dividend divided by market price.',
        usage: 'Include it in WACC only when preferred equity is material and the valuation convention treats it as a capital source.',
        formula: 'formula: \\text{Rps} = \\frac{\\text{Preferred Dividend}}{\\text{Preferred Share Price}}'
      },
      {
        id: 'ev',
        name: 'Enterprise Value',
        description: 'Enterprise value represents the value attributable to all operating capital providers before the equity bridge.',
        usage: 'Use it as the numerator for EV multiples and as the output of a DCF before adjusting to equity value.',
        formula: 'formula: \\text{EV} = \\text{Market Cap} + \\text{Debt} + \\text{Minority Interest} - \\text{Excess Cash}',
        watchOut: 'The full bridge may also consider preferred equity, leases, pensions, investments, and other debt-like items depending on the assignment.'
      },
      {
        id: 'equity-value',
        name: 'Enterprise Value to Equity Value',
        description: 'The equity bridge moves from operating value to the value available to common shareholders.',
        usage: 'Use the same valuation date and item definitions in DCFs, trading comps, transaction analysis, and interview answers.',
        formula: 'formula: \\text{Equity Value} = \\text{EV} - \\text{Debt} + \\text{Cash} - \\text{Other Claims} + \\text{Non-Operating Assets}'
      },
      {
        id: 'fcff',
        name: 'Free Cash Flow to Firm',
        description: 'FCFF is cash flow available to debt and equity providers after operating taxes and reinvestment.',
        usage: 'Forecast it in an unlevered DCF and discount it at WACC.',
        formula: 'formula: \\text{FCFF} = \\text{EBIT}(1-T) + \\text{D\\&A} - \\text{Capex} - \\Delta \\text{NWC}',
        watchOut: 'FCFF is not the same as CFO. Keep maintenance and growth capex, taxes, and working-capital definitions explicit.'
      },
      {
        id: 'fcfe',
        name: 'Free Cash Flow to Equity',
        description: 'FCFE is cash flow available to common equity after interest, taxes, debt borrowing, and debt repayment.',
        usage: 'Discount FCFE at the cost of equity when the cash-flow definition and leverage policy are consistent.',
        formula: 'formula: \\text{FCFE} = \\text{Net Income} + \\text{D\\&A} - \\text{Capex} - \\Delta \\text{NWC} + \\text{Net Borrowing}'
      },
      {
        id: 'npv',
        name: 'Net Present Value',
        description: 'NPV is the present value of future periodic cash flows discounted at a required return, plus any period-zero cash flow.',
        usage: 'Use it to test whether an investment creates value relative to its discount rate.',
        formula: 'formula: \\text{NPV} = \\text{CF}_0 + \\sum_{t=1}^{n} \\frac{\\text{CF}_t}{(1+r)^t}',
        watchOut: 'Excel NPV treats the first value as a period-one cash flow, so add the initial investment separately.'
      },
      {
        id: 'irr',
        name: 'Internal Rate of Return',
        description: 'IRR is the periodic discount rate that makes the NPV of a cash-flow stream equal to zero.',
        usage: 'Use it for evenly spaced cash flows such as annual project or LBO periods, then compare with the required return.',
        formula: 'formula: \\text{NPV}(\\text{IRR}) = 0',
        watchOut: 'Multiple sign changes can create multiple IRRs. NPV is usually the better decision rule when projects differ in scale.'
      },
      {
        id: 'xnpv',
        name: 'XNPV',
        description: 'XNPV discounts cash flows using their actual dates rather than assuming equal spacing.',
        usage: 'Use it for irregular transaction dates, mid-year cash flows, and project finance schedules.',
        formula: 'formula: \\text{XNPV}(r, \\text{Values}, \\text{Dates})'
      },
      {
        id: 'xirr',
        name: 'XIRR',
        description: 'XIRR calculates a date-based internal rate of return for cash flows that are not necessarily periodic.',
        usage: 'Use it for actual investment, exit, dividend, and interim distribution dates.',
        formula: 'formula: \\text{XIRR}(\\text{Values}, \\text{Dates}, [\\text{Guess}])',
        watchOut: 'The cash flows need at least one positive and one negative value, and unusual sign patterns can create multiple solutions.'
      },
      {
        id: 'mirr',
        name: 'Modified Internal Rate of Return',
        description: 'MIRR separates the financing rate for negative cash flows from the reinvestment rate for positive cash flows.',
        usage: 'Use it when a standard IRR implies an unrealistic reinvestment assumption and the two rates can be defended.',
        formula: 'formula: \\text{MIRR}(\\text{Values}, \\text{Finance Rate}, \\text{Reinvestment Rate})'
      },
      {
        id: 'terminal-value-gordon',
        name: 'Terminal Value: Gordon Growth',
        description: 'The perpetuity-growth method values cash flows beyond the explicit forecast as a growing perpetuity.',
        usage: 'Use a sustainable long-run growth rate and a WACC that exceeds it by a sensible margin.',
        formula: 'formula: \\text{TV}_n = \\frac{\\text{FCFF}_{n+1}}{\\text{WACC} - g}',
        watchOut: 'The key mathematical condition is WACC greater than g. The growth rate also needs to be economically sustainable.'
      },
      {
        id: 'terminal-value-exit',
        name: 'Terminal Value: Exit Multiple',
        description: 'The exit-multiple method applies a valuation multiple to a terminal operating metric such as EBITDA.',
        usage: 'Use it in LBOs and transaction cases, then compare the implied terminal multiple with the entry and peer multiples.',
        formula: 'formula: \\text{TV}_n = \\text{Terminal EBITDA}_n \\times \\text{Exit Multiple}'
      },
      {
        id: 'dcf',
        name: 'Discounted Cash Flow',
        description: 'A DCF forecasts free cash flow, discounts each period, and adds a discounted terminal value.',
        usage: 'Separate operating drivers, reinvestment, taxes, discount periods, terminal value, and valuation sensitivities.',
        formula: 'formula: \\text{EV} = \\sum_{t=1}^{n} \\frac{\\text{FCFF}_t}{(1+\\text{WACC})^t} + \\frac{\\text{TV}_n}{(1+\\text{WACC})^n}'
      },
      {
        id: 'unlevered-beta',
        name: 'Unlevered Beta',
        description: 'Unlevering removes the target capital structure effect from a comparable company beta.',
        usage: 'Use a peer set to estimate business risk for a private company before relevering at the target structure.',
        formula: 'formula: \\beta_U = \\frac{\\beta_L}{1 + (1-T)\\left(\\frac{D}{E}\\right)}'
      },
      {
        id: 'levered-beta',
        name: 'Relevered Beta',
        description: 'Relevering applies the target company capital structure to an unlevered business beta.',
        usage: 'Use it in CAPM when the target debt-to-equity ratio differs from the comparable companies.',
        formula: 'formula: \\beta_L = \\beta_U \\left[1 + (1-T)\\left(\\frac{D}{E}\\right)\\right]'
      },
      {
        id: 'ev-ebitda',
        name: 'EV to EBITDA Multiple',
        description: 'EV/EBITDA compares operating value with an EBITDA denominator before interest and capital structure.',
        usage: 'Use it in trading comps and transaction comps after normalizing EBITDA and checking business comparability.',
        formula: 'formula: \\text{EV/EBITDA} = \\frac{\\text{Enterprise Value}}{\\text{LTM EBITDA}}'
      },
      {
        id: 'sources-and-uses',
        name: 'Sources and Uses',
        description: 'Sources and Uses reconciles the capital funding of a transaction with the cash required to complete it.',
        usage: 'Build sources for debt, sponsor equity, rollover equity, and target cash. Build uses for purchase price, refinancing, fees, and minimum cash.',
        formula: 'formula: \\text{Total Sources} = \\text{Total Uses}'
      },
      {
        id: 'accretion-dilution',
        name: 'Accretion and Dilution',
        description: 'Accretion and dilution tests whether pro forma earnings per share increases or decreases after financing, synergies, and new shares.',
        usage: 'Use it in merger models to show standalone EPS, transaction adjustments, pro forma EPS, and the break-even synergy requirement.',
        formula: 'formula: \\text{Pro Forma EPS} = \\frac{\\text{Pro Forma Net Income}}{\\text{Pro Forma Shares Outstanding}}'
      },
      {
        id: 'lbo-moic',
        name: 'LBO MOIC',
        description: 'MOIC measures total equity proceeds relative to invested equity without annualizing the holding period.',
        usage: 'Use it with IRR to separate value creation from the timing of returns.',
        formula: 'formula: \\text{MOIC} = \\frac{\\text{Sponsor Equity Proceeds}}{\\text{Sponsor Equity Invested}}'
      },
      {
        id: 'lbo-irr',
        name: 'LBO Equity IRR',
        description: 'LBO IRR annualizes sponsor cash flows including entry equity, interim distributions, and exit proceeds.',
        usage: 'Use actual dates with XIRR when distributions or the exit are irregular.',
        formula: 'formula: \\text{XIRR}(\\text{Sponsor Cash Flows}, \\text{Sponsor Dates})'
      }
    ]
  },
  {
    section: 'Financial Statements & Accounting',
    description: 'Connect earnings, assets, liabilities, equity, cash flow, and accounting adjustments.',
    items: [
      {
        id: 'three-statement-linkage',
        name: 'Three-Statement Linkage',
        description: 'Net income affects retained earnings and CFO, capex affects PP&E and CFI, debt affects financing cash flow, and ending cash closes the balance sheet.',
        usage: 'Use the linkage as the backbone of a forecast model and explain every balance-sheet movement through a schedule.',
        formula: 'formula: \\text{Ending Cash} = \\text{Beginning Cash} + \\text{CFO} + \\text{CFI} + \\text{CFF}'
      },
      {
        id: 'gross-margin',
        name: 'Gross Margin',
        description: 'Gross margin measures revenue remaining after direct cost of goods sold.',
        usage: 'Use it to analyze pricing, mix, procurement, and unit economics.',
        formula: 'formula: \\text{Gross Margin} = \\frac{\\text{Revenue} - \\text{COGS}}{\\text{Revenue}}'
      },
      {
        id: 'operating-margin',
        name: 'Operating Margin',
        description: 'Operating margin measures EBIT after operating expenses and before interest and tax.',
        usage: 'Use it to compare operating performance independent of financing and tax structure.',
        formula: 'formula: \\text{Operating Margin} = \\frac{\\text{EBIT}}{\\text{Revenue}}'
      },
      {
        id: 'net-margin',
        name: 'Net Profit Margin',
        description: 'Net margin measures profit available to equity holders per unit of revenue after financing and tax.',
        usage: 'Use it with operating margin to separate operating performance from leverage and tax effects.',
        formula: 'formula: \\text{Net Margin} = \\frac{\\text{Net Income}}{\\text{Revenue}}'
      },
      {
        id: 'ebitda',
        name: 'EBITDA',
        description: 'EBITDA adds back interest, tax, depreciation, and amortization to net income to approximate operating earnings before those items.',
        usage: 'Use it for operating comparisons and valuation multiples after checking normalization and accounting comparability.',
        formula: 'formula: \\text{EBITDA} = \\text{EBIT} + \\text{D\\&A}',
        watchOut: 'EBITDA is not cash flow. It ignores taxes, working capital, capital expenditure, and other cash requirements.'
      },
      {
        id: 'ebit',
        name: 'EBIT',
        description: 'EBIT is operating earnings before interest and tax.',
        usage: 'Use it for operating margin, NOPAT, ROIC, and unlevered cash-flow analysis.',
        formula: 'formula: \\text{EBIT} = \\text{Revenue} - \\text{Operating Costs}'
      },
      {
        id: 'nopat',
        name: 'NOPAT',
        description: 'NOPAT is after-tax operating profit before financing effects.',
        usage: 'Use it in ROIC and FCFF calculations when the tax rate reflects operating taxes.',
        formula: 'formula: \\text{NOPAT} = \\text{EBIT} \\times (1-T)'
      },
      {
        id: 'depreciation',
        name: 'Straight-Line Depreciation',
        description: 'Straight-line depreciation spreads depreciable cost evenly across the useful life.',
        usage: 'Use it for a simple fixed-asset schedule when policy and asset usage support the method.',
        formula: 'formula: \\text{Depreciation} = \\frac{\\text{Cost} - \\text{Salvage Value}}{\\text{Useful Life}}'
      },
      {
        id: 'ppe-rollforward',
        name: 'PP&E Roll-Forward',
        description: 'The PP&E roll-forward reconciles beginning net assets with capex, depreciation, disposals, and ending net PP&E.',
        usage: 'Use it to connect capex to investing cash flow and depreciation to the income statement.',
        formula: 'formula: \\text{Ending PP\\&E} = \\text{Beginning PP\\&E} + \\text{Capex} - \\text{Depreciation} - \\text{Disposals}'
      },
      {
        id: 'retained-earnings',
        name: 'Retained Earnings',
        description: 'Retained earnings accumulate net income after dividends and connect the income statement to equity.',
        usage: 'Use it in an integrated balance sheet instead of plugging equity.',
        formula: 'formula: \\text{Ending RE} = \\text{Beginning RE} + \\text{Net Income} - \\text{Dividends}'
      },
      {
        id: 'eps',
        name: 'Basic EPS',
        description: 'Basic EPS allocates net income available to common shareholders across the weighted-average basic share count.',
        usage: 'Use it for earnings analysis and as the starting point for accretion and dilution.',
        formula: 'formula: \\text{Basic EPS} = \\frac{\\text{Net Income} - \\text{Preferred Dividends}}{\\text{Weighted-Average Common Shares}}'
      },
      {
        id: 'diluted-eps',
        name: 'Diluted EPS',
        description: 'Diluted EPS includes potentially dilutive securities when their inclusion reduces EPS under the applicable accounting rules.',
        usage: 'Use treasury-stock or if-converted logic for options, convertibles, and other dilutive instruments.',
        formula: 'formula: \\text{Diluted EPS} = \\frac{\\text{Adjusted Net Income}}{\\text{Diluted Weighted-Average Shares}}'
      },
      {
        id: 'book-value-equity',
        name: 'Book Value of Equity',
        description: 'Book equity is the accounting residual after liabilities are deducted from assets.',
        usage: 'Use it in leverage, ROE, tangible book value, and bank analysis with the relevant accounting adjustments.',
        formula: 'formula: \\text{Book Equity} = \\text{Total Assets} - \\text{Total Liabilities}'
      },
      {
        id: 'roa',
        name: 'Return on Assets',
        description: 'ROA measures profit generated per unit of assets employed.',
        usage: 'Use average assets when comparing a period profit with the asset base used to generate it.',
        formula: 'formula: \\text{ROA} = \\frac{\\text{Net Income}}{\\text{Average Total Assets}}'
      },
      {
        id: 'roic',
        name: 'Return on Invested Capital',
        description: 'ROIC compares after-tax operating profit with the capital invested in the operating business.',
        usage: 'Compare ROIC with WACC to discuss value creation, using a consistent tax rate and invested-capital definition.',
        formula: 'formula: \\text{ROIC} = \\frac{\\text{NOPAT}}{\\text{Average Invested Capital}}',
        watchOut: 'Define invested capital explicitly. Debt plus equity less non-operating cash is a starting point, not a universal denominator.'
      },
      {
        id: 'dupont-3step',
        name: 'Three-Step DuPont ROE',
        description: 'Three-step DuPont decomposes ROE into profit margin, asset turnover, and financial leverage.',
        usage: 'Use it to explain whether ROE changed because of profitability, asset efficiency, or leverage.',
        formula: 'formula: \\text{ROE} = \\frac{\\text{Net Income}}{\\text{Sales}} \\times \\frac{\\text{Sales}}{\\text{Assets}} \\times \\frac{\\text{Assets}}{\\text{Equity}}'
      },
      {
        id: 'dupont-5step',
        name: 'Five-Step DuPont ROE',
        description: 'Five-step DuPont separates tax burden, interest burden, operating margin, asset turnover, and leverage.',
        usage: 'Use it when a senior reviewer wants to know whether financing or operating choices drove a change in ROE.',
        formula: 'formula: \\text{ROE} = \\frac{NI}{EBT} \\times \\frac{EBT}{EBIT} \\times \\frac{EBIT}{Sales} \\times \\frac{Sales}{Assets} \\times \\frac{Assets}{Equity}'
      },
      {
        id: 'common-size',
        name: 'Common-Size Statement',
        description: 'Common-size analysis expresses each income-statement line as a percentage of revenue and each balance-sheet line as a percentage of a selected base.',
        usage: 'Use it to compare scale, mix, margins, and balance-sheet composition across companies and years.',
        formula: 'formula: \\text{Common-Size Line} = \\frac{\\text{Line Item}}{\\text{Base Measure}}'
      },
      {
        id: 'break-even',
        name: 'Break-Even Point',
        description: 'Break-even is the sales volume or revenue at which contribution profit covers fixed costs.',
        usage: 'Use it for operating leverage, pricing, capacity, and downside analysis.',
        formula: 'formula: \\text{Break-Even Units} = \\frac{\\text{Fixed Costs}}{\\text{Price per Unit} - \\text{Variable Cost per Unit}}'
      },
      {
        id: 'contribution-margin',
        name: 'Contribution Margin',
        description: 'Contribution margin measures revenue left after variable costs to cover fixed costs and profit.',
        usage: 'Use it in break-even, product mix, and operating leverage analysis.',
        formula: 'formula: \\text{Contribution Margin} = \\text{Revenue} - \\text{Variable Costs}'
      },
      {
        id: 'effective-tax-rate',
        name: 'Effective Tax Rate',
        description: 'The effective tax rate compares recorded tax expense with pre-tax income for a period.',
        usage: 'Use it for historical analysis, but use a sustainable marginal or cash tax rate when the valuation requires it.',
        formula: 'formula: \\text{ETR} = \\frac{\\text{Tax Expense}}{\\text{Pre-Tax Income}}'
      }
    ]
  },
  {
    section: 'Profitability, Working Capital & Operating Metrics',
    description: 'Measure the operating cycle, cash conversion, growth, margins, and resource efficiency.',
    items: [
      {
        id: 'ccc',
        name: 'Cash Conversion Cycle',
        description: 'CCC measures the time between paying for inventory or inputs and collecting cash from customers.',
        usage: 'Use it to analyze liquidity, growth funding, supplier terms, inventory discipline, and collections.',
        formula: 'formula: \\text{CCC} = \\text{DSO} + \\text{DIO} - \\text{DPO}',
        watchOut: 'Lower is not automatically better. A negative CCC can be attractive, but a very low number may reflect supplier stress or underinvestment.'
      },
      {
        id: 'dso',
        name: 'Days Sales Outstanding',
        description: 'DSO estimates how many days of sales are tied up in receivables.',
        usage: 'Use average receivables and credit sales where available, then compare the result with contractual terms and aging.',
        formula: 'formula: \\text{DSO} = \\frac{\\text{Average Accounts Receivable}}{\\text{Credit Sales}} \\times \\text{Days}'
      },
      {
        id: 'dio',
        name: 'Days Inventory Outstanding',
        description: 'DIO estimates how many days of cost of sales are represented by inventory.',
        usage: 'Use it to analyze inventory turns, obsolescence risk, seasonality, and cash tied up in stock.',
        formula: 'formula: \\text{DIO} = \\frac{\\text{Average Inventory}}{\\text{COGS}} \\times \\text{Days}'
      },
      {
        id: 'dpo',
        name: 'Days Payables Outstanding',
        description: 'DPO estimates how long the company takes to pay suppliers.',
        usage: 'Compare it with supplier terms and distinguish sustainable working-capital management from delayed payment.',
        formula: 'formula: \\text{DPO} = \\frac{\\text{Average Accounts Payable}}{\\text{Purchases or COGS}} \\times \\text{Days}'
      },
      {
        id: 'operating-nwc',
        name: 'Operating Net Working Capital',
        description: 'Operating NWC generally includes operating current assets less operating current liabilities, excluding financing items such as debt and excess cash.',
        usage: 'Use a line-by-line definition that matches the business and the valuation or transaction convention.',
        formula: 'formula: \\text{Operating NWC} = \\text{AR} + \\text{Inventory} + \\text{Other Operating CA} - \\text{AP} - \\text{Other Operating CL}'
      },
      {
        id: 'change-nwc',
        name: 'Change in NWC',
        description: 'An increase in operating NWC generally consumes cash and a release generally provides cash.',
        usage: 'Link the change to CFO or FCFF and explain the operational driver behind the movement.',
        formula: 'formula: \\text{Cash Flow Impact} = -\\Delta \\text{Operating NWC}'
      },
      {
        id: 'revenue-growth',
        name: 'Revenue Growth',
        description: 'Revenue growth measures the change in revenue between comparable periods.',
        usage: 'Separate volume, price, mix, FX, acquisition, and divestiture effects when the analysis needs more than a headline growth rate.',
        formula: 'formula: \\text{Growth} = \\frac{\\text{Current Revenue} - \\text{Prior Revenue}}{\\text{Prior Revenue}}'
      },
      {
        id: 'cagr',
        name: 'Compound Annual Growth Rate',
        description: 'CAGR is the constant annual growth rate that connects a beginning value to an ending value over multiple periods.',
        usage: 'Use it for positive beginning and ending values with a clearly defined number of periods.',
        formula: 'formula: \\text{CAGR} = \\left(\\frac{\\text{Ending Value}}{\\text{Beginning Value}}\\right)^{1/n} - 1',
        watchOut: 'Standard CAGR is not meaningful when the beginning value is zero or when negative values make the ratio undefined.'
      },
      {
        id: 'asset-turnover',
        name: 'Asset Turnover',
        description: 'Asset turnover measures revenue generated per unit of assets employed.',
        usage: 'Use average assets when comparing a flow over a period with the asset base used to generate it.',
        formula: 'formula: \\text{Asset Turnover} = \\frac{\\text{Revenue}}{\\text{Average Assets}}'
      },
      {
        id: 'inventory-turnover',
        name: 'Inventory Turnover',
        description: 'Inventory turnover measures how many times inventory is sold or consumed during a period.',
        usage: 'Use it with DIO and inventory aging to distinguish efficient turns from stockouts or aggressive provisioning.',
        formula: 'formula: \\text{Inventory Turnover} = \\frac{\\text{COGS}}{\\text{Average Inventory}}'
      },
      {
        id: 'receivables-turnover',
        name: 'Receivables Turnover',
        description: 'Receivables turnover measures credit sales generated per unit of average receivables.',
        usage: 'Use it with DSO and aging data to assess collections and customer credit quality.',
        formula: 'formula: \\text{AR Turnover} = \\frac{\\text{Credit Sales}}{\\text{Average AR}}'
      },
      {
        id: 'payables-turnover',
        name: 'Payables Turnover',
        description: 'Payables turnover measures purchases or cost of sales relative to average supplier payables.',
        usage: 'Use it with DPO and payment terms to assess supplier funding and liquidity pressure.',
        formula: 'formula: \\text{AP Turnover} = \\frac{\\text{Purchases}}{\\text{Average AP}}'
      },
      {
        id: 'working-capital-peg',
        name: 'Normalized Working-Capital Peg',
        description: 'A working-capital peg estimates the normal operating working capital that transfers with a business in a transaction.',
        usage: 'Analyze seasonality, aged balances, unusual prepayments, one-time accruals, and inventory quality before setting the peg.',
        formula: 'formula: \\text{Peg} = \\text{Normalized Operating Current Assets} - \\text{Normalized Operating Current Liabilities}',
        watchOut: 'The peg is a negotiated and evidence-based transaction concept, not simply the latest reported balance.'
      },
      {
        id: 'fcf-conversion',
        name: 'Cash Conversion from EBITDA',
        description: 'Cash conversion compares cash flow after taxes, working capital, and capital expenditure with EBITDA.',
        usage: 'Use it to assess how much accounting operating earnings become usable cash.',
        formula: 'formula: \\text{FCF Conversion} = \\frac{\\text{FCF}}{\\text{EBITDA}}'
      },
      {
        id: 'dol',
        name: 'Degree of Operating Leverage',
        description: 'DOL measures the sensitivity of EBIT to a change in sales when fixed and variable cost behavior is known.',
        usage: 'Use it in downside cases and capacity analysis. It is most useful around a specific operating point.',
        formula: 'formula: \\text{DOL} = \\frac{\\%\\Delta \\text{EBIT}}{\\%\\Delta \\text{Sales}} = \\frac{\\text{Contribution Margin}}{\\text{EBIT}}'
      },
      {
        id: 'dfl',
        name: 'Degree of Financial Leverage',
        description: 'DFL measures the sensitivity of equity earnings to changes in EBIT caused by fixed financing costs.',
        usage: 'Use it to explain how debt magnifies equity outcomes around a specific EBIT level.',
        formula: 'formula: \\text{DFL} = \\frac{\\%\\Delta \\text{EPS}}{\\%\\Delta \\text{EBIT}} = \\frac{\\text{EBIT}}{\\text{EBIT} - \\text{Interest}}'
      },
      {
        id: 'ebitda-margin-bridge',
        name: 'EBITDA Margin Bridge',
        description: 'A margin bridge explains changes in EBITDA margin through price, volume, mix, input costs, productivity, FX, and one-time items.',
        usage: 'Use it in management presentations, QofE reviews, and forecast challenge sessions.',
        formula: 'formula: \\text{EBITDA Margin} = \\frac{\\text{EBITDA}}{\\text{Revenue}}'
      },
      {
        id: 'cash-conversion',
        name: 'Cash Conversion Cycle Days to Cash',
        description: 'The cash requirement from growth can be approximated by the incremental working capital required for additional sales.',
        usage: 'Use it to estimate liquidity needs when revenue grows faster than collections or supplier funding.',
        formula: 'formula: \\Delta \\text{NWC} \\approx \\Delta \\text{Revenue} \\times \\frac{\\text{NWC Days}}{\\text{Days}}'
      }
    ]
  },
  {
    section: 'Credit, Leverage & Private Capital',
    description: 'Coverage, leverage, liquidity, borrowing-base, and recovery formulas used in credit and private capital.',
    items: [
      {
        id: 'dscr',
        name: 'Debt Service Coverage Ratio',
        description: 'DSCR compares cash earnings available for debt service with interest and scheduled principal amortization.',
        usage: 'Use it in credit, private-credit, project-finance, and lender models to test repayment capacity.',
        formula: 'formula: \\text{DSCR} = \\frac{\\text{EBITDA}}{\\text{Interest Expense} + \\text{Principal Amortization}}',
        watchOut: 'The numerator may instead be CFADS or a contractual definition. Do not present 1.25x as a universal pass mark.'
      },
      {
        id: 'cfads',
        name: 'Cash Flow Available for Debt Service',
        description: 'CFADS is cash available for scheduled debt service after operating costs, taxes, working capital, and required reinvestment.',
        usage: 'Use it in project finance and cash-flow lending where EBITDA is too broad a measure of repayment capacity.',
        formula: 'formula: \\text{CFADS} = \\text{Cash Operating Revenue} - \\text{Cash Operating Costs} - \\text{Taxes} - \\Delta \\text{NWC} - \\text{Maintenance Capex}'
      },
      {
        id: 'interest-coverage',
        name: 'Interest Coverage Ratio',
        description: 'Interest coverage compares an earnings or cash-flow measure with interest expense.',
        usage: 'Define whether the numerator is EBIT, EBITDA, or cash flow before comparing borrowers.',
        formula: 'formula: \\text{Interest Coverage} = \\frac{\\text{EBITDA or EBIT}}{\\text{Cash Interest Expense}}'
      },
      {
        id: 'fixed-charge-coverage',
        name: 'Fixed-Charge Coverage',
        description: 'Fixed-charge coverage tests the ability to cover interest and other contractual fixed payments such as rent or lease expense.',
        usage: 'Use it when lease, rent, or preferred distributions are material to liquidity.',
        formula: 'formula: \\text{FCCR} = \\frac{\\text{EBITDA} + \\text{Rent}}{\\text{Interest} + \\text{Rent} + \\text{Other Fixed Charges}}'
      },
      {
        id: 'net-debt-ebitda',
        name: 'Net Debt to EBITDA',
        description: 'Net leverage compares debt net of eligible cash with EBITDA.',
        usage: 'Use it for capital structure, covenant, and credit-risk comparisons after applying contractual definitions.',
        formula: 'formula: \\text{Net Leverage} = \\frac{\\text{Debt} - \\text{Eligible Cash}}{\\text{EBITDA}}'
      },
      {
        id: 'debt-to-equity',
        name: 'Debt to Equity',
        description: 'Debt-to-equity compares creditor funding with book or market equity.',
        usage: 'State whether the denominator is book equity or market equity and whether leases or preferred equity are included.',
        formula: 'formula: \\text{D/E} = \\frac{\\text{Debt}}{\\text{Equity}}'
      },
      {
        id: 'debt-to-assets',
        name: 'Debt to Assets',
        description: 'Debt-to-assets measures the share of assets financed by debt.',
        usage: 'Use it as a balance-sheet leverage measure with asset-quality and valuation context.',
        formula: 'formula: \\text{Debt to Assets} = \\frac{\\text{Debt}}{\\text{Total Assets}}'
      },
      {
        id: 'current-ratio',
        name: 'Current Ratio',
        description: 'Current ratio compares current assets with current liabilities.',
        usage: 'Use it as a first-pass liquidity measure, then inspect the quality and timing of individual current assets.',
        formula: 'formula: \\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}'
      },
      {
        id: 'quick-ratio',
        name: 'Quick Ratio',
        description: 'Quick ratio excludes less-liquid current assets such as inventory from the liquidity numerator.',
        usage: 'Use it to test near-term obligations against cash, marketable securities, and receivables.',
        formula: 'formula: \\text{Quick Ratio} = \\frac{\\text{Cash} + \\text{Marketable Securities} + \\text{AR}}{\\text{Current Liabilities}}'
      },
      {
        id: 'cash-ratio',
        name: 'Cash Ratio',
        description: 'Cash ratio is the most conservative basic liquidity ratio because it uses cash and cash equivalents in the numerator.',
        usage: 'Use it for immediate liquidity stress, not as a complete measure of operating liquidity.',
        formula: 'formula: \\text{Cash Ratio} = \\frac{\\text{Cash and Cash Equivalents}}{\\text{Current Liabilities}}'
      },
      {
        id: 'ltv',
        name: 'Loan to Value',
        description: 'LTV compares loan exposure with the value of the pledged collateral or financed asset.',
        usage: 'Use it in real estate, asset-backed lending, and collateral monitoring.',
        formula: 'formula: \\text{LTV} = \\frac{\\text{Loan Amount}}{\\text{Collateral Value}}'
      },
      {
        id: 'debt-yield',
        name: 'Debt Yield',
        description: 'Debt yield compares property or asset operating income with loan amount without relying on an appraised value.',
        usage: 'Use it in real-estate credit and compare it with DSCR and LTV.',
        formula: 'formula: \\text{Debt Yield} = \\frac{\\text{Net Operating Income}}{\\text{Loan Amount}}'
      },
      {
        id: 'altman-z',
        name: 'Altman Z-Score',
        description: 'Altman Z-Score combines accounting and market variables into a historical distress-screening score.',
        usage: 'Use the version appropriate to the company type and treat the result as a screening indicator, not a standalone default probability.',
        formula: 'formula: \\text{Z} = 1.2\\frac{WC}{TA} + 1.4\\frac{RE}{TA} + 3.3\\frac{EBIT}{TA} + 0.6\\frac{MVE}{TL} + 1.0\\frac{Sales}{TA}',
        watchOut: 'The original coefficients were developed for a specific public manufacturing sample. Private, non-manufacturing, and emerging-market versions differ.'
      },
      {
        id: 'borrowing-base',
        name: 'Borrowing Base',
        description: 'A borrowing base applies eligibility and advance rates to collateral such as receivables and inventory.',
        usage: 'Use it to calculate secured availability, reserves, concentration limits, and excess availability.',
        formula: 'formula: \\text{Borrowing Base} = \\text{Eligible AR} \\times \\text{AR Advance Rate} + \\text{Eligible Inventory} \\times \\text{Inventory Advance Rate} - \\text{Reserves}'
      },
      {
        id: 'recovery-rate',
        name: 'Recovery Rate',
        description: 'Recovery rate measures value recovered relative to claim amount after enforcement, costs, and timing.',
        usage: 'Use it in default, restructuring, and secured-lending analysis with an explicit valuation date.',
        formula: 'formula: \\text{Recovery Rate} = \\frac{\\text{Net Recovery Value}}{\\text{Claim Amount}}'
      },
      {
        id: 'loss-given-default',
        name: 'Loss Given Default',
        description: 'LGD is the share of exposure expected to be lost after recovery proceeds and costs.',
        usage: 'Use it with probability of default and exposure at default in expected-loss analysis.',
        formula: 'formula: \\text{LGD} = 1 - \\text{Recovery Rate}'
      },
      {
        id: 'expected-credit-loss',
        name: 'Expected Credit Loss',
        description: 'Expected loss combines probability of default, exposure at default, and loss given default.',
        usage: 'Use it for portfolio credit-risk analysis and distinguish through-the-cycle from point-in-time assumptions.',
        formula: 'formula: \\text{Expected Loss} = \\text{PD} \\times \\text{EAD} \\times \\text{LGD}'
      },
      {
        id: 'llcr',
        name: 'Loan Life Coverage Ratio',
        description: 'LLCR compares the present value of cash flow available for debt service over the loan life with outstanding debt.',
        usage: 'Use it in project finance and long-dated cash-flow lending.',
        formula: 'formula: \\text{LLCR} = \\frac{\\text{PV of CFADS over Loan Life}}{\\text{Outstanding Debt}}'
      },
      {
        id: 'plcr',
        name: 'Project Life Coverage Ratio',
        description: 'PLCR extends coverage analysis across the project life, including cash flows after scheduled loan maturity.',
        usage: 'Use it alongside LLCR when residual project cash flows support long-term credit assessment.',
        formula: 'formula: \\text{PLCR} = \\frac{\\text{PV of CFADS over Project Life}}{\\text{Outstanding Debt}}'
      },
      {
        id: 'covenant-headroom',
        name: 'Covenant Headroom',
        description: 'Headroom measures the distance between the borrower metric and the covenant limit.',
        usage: 'Show both absolute and percentage headroom and test the result under downside cases.',
        formula: 'formula: \\text{Headroom} = \\text{Covenant Limit} - \\text{Actual Metric}'
      }
    ]
  },
  {
    section: 'Fixed Income & Debt Markets',
    description: 'Price bonds, explain rate sensitivity, and connect yields with duration, convexity, and credit spreads.',
    items: [
      {
        id: 'bond-price',
        name: 'Bond Price',
        description: 'Bond price is the present value of coupons and principal discounted at the required yield.',
        usage: 'Use it to explain why bond prices move inversely to yields.',
        formula: 'formula: P = \\sum_{t=1}^{n} \\frac{C}{(1+y)^t} + \\frac{F}{(1+y)^n}'
      },
      {
        id: 'current-yield',
        name: 'Current Yield',
        description: 'Current yield compares annual coupon income with the bond market price.',
        usage: 'Use it as a simple income measure, not a complete total-return or yield-to-maturity measure.',
        formula: 'formula: \\text{Current Yield} = \\frac{\\text{Annual Coupon}}{\\text{Market Price}}'
      },
      {
        id: 'ytm',
        name: 'Yield to Maturity',
        description: 'YTM is the periodic discount rate that equates the bond price with the present value of coupons and principal if held to maturity.',
        usage: 'Use it for plain-vanilla bonds when cash flows, reinvestment, and redemption assumptions are clear.',
        formula: 'formula: P = \\sum_{t=1}^{n} \\frac{C}{(1+\\text{YTM})^t} + \\frac{F}{(1+\\text{YTM})^n}'
      },
      {
        id: 'ytc',
        name: 'Yield to Call',
        description: 'Yield to call calculates the return assuming a callable bond is redeemed on a specified call date at its call price.',
        usage: 'Use it alongside YTM when the issuer has a realistic call option.',
        formula: 'formula: P = \\sum_{t=1}^{n_c} \\frac{C}{(1+y_c)^t} + \\frac{\\text{Call Price}}{(1+y_c)^{n_c}}'
      },
      {
        id: 'bond-duration',
        name: 'Macaulay Duration',
        description: 'Macaulay duration is the present-value-weighted average time to receive a bond cash flow.',
        usage: 'Use it as a timing measure and as the foundation for modified-duration rate sensitivity.',
        formula: 'formula: \\text{MacD} = \\frac{\\sum_{t=1}^{n} t \\times \\text{PV}(\\text{Cash Flow}_t)}{\\text{Bond Price}}'
      },
      {
        id: 'modified-duration',
        name: 'Modified Duration',
        description: 'Modified duration approximates the percentage price change for a small change in yield.',
        usage: 'Use it for first-order interest-rate sensitivity when cash flows do not change with yield.',
        formula: 'formula: \\text{ModD} = \\frac{\\text{MacD}}{1 + y/m}'
      },
      {
        id: 'effective-duration',
        name: 'Effective Duration',
        description: 'Effective duration measures rate sensitivity when cash flows may change, such as for callable or putable bonds.',
        usage: 'Use it for securities with embedded options where modified duration is not sufficient.',
        formula: 'formula: \\text{EffD} = \\frac{P_{-} - P_{+}}{2P_0\\Delta y}'
      },
      {
        id: 'convexity',
        name: 'Bond Convexity',
        description: 'Convexity captures the curvature in the bond price-yield relationship and improves the duration-only approximation.',
        usage: 'Use it for larger yield moves and for comparing the shape of rate risk across bonds.',
        formula: 'formula: \\text{Convexity} \\approx \\frac{P_{-} + P_{+} - 2P_0}{P_0(\\Delta y)^2}'
      },
      {
        id: 'price-yield-approximation',
        name: 'Duration-Convexity Price Approximation',
        description: 'The duration-convexity approximation estimates a bond price change for a change in yield.',
        usage: 'Use it for scenario analysis and explain that the approximation is better for small moves and liquid instruments.',
        formula: 'formula: \\frac{\\Delta P}{P} \\approx -\\text{ModD}\\Delta y + \\frac{1}{2}\\text{Convexity}(\\Delta y)^2'
      },
      {
        id: 'accrued-interest',
        name: 'Accrued Interest',
        description: 'Accrued interest is the coupon earned since the last payment date but not yet paid.',
        usage: 'Use it to bridge clean price and dirty price in bond settlement.',
        formula: 'formula: \\text{Accrued Interest} = \\text{Coupon per Period} \\times \\frac{\\text{Days Accrued}}{\\text{Days in Coupon Period}}'
      },
      {
        id: 'clean-dirty-price',
        name: 'Clean and Dirty Price',
        description: 'Clean price excludes accrued interest while dirty price is the settlement amount including accrued interest.',
        usage: 'Use the correct convention when comparing quoted prices with cash settlement.',
        formula: 'formula: \\text{Dirty Price} = \\text{Clean Price} + \\text{Accrued Interest}'
      },
      {
        id: 'dv01',
        name: 'DV01',
        description: 'DV01 estimates the dollar price change for a one-basis-point parallel shift in yield.',
        usage: 'Use it to size hedges, compare rate risk, and aggregate fixed-income exposures.',
        formula: 'formula: \\text{DV01} \\approx -\\text{ModD} \\times \\text{Market Value} \\times 0.0001'
      },
      {
        id: 'discount-factor',
        name: 'Discount Factor',
        description: 'A discount factor converts a future cash flow into present value at a specified rate and period.',
        usage: 'Use it in bond pricing, DCFs, project finance, and loan valuation.',
        formula: 'formula: \\text{DF}_t = \\frac{1}{(1+r)^t}'
      },
      {
        id: 'credit-spread',
        name: 'Credit Spread',
        description: 'Credit spread is the yield premium over a reference risk-free or benchmark curve for comparable maturity and cash-flow risk.',
        usage: 'Use it to discuss default, liquidity, recovery, sector, and optionality risk.',
        formula: 'formula: \\text{Credit Spread} = \\text{Corporate Yield} - \\text{Reference Yield}'
      },
      {
        id: 'floating-rate-loan',
        name: 'Floating-Rate Loan Interest',
        description: 'Floating-rate interest usually equals a reference index plus a contractual spread, subject to floors and caps.',
        usage: 'Use it in debt schedules, interest-rate sensitivity, and borrower hedging analysis.',
        formula: 'formula: \\text{Interest Rate} = \\text{Reference Rate} + \\text{Credit Spread}'
      },
      {
        id: 'amortizing-loan-balance',
        name: 'Amortizing Loan Balance',
        description: 'An amortizing schedule reduces principal through scheduled payments or mandatory amortization.',
        usage: 'Use it to forecast interest, debt service, cash flow, and ending leverage.',
        formula: 'formula: \\text{Ending Principal} = \\text{Beginning Principal} - \\text{Principal Repayment}'
      },
      {
        id: 'bond-equivalent-yield',
        name: 'Bond-Equivalent Yield',
        description: 'Bond-equivalent yield annualizes a short-term discount instrument using a convention that makes comparisons easier.',
        usage: 'Use it only with the stated day-count and annualization convention.',
        formula: 'formula: \\text{BEY} = \\frac{\\text{Discount}}{\\text{Price}} \\times \\frac{365}{\\text{Days to Maturity}}'
      },
      {
        id: 'forward-rate',
        name: 'Forward Rate',
        description: 'A forward rate is the future period rate implied by spot rates under a no-arbitrage framework.',
        usage: 'Use it to explain yield curves, forward borrowing, and rate expectations versus market-implied pricing.',
        formula: 'formula: (1+s_2)^2 = (1+s_1)(1+f_{1,2})'
      }
    ]
  },
  {
    section: 'Portfolio Theory & Risk',
    description: 'Measure risk-adjusted returns, portfolio interaction, benchmark skill, and loss exposure.',
    items: [
      {
        id: 'sharpe',
        name: 'Sharpe Ratio',
        description: 'Sharpe ratio measures excess return per unit of total volatility over a selected period.',
        usage: 'Use it to compare risk-adjusted performance when the return and volatility measurement conventions are consistent.',
        formula: 'formula: \\text{Sharpe} = \\frac{R_p - R_f}{\\sigma_p}',
        watchOut: 'The result depends on horizon, frequency, risk-free rate, return calculation, and the stability of volatility.'
      },
      {
        id: 'sortino',
        name: 'Sortino Ratio',
        description: 'Sortino ratio measures excess return per unit of downside deviation rather than total volatility.',
        usage: 'Use it when upside variability should not be treated as the same risk as downside variability.',
        formula: 'formula: \\text{Sortino} = \\frac{R_p - R_{target}}{\\text{Downside Deviation}}'
      },
      {
        id: 'treynor',
        name: 'Treynor Ratio',
        description: 'Treynor ratio measures excess return per unit of systematic risk as represented by beta.',
        usage: 'Use it for portfolios that are already broadly diversified and have a meaningful benchmark beta.',
        formula: 'formula: \\text{Treynor} = \\frac{R_p - R_f}{\\beta_p}'
      },
      {
        id: 'jensen-alpha',
        name: 'Jensen Alpha',
        description: 'Jensen alpha measures return above or below the CAPM-implied return for the portfolio beta.',
        usage: 'Use it with a stated benchmark, sample period, and regression convention.',
        formula: 'formula: \\alpha_p = R_p - [R_f + \\beta_p(R_m - R_f)]'
      },
      {
        id: 'portfolio-return',
        name: 'Portfolio Expected Return',
        description: 'Portfolio expected return is the weighted average of the expected returns of its assets.',
        usage: 'Use it as the return input for efficient-frontier and risk-adjusted-return analysis.',
        formula: 'formula: E(R_p) = \\sum_{i=1}^{n} w_i E(R_i)'
      },
      {
        id: 'portfolio-variance',
        name: 'Portfolio Variance',
        description: 'Portfolio variance includes individual asset variance and covariance between asset returns.',
        usage: 'Use it to show why correlation and diversification affect portfolio risk.',
        formula: 'formula: \\sigma_p^2 = \\sum_i \\sum_j w_i w_j \\text{Cov}(R_i,R_j)'
      },
      {
        id: 'covariance',
        name: 'Covariance',
        description: 'Covariance measures the direction in which two return series move together.',
        usage: 'Use it in portfolio variance, beta, and diversification calculations.',
        formula: 'formula: \\text{Cov}(X,Y) = E[(X-E[X])(Y-E[Y])]'
      },
      {
        id: 'correlation',
        name: 'Correlation',
        description: 'Correlation standardizes covariance between negative one and positive one.',
        usage: 'Use it to compare co-movement across pairs with different volatility scales.',
        formula: 'formula: \\rho_{XY} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X\\sigma_Y}'
      },
      {
        id: 'beta',
        name: 'Regression Beta',
        description: 'Beta measures the sensitivity of an asset or portfolio return to benchmark return.',
        usage: 'Use it in CAPM, hedging, performance attribution, and market-risk analysis.',
        formula: 'formula: \\beta_i = \\frac{\\text{Cov}(R_i,R_m)}{\\text{Var}(R_m)}'
      },
      {
        id: 'tracking-error',
        name: 'Tracking Error',
        description: 'Tracking error is the volatility of active return relative to a benchmark.',
        usage: 'Use it for portfolio mandate monitoring and active-management analysis.',
        formula: 'formula: \\text{Tracking Error} = \\sigma(R_p - R_b)'
      },
      {
        id: 'information-ratio',
        name: 'Information Ratio',
        description: 'Information ratio measures active return per unit of tracking error.',
        usage: 'Use it to compare active managers relative to a stated benchmark.',
        formula: 'formula: \\text{IR} = \\frac{R_p - R_b}{\\sigma(R_p - R_b)}'
      },
      {
        id: 'parametric-var',
        name: 'Parametric Value at Risk',
        description: 'Parametric VaR estimates a loss threshold using a confidence level, mean, volatility, and distribution assumption.',
        usage: 'Use it as a model-based risk estimate and state the horizon and confidence level.',
        formula: 'formula: \\text{VaR}_{\\alpha} = z_{\\alpha}\\sigma_p V - \\mu_p V'
      },
      {
        id: 'expected-shortfall',
        name: 'Expected Shortfall',
        description: 'Expected shortfall is the average loss beyond the selected VaR threshold.',
        usage: 'Use it when tail-loss magnitude matters more than a single quantile.',
        formula: 'formula: \\text{ES}_{\\alpha} = E[\\text{Loss} \\mid \\text{Loss} > \\text{VaR}_{\\alpha}]'
      },
      {
        id: 'downside-deviation',
        name: 'Downside Deviation',
        description: 'Downside deviation measures dispersion of returns below a target or minimum acceptable return.',
        usage: 'Use it in Sortino and downside-risk analysis.',
        formula: 'formula: \\text{Downside Deviation} = \\sqrt{E[\\min(0,R_p-R_{target})^2]}'
      },
      {
        id: 'm2',
        name: 'M-Squared Performance',
        description: 'M-squared translates a Sharpe ratio into a percentage return at a reference portfolio volatility.',
        usage: 'Use it when a percentage-return interpretation is easier to communicate than a ratio.',
        formula: 'formula: M^2 = R_f + \\text{Sharpe}_p \\times \\sigma_{benchmark}'
      },
      {
        id: 'risk-contribution',
        name: 'Marginal Risk Contribution',
        description: 'Marginal risk contribution measures how a small change in an asset weight changes portfolio volatility.',
        usage: 'Use it for risk budgeting, concentration analysis, and portfolio construction.',
        formula: 'formula: \\text{MRC}_i = \\frac{(\\Sigma w)_i}{\\sigma_p}'
      }
    ]
  },
  {
    section: 'Derivatives & Options',
    description: 'Price options, explain sensitivities, and connect payoff diagrams with no-arbitrage relationships.',
    items: [
      {
        id: 'black-scholes-call',
        name: 'Black-Scholes Call',
        description: 'The Black-Scholes model prices a European call using spot price, strike, volatility, rate, time, and dividend yield.',
        usage: 'Use it as a baseline model and state the European exercise and lognormal-volatility assumptions.',
        formula: 'formula: C = S_0 e^{-qT}N(d_1) - Ke^{-rT}N(d_2)'
      },
      {
        id: 'black-scholes-put',
        name: 'Black-Scholes Put',
        description: 'The Black-Scholes model prices a European put using the same market inputs as the call model.',
        usage: 'Use it for downside protection and verify the result against put-call parity.',
        formula: 'formula: P = Ke^{-rT}N(-d_2) - S_0e^{-qT}N(-d_1)'
      },
      {
        id: 'd1',
        name: 'Black-Scholes d1',
        description: 'd1 combines spot, strike, rate, dividend yield, volatility, and time in the option model.',
        usage: 'Use it as an intermediate input to option value and Greeks.',
        formula: 'formula: d_1 = \\frac{\\ln(S_0/K)+(r-q+\\sigma^2/2)T}{\\sigma\\sqrt{T}}'
      },
      {
        id: 'd2',
        name: 'Black-Scholes d2',
        description: 'd2 adjusts d1 by one volatility-time term.',
        usage: 'Use it in call and put values and probability interpretations under the model measure.',
        formula: 'formula: d_2 = d_1 - \\sigma\\sqrt{T}'
      },
      {
        id: 'delta-call',
        name: 'Call Delta',
        description: 'Call delta approximates the option price change for a small change in the underlying price.',
        usage: 'Use it for directional exposure and delta hedging.',
        formula: 'formula: \\Delta_{call} = e^{-qT}N(d_1)'
      },
      {
        id: 'delta-put',
        name: 'Put Delta',
        description: 'Put delta measures the directional sensitivity of a put to the underlying price.',
        usage: 'Use it for downside exposure and protective-put hedge ratios.',
        formula: 'formula: \\Delta_{put} = e^{-qT}[N(d_1)-1]'
      },
      {
        id: 'gamma',
        name: 'Option Gamma',
        description: 'Gamma measures how delta changes when the underlying price changes.',
        usage: 'Use it to understand nonlinear exposure and the need to rebalance a delta hedge.',
        formula: 'formula: \\Gamma = \\frac{e^{-qT}N\'(d_1)}{S_0\\sigma\\sqrt{T}}'
      },
      {
        id: 'vega',
        name: 'Option Vega',
        description: 'Vega measures the option value sensitivity to a change in implied volatility.',
        usage: 'Use it in volatility-risk and options-pricing discussions. Convention may quote vega per one percentage-point move.',
        formula: 'formula: \\text{Vega} = S_0e^{-qT}N\'(d_1)\\sqrt{T}'
      },
      {
        id: 'theta-call',
        name: 'Call Theta',
        description: 'Theta measures the option value change from the passage of time, holding other inputs constant.',
        usage: 'Use it to explain time decay and why long-option positions can lose value even when spot is unchanged.',
        formula: 'formula: \\Theta_{call} = -\\frac{S_0e^{-qT}N\'(d_1)\\sigma}{2\\sqrt{T}} - rKe^{-rT}N(d_2) + qS_0e^{-qT}N(d_1)'
      },
      {
        id: 'rho-call',
        name: 'Call Rho',
        description: 'Rho measures call value sensitivity to the risk-free interest rate.',
        usage: 'Use it in rate-sensitive option and treasury discussions.',
        formula: 'formula: \\rho_{call} = TKe^{-rT}N(d_2)'
      },
      {
        id: 'put-call-parity',
        name: 'Put-Call Parity',
        description: 'Put-call parity links European call, put, stock, and bond positions under no-arbitrage.',
        usage: 'Use it to check option prices and construct synthetic positions.',
        formula: 'formula: C + Ke^{-rT} = P + S_0e^{-qT}'
      },
      {
        id: 'forward-price',
        name: 'Forward Price',
        description: 'A forward price reflects spot, financing, carry income, and carry costs under no-arbitrage.',
        usage: 'Use it for equity, commodity, FX, and rate-forward intuition.',
        formula: 'formula: F_0 = S_0e^{(r-q)T}'
      },
      {
        id: 'call-payoff',
        name: 'Long Call Payoff',
        description: 'A long call pays off when the underlying finishes above the strike, net of premium for profit analysis.',
        usage: 'Use it for payoff diagrams, upside participation, and option strategy construction.',
        formula: 'formula: \\text{Call Payoff} = \\max(S_T-K,0)'
      },
      {
        id: 'put-payoff',
        name: 'Long Put Payoff',
        description: 'A long put pays off when the underlying finishes below the strike, net of premium for profit analysis.',
        usage: 'Use it for downside protection and payoff diagrams.',
        formula: 'formula: \\text{Put Payoff} = \\max(K-S_T,0)'
      },
      {
        id: 'covered-call',
        name: 'Covered Call',
        description: 'A covered call combines long stock with a short call to earn premium while capping upside.',
        usage: 'Use it to explain income strategies and the tradeoff between premium and foregone upside.',
        formula: 'formula: \\text{Covered Call Payoff} = S_T - \\max(S_T-K,0)'
      },
      {
        id: 'protective-put',
        name: 'Protective Put',
        description: 'A protective put combines long stock with a long put to create a downside floor at the strike, before premiums.',
        usage: 'Use it to explain insurance-like hedging and its cost.',
        formula: 'formula: \\text{Protective Put Payoff} = S_T + \\max(K-S_T,0)'
      },
      {
        id: 'straddle',
        name: 'Long Straddle',
        description: 'A long straddle combines a call and put with the same strike and expiry to benefit from a large move in either direction.',
        usage: 'Use it to discuss volatility views and event-risk strategies.',
        formula: 'formula: \\text{Straddle Payoff} = \\max(S_T-K,0) + \\max(K-S_T,0)'
      },
      {
        id: 'swap-fixed-floating',
        name: 'Interest Rate Swap Cash Flow',
        description: 'A plain-vanilla interest-rate swap exchanges fixed-rate cash flows for floating-rate cash flows on a notional amount.',
        usage: 'Use it to explain borrower hedging, fixed-versus-floating decisions, and rate-risk transfer.',
        formula: 'formula: \\text{Net Swap Payment} = \\text{Notional} \\times (\\text{Fixed Rate} - \\text{Floating Rate}) \\times \\text{Day Fraction}'
      },
      {
        id: 'binomial-option',
        name: 'Binomial Option Pricing',
        description: 'A binomial tree values an option by modeling discrete up and down price movements and discounting risk-neutral expected payoffs.',
        usage: 'Use it for American exercise, early exercise intuition, and situations where Black-Scholes assumptions are insufficient.',
        formula: 'formula: \\text{Option Value} = e^{-r\\Delta t}[pV_u + (1-p)V_d]'
      }
    ]
  },
  {
    section: 'Consulting, Diligence & Model Controls',
    description: 'Formulas and controls used to turn raw data into defensible diligence, transaction, and client outputs.',
    items: [
      {
        id: 'qoe-normalization',
        name: 'Quality of Earnings Normalization',
        description: 'QofE normalization adjusts reported EBITDA for non-recurring, out-of-period, non-operating, non-cash, or owner-specific items to estimate sustainable earnings.',
        usage: 'Build an adjustment bridge with source support, recurrence assessment, cash impact, and the cost required to recreate the earnings.',
        formula: 'formula: \\text{Adjusted EBITDA} = \\text{Reported EBITDA} + \\text{Valid Normalization Adjustments}',
        watchOut: 'A management add-back is not automatically valid because it is labeled one-time.'
      },
      {
        id: 'purchase-price-allocation',
        name: 'Purchase Price Allocation',
        description: 'PPA allocates consideration to identifiable assets, liabilities, acquired intangibles, deferred taxes, and residual goodwill.',
        usage: 'Use it in merger models and post-transaction accounting analysis.',
        formula: 'formula: \\text{Goodwill} = \\text{Consideration} - \\text{Fair Value of Identifiable Net Assets}'
      },
      {
        id: 'net-debt-bridge',
        name: 'Net Debt Bridge',
        description: 'The net-debt bridge reconciles reported debt to transaction net debt by adding debt-like items and removing eligible cash or non-operating assets.',
        usage: 'Use it in enterprise-to-equity bridges, purchase-price mechanisms, and diligence checklists.',
        formula: 'formula: \\text{Net Debt} = \\text{Debt} + \\text{Debt-Like Items} - \\text{Eligible Cash}'
      },
      {
        id: 'nwc-peg',
        name: 'Working-Capital Peg',
        description: 'A working-capital peg represents the normalized operating working capital expected to transfer at close.',
        usage: 'Use seasonality, aging, prepayments, accruals, and one-time adjustments to support the peg.',
        formula: 'formula: \\text{Closing Adjustment} = \\text{Actual Closing NWC} - \\text{Agreed NWC Peg}'
      },
      {
        id: 'synergy-value',
        name: 'Present Value of Synergies',
        description: 'The value of synergies is the present value of incremental after-tax cash flows net of implementation costs.',
        usage: 'Use it in accretion, transaction valuation, and break-even purchase-price analysis.',
        formula: 'formula: \\text{Synergy Value} = \\sum_{t=1}^{n} \\frac{\\text{After-Tax Synergies}_t - \\text{Implementation Costs}_t}{(1+\\text{Discount Rate})^t}'
      },
      {
        id: 'merger-model',
        name: 'Pro Forma Merger Model',
        description: 'A merger model combines buyer and target operating results, financing, purchase accounting, synergies, and share count.',
        usage: 'Use it to calculate pro forma revenue, EBITDA, net income, EPS, leverage, and accretion or dilution.',
        formula: 'formula: \\text{Pro Forma EBITDA} = \\text{Buyer EBITDA} + \\text{Target EBITDA} + \\text{Run-Rate Synergies}'
      },
      {
        id: 'scenario-weighted-value',
        name: 'Probability-Weighted Value',
        description: 'Probability-weighted value combines scenario values using explicit probabilities.',
        usage: 'Use it in restructuring, litigation, M&A, and valuation cases where outcomes are discrete and probabilities are defensible.',
        formula: 'formula: \\text{Expected Value} = \\sum_i \\text{Probability}_i \\times \\text{Scenario Value}_i'
      },
      {
        id: 'sensitivity-range',
        name: 'Sensitivity Range',
        description: 'A sensitivity table shows how a conclusion changes when one or two key assumptions move.',
        usage: 'Use it for WACC and terminal growth, entry price and exit multiple, leverage and interest rate, or margin and growth.',
        formula: 'formula: \\text{Sensitivity Output} = f(\\text{Driver 1}, \\text{Driver 2})'
      },
      {
        id: 'data-reconciliation',
        name: 'Data Reconciliation',
        description: 'A reconciliation proves that a transformed dataset agrees with its source on population, dates, units, and control totals.',
        usage: 'Use row counts, sum checks, entity checks, currency checks, and period checks before relying on imported analysis.',
        formula: 'formula: \\text{Difference} = \\text{Source Control Total} - \\text{Model Control Total}'
      },
      {
        id: 'model-check',
        name: 'Model Integrity Check',
        description: 'A model check tests balance-sheet balance, sources and uses, cash roll-forward, debt roll-forward, and scenario state.',
        usage: 'Show PASS, REVIEW, or FAIL near the output and retain detail checks underneath.',
        formula: 'formula: \\text{PASS if } |\\text{Residual}| < \\text{Tolerance}'
      },
      {
        id: 'audit-trail',
        name: 'Audit Trail',
        description: 'An audit trail records source, date, transformation, assumption, reviewer, and output for material numbers.',
        usage: 'Use it in diligence, consulting, and recurring reporting so another person can reproduce the answer.',
        formula: 'formula: \\text{Reproducible Output} = \\text{Source} + \\text{Transformation} + \\text{Assumption} + \\text{Review Record}'
      },
      {
        id: 'review-comment-closure',
        name: 'Review Comment Closure',
        description: 'Review comment closure links each model comment to an owner, action, source, decision, and resolved status.',
        usage: 'Use it to avoid silent changes and to make senior review efficient across multiple workbook versions.',
        formula: 'formula: \\text{Closed Comment} = \\text{Owner} + \\text{Action} + \\text{Evidence} + \\text{Resolved Status}'
      },
      {
        id: 'client-kpi-pack',
        name: 'Client KPI Pack',
        description: 'A client KPI pack selects a small set of metrics that explain performance, liquidity, risk, and the decision at hand.',
        usage: 'Pair every KPI with definition, period, unit, source, variance, and the action it supports.',
        formula: 'formula: \\text{KPI Insight} = \\text{Metric} + \\text{Period} + \\text{Variance} + \\text{Action}'
      },
      {
        id: 'forecast-variance',
        name: 'Forecast Variance',
        description: 'Forecast variance compares actual results with plan, prior forecast, or prior period and decomposes the difference into drivers.',
        usage: 'Use it in recurring client reporting and management review.',
        formula: 'formula: \\text{Variance} = \\text{Actual} - \\text{Forecast}'
      },
      {
        id: 'weighted-average',
        name: 'Weighted Average',
        description: 'A weighted average gives larger observations more influence according to an explicit weight.',
        usage: 'Use it for blended interest rates, average prices, portfolio returns, customer metrics, and transaction multiples.',
        formula: 'formula: \\text{Weighted Average} = \\frac{\\sum_i w_i x_i}{\\sum_i w_i}'
      },
      {
        id: 'cagr-bridge',
        name: 'Growth and Margin Bridge',
        description: 'A bridge turns a headline change into volume, price, mix, margin, FX, acquisition, and one-time components.',
        usage: 'Use it in board materials, consulting exhibits, and diligence discussions where the conclusion must be defensible.',
        formula: 'formula: \\text{Total Change} = \\text{Volume} + \\text{Price} + \\text{Mix} + \\text{FX} + \\text{Other Drivers}'
      },
      {
        id: 'sources-to-output',
        name: 'Source-to-Output Trace',
        description: 'Source-to-output trace connects an external document or report to the transformed input, model line, and client conclusion.',
        usage: 'Use it for material numbers in diligence, valuation, and recurring reporting.',
        formula: 'formula: \\text{Output} = \\text{Source Data} \\rightarrow \\text{Transformation} \\rightarrow \\text{Model Line}'
      }
    ]
  }
];
