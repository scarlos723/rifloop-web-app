import type { Ticket } from "@/models/ticket.model";
import { TicketIcon } from "lucide-react";
export const TicketCard = (props: { item: Ticket; isSelected?: boolean }) => {
  const { item, isSelected } = props;

  return (
    <article
      className={`transition-all rounded-sm ${
        isSelected
          ? "ring-2 ring-blue-500 scale-105 p-1"
          : "hover:ring-2 hover:ring-blue-300 hover:p-[0.5px]"
      }`}
    >
      <div className="grid grid-cols-[40px_1fr] cursor-default ">
        <div className="relative flex flex-col justify-center items-center shadow-lg rounded-tr-2xl bg-gray-700 rounded-br-2xl text-white">
          <TicketIcon></TicketIcon>
        </div>
        <section className="bg-gray-200 dark:bg-transparent rounded-bl-2xl shadow-lg rounded-tl-2xl p-2 border">
          <p className="font-bold text-xl"> {item.ticketNumber}</p>
          <div className="w-[100px]">
            <small>
              {item.ticketStatus === "available" && "🟢 Disponible"}
            </small>
            <small>{item.ticketStatus === "sold" && "🔴 Vendido"}</small>
          </div>
        </section>
      </div>
    </article>
  );
};
