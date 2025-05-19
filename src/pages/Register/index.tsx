import { ROUTES } from "@/config/routes";
import { SignUp, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const { isSignedIn } = useUser();

  return (
    <main className="container py-10 text-center grid place-content-center gap-8">
      {isSignedIn ? (
        <Navigate to={ROUTES.DASHBOARD.ROOT} replace></Navigate>
      ) : (
        <SignUp forceRedirectUrl={ROUTES.DASHBOARD.ROOT}></SignUp>
      )}
    </main>
  );
};
