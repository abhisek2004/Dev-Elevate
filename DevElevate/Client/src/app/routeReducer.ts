import { combineReducers } from "@reduxjs/toolkit";
import { courseApi } from "../features/courseApi";

const routeReducer = combineReducers({
  [courseApi.reducerPath]: courseApi.reducer,
});

export default routeReducer;