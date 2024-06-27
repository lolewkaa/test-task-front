import React, { useState } from "react";
import styles from "./TodoList.module.css";
import TodoListItem from "../TodoListItem/TodoListItem.tsx";
import { Button, Input } from "@mui/material";
import { addTodos, deleteTodos } from "../../../store/slices/todosSlice.ts";
import ITodo from "../../../types/types.ts";
import { useAppDispatch } from "../../../hooks/ReduxHooks.ts";
import { v4 as uuidv4 } from "uuid";

type propsTodoList = {
  todos: Array<ITodo>;
  isSubTask: boolean;
};

const TodoList: React.FC<propsTodoList> = ({ todos, isSubTask }) => {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoDescription(e.target.value);
  }

  function addTodo() {
    if (todoTitle !== "" && todoDescription !== "") {
      dispatch(
        addTodos({
          id: uuidv4(),
          title: todoTitle,
          description: todoDescription,
          isSubTask: false,
          parentId: null,
        })
      );
      setTodoTitle("");
      setTodoDescription("");
    }
  }

  function deleteTodo(item: ITodo) {
    dispatch(deleteTodos(item.id));
  }

  return (
    <div className={styles.todoList}>
      {!isSubTask && (
        <div className={styles.todoList__container}>
          <Input
            value={todoTitle}
            onChange={handleChangeTitle}
            fullWidth
            placeholder="Title"
          ></Input>
          <Input
            value={todoDescription}
            onChange={handleChangeDescription}
            fullWidth
            placeholder="Description"
          ></Input>
          <Button onClick={addTodo} variant="contained">
            Add
          </Button>
        </div>
      )}

      {todos.map((item: ITodo) => (
        <TodoListItem
          onDelete={() => deleteTodo(item)}
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default TodoList;
