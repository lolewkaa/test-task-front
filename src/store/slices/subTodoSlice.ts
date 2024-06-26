import { createSlice } from "@reduxjs/toolkit";
import ITodo from "../../types/types";

type todosState = {
  title: string;
  description: string;
  subTasks: Array<ITodo>;
  isSubTask: boolean;
  parentId: number | null
};

const initialState: todosState = {
  title: "",
  description: "",
  isSubTask: true,
  subTasks: [],
  parentId: null
};

const todoSlice = createSlice({
  name: "subTodo",
  initialState,
  reducers: {
    setSubTodoTitle: (state, action) => {
      state.title = action.payload;
    },
    setSubTodoDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setSubTodoTitle, setSubTodoDescription } = todoSlice.actions;

export default todoSlice.reducer;