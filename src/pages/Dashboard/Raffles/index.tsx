import type { Raffle } from "@/models/raffles.model";
import { getAllRaffles } from "@/services/raffles.service";
import { format } from "date-fns";
import { useEffect, useState } from "react";
export const Raffles = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);

  const dateToFormatString = (date?: Date) => {
    return date ? format(date, "yyyy-MM-dd") : "Hasta vender todos los tikets"; // Formato YYYY-MM-DD
  };

  const formatNumberToCurrency = (number: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

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
    <main className="container bg-white py-10">
      <h2 className="text-2xl font-bold mb-5">Tus rifas</h2>
      <div className=" grid lg:grid-cols-3 gap-4">
        {raffles.map((raffle) => (
          <div
            key={raffle.id}
            className="border p-5 mb-4 rounded-lg flex gap-4"
          >
            <div className="w-20 aspect-square  mb-2">
              {(raffle?.images ?? []).length > 0 ? (
                <img
                  src={(raffle.images ?? [])[0]}
                  alt="raffle image "
                  className="w-full h-full aspect-square object-cover"
                />
              ) : (
                <div />
              )}
            </div>
            <div className="grid">
              <h2>{raffle.title}</h2>
              <p>Price: {formatNumberToCurrency(raffle.price)}</p>
              <p>
                Finish Date: {dateToFormatString(raffle?.finishDate) || ""}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
