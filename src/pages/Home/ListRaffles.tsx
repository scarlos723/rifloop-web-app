import { RaffleCard } from "@/components/RaffleCard";
import type { Raffle } from "@/models/raffles.model";
import { getAllRaffles } from "@/services/raffles.service";
import { useEffect, useState } from "react";

const ListRaffles = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const fetchRaffles = async () => {
    try {
      const response = await getAllRaffles();

      setRaffles(response);
    } catch (error) {
      console.error("Error fetching raffles", error);
    }
  };
  useEffect(() => {
    fetchRaffles();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {raffles.map((raffle) => (
        <div key={raffle.id}>
          <RaffleCard item={raffle}></RaffleCard>
        </div>
      ))}
    </div>
  );
};

export default ListRaffles;
