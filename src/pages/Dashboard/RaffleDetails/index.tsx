import { DialogImages } from "@/components/DialogImages";
import { TicketCard } from "@/components/TicketCard";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getPublicLink } from "@/lib/publicLink";
import type { Raffle } from "@/models/raffles.model";
import type { Ticket } from "@/models/ticket.model";
import { getRaffleById } from "@/services/raffles.service";
import { getTicketsByRaffleId } from "@/services/tickets.service";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GoCopy } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
export const RaffleDetail = () => {
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
        <h1 className="text-2xl font-bold capitalize">{raffle?.title}</h1>
        <hr className="my-3" />
        {raffle ? (
          <div>
            <div className="">
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
                  {!raffle.finishDate?.toString() && (
                    <div className="grid">
                      <p>
                        <strong>Progreso: </strong>
                        <br />
                        {progress}%
                      </p>
                      <Progress value={progress} className="w-full h-2" />
                    </div>
                  )}
                </div>
              </div>

              {raffle.id !== undefined && (
                <div className="rounded-lg mt-4 bg-white/70 dark:bg-gray-900/60 p-5 shadow-m">
                  <p>
                    <strong>Enlace público: </strong>
                    <br />
                    <small>
                      Comparte este enlace para que otros puedan comprar tickets
                    </small>
                  </p>
                  <button
                    className="border p-2 flex gap-4 items-center justify-between rounded-md transition hover:bg-gray-700 hover:text-white cursor-copy "
                    onClick={() => {
                      if (!raffle.id) return;
                      navigator.clipboard.writeText(getPublicLink(raffle.id));
                      toast.success("Enlace copiado al portapapeles", {
                        description: "Puedes compartirlo con tus amigos",
                        duration: 2000,
                      });
                    }}
                  >
                    <p>{getPublicLink(raffle.id)}</p>
                    <div>
                      <GoCopy></GoCopy>
                    </div>
                  </button>
                </div>
              )}
            </div>
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
              <TicketCard item={ticket}></TicketCard>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
