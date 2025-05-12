import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <header className="px-10 py-4">
      <nav className="rounded-full py-4 px-10 shadow-md ">
        <ul className="flex gap-4 justify-between items-center">
          <li className="font-bold">
            <Link to="/">Rifloop</Link>
          </li>

          <li className="flex items-center gap-4">
            <Button asChild>
              <Link to={ROUTES.LOGIN}>Iniciar Sesión</Link>
            </Button>
            <Button variant={"secondary"} asChild>
              <Link to={ROUTES.REGISTER}>Registrarse</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
