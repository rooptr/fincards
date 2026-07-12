import { ExpressionEngine } from './ExpressionEngine.js';

function runTests() {
  console.log('Running ExpressionEngine Tests...');
  let passed = 0;
  let failed = 0;

  function assertEqual(actual, expected, testName) {
    if (actual === expected) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} | Expected: ${expected}, Got: ${actual}`);
      failed++;
    }
  }

  // Test 1: Basic Math
  const res1 = ExpressionEngine.evaluate('2 + 2');
  assertEqual(res1.result, 4, 'Basic Math Evaluation');

  // Test 2: Variable Substitution
  const res2 = ExpressionEngine.evaluate('EBIT * (1 - T)', { EBIT: 100, T: 0.2 });
  assertEqual(res2.result, 80, 'Variable Substitution Result');
  assertEqual(res2.substituted, '100 * (1 - 0.2)', 'Variable String Substitution');

  // Test 3: Left Hand Target parsing
  const res3 = ExpressionEngine.evaluate('WACC = (E/V * Re) + (D/V * Rd * (1 - T))', {
    E: 50,
    V: 100,
    Re: 0.1,
    D: 50,
    Rd: 0.05,
    T: 0.2
  });
  assertEqual(res3.target, 'WACC', 'Target Variable Extraction');
  assertEqual(res3.result, 0.07, 'WACC Calculation Result');
  assertEqual(res3.substituted, 'WACC = (50/100 * 0.1) + (50/100 * 0.05 * (1 - 0.2))', 'WACC String Substitution');

  console.log(`\nTests Complete: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) process.exit(1);
}

runTests();
