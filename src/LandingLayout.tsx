import { Outlet } from "react-router-dom";
import { ModeToggle } from "./components/ModeToggle";
import { Navbar } from "./components/Navbar";
export const LandingLayout = () => {
  return (
    <>
      <div className="container grid justify-end pt-4">
        <ModeToggle />
      </div>
      <Navbar></Navbar>

      <Outlet />
    </>
  );
};
