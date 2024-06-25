import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Home from "./views/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "cropperjs/dist/cropper.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="w-full relative overflow-hidden">
      <Header />
      <Home />
      <Footer />
    </main>
  </React.StrictMode>
);
