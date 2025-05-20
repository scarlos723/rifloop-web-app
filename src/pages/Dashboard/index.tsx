import { RaffleCard } from "@/components/RaffleCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import type { Raffle } from "@/models/raffles.model";
import { getAllRaffles } from "@/services/raffles.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Dashboard = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);

  useEffect(() => {
    const fetchAllRaffles = async () => {
      try {
        const response = await getAllRaffles();

        setRaffles(response);
      } catch (error) {
        console.error("Error fetching raffles", error);
      }
    };
    fetchAllRaffles();
  }, []);
  return (
    <main className="container py-10">
      {raffles.length > 0 ? <RafflesList raffles={raffles} /> : <NoRaffles />}
    </main>
  );
};

const NoRaffles = () => (
  <div className="container">
    <div className="container text-center py-10">
      <h1 className="text-2xl font-bold mb-4">No tienes rifas creadas</h1>
      <p className="text-gray-600 mb-6">
        Aún no has creado ninguna rifa. ¡Por favor, crea una para comenzar!
      </p>
      <Button asChild>
        <Link to={ROUTES.DASHBOARD.CREATE_RAFFLE}>Crear una rifa</Link>
      </Button>
    </div>
  </div>
);

const RafflesList = ({ raffles }: { raffles: Raffle[] }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Tus rifas</h2>
      <div className="flex flex-wrap gap-4">
        {raffles.map((raffle) => (
          <div key={raffle.id}>
            <RaffleCard item={raffle}></RaffleCard>
          </div>
        ))}
      </div>
    </>
  );
};
