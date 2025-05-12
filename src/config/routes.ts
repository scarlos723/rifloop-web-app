const DASHBOARD_PATH = "/dashboard";

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  NOT_FOUND: "*",
  DASHBOARD: {
    ROOT: `/${DASHBOARD_PATH}`,
    PROFILE: `/${DASHBOARD_PATH}/profile`,
  },
};
