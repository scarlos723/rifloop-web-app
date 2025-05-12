import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="container ">
      <div className="container text-center py-10">
        <h1 className="text-2xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <p className="text-gray-600 mb-6">
          Por favor, verifica la URL o{" "}
          <Link to={ROUTES.HOME} className="underline">
            vuelve a la página de inicio
          </Link>
        </p>
      </div>
    </div>
  );
};
