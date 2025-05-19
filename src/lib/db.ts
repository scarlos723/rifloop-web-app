const DB_NAME = "RafflesDB";
const DB_VERSION = 1;

// Inicializa la base de datos
export const initDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("tickets")) {
        db.createObjectStore("tickets", { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("raffles")) {
        db.createObjectStore("raffles", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
