import { useState, useRef } from "react";
import ageImg from "../assets/imgs/age.png";
import BackButton from "./BackBtn";

function calculateAge(day, month, year) {
  const dob = new Date(`${year}-${month}-${day}`);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function isValidDate(day, month, year) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (!d || !m || !y) return false;
  if (y < 1900 || y > new Date().getFullYear()) return false;
  if (m < 1 || m > 12) return false;

  const daysInMonth = new Date(y, m, 0).getDate();
  if (d < 1 || d > daysInMonth) return false;

  return true;
}

function SetDob({ onContinue, onBack }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [touched, setTouched] = useState(false);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const allFilled = day.length === 2 && month.length === 2 && year.length === 4;
  const dateValid = allFilled && isValidDate(day, month, year);
  const age = dateValid ? calculateAge(day, month, year) : null;
  const isUnder18 = dateValid && age < 18;
  const isValid = dateValid && !isUnder18;

  const showFormatError = touched && allFilled && !dateValid;
  const showAgeError = touched && dateValid && isUnder18;

  const handleChange = (value, setter, maxLen, nextRef) => {
    const digits = value.replace(/\D/g, "").slice(0, maxLen);
    setter(digits);
    if (digits.length === maxLen && nextRef) {
      nextRef.current?.focus();
    }
  };

  const handleKeyDown = (e, currentValue, prevRef) => {
    if (e.key === "Backspace" && currentValue.length === 0 && prevRef) {
      prevRef.current?.focus();
    }
  };

  const inputClass = (hasError) => `
    text-center text-xl font-semibold  bg-neutral-950/50 text-white
    outline-none border-2 transition py-3
    ${hasError ? "border-red-600" : "border-stone-700 focus:border-purple-300"}
  `;

  return (
    <div className="flex flex-col h-full px-6 py-10 space-y-10 justify-evenly bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:top-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-4=500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <BackButton onBack={onBack} />
      <div className="text-center">
        <h1 className="text-4xl md:text-2xl text-white font-thin">
          You &nbsp;
          <span className="font-cursive text-5xl md:text-4xl text-yellow-400 font-bold">
            Old enough
          </span>
          ?
        </h1>
        <p className="text-stone-400 mt-5 md:mt-2 text-xl md:text-sm">You must be <strong className="text-yellow-500">18 or older</strong> to use this app.</p>
        <img src={ageImg} alt="age check" />
      </div>

      <div>
        <div className="flex space-x-3 justify-center">
          <input
            ref={dayRef}
            type="text"
            inputMode="numeric"
            placeholder="DD"
            value={day}
            onChange={(e) => handleChange(e.target.value, setDay, 2, monthRef)}
            onKeyDown={(e) => handleKeyDown(e, day, null)}
            onBlur={() => setTouched(true)}
            className={`w-14 ${inputClass(showFormatError || showAgeError)}`}
          />
          <input
            ref={monthRef}
            type="text"
            inputMode="numeric"
            placeholder="MM"
            value={month}
            onChange={(e) => handleChange(e.target.value, setMonth, 2, yearRef)}
            onKeyDown={(e) => handleKeyDown(e, month, dayRef)}
            onBlur={() => setTouched(true)}
            className={`w-14 ${inputClass(showFormatError || showAgeError)}`}
          />
          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            placeholder="YYYY"
            value={year}
            onChange={(e) => handleChange(e.target.value, setYear, 4, null)}
            onKeyDown={(e) => handleKeyDown(e, year, monthRef)}
            onBlur={() => setTouched(true)}
            className={`w-24 ${inputClass(showFormatError || showAgeError)}`}
          />
        </div>

        {showFormatError && (
          <p className="text-red-600 text-sm mt-2">Please enter a valid date.</p>
        )}
        {showAgeError && (
          <p className="text-red-600 text-sm mt-2">
            You must be at least 18 years old to continue.
            <img src="" alt="" />
          </p>
        )}
      </div>

      <button
        onClick={() => onContinue(`${year}-${month}-${day}`)}
        disabled={!isValid}
        className={`mt-auto w-fit self-center px-10 py-3 font-medium transition active:scale-95 ${
          isValid
            ? "bg-amber-400 text-stone-950 shadow-[5px_5px_0px_2px_#e17100] hover:bg-amber-600  hover:shadow-[7px_7px_0px_2px_#ffba00]"
            : "bg-stone-700 text-stone-500 cursor-not-allowed line-through"
        }`}
      >
        Continue
      </button>
    </div>
  );
}

export default SetDob;