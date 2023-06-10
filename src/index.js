import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext from "./utlits/AuthContext";
import { HashRouter } from "react-router-dom";
import ProductContext from "./utlits/ProductContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthContext>
        <ProductContext>
          <App />
        </ProductContext>
      </AuthContext>
    </HashRouter>
  </React.StrictMode>
);
