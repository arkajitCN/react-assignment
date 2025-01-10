import { configureStore } from "@reduxjs/toolkit";
import workflowReducer from "./slice/workflow-slice";

export const store = configureStore({
  reducer: {
    workflow: workflowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;