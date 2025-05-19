import { RaffleCard } from "@/components/RaffleCard";
import type { Raffle } from "@/models/raffles.model";
import { getAllRaffles } from "@/services/raffles.service";

import { useEffect, useState } from "react";
export const Raffles = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);

  useEffect(() => {
    const fetchAllRaffles = async () => {
      try {
        const response = await getAllRaffles();
        console.log("Raffles response", response);
        setRaffles(response);
      } catch (error) {
        console.error("Error fetching raffles", error);
      }
    };
    fetchAllRaffles();
  }, []);
  return (
    <main className="container py-10">
      <h2 className="text-2xl font-bold mb-5">Tus rifas</h2>
      <div className="flex flex-wrap gap-4">
        {raffles.map((raffle) => (
          <div key={raffle.id}>
            <RaffleCard item={raffle}></RaffleCard>
          </div>
        ))}
      </div>
    </main>
  );
};
