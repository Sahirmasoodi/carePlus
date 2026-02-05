import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore, { persistor } from "./store/appStore.js";
import { PersistGate } from "redux-persist/integration/react";
import { PopupProvider } from "./components/PopupMessage/PopupContext.jsx";

createRoot(document.getElementById("root")).render(
  <div className="bg-[#EFF4FE]">
    <BrowserRouter>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <PopupProvider>
            <App />
          </PopupProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </div>,
);
