import greetingImg from "../assets/imgs/greetings.png";

function Greetings({ onContinue }) {
  return (
    <div className="flex flex-col items-center justify-evenly h-full px-6 space-y-12 text-center bg-neutral-900 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:bottom-[65%] before:-right-24 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <div>
        <h1 className="text-5xl md:text-4xl text-neutral-200 font-climate">
          Greetings!
        </h1>
        <img
          className="size-40 mt-10 justify-self-center"
          src={greetingImg}
          alt="v dot app hi-s you"
        />
        <div className="flex flex-col items-center justify-center">
          <span className="font-cursive text-white text-2xl md:text-lg">
            from
          </span>
          <div className="flex items-center justify-center">
            <div className="relative w-fit z-10">
              <span className=" text-[150px] md:text-[111px] font-climate text-yellow-400 ">
                V
              </span>
              <span className="absolute -top-1 left-2 text-[153px] md:text-[112px] font-climate text-red-400 -z-[1]">
                V
              </span>
              <span className="absolute -top-2 left-3 text-[155px] md:text-[113px] font-climate text-purple-400 -z-[2]">
                V
              </span>
            </div>
            <span className=" text-[150px] md:text-[100px] text-neutral-200">
              .
            </span>
          </div>
        </div>
        <p className="text-stone-100 mt-2 text-2xl md:text-2xl font-cursive">
          Ready to start?
        </p>
      </div>

      <button
        onClick={onContinue}
        className="px-4 py-2 bg-yellow-400 uppercase font-mono tracking-widest text-stone-950 font-medium shadow-[5px_5px_0px_2px_#d08700] hover:bg-yellow-600 hover:shadow-[5px_5px_0px_2px_#fcc800] hover:scale-110 hover active:scale-95 transition-all"
      >
        Continue
      </button>
    </div>
  );
}

export default Greetings;
