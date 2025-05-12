import { ROUTES } from "@/config/routes";
import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
  return (
    <main className="container py-10 text-center grid gap-8">
      <SignIn forceRedirectUrl={ROUTES.DASHBOARD.ROOT}></SignIn>
    </main>
  );
};
