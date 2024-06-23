import { createSlice } from "@reduxjs/toolkit";

type todosState = {
  value: string
}

// Начальное значение
const initialState: todosState = {
  value: '',
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    setTodoValue: (state, action) => {
      state.value = action.payload;
    },

  },
});

export const { setTodoValue } = todoSlice.actions;

export default todoSlice.reducer;