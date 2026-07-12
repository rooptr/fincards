import { evaluate } from 'mathjs';

export class ExpressionEngine {
  /**
   * Evaluates a mathematical formula or equation given a set of input variables.
   * Handles equations like "WACC = (E/V * Re) + (D/V * Rd * (1 - T))" by stripping the left side.
   */
  static evaluate(expression, variables = {}) {
    if (!expression) return { success: false, error: 'No expression provided' };
    
    try {
      let formulaToEvaluate = expression;
      let targetVariable = null;

      // If it's an equation "Y = X + 1", extract the right side
      if (expression.includes('=')) {
        const parts = expression.split('=');
        targetVariable = parts[0].trim();
        formulaToEvaluate = parts[1].trim();
      }

      // Convert variables to numbers where possible to avoid string concat math errors
      const numericVariables = {};
      for (const [key, value] of Object.entries(variables)) {
        numericVariables[key] = isNaN(Number(value)) ? value : Number(value);
      }

      const result = evaluate(formulaToEvaluate, numericVariables);

      // Create a substituted string for UI display
      let substituted = formulaToEvaluate;
      // Sort keys by length descending to avoid partial replacements (e.g., matching "E" before "EBIT")
      const keys = Object.keys(numericVariables).sort((a, b) => b.length - a.length);
      
      for (const key of keys) {
        // Use word boundary to replace exact variables
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        substituted = substituted.replace(regex, numericVariables[key]);
      }

      return {
        success: true,
        target: targetVariable,
        result: result,
        formula: formulaToEvaluate,
        substituted: targetVariable ? `${targetVariable} = ${substituted}` : substituted
      };
    } catch (error) {
      console.error(`ExpressionEngine Error evaluating "${expression}":`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}
