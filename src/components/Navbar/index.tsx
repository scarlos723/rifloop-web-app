import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
export const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="px-10 py-4 sticky top-2 z-10">
      <nav className="rounded-full py-4 px-10 shadow-md  backdrop-blur-lg dark:border dark:border-gray-700 bg-white/40 dark:bg-gray-800/40">
        <div className="flex gap-4 justify-between items-center">
          <div className="font-bold">
            <Link to="/">Rifloop</Link>
          </div>
          <DesktopMenu isSignedIn={isSignedIn} />
          <MobileMenu isSignedIn={isSignedIn} />
        </div>
      </nav>
    </header>
  );
};
