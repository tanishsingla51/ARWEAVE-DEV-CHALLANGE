import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ArConnectStrategy from "@arweave-wallet-kit/arconnect-strategy";
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "ACCESS_PUBLIC_KEY",
          "SIGN_TRANSACTION",
          "DISPATCH",
        ],
        ensurePermissions: true,
        strategies: [new ArConnectStrategy()],
      }}
    >
      <App />
    </ArweaveWalletKit>
  </React.StrictMode>
);
