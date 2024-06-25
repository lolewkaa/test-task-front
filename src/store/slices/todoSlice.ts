import { createSlice } from "@reduxjs/toolkit";
import ITodo from "../../types/types";

type todosState = {
  title: string;
  description: string;
  subTasks: Array<ITodo>;
  isSubTask: boolean;
};

const initialState: todosState = {
  title: "",
  description: "",
  isSubTask: false,
  subTasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoTitle: (state, action) => {
      state.title = action.payload;
    },
    setTodoDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setTodoTitle, setTodoDescription } = todoSlice.actions;

export default todoSlice.reducer;
