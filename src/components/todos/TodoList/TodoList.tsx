import React from "react";
import styles from "./TodoList.module.css";

import TodoListItem from "../TodoListItem/TodoListItem.tsx";
import { Button, Input } from "@mui/material";
import {
  setTodoDescription,
  setTodoTitle,
} from "../../../store/slices/todoSlice.ts";
import { addTodos, deleteTodos } from "../../../store/slices/todosSlice.ts";
import ITodo from "../../../types/types.ts";
import { useAppSelector, useAppDispatch } from "../../../hooks/ReduxHooks.ts";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todoTitle = useAppSelector((state) => state.todo.title);
  const todoDescription = useAppSelector((state) => state.todo.description);
  const todoSubTasks = useAppSelector((state) => state.todo.subTasks);
  const todos = useAppSelector((state) => state.todos.value);

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTodoTitle(e.target.value));
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTodoDescription(e.target.value));
  }

  function addTodo() {
    if (todoTitle !== "" && todoDescription !== "") {
      dispatch(
        addTodos([
          ...todos,
          {
            id: todos.length,
            title: todoTitle,
            description: todoDescription,
            subTasks: todoSubTasks,
          },
        ])
      );
      console.log(todos);
      dispatch(setTodoTitle(""));
      dispatch(setTodoDescription(""));
    }
  }

  function deleteTodo(item: ITodo) {
    const newArr = todos.filter((elem: ITodo) => {
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
        <Input value={todoTitle} onChange={handleChangeTitle} fullWidth></Input>
        <Input
          value={todoDescription}
          onChange={handleChangeDescription}
          fullWidth
        ></Input>
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
      </div>
      {todos.map((item: ITodo, index: number) => (
        <TodoListItem onDelete={deleteTodo} key={index} item={item} />
      ))}
    </div>
  );
};

export default TodoList;
