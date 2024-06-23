import { createSlice } from "@reduxjs/toolkit";

type todosState = {
  value: string
}

const initialState: todosState = {
  value: '',
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoValue: (state, action) => {
      state.value = action.payload;
    },

  },
});

export const { setTodoValue } = todoSlice.actions;

export default todoSlice.reducer;