import { configureStore } from "@reduxjs/toolkit";

import routeReducer from "./routeReducer.ts";
import { courseApi } from "../features/courseApi.ts";

const appStore = configureStore({
  reducer: routeReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      courseApi.middleware,
    ),
});


export default appStore;