import { useState } from "react";
import nameImg from "../assets/imgs/name.png";
import BackButton from "./BackBtn";

const MIN = 7;
const MAX = 54;

function SetName({ initialvalue ="", onContinue, onBack }) {
  const [name, setName] = useState(initialvalue);
  const [touched, setTouched] = useState(false);

  const trimmed = name.trim();
  const isValid = trimmed.length >= MIN && trimmed.length <= MAX;
  const showError = touched && trimmed.length > 0 && !isValid;

  return (
    <div className="flex flex-col justify-evenly h-full px-6 py-10 space-y-10 bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:top-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-4=500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <BackButton onBack={onBack} />
      <div className="text-center">
        <h1 className="text-4xl md:text-2xl text-white font-thin">What's your <span className="font-cursive text-5xl md:text-4xl text-yellow-400 font-bold">Name</span>?</h1>
        <img src={nameImg} alt="your profile name" />
        <p className="text-yellow-500 mt-2 text-xl md:text-sm font-thin">This is your <strong>identity</strong>.</p>
        <strong className="text-stone-200 mt-2 text-xl md:text-sm font-mono">DO NOT TRY TO BE CLEVER!!</strong>
      </div>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          maxLength={MAX}
          placeholder="Enter your name"
          className={`
            w-full px-4 py-3 bg-neutral-950/50 text-yellow-300 placeholder-stone-500
            outline-none border-2 transition text-xl md:text-base
            ${showError ? "border-red-600" : "border-stone-700 focus:border-yellow-400"}
          `}
        />
        <div className="flex justify-between mt-2">
          {showError ? (
            <p className="text-red-800 text xl: md:text-sm font-mono">
              Name must be {MIN}–{MAX} characters.
            </p>
          ) : <span />}
          <p className="text-stone-200 text-xs">{trimmed.length}/{MAX}</p>
        </div>
      </div>

      <button
        onClick={() => onContinue(trimmed)}
        disabled={!isValid}
        className={`w-fit self-center px-10 py-3 font-medium transition active:scale-95 ${
          isValid ? "bg-amber-400 text-stone-950 shadow-[5px_5px_0px_2px_#e17100] hover:bg-amber-600  hover:shadow-[7px_7px_0px_2px_#ffba00]" : "bg-stone-700 text-stone-500 cursor-not-allowed line-through"
        }`}
      >
        Continue
      </button>
    </div>
  );
}

export default SetName;