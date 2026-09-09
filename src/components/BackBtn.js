function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="absolute bottom-0 left-0 md:bottom-0 md:left-0 size-14 md:size-12 font-black text-4xl md:text-3xl md:rounded-bl-lg flex items-center justify-center bg-neutral-200 text-stone-950 hover:bg-white transition"
    >
      &larr;
    </button>
  );
}

export default BackButton;