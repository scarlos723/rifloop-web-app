import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main className="container py-10">
      <div className="text-center grid gap-8">
        <h1 className="text-5xl font-bold">
          Crea y Administra Tus Sorteos de Forma Fácil y Rápida
        </h1>
        <p>
          Lanza tus sorteos personalizados, comparte tu enlace y permite que tus
          compradores paguen en línea sin complicaciones. ¡Tú solo preocúpate
          por el premio!
        </p>
        <p>
          ¿Listo para lanzar tu primer sorteo? Crea tu cuenta gratis y empieza a
          rifar de forma simple, profesional y segura.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link to={ROUTES.REGISTER} className="text-white">
              Crear cuenta
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
