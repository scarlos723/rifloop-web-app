import { UserProfile } from "@clerk/clerk-react";
export const Profile = () => {
  return (
    <main className="container grid place-content-center py-10">
      <UserProfile />
    </main>
  );
};
