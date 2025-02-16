import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContext from "./context/AuthContext";
import "./index.css";
import Routes from "./routes/Routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <Routes />
      </AuthContext>
    </QueryClientProvider>
  </StrictMode>
);
