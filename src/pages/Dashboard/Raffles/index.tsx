import { ROUTES } from "@/config/routes";
import type { Raffle } from "@/models/raffles.model";
import { getRafflesByUserId } from "@/services/raffles.service";
import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Raffles = () => {
  const { user } = useUser();
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllRaffles = async (id: string) => {
      try {
        const response = await getRafflesByUserId(id);
        setRaffles(response);
      } catch (error) {
        console.error("Error fetching raffles", error);
      }
    };
    if (user?.id) {
      fetchAllRaffles(user.id);
    }
  }, [user]);
  return (
    <main className="container py-10">
      <h2 className="text-2xl font-bold mb-5">Tus sorteos</h2>
      <div className="flex flex-wrap gap-4">
        {raffles.map((raffle) => (
          <div key={raffle.id}>
            <article className="w-[300px] p-4 rounded-md shadow-md bg-gray-200/50 dark:bg-gray-800/50">
              <div className="w-[200px]rounded-lg overflow-hidden">
                <p className="capitalize">
                  <strong>{raffle.title}</strong>
                </p>
              </div>

              <p className="text-gray-500">{raffle.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p>{raffle.ticketsNumber} tickets</p>
                <Button
                  onClickCapture={() => {
                    navigate(
                      `${ROUTES.DASHBOARD.RAFFLE}?raffleId=${raffle.id}`
                    );
                  }}
                >
                  ver detalles
                </Button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
};
