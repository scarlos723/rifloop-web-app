const DASHBOARD_PATH = "/dashboard";

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  NOT_FOUND: "*",
  DASHBOARD: {
    ROOT: `${DASHBOARD_PATH}`,
    PROFILE: `${DASHBOARD_PATH}/perfil`,
    CREATE_RAFFLE: `${DASHBOARD_PATH}/nuevo-sorteo`,
    LIST_RAFFLES: `${DASHBOARD_PATH}/sorteos`,
    RAFFLE: `${DASHBOARD_PATH}/sorteo`,
  },
};
