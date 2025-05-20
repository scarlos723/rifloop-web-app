import { ROUTES } from "@/config/routes";
import { SignOutButton } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
export const MobileMenu = (props: { isSignedIn: boolean | undefined }) => {
  const { isSignedIn } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  return (
    <div className="relative lg:hidden" ref={menuRef}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <IoClose /> : <TiThMenu />}
      </button>
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-md rounded-lg p-4">
          {isSignedIn ? (
            <ul className=" items-center gap-4 grid">
              <li>
                <Link to={ROUTES.DASHBOARD.ROOT}>Dashboard</Link>
              </li>
              <li>
                <Link to={ROUTES.DASHBOARD.CREATE_RAFFLE}>Crear Rifa</Link>
              </li>
              <li>
                <Link to={ROUTES.DASHBOARD.LIST_RAFFLES}>Mis Sorteos</Link>
              </li>
              <li>
                <SignOutButton>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="flex items-center gap-2 text-red-500  border-red-500"
                  >
                    <span>Cerrar Sesión</span>
                    <FaSignOutAlt />
                  </Button>
                </SignOutButton>
              </li>
            </ul>
          ) : (
            <div className="flex gap-4">
              <Button asChild>
                <Link to={ROUTES.LOGIN}>Iniciar Sesión</Link>
              </Button>
              <Button variant={"secondary"} asChild>
                <Link to={ROUTES.REGISTER}>Registrarse</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
