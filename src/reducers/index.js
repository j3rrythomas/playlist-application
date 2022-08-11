import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import dataReducer from "./dataSlice";
import historyReducer from "./historySlice";

const persistConfig = {
  key: "history",
  storage,
};

const persistedReducer = persistReducer(persistConfig, historyReducer);

export const store = configureStore({
  reducer: {
    data: dataReducer,
    history: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
