import { ROUTES } from "@/config/routes";

const URL = import.meta.env.VITE_DOMAIN_URL;

export const getPublicLink = (id: number): string => {
  const text = `${URL}${ROUTES.PUBLIC_RAFFLE_DETAILS}?raffleId=${id}`;
  return text;
};
