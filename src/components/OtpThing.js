import { useState, useRef, useEffect } from "react";
import BackButton from "./BackBtn";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;
const MOCK_CORRECT_OTP = "156156";

function OtpThing({ email, onVerified, onResendRequest, onBack }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // auto-focus next box
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // backspace on empty box moves focus back
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) return;
    e.preventDefault();
    const digits = pasted.slice(0, OTP_LENGTH).split("");
    const newOtp = Array(OTP_LENGTH).fill("");
    digits.forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    inputRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
  };

  const otpValue = otp.join("");
  const isComplete = otpValue.length === OTP_LENGTH;

  const handleVerify = () => {
    // TODO: replace this with a real API call, e.g.
    // const res = await verifyOtp(email, otpValue);
    if (otpValue === MOCK_CORRECT_OTP) {
      onVerified();
    } else {
      setError("Incorrect code. Please try again.");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    // TODO: replace with real "resend OTP" API call
    onResendRequest?.();
    setCooldown(RESEND_COOLDOWN);
    setError("");
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex flex-col justify-around items-center h-full px-6 py-10 space-y-4 bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:top-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <BackButton onBack={onBack} />
      <div>
        <h1 className="text-5xl md:text-4xl text-neutral-200 font-thin font-cursive text-center">
          Enter the <br />
          <span className="font-mono font-bold text-6xl text-purple-400">
            code
          </span>
        </h1>
        <p className="text-neutral-200 mt-6 text-lg md:text-sm text-center">
          We sent a <strong>{OTP_LENGTH}-digit code</strong> to a <br />
          <span className="font-mono text-xl md:text-sm underline underline-offset-4 text-purple-200">
            {email}
          </span>
        </p>
        <p className="text-neutral-200 mt-10 text-lg md:text-sm text-center">
          No backend. Code is{" "}
          <strong className="text-yellow-600">156156</strong>.
        </p>
      </div>

      <div>
        <div className="flex space-x-1 justify-between" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                size-14 md:size-11 text-center text-xl font-semibold
                bg-neutral-950/50 text-white outline-none border-4 transition
                ${error ? "border-red-600" : "border-stone-700 focus:border-white"}
              `}
            />
          ))}
        </div>
        {error && (
          <p className="text-red-800 text-sm mt-1 text-center animate-pulse">
            {error}
          </p>
        )}
        <div className="mt-3 text-right text-lg md:text-sm text-neutral-400">
          {cooldown > 0 ? (
            <span>Resend code in {cooldown}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-neutral-200 hover:text-neutral-100 font-mono underline mt-5"
            >
              Resend code?
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handleVerify}
        disabled={!isComplete}
        className={`
          mt-4 px-4 py-2 w-fit  self-center uppercase font-mono tracking-widest text-stone-950 font-medium transition-all
          ${
            isComplete
              ? "bg-yellow-400 shadow-[5px_5px_0px_2px_#d08700] hover:bg-yellow-600 hover:shadow-[5px_5px_0px_2px_#fcc800] hover:scale-110 hover:border-white active:scale-95"
              : "bg-stone-700 text-stone-500 cursor-not-allowed line-through"
          }
        `}
      >
        Verify
      </button>
    </div>
  );
}

export default OtpThing;
