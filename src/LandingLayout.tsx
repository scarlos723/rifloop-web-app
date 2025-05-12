import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
export const LandingLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
};
