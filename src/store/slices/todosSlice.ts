import { createSlice } from "@reduxjs/toolkit";
import ITodo from "../../types/types";
import { v4 as uuidv4 } from 'uuid';

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
      subTasks: [],
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      // state.value = action.payload;
      state.value = [...state.value, action.payload]
    },
    deleteTodos: (state, action) => {
      state.value = action.payload;
    },
    saveNewTodo: (state, action) => {
      state.value = action.payload;
      console.log(state.value)
    },
    addSubTodos: (state, { payload }) => {
      const objectParent = payload.objectParent
      const newTask = payload.newTask
     
      // objectParent.subTasks = [...objectParent.subTasks, newTask]
      // objectParent.subTasks?.push(newTask)
     
      // state.value.forEach((el) => {
      //   if (el.id === objectParent.id) {
      //     el.subTasks?.push(newTask);
      //   }
      // });
    },
  },
});

export const { addTodos, deleteTodos, addSubTodos, saveNewTodo } = todosSlice.actions;

export default todosSlice.reducer;
