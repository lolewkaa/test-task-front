import React from "react";
import styles from "./TodoList.module.css";

import TodoListItem from "../TodoListItem/TodoListItem.tsx";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { setTodoValue } from "../../../store/slices/todoSlice.ts";
import { addTodos } from "../../../store/slices/todosSlice.ts";

const TodoList = () => {
  const dispatch = useDispatch();
  const useAppSelector = useSelector.withTypes<RootState>();
  const todo = useAppSelector((state) => state.todo.value);
  const todos = useAppSelector((state) => state.todos.value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTodoValue(e.target.value));
  }
  function addTodo() {
    if (todo !== "") {
      dispatch(addTodos([...todos, { todo }]));
      dispatch(setTodoValue(""));
    }
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoList__container}>
        <Input value={todo} onChange={handleChange} fullWidth></Input>
        <Button onClick={addTodo} variant="contained">Add</Button>
      </div>
      {todos.map((item: string, index: number) => (
        <TodoListItem
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

export default TodoList;
