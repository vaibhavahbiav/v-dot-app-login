import profileImg from "../assets/imgs/profile.png";

function Profile({ profile, onClose }) {
  const { name, username, email, pronouns, dob } = profile;

  const formattedDob = new Date(dob).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className=" flex flex-col h-full px-6 py-10 space-y-10 relative overflow-hidden z-10 before:-z-10 before:absolute before:size-96 before:bottom-[60%] before:-right-20 before:rounded-full before:bg-gradient-to-tl before:from-red-500/80 before:from-20% before:via-orange-500/80 before:via-50% before:to-yellow-500/80 before:blur-md">
      <button
        onClick={onClose}
        className="absolute top-7 right-0 size-12 md:top-7 md:right-0 md:size-10 flex items-center justify-center bg-neutral-200 text-stone-950 hover:text-white hover:bg-stone-900 transition"
      >
        ✕
      </button>
      <div className="flex flex-col items-center space-y-2">
        <div className="size-20 flex items-center justify-center text-5xl text-white font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold text-white">{name}</h1>
        <p className="text-yellow-400 text-xl font-cursive">@{username}</p>
      </div>

      <div className="flex flex-col border-2 border-white/40 rounded-tr-[60px] rounded-bl-3xl overflow-hidden divide-y divide-white/10">
        <SummaryRow label="Email" value={email} />
        <SummaryRow label="Pronouns" value={pronouns.join(", ")} />
        <SummaryRow label="Date of birth" value={formattedDob} />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <>
      <div className="flex flex-col justify-between bg-white/20 px-4 py-4 overflow-hidden">
        <span className="font-cursive text-left text-purple-500 text-3xl md:text-xl">
          {label}
        </span>
        <span className="text-white text-center font-medium text-xl md:text-lg">
          {value}
        </span>
      </div>
    </>
  );
}

export default Profile;
