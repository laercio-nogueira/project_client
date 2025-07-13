import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import clientsReducer from "./states/clients/clientsSlice";
import { ClientApi } from "./states/clients/clientsApi";
import userReducer from "./states/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "clients"],
};

const rootReducer = combineReducers({
  clients: clientsReducer,
  user: userReducer,
  [ClientApi.reducerPath]: ClientApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ClientApi.middleware),
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
