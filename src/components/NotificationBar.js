import { useEffect, useState } from "react";
import batteryIcon from "../assets/icons/battery.png";

function NotificationBar() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute z-20 top-0 left-0 h-7 md:h-5 bg-white/20 shadow-lg border-b-2 border-neutral-50/10 w-full backdrop-blur-sm">
      <marquee
        className="absolute top-1 md:top-0 left-0 max-w-[40%]"
        direction="left"
      >
        <div className="text-base md:text-sm text-white">
          Made by <strong>Vaibhav</strong> and <strong>Internet</strong>.
        </div>
      </marquee>
      <span className="absolute top-1 md:top-0 left-1/2 -translate-x-1/2 text-base md:text-sm text-white">
        {time}
      </span>
      <img
        className="absolute top-1 right-3 md:top-0 md:right-2"
        src={batteryIcon}
        alt="mobile battery"
      />
    </div>
  );
}

export default NotificationBar;
