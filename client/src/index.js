import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Toaster} from "react-hot-toast"
import { NextUIProvider } from "@nextui-org/react";
import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <div className="dark text-foreground bg-background h-full">
      <App />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  </NextUIProvider>
);
