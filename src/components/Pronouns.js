import { useState } from "react";
import BackButton from "./BackBtn";

const OPTIONS = [
  "He/Him",
  "She/Her",
  "They/Them",
  "Ze/Zir",
  "Xe/Xem",
  "Email",
  "Mechanic",
  "Eldritch Being",
  "Celestial Entity",
  "Indecisive",
  "Elden Lord",
  "Prefer not to say",
];
const MAX_SELECT = 3;

function Pronouns({ onContinue, onBack }) {
  const [selected, setSelected] = useState([]);

  const toggle = (option) => {
    setSelected((prev) => {
      if (prev.includes(option)) return prev.filter((o) => o !== option);
      if (prev.length >= MAX_SELECT) return prev; // ignore if limit reached
      return [...prev, option];
    });
  };

  const isValid = selected.length > 0;

  return (
    <div className="flex flex-col justify-evenly h-full px-6 py-10 space-y-10 bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:top-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-4=500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <BackButton onBack={onBack} />
      <div className="text-center">
        <h1 className="text-4xl md:text-2xl text-white font-thin">
          Your &nbsp;
          <span className="font-cursive text-5xl md:text-4xl text-yellow-400 font-bold">
            Pronouns
          </span>
          ?
        </h1>
        <p className="text-stone-400 mt-2 text-sm">
          can select up to{" "}
          <span className="text-yellow-500 text-lg">{MAX_SELECT}</span>.
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-3">
          {OPTIONS.map((option) => {
            const isSelected = selected.includes(option);
            const isDisabled = !isSelected && selected.length >= MAX_SELECT;
            return (
              <button
                key={option}
                onClick={() => toggle(option)}
                disabled={isDisabled}
                className={`
                px-4 py-2 text-sm font-medium border-2 transition
                ${
                  isSelected
                    ? "bg-purple-500 border-white text-white"
                    : isDisabled
                      ? "border-stone-800 text-stone-600 cursor-not-allowed"
                      : "border-stone-700 text-stone-300 hover:border-stone-500"
                }
              `}
              >
                {option}
              </button>
            );
          })}
        </div>

        <p className="text-neutral-200 text-lg md:text-xs mt-5">
          {selected.length}/{MAX_SELECT} selected
        </p>
      </div>

      <button
        onClick={() => onContinue(selected)}
        disabled={!isValid}
        className={`w-fit self-center px-10 py-3 font-medium transition active:scale-95 ${
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

export default Pronouns;
