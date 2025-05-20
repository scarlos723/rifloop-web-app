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

  for (let i = 0; i < numberOfTickets; i++) {
    tickets.push({
      raffleId,
      ticketPrice,
      ticketNumber: `${i}`.padStart(digit, "0"),
      ticketStatus: "available",
      ticketDate: new Date().toISOString(),
    });
  }

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

export const updateStateOfTickets = async (
  ticketIds: number[],
  newStatus: string
): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    let updatedCount = 0;
    ticketIds.forEach((id) => {
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const ticket = getRequest.result;
        if (ticket) {
          ticket.ticketStatus = newStatus;
          const updateRequest = store.put(ticket);
          updateRequest.onsuccess = () => {
            updatedCount++;
            if (updatedCount === ticketIds.length) {
              resolve();
            }
          };
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          updatedCount++;
          if (updatedCount === ticketIds.length) {
            resolve();
          }
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });

    transaction.onerror = () => reject(transaction.error);
  });
};
