import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Data/Store";


const dom = document.getElementById("root");
const root = createRoot(dom);
root.render(
    <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
         
        </BrowserRouter>
        
    </React.StrictMode>    
)