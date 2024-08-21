"use client"
import React, { useState } from "react"

const SinValidator = () => {
  const [sin, setSIN] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handleSINChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSIN = event.target.value
    setSIN(newSIN)
    validateSIN(newSIN)
  }

  const validateSIN = async (sin: string) => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sin }),
      })
      const { isValid } = await response.json()
      setIsValid(isValid)
    } catch (error) {
      console.error("Error validating SIN:", error)
      setIsValid(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="text-lg text-neutral-600">SIN Validator</div>
      <input
        className="input input-primary input-bordered w-full max-w-xs"
        type="text"
        value={sin}
        onChange={handleSINChange}
        placeholder="Please enter the SIN number"
      ></input>
    </div>
  )
}

export default SinValidator
