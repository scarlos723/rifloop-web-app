import type { Ticket } from "@/models/ticket.model";
import { ImageIcon } from "lucide-react";
export const TicketCard = (props: { item: Ticket; isSelected: boolean }) => {
  const { item, isSelected } = props;
  return (
    <article className={isSelected ? "border-2 border-amber-400" : ""}>
      <div className="grid grid-cols-[80px_1fr] ">
        <div className="relative flex flex-col justify-center items-center shadow-lg rounded-tr-2xl bg-gray-700 rounded-br-2xl text-white">
          <span className=" text-xl">?</span>
          <ImageIcon></ImageIcon>
        </div>
        <section className="bg-gray-200 rounded-bl-2xl shadow-lg rounded-tl-2xl p-4 border">
          <p className="font-bold text-2xl"> {item.ticketNumber}</p>

          <p>{item.ticketStatus}</p>
        </section>
      </div>
    </article>
  );
};
