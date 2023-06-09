import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContext from "./utlits/AuthContext";
import { HashRouter } from "react-router-dom";
import ProductContext from "./utlits/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="888681495279-m5caeer5htnbdlosa8du7fnbftbidfn2.apps.googleusercontent.com">
    <React.StrictMode>
      <HashRouter>
        <AuthContext>
          <ProductContext>
            <App />
          </ProductContext>
        </AuthContext>
      </HashRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
