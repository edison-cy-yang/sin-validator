interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validate the SIN number
 * @param sin - The SIN number to be validated
 * @returns {ValidatedResult}
 */
export function validateSIN(sin: string): ValidationResult {
  sin = sin.trim().replaceAll(" ", "")

  // 1. Digit Count
  if (sin.length !== 9) {
    return {
      isValid: false,
      error: "This SIN is invalid. A valid SIN should have 9 digits.",
    }
  }

  if (!/^\d+$/.test(sin)) {
    return {
      isValid: false,
      error: "This SIN is invalid. A valid SIN can only contain numbers.",
    }
  }

  // 2. Luhn Algorithm
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(sin[i])
    if (i % 2 === 1) {
      // Double every second digit
      digit *= 2
      if (digit > 9) {
        // Add the  two digits of the result if doubling a digit results in a number greater than 9
        digit = digit % 10 + Math.floor(digit / 10)
      }
    }
    sum += digit
  }

  // Checksum Validation
  const checkSumValid = sum % 10 === 0

  return checkSumValid? {
    isValid: true
  } : {
    isValid: false,
    error: "This SIN is invalid"
  }
}