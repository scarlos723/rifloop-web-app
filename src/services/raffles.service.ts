import { initDB } from "@/lib/db";
import type { Raffle } from "@/models/raffles.model";
import { createTickets } from "./tickets.service";
const STORE_NAME = "raffles";

// Crear una sorteo
export const createRaffle = async (raffle: Raffle): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(raffle);

    request.onsuccess = async () => {
      await createTickets({
        numberOfTickets: raffle.ticketsNumber,
        raffleId: request.result as number,
        ticketPrice: raffle.price,
        digit: raffle.digit,
      });
      resolve(request.result as number);
    };
    request.onerror = () => reject(request.error);
  });
};

// Obtener todas las sorteos
export const getAllRaffles = async (): Promise<Raffle[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Raffle[]);
    request.onerror = () => reject(request.error);
  });
};

// Obtener una sorteo por ID
export const getRaffleById = async (id: number): Promise<Raffle | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result as Raffle | null);
    request.onerror = () => reject(request.error);
  });
};

// Actualizar una sorteo
export const updateRaffle = async (raffle: Raffle): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(raffle);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Eliminar una sorteo
export const deleteRaffle = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getRafflesByUserId = async (userId: string): Promise<Raffle[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const raffles: Raffle[] = request.result as Raffle[];
      const userRaffles = raffles.filter((raffle) => raffle.userId === userId);
      resolve(userRaffles);
    };
    request.onerror = () => reject(request.error);
  });
};
