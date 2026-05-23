"use client"
import React from 'react'
import { useState, useRef } from 'react';
interface Props {
  length?: number,
  onComplete: Function
}
const OTPInput = ({ length = 6, onComplete }: Props) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(+element.value)) return false;
    console.log(1)
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newOtp.every(v => v !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      console.log(index)
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
        onComplete(newOtp.join(""));
        return;
      }
      if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onComplete(newOtp.join(""));
      }
    }
  };
  return (
    <div className="flex justify-center gap-2 z-50 ">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center text-xl font-semibold  focus:border-blue-500 transition-all"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => { inputRefs.current[index] = el; }}
        />
      ))}
    </div>
  );
}

export default OTPInput