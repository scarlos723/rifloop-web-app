import { TicketCard } from "@/components/TicketCard";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getPublicLink } from "@/lib/publicLink";
import type { Raffle } from "@/models/raffles.model";
import type { Ticket } from "@/models/ticket.model";
import { getRaffleById } from "@/services/raffles.service";
import { getTicketsByRaffleId } from "@/services/tickets.service";
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
                  <p>
                    <strong>Progreso: </strong>
                    <br />
                    {progress}%
                  </p>
                  <Progress value={progress} className="w-full h-2" />
                </div>
              )}
              {raffle.id !== undefined && (
                <div className="mt-4">
                  <p>
                    <strong>Enlace público: </strong>
                    <br />
                    <small>
                      Comparte este enlace para que otros puedan comprar tickets
                    </small>
                  </p>
                  <button
                    className="border p-2 flex gap-4 items-center justify-between rounded-md transition hover:bg-gray-700 cursor-copy "
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
