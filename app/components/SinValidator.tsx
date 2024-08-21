"use client"
import React, { useState } from "react"

const SinValidator = () => {
  const [sin, setSIN] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [buttonClicked, setButtonClicked] = useState(false)
  const [loading, setLoading] = useState(false)

  /**
   *  Set SIN, reset buttonClicked, errorMessage, and isValid state
   * @param event - Input change event
   */
  const handleSINChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSIN(event.target.value)
    setButtonClicked(false)
    setErrorMessage("")
    setIsValid(false)
  }

  /**
   * Sends POST request to validate endpoint, then update SIN validity and error message
   * @returns {Promise<void>}
   */
  const validateSIN = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sin }),
      })
      const { isValid, error } = await response.json()

      setLoading(false)
      setIsValid(isValid)
      setErrorMessage(error ? error : "")
    } catch (error) {
      setLoading(false)
      console.error("Error validating SIN:", error)
      setIsValid(false)
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  /**
   * Call validateSIN() and set buttonClicked to true
   */
  const handleValidateSIN = (): void => {
    validateSIN()
    setButtonClicked(true)
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="text-xl text-neutral-600 mb-5">SIN Validator</div>
      <input
        className={`input input-bordered w-full max-w-xs ${
          buttonClicked ? (isValid ? "input-success" : "input-error") : ""
        }`}
        type="text"
        value={sin}
        onChange={handleSINChange}
        placeholder="Please enter the SIN number"
      ></input>
      <label className="label">
        {!isValid && errorMessage && (
          <span className="label-text-alt text-error">{errorMessage}</span>
        )}
        {isValid && (
          <span className="label-text-alt text-success">This SIN is valid</span>
        )}
      </label>
      <button
        className={`btn btn-outline ${loading ? "loading" : ""}`}
        onClick={handleValidateSIN}
        disabled={loading}
      >
        Validate
      </button>
    </div>
  )
}

export default SinValidator
