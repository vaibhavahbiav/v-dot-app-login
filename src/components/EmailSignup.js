import { useState } from "react";
import emailImg from "../assets/imgs/email.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailSignup({ onContinue }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = EMAIL_REGEX.test(email);
  const showError = touched && email.length > 0 && !isValid;

  return (
    <div className="flex flex-col h-full px-6 py-10 bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:top-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-500/80 before:via-50% before:to-yellow-500/80 before:blur-md justify-evenly">
      <div>
        <h1 className="text-5xl md:text-4xl text-neutral-200 font-cursive text-center leading-[60px]">
          Do you have an{" "}
          <span className=" text-purple-500 font-climate decoration-red-600 decoration-wavy underline underline-offset-4">
            Email &nbsp;
          </span>
          ?
        </h1>
        <img
          className="h-[350px] justify-self-center"
          src={emailImg}
          alt="i have an email"
        />
        <p className="text-neutral-200 text-md font-mono text-center">
          Prove it. Put it in the box.
        </p>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="you@example.com"
        className={`
             mt-5 w-[90%] self-center px-4 py-3 text-lg md:text-sm bg-neutral-950/50 text-neutral-50 font-semibold font-serif tracking-wider placeholder-neutral-200
            outline-none border-4 transition
            ${showError ? "border-red-600" : "border-stone-700 focus:border-stone-950 focus:shadow-[2px_2px_0px_2px_#000]"}
          `}
      />
      {showError && (
        <p className="text-red-700 md:mt-3 animate-bounce text-center">
          Please enter a <strong>REAL</strong> & <strong>VALID</strong> email
          address.
        </p>
      )}

      <button
        onClick={() => onContinue(email)}
        disabled={!isValid}
        className={`
          mt-4 px-4 py-2 w-fit  self-center uppercase font-mono tracking-widest text-stone-950 font-medium transition-all
          ${
            isValid
              ? "bg-yellow-400 shadow-[5px_5px_0px_2px_#d08700] hover:bg-yellow-600 hover:shadow-[5px_5px_0px_2px_#fcc800] hover:scale-110 hover:border-white active:scale-95"
              : "bg-stone-700 text-stone-500 cursor-not-allowed line-through"
          }
        `}
      >
        Continue
      </button>
    </div>
  );
}

export default EmailSignup;
