import { createSlice } from "@reduxjs/toolkit";
import ITodo from "../../types/types";

type todosState = {
  value: Array<ITodo>;
};

const initialState: todosState = {
  value: [
    {
      id: 0,
      title: "Make toDo list",
      description: "I'm crying",
      subTasks: [],
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.value = action.payload;
    },
    deleteTodos: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTodos, deleteTodos } = todosSlice.actions;

export default todosSlice.reducer;
