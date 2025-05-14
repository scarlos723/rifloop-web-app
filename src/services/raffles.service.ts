import { initDB } from "@/lib/db";
import type { Raffle } from "@/models/raffles.model";
const STORE_NAME = "raffles";

// Crear una rifa
export const createRaffle = async (raffle: Raffle): Promise<number> => {
  const db = await initDB(STORE_NAME);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(raffle);

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

// Obtener todas las rifas
export const getAllRaffles = async (): Promise<Raffle[]> => {
  const db = await initDB(STORE_NAME);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Raffle[]);
    request.onerror = () => reject(request.error);
  });
};

// Obtener una rifa por ID
export const getRaffleById = async (
  id: number
): Promise<Raffle | undefined> => {
  const db = await initDB(STORE_NAME);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result as Raffle | undefined);
    request.onerror = () => reject(request.error);
  });
};

// Actualizar una rifa
export const updateRaffle = async (raffle: Raffle): Promise<void> => {
  const db = await initDB(STORE_NAME);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(raffle);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Eliminar una rifa
export const deleteRaffle = async (id: number): Promise<void> => {
  const db = await initDB(STORE_NAME);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
