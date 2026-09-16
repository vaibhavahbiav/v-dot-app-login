import NotificationBar from "./NotificationBar";

function Phone({ children }) {
  

  return (
    // phone
    <div className="relative overflow-hidden w-full h-[932px] md:w-[350px] md:h-[932px] md:max-h-[80vh] md:py-3 md:px-1 md:rounded-2xl md:border-[8px] md:border-black bg-stone-950 shadow-lg">
      {/* screen */}
      <div className="w-full h-full md:rounded-xl overflow-y-auto bg-black relative">
        <NotificationBar />
        {children}
      </div>
    </div>
  );
}

export default Phone;
