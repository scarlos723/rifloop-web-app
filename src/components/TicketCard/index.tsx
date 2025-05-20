import type { Ticket } from "@/models/ticket.model";
import { TicketIcon } from "lucide-react";
export const TicketCard = (props: { item: Ticket; isSelected?: boolean }) => {
  const { item, isSelected } = props;

  return (
    <article
      className={
        isSelected
          ? "border-2 border-amber-400 rounded-md p-1 cursor-pointer"
          : ""
      }
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
