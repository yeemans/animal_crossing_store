import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch";

const root = ReactDOM.createRoot(document.getElementById('root'));
window.cart = {}; 
window.itemCount = 0;

root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);