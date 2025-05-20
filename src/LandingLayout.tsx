import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { ModeToggle } from "./components/ModeToggle";
import { Navbar } from "./components/Navbar";

const LIGHT_GRADIENT =
  "bg-gradient-to-b from-[#f8fafc] via-[#6366f1] to-[#38bdf8]";
const DARK_GRADIENT =
  "dark:from-[#0f172a] dark:via-[#312e81] dark:to-[#0ea5e9]";
export const LandingLayout = () => {
  return (
    <div
      className={`bg-gradient-to-b  ${LIGHT_GRADIENT} ${DARK_GRADIENT} flex flex-col min-h-screen`}
    >
      <div className="container grid justify-end pt-4">
        <ModeToggle />
      </div>
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
