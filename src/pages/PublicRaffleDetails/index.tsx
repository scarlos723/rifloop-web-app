import { DialogImages } from "@/components/DialogImages";
import { TicketCard } from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/config/routes";
import type { Raffle } from "@/models/raffles.model";
import type { Ticket } from "@/models/ticket.model";
import { getRaffleById } from "@/services/raffles.service";
import { getTicketsByRaffleId } from "@/services/tickets.service";
import { InfoIcon } from "lucide-react";
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
    <main className="container grid lg:grid-cols-2 py-10 gap-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-2">{raffle?.title}</h1>
        <hr className="my-4" />
        {raffle ? (
          <div>
            <DialogImages images={raffle.images ?? []} />
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-500 rounded-md p-4 mb-6 flex items-start gap-3 shadow-sm">
              <InfoIcon />
              <p className="text-gray-700 dark:text-gray-200 text-base">
                {raffle.description.charAt(0).toUpperCase() +
                  raffle.description.slice(1)}
              </p>
            </div>

            <div className="rounded-xl border bg-white/70 dark:bg-gray-900/60 p-5 shadow-md grid gap-4">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Precio:
                </span>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  $ {raffle.price?.toLocaleString("es-CO")} COP
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Tickets:
                </span>
                <div className="text-lg">{raffle.ticketsNumber}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Fecha de finalización:
                </span>
                <div>
                  {raffle.finishDate?.toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) || "Hasta vender todos los tickets"}
                </div>
              </div>
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

        <div className="p-6 mt-8 rounded-xl border bg-white/70 dark:bg-gray-900/60 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Total a pagar:</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              {ticketsSelected.length > 0
                ? (
                    ticketsSelected.length * (raffle?.price ?? 0)
                  ).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })
                : "$ 0"}{" "}
              COP
            </span>
          </div>
          <Button
            type="button"
            className="mt-4 w-full"
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
            Comprar {ticketsSelected.length > 0 ? ticketsSelected.length : ""}{" "}
            tickets
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
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-2">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() =>
                ticket.ticketStatus === "available" &&
                addTicketToSelected(ticket)
              }
            >
              <TicketCard
                item={ticket}
                isSelected={ticketsSelected.some((t) => t.id === ticket.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
