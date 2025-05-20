import { RaffleCard } from "@/components/RaffleCard";
import { Input } from "@/components/ui/input";
import type { Raffle } from "@/models/raffles.model";
import { getAllRaffles } from "@/services/raffles.service";
import { useEffect, useState } from "react";

export const PublicRaffles = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [filteredRaffles, setFilteredRaffles] = useState<Raffle[]>([]);
  const fetchRaffles = async () => {
    try {
      const response = await getAllRaffles();
      setRaffles(response);
      setFilteredRaffles(response);
    } catch (error) {
      console.error("Error fetching raffles", error);
    }
  };
  useEffect(() => {
    fetchRaffles();
  }, []);
  return (
    <main className="container">
      <h1 className="text-2xl font-bold my-10">
        Explora Rifas Públicas
        <span className="text-gray-500 text-sm">
          {" "}
          (Puedes participar sin necesidad de registrarte)
        </span>
      </h1>
      <Input
        placeholder="Buscar rifas"
        className="mb-10"
        onChange={(e) => {
          const searchValue = e.target.value.toLowerCase();
          const filtered = raffles.filter((raffle) =>
            raffle.title.toLowerCase().includes(searchValue)
          );
          setFilteredRaffles(filtered);
        }}
      ></Input>
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredRaffles.map((raffle) => (
          <div key={raffle.id}>
            <RaffleCard item={raffle}></RaffleCard>
          </div>
        ))}
      </div>
    </main>
  );
};
