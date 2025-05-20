import { ROUTES } from "@/config/routes";
import { SignOutButton } from "@clerk/clerk-react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
export const DesktopMenu = (props: { isSignedIn: boolean | undefined }) => {
  const { isSignedIn } = props;
  return (
    <div className="hidden lg:block">
      {isSignedIn ? (
        <ul className=" items-center gap-4 flex">
          <li>
            <Link to={ROUTES.DASHBOARD.ROOT}>Dashboard</Link>
          </li>
          <li>
            <Link to={ROUTES.DASHBOARD.CREATE_RAFFLE}>Crear sorteo</Link>
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
  );
};
