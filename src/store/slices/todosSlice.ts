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
      isSubTask: false,
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
    addSubTodos: (state, { payload }) => {
      const parentId = payload.parentId;
      const subtaskId = payload.subtaskId;

      state.value.forEach((el) => {
        if (el.id === parentId) {
          el.subTasks?.push(subtaskId);
        }
      });
    },
  },
});

export const { addTodos, deleteTodos, addSubTodos } = todosSlice.actions;

export default todosSlice.reducer;
