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

type propsTodoList = {
  todos: Array<ITodo>;
};

const TodoList: React.FC<propsTodoList> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todo);

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTodoTitle(e.target.value));
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTodoDescription(e.target.value));
  }

  function addTodo() {
    if (todo.title !== "" && todo.description !== "") {
      dispatch(
        addTodos([
          ...todos,
          {
            id: todos.length,
            title: todo.title,
            description: todo.description,
            subTasks: todo.subTasks,
            isSubTask: false,
          },
        ])
      );
      console.log(todos);
      dispatch(setTodoTitle(""));
      dispatch(setTodoDescription(""));
    }
  }

  function deleteTodo(item: ITodo) {
    const arrSubTasksObjects: Array<ITodo> = [];
    item.subTasks?.forEach((el) => {
      const res = todos.find(function (elem) {
        const index = todos.indexOf(elem);
        return el === index;
      });
      arrSubTasksObjects.push(res);
    });

    const newArr = todos.filter((elem: ITodo) => {
      if (!arrSubTasksObjects.includes(elem) && elem !== item) {
        return true;
      }
      return false;
    });
    dispatch(deleteTodos(newArr));
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoList__container}>
        <Input
          value={todo.title}
          onChange={handleChangeTitle}
          fullWidth
          placeholder="Title"
        ></Input>
        <Input
          value={todo.description}
          onChange={handleChangeDescription}
          fullWidth
          placeholder="Description"
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
