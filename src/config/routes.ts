const DASHBOARD_PATH = "/dashboard";

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  NOT_FOUND: "*",
  PUBLIC_RAFFLES: "/sorteos",
  PUBLIC_RAFFLE_DETAILS: "/sorteo",
  CHECKOUT: "/checkout",
  DASHBOARD: {
    ROOT: `${DASHBOARD_PATH}`,
    PROFILE: `${DASHBOARD_PATH}/perfil`,
    CREATE_RAFFLE: `${DASHBOARD_PATH}/nuevo-sorteo`,
    LIST_RAFFLES: `${DASHBOARD_PATH}/sorteos`,
    RAFFLE: `${DASHBOARD_PATH}/sorteo`,
  },
};
