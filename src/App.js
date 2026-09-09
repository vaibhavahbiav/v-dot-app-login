import { useState } from "react";
import Phone from "./components/Phone";
import Greetings from "./components/Greetings";
import JustAccept from "./components/JustAccept";
import Loading from "./components/Loading";
import EmailSignup from "./components/EmailSignup";
import OtpThing from "./components/OtpThing";
import SetName from "./components/SetName";
import SetUsername from "./components/SetUsername";
import Pronouns from "./components/Pronouns";
import SetDob from "./components/SetDob";
import FinishingUp from "./components/FinishingUp";
import Profile from "./components/Profile";

const bgPattern = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='25' height='25' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%23ffeb3bff'/><path d='M25 30a5 5 0 110-10 5 5 0 010 10zm0-25a5 5 0 110-10 5 5 0 010 10zM0 30a5 5 0 110-10 5 5 0 010 10zM0 5A5 5 0 110-5 5 5 0 010 5zm12.5 12.5a5 5 0 110-10 5 5 0 010 10z'  stroke-width='1' stroke='none' fill='%239c27b0ff'/><path d='M0 15a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm25 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM12.5 2.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 25a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'  stroke-width='1' stroke='none' fill='%23f44336ff'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`;

function App() {
  const [history, setHistory] = useState(["greetings"]);
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    username: "",
    pronouns: [],
    dob: "",
  });

  const screen = history[history.length - 1];

  const goTo = (nextScreen) => {
    setHistory((prev) => [...prev, "loading"]);
    setTimeout(() => {
      setHistory((prev) => [...prev.slice(0, -1), nextScreen]);
    }, 1500);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;

      let newHistory = prev.slice(0, -1);
      const landingScreen = newHistory[newHistory.length - 1];

      // skip otp because makes sense
      if (landingScreen === "otpThing" && newHistory.length > 1) {
        newHistory = newHistory.slice(0, -1);
      }

      return newHistory;
    });
  };

  const updateProfile = (fields) =>
    setProfile((prev) => ({ ...prev, ...fields }));

  return (
    <main
      className="w-full min-h-screen flex items-center justify-center"
      style={{ backgroundImage: bgPattern }}
    >
      <Phone>
        {screen === "greetings" && (
          <Greetings onContinue={() => goTo("justAccept")} />
        )}
        {screen === "justAccept" && (
          <JustAccept onAccept={() => goTo("emailSignup")} onBack={goBack} />
        )}
        {screen === "emailSignup" && (
          <EmailSignup
            onContinue={(email) => {
              updateProfile({ email });
              goTo("otpThing");
            }}
            onBack={goBack}
          />
        )}
        {screen === "otpThing" && (
          <OtpThing
            email={profile.email}
            onVerified={() => goTo("setName")}
            onResendRequest={() => {}}
            onBack={goBack}
          />
        )}
        {screen === "setName" && (
          <SetName
            initialvalue={profile.name}
            onContinue={(name) => {
              updateProfile({ name });
              goTo("setUsername");
            }}
            onBack={goBack}
          />
        )}
        {screen === "setUsername" && (
          <SetUsername
            initialvalue={profile.username}
            onContinue={(username) => {
              updateProfile({ username });
              goTo("pronouns");
            }}
            onBack={goBack}
          />
        )}
        {screen === "pronouns" && (
          <Pronouns
            onContinue={(pronouns) => {
              updateProfile({ pronouns });
              goTo("setDob");
            }}
            onBack={goBack}
          />
        )}
        {screen === "setDob" && (
          <SetDob
            onContinue={(dob) => {
              updateProfile({ dob });
              goTo("finishingUp");
            }}
            onBack={goBack}
          />
        )}
        {screen === "finishingUp" && (
          <FinishingUp
            onDone={() =>
              setHistory((prev) => [...prev.slice(0, -1), "profile"])
            }
          />
        )}
        {screen === "profile" && (
          <Profile
            profile={profile}
            onClose={() => {
              setProfile({
                email: "",
                name: "",
                username: "",
                pronouns: [],
                dob: "",
              });
              setHistory(["greetings"]);
            }}
          />
        )}
        {screen === "loading" && <Loading />}
      </Phone>
    </main>
  );
}

export default App;
