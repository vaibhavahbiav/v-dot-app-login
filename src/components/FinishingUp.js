import { useState, useEffect } from "react";

function FinishingUp({ onDone }) {
  const [stage, setStage] = useState("finishing"); 

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("done"), 3000);
    const timer2 = setTimeout(() => onDone(), 400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      {stage === "finishing" ? (
        <>
          <div className="w-10 h-10 border-4 border-stone-600 border-t-white rounded-full animate-spin" />
          <p className="text-stone-300 font-medium">Setting up your profile...</p>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-full bg-lime-500 flex items-center justify-center text-white text-2xl">
            ✓
          </div>
          <p className="text-white font-semibold text-lg">All done!</p>
        </>
      )}
    </div>
  );
}

export default FinishingUp;