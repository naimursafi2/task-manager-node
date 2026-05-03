import React, { useEffect, useRef, useState } from "react";

const OTPVerify = ({ length = 4, onSubmit }) => {
  const [otp, setOtp] = useState([]);
  const inputsRef = useRef([]);

  // initialize OTP boxes based on length
  useEffect(() => {
    setOtp(new Array(length).fill(""));
  }, [length]);

  // handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // submit OTP
  const handleSubmit = () => {
    const code = otp.join("");

    if (code.length < length || code.includes("")) {
      alert("Please enter full OTP");
      return;
    }

    if (onSubmit) {
      onSubmit(code);
    } else {
      console.log("OTP:", code);
      alert(`OTP Entered: ${code}`);
    }
  };

  return (
   <div>
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        
        <h2 className="text-2xl font-semibold mb-2">
          OTP Verification
        </h2>

        <p className="text-gray-500 mb-6">
          Enter the 4-digit code
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
   </div>
  );
};

export default OTPVerify;