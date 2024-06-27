import { createSlice } from "@reduxjs/toolkit";
import ITodo from "../../types/types";
import { v4 as uuidv4 } from "uuid";

type todosState = {
  value: Array<ITodo>;
};

const initialState: todosState = {
  value: [
    {
      id: uuidv4(),
      title: "Make toDo list",
      description: "I'm crying",
      isSubTask: false,
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteTodos: (state, action) => {
      const newArr = state.value.filter((el) => action.payload !== el.id);
      state.value = newArr;
    },
    saveNewTodo: (state, { payload }) => {
      const newarr = payload.newarr;
      const index = payload.index;
      const newTask = payload.newTask;
      newarr.splice(index, 1, newTask);
      state.value = newarr;
    },
  },
});

export const { addTodos, deleteTodos, saveNewTodo } = todosSlice.actions;

export default todosSlice.reducer;
