import { useRoutes } from "react-router-dom";
import { AuthGuard } from "./components/AuthGuard";
import { NotFound } from "./components/NotFound";
import { ROUTES } from "./config/routes";
import { LandingLayout } from "./LandingLayout";
import { initDB } from "./lib/db";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Dashboard/Profile";
import { RaffleDetail } from "./pages/Dashboard/RaffleDetails";
import { RaffleForm } from "./pages/Dashboard/RaffleForm";
import { Raffles } from "./pages/Dashboard/Raffles";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
const initializeApp = async () => {
  try {
    await initDB();
    console.log("Base de datos inicializada correctamente.");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
};
function App() {
  initializeApp();
  const element = useRoutes([
    {
      element: <LandingLayout />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />,
        },
        {
          path: ROUTES.REGISTER,
          element: <Register />,
        },
        {
          path: ROUTES.LOGIN,
          element: <Login />,
        },
        {
          path: ROUTES.DASHBOARD.ROOT,
          element: <AuthGuard />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: ROUTES.DASHBOARD.PROFILE,
              element: <Profile />,
            },
            {
              path: ROUTES.DASHBOARD.CREATE_RAFFLE,
              element: <RaffleForm />,
            },
            {
              path: ROUTES.DASHBOARD.LIST_RAFFLES,
              element: <Raffles />,
            },
            {
              path: `${ROUTES.DASHBOARD.RAFFLE}`,

              element: <RaffleDetail />,
            },
          ],
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <NotFound />,
        },
      ],
    },
  ]);
  return element;
}

export default App;
