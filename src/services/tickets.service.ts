import { initDB } from "@/lib/db";
import type { Ticket } from "@/models/ticket.model";

const STORE_NAME = "tickets";

export const createTickets = async (props: {
  numberOfTickets: number;
  raffleId: number;
  ticketPrice: number;
  digit: number;
}): Promise<void> => {
  const db = await initDB();

  const { numberOfTickets, raffleId, ticketPrice, digit } = props;
  const tickets: Ticket[] = [];
  console.log("props", props);
  for (let i = 0; i < numberOfTickets; i++) {
    tickets.push({
      raffleId,
      ticketPrice,
      ticketNumber: `${i}`.padStart(digit, "0"),
      ticketStatus: "available",
      ticketDate: new Date().toISOString(),
    });
  }
  console.log("tickets", tickets);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    tickets.forEach((ticket) => {
      store.add(ticket);
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getTicketsByRaffleId = async (
  raffleId: number
): Promise<Ticket[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const tickets: Ticket[] = [];

    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const ticket: Ticket = cursor.value;
        if (ticket.raffleId === raffleId) {
          tickets.push(ticket);
        }
        cursor.continue();
      } else {
        resolve(tickets);
      }
    };
    request.onerror = () => reject(request.error);
  });
};
