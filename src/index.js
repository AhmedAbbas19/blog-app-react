import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import * as serviceWorker from "./serviceWorker";
import { Index } from "./components/index";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Index />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
