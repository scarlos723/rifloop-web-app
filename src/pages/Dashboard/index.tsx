import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="container">
      <div className="container text-center py-10">
        <h1 className="text-2xl font-bold mb-4">No tienes rifas creadas</h1>
        <p className="text-gray-600 mb-6">
          Aún no has creado ninguna rifa. ¡Por favor, crea una para comenzar!
        </p>
        <Button asChild>
          <Link to={ROUTES.DASHBOARD.CREATE_RAFFLE}>Crear una rifa</Link>
        </Button>
      </div>
    </div>
  );
};
