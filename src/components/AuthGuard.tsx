import { ROUTES } from "@/config/routes";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return (
      <div className="container py-10 text-center grid gap-8">Cargando...</div>
    );
  }
  return (
    <>{isSignedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />}</>
  );
};
