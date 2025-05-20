import { createRaffle } from "@/services/raffles.service";

export const createDummyRaffle = async () => {
  await createRaffle({
    title: "Rifa de prueba",
    description: "Esta es una rifa de prueba",
    price: 10000,
    ticketsNumber: 10,
    finishDate: new Date("2023-12-31"),
    digit: 1,
    userId: "testUserId",
  });
};
