import { TicketCard } from "@/components/TicketCard";
import { Input } from "@/components/ui/input";
import type { Raffle } from "@/models/raffles.model";
import type { Ticket } from "@/models/ticket.model";
import { getRaffleById } from "@/services/raffles.service";
import { getTicketsByRaffleId } from "@/services/tickets.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const RaffleDetail = () => {
  const [searchParams] = useSearchParams();
  const raffleId = searchParams.get("raffleId");
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsSelected, setTicketsSelected] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const fetchRaffle = async (id: number) => {
    try {
      const response = await getRaffleById(id);
      console.log("Raffle response", response);
      setRaffle(response);
    } catch (error) {
      console.error("Error fetching raffle", error);
    }
  };
  const fetchTickets = async (id: number) => {
    try {
      const response = await getTicketsByRaffleId(id);
      console.log("Tickets response", response);
      setTickets(response);
      setFilteredTickets(response);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  const addTicketToSelected = (ticket: Ticket) => {
    if (ticketsSelected.some((t) => t.id === ticket.id)) {
      // Si ya está seleccionado, lo quitamos
      setTicketsSelected(ticketsSelected.filter((t) => t.id !== ticket.id));
    } else {
      // Si no está seleccionado, lo agregamos
      setTicketsSelected([...ticketsSelected, ticket]);
    }
  };

  useEffect(() => {
    if (raffleId) {
      fetchRaffle(Number(raffleId));
      fetchTickets(Number(raffleId));
    }
  }, [raffleId]);
  return (
    <main className="container grid lg:grid-cols-2 py-10">
      <section>
        <h1 className="text-2xl font-bold mb-5">Detalles</h1>
        {raffle ? (
          <div>
            <h2 className="text-xl font-bold capitalize">{raffle.title}</h2>
            <p>{raffle.description}</p>
            <p>Precio: {raffle.price}</p>
            <p>Número de boletos: {raffle.ticketsNumber}</p>
            <p>
              Fecha de finalización:{" "}
              {raffle.finishDate?.toString() ||
                "Hasta vender todos los tickets"}
            </p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </section>
      <section>
        <div className="flex gap-2 items-center mb-5 justify-between">
          <h2 className="text-2xl font-bold">Numeros</h2>
          <div className="max-w-[300px]">
            <Input
              placeholder="Buscar ticket"
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  setFilteredTickets(
                    tickets.filter((ticket) =>
                      ticket.ticketNumber.includes(value)
                    )
                  );
                } else {
                  setFilteredTickets(tickets);
                }
              }}
            ></Input>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 max-h-[500px] overflow-y-auto">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} onClick={() => addTicketToSelected(ticket)}>
              <TicketCard
                item={ticket}
                isSelected={ticketsSelected.some((t) => t.id === ticket.id)}
              ></TicketCard>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
