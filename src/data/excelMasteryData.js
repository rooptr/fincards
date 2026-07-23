export const excelMasteryData = [
  {
    section: 'Model Architecture & Standards',
    description: 'Build a model that another analyst can follow, update, and audit without guessing what each cell is doing.',
    items: [
      {
        id: 'model-map',
        name: 'Model Map',
        description: 'A model map is the deliberate sequence from assumptions to schedules to outputs. It prevents the workbook from becoming a collection of disconnected formulas.',
        usage: 'Before writing formulas, identify the source data, assumptions, operating schedules, financing schedules, statements, valuation, and checks. A reviewer should be able to trace the same path.',
        formula: 'formula: \\text{Inputs} \\rightarrow \\text{Schedules} \\rightarrow \\text{Statements} \\rightarrow \\text{Valuation}'
      },
      {
        id: 'inputs-calculations-outputs',
        name: 'Inputs, Calculations, Outputs',
        description: 'Separating assumptions, processing, and presentation makes a model easier to update and reduces hidden hardcodes.',
        usage: 'Keep operating assumptions and transaction assumptions in visible input areas, calculate schedules in logical blocks, and reserve outputs for statements, dashboards, and valuation summaries.',
        watchOut: 'This is a practical architecture pattern, not a universal requirement. The important rule is traceability, not a fixed number of tabs.',
        formula: 'formula: \\text{Assumptions} \\rightarrow \\text{Processing} \\rightarrow \\text{Outputs}'
      },
      {
        id: 'color-coding',
        name: 'Color Coding Convention',
        description: 'Many finance teams use color to distinguish hardcodes, formulas, and links, but the convention belongs to the team or firm.',
        usage: 'A common scheme is blue for hardcoded inputs, black for formulas on the same sheet, and green for links to other worksheets. Document the convention in the workbook.',
        watchOut: 'Do not treat colors as control evidence. A formula check and a visible input label are stronger than color alone.',
        formula: 'formula: \\text{Blue} \\rightarrow \\text{Input} \\quad | \\quad \\text{Black} \\rightarrow \\text{Formula}'
      },
      {
        id: 'fast-standard',
        name: 'FAST Modeling Standard',
        description: 'FAST stands for Flexible, Appropriate, Structured, and Transparent. It is a modeling discipline for consistent time-series logic and reviewability.',
        usage: 'Keep assumptions visible, use consistent formula patterns across periods, separate calculation blocks, and make unusual logic easy to inspect. Do not hide assumptions inside formulas.',
        formula: 'formula: \\text{A1} \\times \\text{Growth Assumption} \\quad \\text{rather than} \\quad \\text{A1} \\times 1.05'
      },
      {
        id: 'time-series-consistency',
        name: 'Time-Series Consistency',
        description: 'A good forecast copies the same economic logic across periods while allowing clearly labeled historical, forecast, and stub-period differences.',
        usage: 'Set a timeline first, label actual and forecast columns, and avoid changing formula logic silently in the middle of a row.',
        watchOut: 'A formula that copies successfully can still be economically wrong. Check the driver and period alignment, not only the absence of Excel errors.'
      },
      {
        id: 'hardcodes-in-formulas',
        name: 'Hardcodes Inside Formulas',
        description: 'A literal number inside a formula can hide an assumption from the reviewer and make scenario changes incomplete.',
        usage: 'Replace `=Revenue*1.05` with `=Revenue*(1+GrowthRate)` when 5% is an assumption that should be visible and changeable.',
        watchOut: 'Constants that are part of the definition of a formula, such as 1 in a growth calculation, are not automatically bad. Flag economic assumptions, not every number.'
      },
      {
        id: 'circular-references',
        name: 'Circular References and Iteration',
        description: 'A circular reference exists when a calculation eventually feeds back into itself, such as interest affecting cash and cash affecting revolver debt.',
        usage: 'First try to remove the circularity with beginning-balance interest, a separate cash sweep, or a simplified convention. If iteration is necessary, document the reason and convergence test.',
        watchOut: 'Do not enable iterative calculation with an arbitrary iteration count and assume the answer is stable. Add a visible on/off switch and a residual check.',
        formula: 'formula: \\text{Interest} \\rightleftharpoons \\text{Debt} \\rightleftharpoons \\text{Cash}'
      },
      {
        id: 'model-control-panel',
        name: 'Control Panel',
        description: 'A compact control area makes key cases, dates, units, and model checks visible in one place.',
        usage: 'Include the selected case, transaction date, currency and units, calculation status, balance-sheet check, and any unresolved error flags near the model summary.'
      },
      {
        id: 'units-and-signs',
        name: 'Units and Sign Conventions',
        description: 'A model must state whether values are in units, thousands, or millions and whether cash inflows, debt, and expenses are positive or negative.',
        usage: 'Put units in headers, use one sign convention throughout, and make cash-flow direction explicit before connecting statements.',
        watchOut: 'A mathematically balanced model can still be wrong if one schedule is in dollars and another is in millions.'
      },
      {
        id: 'source-to-output-trace',
        name: 'Source-to-Output Trace',
        description: 'Associate and consulting work often begins with a source file and ends with a client-facing conclusion. The model should preserve that chain.',
        usage: 'Record the source, extraction date, transformation step, model input, and final output for material numbers. This makes review comments answerable instead of anecdotal.'
      },
      {
        id: 'client-ready-output',
        name: 'Client-Ready Output',
        description: 'A client-ready output is concise, labeled, reconciled, and decision-oriented rather than a screenshot of a raw workbook.',
        usage: 'Lead with the conclusion, show the key driver bridge, label actual versus forecast, state units and dates, and keep detailed support one click or one tab away.'
      },
      {
        id: 'review-notes-and-versioning',
        name: 'Review Notes and Versioning',
        description: 'A financial model is usually reviewed through multiple versions. Clear change notes protect the analysis from silent assumption drift.',
        usage: 'Record what changed, why it changed, who reviewed it, and which source or instruction triggered the change. Keep a clean prior version before material edits.'
      }
    ]
  },
  {
    section: 'Three-Statement & Operating Model',
    description: 'Turn business drivers into an integrated income statement, balance sheet, and cash flow statement.',
    items: [
      {
        id: 'three-statement-linkage',
        name: 'Three-Statement Linkage',
        description: 'The income statement explains earnings, the balance sheet stores the resulting financial position, and the cash flow statement reconciles profit to cash movement.',
        usage: 'Net income flows into retained earnings and operating cash flow. Capex changes PP&E and investing cash flow. Debt changes the balance sheet and financing cash flow. Ending cash closes the balance sheet.',
        formula: 'formula: \\text{Ending Cash} = \\text{Beginning Cash} + \\text{CFO} + \\text{CFI} + \\text{CFF}'
      },
      {
        id: 'revenue-drivers',
        name: 'Revenue Driver Build',
        description: 'Driver-based revenue forecasting models volume, price, customers, utilization, or market share instead of applying an unexplained growth rate.',
        usage: 'Forecast units and price separately when possible, then bridge the result to historical revenue and management guidance.',
        formula: 'formula: \\text{Revenue} = \\text{Volume} \\times \\text{Price per Unit}'
      },
      {
        id: 'expense-drivers',
        name: 'Operating Expense Drivers',
        description: 'Costs can be modeled as a percentage of revenue, per employee, per unit, or as fixed and variable components.',
        usage: 'Use the driver that matches the economics. A headcount-driven payroll forecast is more explainable than a single margin assumption when staffing changes matter.',
        formula: 'formula: \\text{Variable Cost} = \\text{Volume} \\times \\text{Cost per Unit}'
      },
      {
        id: 'cash-flow-categories',
        name: 'CFO, CFI, and CFF',
        description: 'Operating cash flow reflects the business engine, investing cash flow includes long-term asset investment, and financing cash flow captures capital providers.',
        usage: 'Classify each cash movement based on its economic purpose and the applicable accounting framework. Do not assume the same transaction has the same classification for every company or standard.',
        formula: 'formula: \\text{Net Change in Cash} = \\text{CFO} + \\text{CFI} + \\text{CFF}'
      },
      {
        id: 'capex-depreciation-link',
        name: 'Capex and Depreciation Link',
        description: 'Capital expenditure increases fixed assets and uses investing cash. Depreciation reduces book value and earnings without being a current-period cash outflow.',
        usage: 'Build a fixed-asset roll-forward so depreciation follows the asset base and capex assumptions rather than being an isolated margin plug.',
        formula: 'formula: \\text{Ending PP\\&E} = \\text{Beginning PP\\&E} + \\text{Capex} - \\text{Depreciation}'
      },
      {
        id: 'retained-earnings-link',
        name: 'Retained Earnings Link',
        description: 'Retained earnings accumulate profit after distributions and connect the income statement to equity on the balance sheet.',
        usage: 'Link net income and dividends to retained earnings. Keep share issuances, repurchases, and other equity movements in a separate equity schedule when they matter.',
        formula: 'formula: \\text{Ending RE} = \\text{Beginning RE} + \\text{Net Income} - \\text{Dividends}'
      },
      {
        id: 'deferred-tax-link',
        name: 'Deferred Tax Linkage',
        description: 'Temporary differences between book and tax treatment can create deferred tax assets or liabilities that affect the balance sheet and tax expense.',
        usage: 'Use a tax schedule when book depreciation, interest limitation, loss carryforwards, or purchase accounting create material temporary differences.',
        watchOut: 'Do not model deferred tax as a generic percentage plug when the underlying temporary difference is known.'
      },
      {
        id: 'forecast-bridge',
        name: 'Historical-to-Forecast Bridge',
        description: 'A bridge explains how reported history becomes the forecast by separating volume, price, margin, mix, one-time items, and policy changes.',
        usage: 'Use the bridge in review meetings and valuation work so forecast assumptions can be challenged one driver at a time.'
      },
      {
        id: 'common-size-analysis',
        name: 'Common-Size Analysis',
        description: 'Common-size statements express income-statement lines as a percentage of revenue and balance-sheet lines as a percentage of total assets or another relevant base.',
        usage: 'Use common-size analysis to compare companies of different scale, identify margin or mix changes, and prepare a clean historical review before forecasting.',
        formula: 'formula: \\text{Common-Size Expense} = \\frac{\\text{Expense}}{\\text{Revenue}}'
      },
      {
        id: 'ratio-bridge',
        name: 'Ratio and KPI Bridge',
        description: 'A KPI bridge explains the movement in leverage, coverage, margins, liquidity, or returns instead of showing only the ending ratio.',
        usage: 'Break the change into EBITDA, debt, cash, working capital, interest, volume, price, and one-time effects so an associate can defend the conclusion in a review meeting.'
      },
      {
        id: 'balance-sheet-check',
        name: 'Balance Sheet Check',
        description: 'A balance-sheet check tests whether assets equal liabilities plus equity and should expose a residual rather than hide it.',
        usage: 'Use an unrounded difference and a separately displayed tolerance flag. Investigate the residual before publishing the model.',
        formula: 'formula: = \\text{ABS}(\\text{Assets} - \\text{Liabilities} - \\text{Equity}) < \\text{Tolerance}'
      }
    ]
  },
  {
    section: 'Working Capital, Debt & Cash',
    description: 'Model the cash consequences of operating cycles, borrowing capacity, interest, amortization, and liquidity stress.',
    items: [
      {
        id: 'working-capital-cycle',
        name: 'Working Capital Cycle',
        description: 'The cash conversion cycle measures how long cash is tied up between paying suppliers and collecting customers.',
        usage: 'Use the cycle to connect growth, inventory policy, credit terms, and liquidity needs in an operating model.',
        formula: 'formula: \\text{CCC} = \\text{DIO} + \\text{DSO} - \\text{DPO}'
      },
      {
        id: 'working-capital-days',
        name: 'Working Capital Days',
        description: 'Receivable, inventory, and payable days convert operating assumptions into balance-sheet balances.',
        usage: 'Forecast receivables from revenue and DSO, inventory from cost of sales and DIO, and payables from cost of sales or purchases and DPO.',
        formula: 'formula: \\text{Receivables} = \\text{Revenue} \\times \\frac{\\text{DSO}}{\\text{Days in Period}}'
      },
      {
        id: 'nwc-cash-flow',
        name: 'Change in NWC and Cash Flow',
        description: 'An increase in operating net working capital usually consumes cash, while a release usually provides cash, subject to classification and context.',
        usage: 'Link the change in operating NWC to CFO and explain whether the movement reflects growth, seasonality, collections, inventory build, or supplier terms.',
        formula: 'formula: \\text{Cash Flow Impact} = -\\Delta \\text{Operating NWC}'
      },
      {
        id: 'debt-schedule',
        name: 'Debt Schedule',
        description: 'A debt schedule tracks beginning balance, mandatory amortization, optional paydown, draws, PIK interest, cash interest, and ending balance.',
        usage: 'Build each tranche separately when rates, maturity, security, amortization, or cash-flow priority differ.',
        formula: 'formula: \\text{Ending Debt} = \\text{Beginning Debt} + \\text{Draws} + \\text{PIK} - \\text{Repayments}'
      },
      {
        id: 'pmt-ipmt-ppmt',
        name: 'PMT, IPMT, and PPMT',
        description: 'PMT calculates a level payment, while IPMT and PPMT split a payment into interest and principal for a periodic amortization schedule.',
        usage: 'Use matching rate and period units, such as an annual rate divided by 12 for monthly periods. Excel often returns cash outflows as negative values.',
        formula: 'formula: = \\text{PMT}(\\text{rate}, \\text{nper}, \\text{pv}, [\\text{fv}], [\\text{type}])'
      },
      {
        id: 'revolver-availability',
        name: 'Revolver Availability',
        description: 'A revolver draw is constrained by minimum cash needs, commitment size, borrowing-base availability, and existing usage.',
        usage: 'Model the smallest required draw, then cap it at remaining availability. The simplified cash shortfall formula is not a full borrowing-base calculation.',
        formula: 'formula: \\text{Draw} = \\min(\\text{Cash Shortfall}, \\text{Remaining Availability})'
      },
      {
        id: 'cash-sweep',
        name: 'Cash Sweep',
        description: 'A cash sweep uses eligible excess cash to repay debt after minimum cash, mandatory payments, and permitted distributions.',
        usage: 'Define the cash waterfall first, then cap optional repayment at outstanding debt and apply the correct tranche priority.',
        formula: 'formula: \\text{Optional Paydown} = \\min(\\text{Eligible Excess Cash}, \\text{Beginning Debt})'
      },
      {
        id: 'interest-on-average-debt',
        name: 'Interest on Average Debt',
        description: 'Interest may be based on beginning debt, average debt, or a contractual balance definition.',
        usage: 'Use the agreement or modeling convention explicitly. Average-balance interest can create circularity when cash flow drives optional repayment.',
        formula: 'formula: \\text{Interest} = \\text{Average Debt} \\times \\text{Interest Rate}'
      },
      {
        id: 'minimum-cash',
        name: 'Minimum Cash and Liquidity',
        description: 'Minimum cash is a liquidity policy or covenant assumption, not simply the lowest number that makes a model balance.',
        usage: 'Set the minimum cash requirement, test seasonal troughs, and show when the revolver is drawn or liquidity is breached.'
      },
      {
        id: 'debt-covenant-modeling',
        name: 'Debt Covenant Modeling',
        description: 'Covenant calculations use contract-specific definitions of EBITDA, debt, cash, net debt, and permitted adjustments.',
        usage: 'Create a separate covenant schedule with definitions, add-backs, baskets, testing dates, and headroom rather than reusing an unqualified leverage ratio.',
        watchOut: 'The same label, such as leverage or EBITDA, can have a different contractual definition from the financial statement measure.'
      },
      {
        id: 'dscr',
        name: 'Debt Service Coverage Ratio',
        description: 'DSCR compares cash earnings available for debt service with interest and scheduled principal amortization.',
        usage: 'Use it in credit, private-credit, project-finance, and lender models to test repayment capacity. Confirm whether the agreement uses EBITDA, CFADS, or another defined numerator.',
        watchOut: 'There is no single universal DSCR definition. Contractual add-backs, taxes, maintenance capex, and reserve requirements can change the numerator.',
        formula: 'formula: \\text{DSCR} = \\frac{\\text{EBITDA}}{\\text{Interest Expense} + \\text{Principal Amortization}}'
      },
      {
        id: 'nwc-peg',
        name: 'Net Working Capital Peg',
        description: 'In transaction work, a working-capital peg represents the normalized level of operating working capital expected to transfer with the business.',
        usage: 'Analyze seasonality, unusual prepayments, aged receivables, inventory quality, accruals, and one-time items before setting the peg and purchase-price adjustment.',
        watchOut: 'The peg is a negotiated and evidence-based transaction concept, not simply the latest reported NWC balance.'
      }
    ]
  },
  {
    section: 'Lookup & Reference',
    description: 'Pull the right assumption, account, or historical value without hardcoding the answer into the model.',
    items: [
      {
        id: 'xlookup',
        name: 'XLOOKUP',
        description: 'XLOOKUP searches an array and returns the corresponding value from another array. It defaults to exact match and can accept an explicit not-found result.',
        usage: 'Use it for modern one-dimensional lookups when the workbook version supports it. Set `if_not_found` deliberately instead of hiding every missing key.',
        formula: 'formula: = \\text{XLOOKUP}(\\text{lookup\\_value}, \\text{lookup\\_array}, \\text{return\\_array}, [\\text{if\\_not\\_found}])'
      },
      {
        id: 'index-match',
        name: 'INDEX and MATCH',
        description: 'INDEX returns a value from a position and MATCH finds that position. Together they support flexible lookups and can look left.',
        usage: 'Use exact-match MATCH for account mapping, two-way tables, and models that need to work in older Excel versions.',
        formula: 'formula: = \\text{INDEX}(\\text{return\\_range}, \\text{MATCH}(\\text{key}, \\text{lookup\\_range}, 0))'
      },
      {
        id: 'xmatch',
        name: 'XMATCH',
        description: 'XMATCH returns the relative position of an item and provides match modes and search modes beyond classic MATCH.',
        usage: 'Use XMATCH with INDEX, CHOOSECOLS, or dynamic arrays when you need a position rather than the returned value itself.',
        formula: 'formula: = \\text{XMATCH}(\\text{lookup\\_value}, \\text{lookup\\_array}, [\\text{match\\_mode}], [\\text{search\\_mode}])'
      },
      {
        id: 'vlookup-hlookup',
        name: 'VLOOKUP and HLOOKUP',
        description: 'VLOOKUP searches the first column of a table and HLOOKUP searches the first row. They remain common in legacy workbooks.',
        usage: 'Audit the fourth argument carefully. Use `FALSE` or `0` for exact match unless approximate match is intentional and the lookup range is sorted.',
        formula: 'formula: = \\text{VLOOKUP}(\\text{key}, \\text{table}, \\text{column}, \\text{FALSE})'
      },
      {
        id: 'sumifs-mapping',
        name: 'SUMIFS for Account Mapping',
        description: 'SUMIFS aggregates values that meet one or more criteria and is a practical bridge from a trial balance or transaction dump to model lines.',
        usage: 'Map account, entity, period, and scenario fields into statement lines while keeping the mapping table visible.',
        formula: 'formula: = \\text{SUMIFS}(\\text{sum\\_range}, \\text{criteria\\_range}, \\text{criteria})'
      },
      {
        id: 'offset',
        name: 'OFFSET',
        description: 'OFFSET returns a reference displaced from a starting cell and can create flexible ranges.',
        usage: 'Use it only when a reference-based design is genuinely needed. Prefer non-volatile INDEX or dynamic-array approaches in large models.',
        watchOut: 'OFFSET is volatile and can slow recalculation because it recalculates whenever Excel recalculates.',
        formula: 'formula: = \\text{OFFSET}(\\text{reference}, \\text{rows}, \\text{cols}, [\\text{height}], [\\text{width}])'
      },
      {
        id: 'indirect',
        name: 'INDIRECT',
        description: 'INDIRECT converts text into a cell reference, which can make the target sheet or address dynamic.',
        usage: 'Use sparingly for controlled templates. Prefer direct references, XLOOKUP, or INDEX when the workbook can be designed without text-built references.',
        watchOut: 'INDIRECT is volatile and generally cannot resolve references to closed external workbooks.',
        formula: 'formula: = \\text{INDIRECT}(\\text{reference\\_text})'
      },
      {
        id: 'choose-index-case-switch',
        name: 'CHOOSE and INDEX Case Switches',
        description: 'CHOOSE or INDEX can select a value from a set of base, upside, and downside assumptions using a case number.',
        usage: 'Keep the case selector visible, validate its allowed values, and use the same selector consistently across the model.',
        formula: 'formula: = \\text{CHOOSE}(\\text{Case}, \\text{Base}, \\text{Upside}, \\text{Downside})'
      },
      {
        id: 'address',
        name: 'ADDRESS',
        description: 'ADDRESS returns a cell address as text from row and column numbers.',
        usage: 'Use it with INDIRECT only when the text-reference design is justified. It is more useful for controlled templates than ordinary financial models.',
        formula: 'formula: = \\text{ADDRESS}(\\text{row\\_num}, \\text{column\\_num})'
      }
    ]
  },
  {
    section: 'Logic, Errors & Controls',
    description: 'Make model logic explicit and make mistakes visible instead of masking them with convenient zeros.',
    items: [
      {
        id: 'if-ifs',
        name: 'IF and IFS',
        description: 'IF returns one result when a condition is true and another when it is false. IFS evaluates multiple conditions in sequence.',
        usage: 'Use them for forecast period flags, covenant tests, case logic, and conditional schedules. Keep nested logic readable by breaking complex rules into helper rows.',
        formula: 'formula: = \\text{IF}(\\text{test}, \\text{value\\_if\\_true}, \\text{value\\_if\\_false})'
      },
      {
        id: 'and-or',
        name: 'AND, OR, and NOT',
        description: 'These functions combine conditions into explicit logical rules.',
        usage: 'Use them to test multiple covenant conditions, valid date ranges, or whether a row should be active in a given period.',
        formula: 'formula: = \\text{AND}(\\text{condition1}, \\text{condition2})'
      },
      {
        id: 'iferror',
        name: 'IFERROR and IFNA',
        description: 'IFERROR catches any Excel error, while IFNA targets the not-found error. Both should communicate why a result is unavailable.',
        usage: 'Use a blank, `NA()`, or a labeled flag only when that output behavior is intentional. Keep a separate control that counts suppressed errors.',
        watchOut: 'Using `IFERROR(...,0)` everywhere can make a zero look like a real result and hide a broken reference or missing data.',
        formula: 'formula: = \\text{IFNA}(\\text{XLOOKUP}(\\text{key}, \\text{keys}, \\text{values}), \\text{"Missing"})'
      },
      {
        id: 'isnumber-iserror',
        name: 'ISNUMBER and ISERROR',
        description: 'ISNUMBER tests whether a value is numeric, while ISERROR tests whether a calculation returns an error.',
        usage: 'Use them in input validation, import checks, and visible error flags before downstream formulas consume a data dump.',
        formula: 'formula: = \\text{IF}(\\text{ISNUMBER}(\\text{value}), \\text{"OK"}, \\text{"Review"})'
      },
      {
        id: 'blank-zero-na',
        name: 'Blank, Zero, and NM',
        description: 'Blank, zero, and not meaningful are different business states and should not be substituted casually.',
        usage: 'Use zero for a confirmed zero, blank for not applicable presentation where appropriate, and `NM` or `NA()` when a ratio cannot be meaningfully calculated.'
      },
      {
        id: 'rounding-tolerance',
        name: 'Rounding and Tolerances',
        description: 'Rounding is a presentation decision; it should not replace the underlying precision of the calculation or conceal a real model error.',
        usage: 'Keep calculation rows unrounded when possible, round displayed outputs, and use an absolute residual with a documented tolerance for checks.',
        formula: 'formula: = \\text{ABS}(\\text{Check Residual}) < \\text{Tolerance}'
      },
      {
        id: 'data-validation',
        name: 'Data Validation',
        description: 'Data Validation constrains inputs such as case selectors, dates, percentages, or allowed categories.',
        usage: 'Use dropdowns for cases and lists, limits for rates and dates, and an adjacent note describing the permitted input range.'
      },
      {
        id: 'formula-consistency-check',
        name: 'Formula Consistency Check',
        description: 'A row can contain valid formulas that do not follow the intended pattern across periods.',
        usage: 'Compare formulas across adjacent periods, scan for hardcodes in forecast columns, and review unusual deviations rather than relying only on error values.'
      },
      {
        id: 'error-flag-row',
        name: 'Error Flag Row',
        description: 'A visible error flag consolidates checks for balance-sheet balance, missing inputs, covenant breaches, negative cash, and circularity status.',
        usage: 'Use a simple PASS, REVIEW, or FAIL output near the model summary and link it to the detail checks.',
        formula: 'formula: = \\text{IF}(\\text{SUM}(\\text{Error Flags})=0, \\text{"PASS"}, \\text{"REVIEW"})'
      }
    ]
  },
  {
    section: 'Text, Data Cleaning & Dynamic Arrays',
    description: 'Turn messy exports into reliable analysis tables, then use modern functions to keep outputs dynamic.',
    items: [
      {
        id: 'trim-clean-substitute',
        name: 'TRIM, CLEAN, and SUBSTITUTE',
        description: 'TRIM removes repeated spaces, CLEAN removes many non-printing characters, and SUBSTITUTE replaces specific text.',
        usage: 'Clean imported account names and identifiers before matching them. For stubborn web data, inspect non-breaking spaces and use SUBSTITUTE with the relevant character.',
        formula: 'formula: = \\text{TRIM}(\\text{CLEAN}(\\text{SUBSTITUTE}(\\text{A1}, \\text{old}, \\text{new})))'
      },
      {
        id: 'value-numervalue',
        name: 'VALUE and NUMBERVALUE',
        description: 'These functions convert text that represents a number into a numeric value, with NUMBERVALUE allowing explicit decimal and group separators.',
        usage: 'Use them when imported amounts are stored as text, especially when the source and local regional formats differ.',
        formula: 'formula: = \\text{NUMBERVALUE}(\\text{TextAmount}, \\text{"."}, \\text{","})'
      },
      {
        id: 'text-formatting',
        name: 'TEXT',
        description: 'TEXT formats a number or date as text for labels and presentation.',
        usage: 'Use it to build readable labels such as `FY2026` or `Revenue: $125.0m`, but keep the underlying numeric cell numeric for calculations.',
        formula: 'formula: = \\text{"Revenue: "} \\& \\text{TEXT}(\\text{Revenue}, \\text{"\\$0.0m"})'
      },
      {
        id: 'left-right-mid',
        name: 'LEFT, RIGHT, and MID',
        description: 'These functions extract characters from the left, right, or middle of a string.',
        usage: 'Use them to parse account codes, entity identifiers, product codes, or period labels after confirming the source pattern.',
        formula: 'formula: = \\text{MID}(\\text{text}, \\text{start\\_num}, \\text{num\\_chars})'
      },
      {
        id: 'find-search',
        name: 'FIND and SEARCH',
        description: 'FIND is case-sensitive and SEARCH is case-insensitive. Both return the position of one text string inside another.',
        usage: 'Combine them with LEFT, MID, or IFERROR when parsing variable-length labels.',
        formula: 'formula: = \\text{SEARCH}(\\text{find\\_text}, \\text{within\\_text})'
      },
      {
        id: 'textsplit',
        name: 'TEXTSPLIT',
        description: 'TEXTSPLIT separates text into rows or columns using one or more delimiters.',
        usage: 'Use it for comma-separated product lists, account hierarchies, or source fields that should become separate columns in Microsoft 365 or supported Excel versions.',
        formula: 'formula: = \\text{TEXTSPLIT}(\\text{text}, \\text{col\\_delimiter}, [\\text{row\\_delimiter}])'
      },
      {
        id: 'unique-filter-sort',
        name: 'UNIQUE, FILTER, and SORT',
        description: 'These dynamic-array functions create live lists from source data without copying and pasting intermediate results.',
        usage: 'Build distinct entity lists, transaction extracts, and ranked views that update when the source range changes.',
        formula: 'formula: = \\text{SORT}(\\text{UNIQUE}(\\text{FILTER}(\\text{Data}, \\text{Data[Status]}=\\text{"Open"})))'
      },
      {
        id: 'take-drop-choosecols',
        name: 'TAKE, DROP, and CHOOSECOLS',
        description: 'These functions reshape dynamic arrays by selecting rows or columns without modifying the source table.',
        usage: 'Use them to create compact review tables, select model columns, and keep reporting views separate from raw data.',
        formula: 'formula: = \\text{CHOOSECOLS}(\\text{Data}, 1, 3, 5)'
      },
      {
        id: 'vstack-hstack',
        name: 'VSTACK and HSTACK',
        description: 'VSTACK appends arrays vertically and HSTACK combines arrays horizontally.',
        usage: 'Use them to combine monthly or entity extracts into a single review table when the source layouts are consistent.',
        formula: 'formula: = \\text{VSTACK}(\\text{NorthData}, \\text{SouthData})'
      },
      {
        id: 'dynamic-array-spill',
        name: 'Spill Behavior and Spill Errors',
        description: 'A dynamic-array formula can return multiple cells. Excel spills the result into adjacent cells unless something blocks the spill range.',
        usage: 'Leave spill areas clear, use the `#` spill operator when referencing the full output, and handle empty results deliberately.',
        watchOut: 'A `#SPILL!` error is often a layout problem, not a formula problem. Check merged cells, existing values, and table boundaries.'
      },
      {
        id: 'let',
        name: 'LET',
        description: 'LET assigns names to intermediate calculations inside a formula, improving readability and avoiding repeated work.',
        usage: 'Use it for formulas with repeated expressions, such as a DCF that references the same discount factor or a data-cleaning pipeline.',
        formula: 'formula: = \\text{LET}(\\text{name}, \\text{value}, \\text{calculation})'
      },
      {
        id: 'power-query-pivottables',
        name: 'Power Query and PivotTables',
        description: 'Power Query is suited to repeatable import and transformation steps. PivotTables summarize a prepared dataset for analysis and reporting.',
        usage: 'Use Power Query to document repeatable cleaning and combining of source files, then use a PivotTable for controlled aggregation and review.',
        watchOut: 'Neither tool replaces source-to-output controls. Preserve refresh dates, source names, row counts, and reconciliation checks.'
      },
      {
        id: 'source-data-reconciliation',
        name: 'Source Data Reconciliation',
        description: 'A reconciliation proves that imported data agrees with the source report before it is transformed into analysis or a client deliverable.',
        usage: 'Compare row counts, control totals, dates, currencies, entity populations, and key aggregates. Investigate differences before changing the source data or adding a plug.'
      }
    ]
  },
  {
    section: 'Dates & Schedule Mechanics',
    description: 'Make every forecast period, maturity date, settlement date, and discount period explicit.',
    items: [
      {
        id: 'date',
        name: 'DATE',
        description: 'DATE constructs a valid date from year, month, and day components.',
        usage: 'Use it for transaction dates, fiscal year ends, and assumptions that should not depend on locale-specific text parsing.',
        formula: 'formula: = \\text{DATE}(\\text{year}, \\text{month}, \\text{day})'
      },
      {
        id: 'eomonth-edate',
        name: 'EOMONTH and EDATE',
        description: 'EOMONTH returns a month-end date. EDATE shifts a date by whole months while retaining the day where possible.',
        usage: 'Use EOMONTH for monthly model headers and EDATE for maturity, notice, or contract dates.',
        formula: 'formula: = \\text{EOMONTH}(\\text{start\\_date}, \\text{months})'
      },
      {
        id: 'yearfrac',
        name: 'YEARFRAC and Day-Count Basis',
        description: 'YEARFRAC estimates the fraction of a year between two dates using a selected day-count basis.',
        usage: 'Match the basis to the instrument, agreement, or valuation convention. Use the same basis consistently in discounting and accrued-interest calculations.',
        watchOut: 'There is no single universally correct basis. 30/360, Actual/Actual, Actual/360, and Actual/365 can produce different results.',
        formula: 'formula: = \\text{YEARFRAC}(\\text{start\\_date}, \\text{end\\_date}, \\text{basis})'
      },
      {
        id: 'networkdays-workday',
        name: 'NETWORKDAYS and WORKDAY',
        description: 'NETWORKDAYS counts working days and WORKDAY returns a date after a number of working days, with optional holidays.',
        usage: 'Use them for operational deadlines, settlement dates, staffing plans, and business-day schedules.',
        formula: 'formula: = \\text{NETWORKDAYS}(\\text{start\\_date}, \\text{end\\_date}, \\text{holidays})'
      },
      {
        id: 'timeline-headers',
        name: 'Timeline Headers',
        description: 'A schedule needs a consistent period-end row, period number, fiscal year, and historical or forecast flag.',
        usage: 'Build the timeline once and reference it everywhere. Do not type period labels separately into each schedule.',
        formula: 'formula: = \\text{EOMONTH}(\\text{Prior Period End}, 1)'
      },
      {
        id: 'stub-periods',
        name: 'Stub Periods',
        description: 'A stub period is shorter or longer than the normal reporting period because the transaction or forecast begins between period ends.',
        usage: 'Use actual dates and day-count fractions for the stub, then switch to the regular periodic schedule after the first full period.',
        watchOut: 'Do not apply a full-year growth or discount factor to a partial period without adjusting the period length.'
      },
      {
        id: 'period-flags',
        name: 'Actual, Forecast, and LTM Flags',
        description: 'Period flags tell the model whether to pull reported data, calculate a forecast, or combine the last twelve months.',
        usage: 'Use a visible flag in headers and reference it in formulas so the historical-to-forecast transition is easy to audit.',
        formula: 'formula: = \\text{IF}(\\text{Period End} \\leq \\text{Last Actual Date}, \\text{"A"}, \\text{"E"})'
      },
      {
        id: 'discount-periods',
        name: 'Discount Periods',
        description: 'DCF discounting depends on when cash flows occur, not only on the labels attached to the columns.',
        usage: 'Use a period fraction from the valuation date for mid-year, stub, or irregular cash flows instead of assuming every column is exactly one year away.',
        formula: 'formula: = (1+\\text{WACC})^{-\\text{Discount Period}}'
      }
    ]
  },
  {
    section: 'Accounting & Fixed Assets',
    description: 'Use accounting schedules to explain how operational decisions affect assets, earnings, taxes, and equity.',
    items: [
      {
        id: 'sln',
        name: 'SLN Straight-Line Depreciation',
        description: 'SLN calculates equal depreciation per period over an asset life after considering salvage value.',
        usage: 'Use it for a simple book-depreciation schedule when straight-line treatment matches the accounting policy.',
        formula: 'formula: = \\text{SLN}(\\text{cost}, \\text{salvage}, \\text{life})'
      },
      {
        id: 'db-ddb-vdb',
        name: 'DB, DDB, and VDB',
        description: 'DB and DDB use declining-balance methods. VDB can calculate declining-balance depreciation and switch to straight line when specified.',
        usage: 'Use the method that matches the stated book or tax policy and the jurisdictional rules being modeled.',
        watchOut: 'Excel DDB is a depreciation method, not a generic tax model. Tax depreciation may follow a prescribed regime such as MACRS or local statutory rules.',
        formula: 'formula: = \\text{DDB}(\\text{cost}, \\text{salvage}, \\text{life}, \\text{period})'
      },
      {
        id: 'syd',
        name: 'SYD Sum-of-Years Digits',
        description: 'SYD calculates an accelerated depreciation expense that is higher in earlier periods.',
        usage: 'Use it only when the accounting policy or case assumption calls for this method, and show the effect on book value and taxes separately.',
        formula: 'formula: = \\text{SYD}(\\text{cost}, \\text{salvage}, \\text{life}, \\text{period})'
      },
      {
        id: 'fixed-asset-roll-forward',
        name: 'Fixed-Asset Roll-Forward',
        description: 'A roll-forward reconciles beginning gross assets, additions, disposals, depreciation, and ending net PP&E.',
        usage: 'Use separate rows for gross PP&E and accumulated depreciation when disposals or multiple asset classes matter.',
        formula: 'formula: \\text{Ending Net PP\\&E} = \\text{Beginning Net PP\\&E} + \\text{Capex} - \\text{Depreciation} - \\text{Disposals}'
      },
      {
        id: 'accruals-prepayments',
        name: 'Accruals and Prepayments',
        description: 'Accruals recognize expense or revenue before cash settlement. Prepayments recognize cash before the related expense or revenue.',
        usage: 'Model the balance-sheet movement and the income-statement timing separately from cash payment dates.',
        watchOut: 'Cash timing and profit timing are different dimensions. Do not force every expense to equal the same-period cash outflow.'
      },
      {
        id: 'retained-earnings-roll-forward',
        name: 'Equity Roll-Forward',
        description: 'An equity roll-forward explains retained earnings, share capital, repurchases, dividends, and other movements in shareholders equity.',
        usage: 'Use it to connect financing assumptions to the balance sheet and to avoid plugging equity just to balance the model.',
        formula: 'formula: \\text{Ending Equity} = \\text{Beginning Equity} + \\text{Net Income} + \\text{Issuance} - \\text{Repurchase} - \\text{Dividends}'
      },
      {
        id: 'deferred-tax-schedule',
        name: 'Deferred Tax Schedule',
        description: 'A deferred-tax schedule tracks temporary differences and reversals between book carrying values and tax bases.',
        usage: 'Use it when depreciation, purchase accounting, losses, or interest limitations are material to the forecast.',
        formula: 'formula: \\text{Deferred Tax Balance} = \\text{Temporary Difference} \\times \\text{Tax Rate}'
      },
      {
        id: 'impairment-goodwill',
        name: 'Impairment and Goodwill',
        description: 'Impairment testing compares a carrying amount with an applicable recoverable amount or fair-value measure under the relevant framework.',
        usage: 'Use explicit triggers, carrying values, testing dates, and sensitivity disclosure rather than burying impairment in an EBITDA margin assumption.'
      },
      {
        id: 'book-tax-separation',
        name: 'Book Versus Tax Separation',
        description: 'Book accounting, management reporting, and tax depreciation can use different rules and useful lives.',
        usage: 'Create separate book and tax schedules when the distinction affects cash taxes, deferred tax, or transaction analysis.'
      },
      {
        id: 'qoe-normalization',
        name: 'Quality of Earnings Normalization',
        description: 'A QofE review adjusts historical EBITDA for non-recurring, non-operating, out-of-period, non-cash, or owner-specific items to explain sustainable earnings.',
        usage: 'Build an adjustment bridge with source support, accounting treatment, recurrence assessment, and whether the adjustment affects cash or only presentation.',
        watchOut: 'An EBITDA add-back is not automatically valid because management labels an item one-time. Require evidence and consider the cost required to recreate the earnings.'
      },
      {
        id: 'purchase-price-allocation',
        name: 'Purchase Price Allocation',
        description: 'Purchase accounting allocates consideration to identifiable assets, liabilities, and acquired intangible assets, with residual goodwill subject to the applicable framework.',
        usage: 'Keep the transaction consideration, fair values, deferred tax effects, goodwill, amortization, and impairment assumptions in a separate schedule for an M&A model.',
        formula: 'formula: \\text{Goodwill} = \\text{Consideration} - \\text{Fair Value of Net Identifiable Assets}'
      }
    ]
  },
  {
    section: 'WACC, DCF & Valuation',
    description: 'Translate forecast cash flows and risk assumptions into enterprise value, equity value, and return metrics.',
    items: [
      {
        id: 'pv-fv-rate',
        name: 'PV, FV, and RATE',
        description: 'PV and FV solve time-value-of-money questions. RATE solves the periodic rate implied by a set of cash flows or an annuity.',
        usage: 'Match payment frequency, rate frequency, timing type, and cash-flow signs before interpreting the result as a yield or return.',
        formula: 'formula: = \\text{PV}(\\text{rate}, \\text{nper}, \\text{pmt}, [\\text{fv}], [\\text{type}])'
      },
      {
        id: 'npv-xnpv',
        name: 'NPV and XNPV',
        description: 'NPV discounts equally spaced future cash flows. XNPV discounts cash flows using their actual dates and a 365-day convention in Excel.',
        usage: 'Use NPV for truly periodic cash flows and XNPV for irregular dates. With NPV, add a period-zero investment outside the function.',
        watchOut: 'Do not choose XNPV merely because it sounds more advanced. The dates, discount-rate convention, and cash-flow sign pattern must match the analysis.',
        formula: 'formula: = \\text{Initial Cash Flow} + \\text{NPV}(\\text{rate}, \\text{Future Cash Flows})'
      },
      {
        id: 'irr-xirr',
        name: 'IRR and XIRR',
        description: 'IRR solves the periodic rate that makes NPV zero. XIRR solves a date-based return for cash flows that are not equally spaced.',
        usage: 'Use XIRR for actual investment dates and IRR for evenly spaced periods. Confirm at least one negative and one positive cash flow.',
        watchOut: 'Non-conventional cash-flow patterns can have multiple IRRs or no economically useful solution. Use NPV and explain the cash-flow pattern.',
        formula: 'formula: = \\text{XIRR}(\\text{values}, \\text{dates}, [\\text{guess}])'
      },
      {
        id: 'mirr',
        name: 'MIRR',
        description: 'MIRR separates the financing rate for negative cash flows from the reinvestment rate for positive cash flows.',
        usage: 'Use it when a single IRR would rely on an unrealistic reinvestment assumption and the two rates can be justified.',
        formula: 'formula: = \\text{MIRR}(\\text{values}, \\text{finance\\_rate}, \\text{reinvest\\_rate})'
      },
      {
        id: 'fcff-fcfe',
        name: 'FCFF and FCFE',
        description: 'FCFF is cash flow available to all capital providers. FCFE is cash flow remaining for equity after debt flows.',
        usage: 'Discount FCFF at WACC to estimate enterprise value and FCFE at the cost of equity to estimate equity value. Keep the cash-flow definition consistent with the discount rate.',
        formula: 'formula: \\text{FCFF} = \\text{EBIT}(1-T) + \\text{D\\&A} - \\text{Capex} - \\Delta \\text{NWC}'
      },
      {
        id: 'wacc',
        name: 'WACC',
        description: 'WACC is the blended required return for a company’s debt and equity capital, weighted by the intended capital structure.',
        usage: 'Use a market-value capital structure, a defensible pre-tax cost of debt, and a tax rate consistent with the cash-flow definition and jurisdiction.',
        watchOut: 'WACC is not a plug for making a valuation reach a desired price. It reflects risk, financing, and tax assumptions that should be reviewable.',
        formula: 'formula: \\text{WACC} = \\left(\\frac{E}{V} \\times \\text{Re}\\right) + \\left(\\frac{D}{V} \\times \\text{Rd} \\times (1 - T)\\right)'
      },
      {
        id: 'capm-cost-of-equity',
        name: 'CAPM and Cost of Equity',
        description: 'CAPM estimates the required return from the risk-free rate plus beta times the market risk premium.',
        usage: 'Document the risk-free maturity, beta source and window, market premium, and any country or size adjustments used in practice.',
        formula: 'formula: \\text{Re} = \\text{Rf} + \\beta \\times (\\text{Rm} - \\text{Rf})'
      },
      {
        id: 'dcf',
        name: 'DCF Structure',
        description: 'A DCF forecasts operating performance, converts it to free cash flow, discounts the cash flows, and adds a terminal value.',
        usage: 'Separate historical analysis, operating assumptions, tax and reinvestment schedules, discounting, terminal value, and sensitivity outputs.',
        formula: 'formula: \\text{EV} = \\sum_{t=1}^{n} \\frac{\\text{FCFF}_t}{(1+\\text{WACC})^t} + \\frac{\\text{TV}}{(1+\\text{WACC})^n}'
      },
      {
        id: 'terminal-value',
        name: 'Terminal Value',
        description: 'Terminal value represents value beyond the explicit forecast period using a perpetuity-growth or exit-multiple approach.',
        usage: 'Test terminal growth against long-run economics and compare the implied exit multiple or terminal-value share of enterprise value.',
        watchOut: 'A DCF can be highly sensitive to terminal assumptions. Show the sensitivity instead of presenting one terminal value as precise.',
        formula: 'formula: \\text{TV} = \\frac{\\text{FCFF}_{n+1}}{\\text{WACC} - g}'
      },
      {
        id: 'enterprise-equity-bridge',
        name: 'Enterprise-to-Equity Bridge',
        description: 'Enterprise value belongs to all capital providers. Equity value is reached after adjusting for debt, cash, and other debt-like or non-operating items.',
        usage: 'Define each bridge item consistently with the valuation date and the transaction convention.',
        formula: 'formula: \\text{Equity Value} = \\text{EV} - \\text{Debt} + \\text{Cash} - \\text{Debt-like Items} + \\text{Non-operating Assets}'
      },
      {
        id: 'enterprise-value',
        name: 'Enterprise Value Formula',
        description: 'Enterprise value measures the value of the operating business before allocating value between equity and debt providers.',
        usage: 'Use the bridge consistently in comps, DCFs, transaction analysis, and interview answers. Explain which debt-like, minority-interest, preferred-equity, lease, pension, and excess-cash adjustments are included.',
        watchOut: 'The exact bridge is convention-dependent. Excess cash is not automatically every rupee or dollar on the balance sheet, and leases or pensions may be treated differently by the assignment.',
        formula: 'formula: \\text{EV} = \\text{Market Cap} + \\text{Debt} + \\text{Minority Interest} - \\text{Excess Cash}'
      },
      {
        id: 'sources-and-uses',
        name: 'Sources and Uses',
        description: 'Sources and Uses reconciles how a transaction is funded with what the transaction spends money on.',
        usage: 'Build sources for debt, rollover equity, sponsor equity, and target cash. Build uses for purchase equity value, refinancing, fees, minimum cash, and other transaction costs.',
        formula: 'formula: \\text{Total Sources} = \\text{Total Uses}'
      },
      {
        id: 'comps-table',
        name: 'Comparable Companies Table',
        description: 'A comps table normalizes operating metrics and valuation multiples across a selected peer set.',
        usage: 'Show company description, market data date, revenue, EBITDA, net debt, enterprise value, growth, margins, and relevant multiples. Flag outliers rather than deleting them silently.',
        formula: 'formula: \\text{EV/Revenue} = \\frac{\\text{Enterprise Value}}{\\text{Revenue}}'
      },
      {
        id: 'accretion-dilution',
        name: 'Accretion and Dilution',
        description: 'An accretion and dilution analysis tests whether a transaction increases or decreases the acquirer’s earnings per share after financing, synergies, purchase accounting, and new shares.',
        usage: 'Build the bridge from standalone EPS to pro forma EPS, isolate synergies and financing effects, and show the break-even synergy or purchase price assumption.',
        formula: 'formula: \\text{Pro Forma EPS} = \\frac{\\text{Pro Forma Net Income}}{\\text{Pro Forma Shares Outstanding}}'
      },
      {
        id: 'associate-sensitivity-pack',
        name: 'Associate Sensitivity Pack',
        description: 'A transaction or valuation pack usually needs downside, base, and upside cases plus focused sensitivities around the assumptions that drive the conclusion.',
        usage: 'Include entry price, leverage, rates, margins, growth, exit multiple, WACC, terminal growth, and synergy sensitivities with the selected case clearly marked.'
      },
      {
        id: 'valuation-multiples',
        name: 'Trading and Transaction Multiples',
        description: 'Multiples compare value with a financial metric such as revenue, EBITDA, EBIT, or earnings.',
        usage: 'Select the metric that matches the capital structure and business maturity, normalize the denominator, and compare peers with similar growth, risk, and accounting treatment.',
        formula: 'formula: \\text{EV/EBITDA} = \\frac{\\text{Enterprise Value}}{\\text{LTM EBITDA}}'
      },
      {
        id: 'dcf-sensitivity-drivers',
        name: 'DCF Drivers and Sensitivities',
        description: 'A valuation conclusion is more useful when the reader can see how WACC, growth, margins, reinvestment, and exit assumptions affect it.',
        usage: 'Separate operating sensitivities from valuation sensitivities so the reviewer can distinguish business risk from discount-rate mechanics.'
      }
    ]
  },
  {
    section: 'Sensitivities, Scenarios & Auditing',
    description: 'Stress the model, inspect the logic, and move through a workbook quickly without losing control of the answer.',
    items: [
      {
        id: 'data-tables',
        name: 'One-Variable and Two-Variable Data Tables',
        description: 'Data Tables show how one or two changing inputs affect one or more model outputs.',
        usage: 'Use them for WACC versus terminal growth, entry price versus exit multiple, or rate versus leverage analysis. Keep the table linked to the real model output.',
        watchOut: 'Data Tables support one or two input variables. They are a what-if tool, not the same thing as a valuation football-field chart.'
      },
      {
        id: 'goal-seek',
        name: 'Goal Seek',
        description: 'Goal Seek changes one input until a formula reaches a specified result.',
        usage: 'Use it for a single-variable question such as the entry price required to reach a target IRR or the rate required to reach a target payment.',
        watchOut: 'Goal Seek handles one changing input. Use Solver for multiple variables, constraints, or optimization.',
        formula: 'formula: \\text{Target Output} \\leftarrow \\text{One Changing Input}'
      },
      {
        id: 'scenario-manager',
        name: 'Scenario Manager',
        description: 'Scenario Manager stores sets of input values and lets you switch among cases. It is distinct from a formula-driven CHOOSE or INDEX switch.',
        usage: 'Use it for a small number of named cases, then use a formula-driven case selector when the model needs a persistent, reviewable active case.',
        watchOut: 'Scenario Manager supports up to 32 changing values per scenario. Large model case systems are usually easier to audit in visible input tables.'
      },
      {
        id: 'solver',
        name: 'Solver',
        description: 'Solver changes multiple decision variables to optimize an objective subject to constraints.',
        usage: 'Use it for allocation, capital structure, or scheduling problems that Goal Seek cannot express. Document the objective, variables, and constraints.'
      },
      {
        id: 'f2',
        name: 'F2 Formula Inspection',
        description: 'F2 enters the active cell into edit mode so you can inspect references and formula structure.',
        usage: 'Use Esc to leave without saving or Enter to accept. In audit work, inspect the formula bar and trace the important references rather than relying on color.'
      },
      {
        id: 'f4',
        name: 'F4 Reference Locking',
        description: 'While editing a formula, F4 cycles a reference through relative, row-locked, column-locked, and fully locked forms.',
        usage: 'Use it when copying formulas across periods or down schedules. Outside edit mode, F4 can repeat the last action in Windows Excel.',
        formula: 'formula: \\text{A1} \\rightarrow \\text{\\$A\\$1} \\rightarrow \\text{A\\$1} \\rightarrow \\text{\\$A1}'
      },
      {
        id: 'ctrl-arrows',
        name: 'Ctrl plus Arrow Keys',
        description: 'Ctrl plus an arrow moves to the edge of a contiguous data region. Shift extends the selection.',
        usage: 'Use it to navigate long schedules and identify the actual extent of an imported data block.',
        formula: 'formula: \\text{Ctrl} + \\uparrow \\quad \\text{or} \\quad \\text{Ctrl} + \\rightarrow'
      },
      {
        id: 'paste-special',
        name: 'Paste Special',
        description: 'Paste Special lets you choose values, formulas, formats, links, or mathematical operations instead of pasting everything.',
        usage: 'Use `Ctrl+Alt+V` to open the menu, then choose the required option. Paste Values is useful for freezing an approved export; it should not replace a traceable link without explanation.',
        formula: 'formula: \\text{Ctrl} + \\text{Alt} + \\text{V}'
      },
      {
        id: 'go-to-special',
        name: 'Go To Special',
        description: 'Go To Special selects cells that meet conditions such as constants, formulas, blanks, or visible cells only.',
        usage: 'Press `Ctrl+G`, choose Special, then choose the required category and subtypes. Use it to inspect hardcoded numbers, not to assume every selected cell is a model error.',
        watchOut: 'Ribbon KeyTips and keyboard sequences vary by Excel version and keyboard layout. The menu path is more dependable for a teaching reference.'
      },
      {
        id: 'trace-precedents-dependents',
        name: 'Trace Precedents and Dependents',
        description: 'Trace Precedents shows cells feeding the active formula. Trace Dependents shows formulas that use the active cell.',
        usage: 'Use the Formulas tab or auditing arrows to follow a material input through a schedule and into the output. Direct-reference shortcuts do not replace a full review of indirect logic.'
      },
      {
        id: 'show-formulas',
        name: 'Show Formulas',
        description: 'Show Formulas switches the worksheet from displayed values to formula text for a quick structural scan.',
        usage: 'Use `Ctrl+`` on a US Windows keyboard, or the Formulas tab, then scan for hardcodes, inconsistent formulas, and unexpected links.',
        watchOut: 'Keyboard symbols differ across layouts. Use the ribbon command if the tilde shortcut is not recognized.'
      },
      {
        id: 'filter-navigation',
        name: 'Filter and Table Navigation',
        description: 'Filters reduce a dataset to the rows relevant to a review question without deleting source data.',
        usage: 'Use `Ctrl+Shift+L` to toggle filters on a selected range, then document the filter criteria when a review output depends on it.'
      },
      {
        id: 'freeze-panes',
        name: 'Freeze Panes',
        description: 'Freeze Panes keeps selected rows and columns visible while scrolling through a schedule or data table.',
        usage: 'Select the cell below and to the right of the rows and columns you want to keep, then use View > Freeze Panes. Treat it as navigation support, not a model control.'
      },
      {
        id: 'model-audit-checklist',
        name: 'Model Audit Checklist',
        description: 'A final audit checks inputs, units, dates, signs, formulas, links, statements, debt, valuation, sensitivities, and presentation.',
        usage: 'Recalculate, review warnings, trace material outputs, test upside and downside cases, confirm the balance sheet, and save a clean copy with source and date notes.',
        formula: 'formula: \\text{Reliable Output} = \\text{Correct Logic} + \\text{Correct Inputs} + \\text{Visible Controls}'
      }
    ]
  }
];
