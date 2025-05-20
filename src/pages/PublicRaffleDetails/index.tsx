import { TicketCard } from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/config/routes";
import type { Raffle } from "@/models/raffles.model";
import type { Ticket } from "@/models/ticket.model";
import { getRaffleById } from "@/services/raffles.service";
import { getTicketsByRaffleId } from "@/services/tickets.service";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const PublicRaffleDetails = () => {
  const [searchParams] = useSearchParams();
  const raffleId = searchParams.get("raffleId");
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsSelected, setTicketsSelected] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [progress, setProgress] = useState(0);
  const fetchRaffle = async (id: number) => {
    try {
      const response = await getRaffleById(id);
      setRaffle(response);
    } catch (error) {
      console.error("Error fetching raffle", error);
    }
  };
  const fetchTickets = async (id: number) => {
    try {
      const response = await getTicketsByRaffleId(id);
      setTickets(response);
      setFilteredTickets(response);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  const navigate = useNavigate();
  const handleProgress = (tickets: Ticket[]) => {
    if (tickets) {
      const totalTickets = tickets.length;
      const soldTickets = tickets.filter(
        (ticket) => ticket.ticketStatus === "sold"
      ).length;
      const progressValue = Math.round((soldTickets / totalTickets) * 100);
      setProgress(progressValue);
    }
  };
  useEffect(() => {
    handleProgress(tickets);
  }, [tickets]);

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
    <main className="container grid lg:grid-cols-2 py-10 gap-4">
      <section>
        <h1 className="text-2xl font-bold">{raffle?.title}</h1>
        <hr className="my-3" />
        {raffle ? (
          <div>
            <p className="text-gray-500">{raffle.description}</p>

            <div className="rounded-md border p-2 mt-5 grid gap-1">
              <p>
                <strong>Precio:</strong>
                <br />$ {raffle.price} COP
              </p>
              <p>
                <strong>Tickets: </strong>
                <br />
                {raffle.ticketsNumber}
              </p>
              <p>
                <strong> Fecha de finalización: </strong>
                <br />
                {raffle.finishDate?.toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) || "Hasta vender todos los tickets"}
              </p>
              {!raffle.finishDate?.toString() && (
                <div className="grid">
                  <Progress value={progress} className="w-full h-2" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}

        <div className="p-5 mt-5 rounded-md border">
          {ticketsSelected.length > 0 ? (
            <div className="">
              <p>
                <strong>
                  {(
                    ticketsSelected.length * (raffle?.price ?? 0)
                  ).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}{" "}
                  {""}
                  COP
                </strong>
              </p>
            </div>
          ) : (
            <p>
              <strong>$ 0 COP </strong>
            </p>
          )}

          <Button
            type="button"
            className="mt-5"
            disabled={ticketsSelected.length === 0}
            onClick={() => {
              navigate(`${ROUTES.CHECKOUT}`, {
                state: {
                  tickets: ticketsSelected,
                  raffle: raffle,
                },
              });
            }}
          >
            Comprar {ticketsSelected.length} tickets
          </Button>
        </div>
      </section>
      <section>
        <div className="flex gap-2 items-center mb-5 justify-between">
          <h2 className="text-2xl font-bold">Selecciona tus números</h2>
          <div className="max-w-[300px]">
            <Input
              placeholder="Buscar número"
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
