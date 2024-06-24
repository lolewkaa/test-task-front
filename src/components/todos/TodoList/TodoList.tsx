import React, { ReactNode } from "react";
import styles from "./TodoList.module.css";

import TodoListItem from "../TodoListItem/TodoListItem.tsx";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { setTodoValue } from "../../../store/slices/todoSlice.ts";
import { addTodos, deleteTodos } from "../../../store/slices/todosSlice.ts";

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

  function deleteTodo(item: ReactNode) {
    const newArr = todos.filter((elem) => {
      if (elem !== item) {
        return true;
      }
      return false;
    });
    dispatch(deleteTodos(newArr));
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoList__container}>
        <Input value={todo} onChange={handleChange} fullWidth></Input>
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
      </div>
      {todos.map((item: string, index: number) => (
        <TodoListItem onDelete={deleteTodo} key={index} item={item} />
      ))}
    </div>
  );
};

export default TodoList;
