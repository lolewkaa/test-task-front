import { createSlice } from "@reduxjs/toolkit";

type todosState = {
  value: string[];
};

const initialState: todosState = {
  value: [],
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
