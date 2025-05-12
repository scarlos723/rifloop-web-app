import { ROUTES } from "@/config/routes";
import { SignUp } from "@clerk/clerk-react";

export const Register = () => {
  return (
    <main className="container py-10 text-center grid place-content-center gap-8">
      <SignUp forceRedirectUrl={ROUTES.DASHBOARD.ROOT}></SignUp>
    </main>
  );
};
