export function validateSIN(sin: string): boolean {
  sin = sin.trim()

  // 1. Digit Count
  if (sin.length !== 9) {
    return false
  }

  if (!/^\d+$/.test(sin)) {
    return false
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
  return sum % 10 === 0
}