"use client"
import React, { useState } from "react"

const SinValidator = () => {
  const [sin, setSIN] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [buttonClicked, setButtonClicked] = useState(false)

  const handleSINChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSIN(event.target.value)
    setButtonClicked(false)
    setErrorMessage("")
    setIsValid(false)
  }

  const validateSIN = async () => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sin }),
      })
      const { isValid, error } = await response.json()
      setIsValid(isValid)
      setErrorMessage(error ? error : "")
    } catch (error) {
      console.error("Error validating SIN:", error)
      setIsValid(false)
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  const handleValidateSIN = () => {
    setButtonClicked(true)
    validateSIN()
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="text-lg text-neutral-600">SIN Validator</div>
      <input
        className={`input input-primary input-bordered w-full max-w-xs ${
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
        className="btn btn-primary btn-outline"
        onClick={handleValidateSIN}
      >
        Validate SIN
      </button>
    </div>
  )
}

export default SinValidator
