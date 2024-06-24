import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import todosReducer from "./slices/todosSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
