import React from "react";
import styles from "./TodoList.module.css";

import TodoListItem from "./TodoListItem.tsx";
import { Button, Input } from "@mui/material";

const TodoList = () => {
  return (
    <div className={styles.todoList}>
      <div className={styles.todoList__container}>
        <Input></Input>
        <Button variant="contained">Add</Button>
      </div>
    </div>
  );
};

export default TodoList;
