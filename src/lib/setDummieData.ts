import { createRaffle } from "@/services/raffles.service";

export const createDummyRaffle = async () => {
  await createRaffle({
    title: "sorteo de prueba",
    description: "Esta es una sorteo de prueba",
    price: 10000,
    ticketsNumber: 10,
    finishDate: new Date("2023-12-31"),
    digit: 1,
    userId: "testUserId",
  });
};
