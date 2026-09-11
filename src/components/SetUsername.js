import { useState } from "react";
import usernameImg from "../assets/imgs/username.png";
import BackButton from "./BackBtn";

const MIN = 4;
const MAX = 23;

function SetUsername({ initialvalue = "", onContinue, onBack }) {
  const [username, setUsername] = useState(initialvalue);
  const [touched, setTouched] = useState(false);

  const isValid = username.length >= MIN && username.length <= MAX;
  const showError = touched && username.length > 0 && !isValid;

  const handleChange = (e) => {
    // allow letters, numbers, underscores, dots only — adjust rule as needed
    const value = e.target.value.replace(/[^a-zA-Z0-9._]/g, "");
    setUsername(value);
  };

  return (
    <div className="flex flex-col justify-evenly h-full px-6 py-10 space-y-12 bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:top-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-4=500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <BackButton onBack={onBack} />
      <div className="text-center">
        <h1 className="text-4xl md:text-2xl text-white font-thin">
          Choose a &nbsp;
          <span className="font-cursive text-5xl md:text-4xl text-yellow-400 font-bold">
            Username
          </span>
          ?
        </h1>
        <img className="mt-5" src={usernameImg} alt="your profile name" />
        <p className="text-stone-100 mt-5 text-xl md:text-sm font-thin">
          <span className="text-yellow-500 font-semibold">Choose quick</span> or
          someone else will choose yours.
        </p>
      </div>

      <div>
        <div className="flex items-center bg-neutral-950/50 border-2 px-4 transition border-stone-700 focus-within:border-yellow-200 group">
          <span
            className={`transition ${
              username.length > 0
                ? "text-yellow-400"
                : "text-stone-500 group-focus-within:text-yellow-400"
            }`}
          >
            @
          </span>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            maxLength={MAX}
            placeholder="username"
            className="w-full bg-transparent text-xl md:text-base text-yellow-400 placeholder-stone-500 outline-none py-3 pl-1"
          />
        </div>
        <div className="flex justify-between mt-2">
          {showError ? (
            <p className="text-red-800 text-xl md:text-sm">
              Username must be {MIN}–{MAX} characters.
            </p>
          ) : (
            <span />
          )}
          <p className="text-stone-200 text-xs">
            {username.length}/{MAX}
          </p>
        </div>
      </div>

      <button
        onClick={() => onContinue(username)}
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

export default SetUsername;
