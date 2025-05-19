import { ROUTES } from "@/config/routes";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { isSignedIn } = useUser();
  return (
    <main className="container py-10 text-center grid  place-content-center gap-8">
      {isSignedIn ? (
        <Navigate to={ROUTES.DASHBOARD.ROOT} replace></Navigate>
      ) : (
        <SignIn forceRedirectUrl={ROUTES.DASHBOARD.ROOT}></SignIn>
      )}
    </main>
  );
};
