import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth.slice";
import appointmentReducer from "./slices/appointments/appointment.slice";
import profileReducer from "./slices/profile/profile.slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const CommonReducer = combineReducers({
  auth: authReducer,
  appointment: appointmentReducer,
  profile:profileReducer
});
const persistConfig = {
  key: "common",
  storage,
  whitelist: ["auth"],
};

const persistedCommonReducer = persistReducer(persistConfig, CommonReducer);

const appStore = configureStore({
  reducer: {
    common: persistedCommonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(appStore);
export default appStore;
