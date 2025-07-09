import { createRoot } from "react-dom/client";
import React from "react";
import Router from "./Router.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";



createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Router />
    </BrowserRouter>

);
