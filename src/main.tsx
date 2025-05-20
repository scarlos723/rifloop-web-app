import { ClerkProvider } from "@clerk/clerk-react";
import { esES } from "@clerk/localizations";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import "./index.css";
import { createDummyRaffle } from "./lib/setDummieData.ts";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const DUMMY_RAFFLE_KEY = "dummyRaffleCreated";
if (!localStorage.getItem(DUMMY_RAFFLE_KEY)) {
  createDummyRaffle();
  localStorage.setItem(DUMMY_RAFFLE_KEY, "true");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      localization={esES}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>
);
