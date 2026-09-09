function JustAccept({ onAccept }) {
  return (
    <div className="flex flex-col h-full px-6 py-10 space-y-6 bg-neutral-900">
      <h1 className="text-5xl md:text-4xl text-purple-500 font-climate">
        Terms & Conditions
      </h1>

      <div className="flex-1 overflow-y-auto text-white text-sm leading-relaxed pr-1 space-y-5 font-serif">
        <p>Very important wall of text here.</p>
        <p>Which I am sure nobody has ever in the history of human kind has ignored. </p>

        <p>Definitely nobody has ever dared to just scrolled past.</p>

        <p>Everyone has taken their time, precious to them more than the Ring to Gollum, to read word to word.</p>

        <p>Understanding the policy of data sharing on this platform</p>
        <p>How your likliness and personal digital data is "never" going to be allowed to be public</p>
        <p>And definitely never to the hard working tele marketeers who calls you at optimal times</p>
        <p>Anyways.... more words like that continues on for other 3.14 kilometers.</p>
        <p>Hopefuly, it will be clever and decently written.</p>
        <p>Like up until now.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>Just press agree and move.</p>
      </div>

      <button
        onClick={onAccept}
        className="px-4 py-2 w-fit self-center bg-yellow-400 uppercase font-mono text-stone-950 font-medium shadow-[5px_5px_0px_2px_#d08700] hover:bg-yellow-600 hover:shadow-[5px_5px_0px_2px_#fcc800] hover:scale-110 hover active:scale-95 transition-all"
      >
        Blindly Agree & Continue
      </button>
    </div>
  );
}

export default JustAccept;
