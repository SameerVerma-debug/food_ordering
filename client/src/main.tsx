import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0ProviderWithNavigate } from "./auth/auth0ProviderWithNavigate.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </React.StrictMode>
);
