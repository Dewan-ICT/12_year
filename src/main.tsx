import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Home from "./views/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Gift from "./components/Gift";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="w-full relative overflow-hidden">
      <Header />
      <Gift />
      <Home />
      <Footer />
    </main>
  </React.StrictMode>
);
