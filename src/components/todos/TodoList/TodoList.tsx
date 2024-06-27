import React, { useState } from "react";
import styles from "./TodoList.module.css";
import TodoListItem from "../TodoListItem/TodoListItem.tsx";
import { Button, Input } from "@mui/material";
// import {
//   setTodoDescription,
//   setTodoTitle,
// } from "../../../store/slices/todoSlice.ts";
import { addTodos, deleteTodos } from "../../../store/slices/todosSlice.ts";
import ITodo from "../../../types/types.ts";
import { useAppSelector, useAppDispatch } from "../../../hooks/ReduxHooks.ts";
import { v4 as uuidv4 } from 'uuid';

type propsTodoList = {
  todos: Array<ITodo>;
  isSubTask: boolean;
};

const TodoList: React.FC<propsTodoList> = ({ todos, isSubTask }) => {
  const dispatch = useAppDispatch();
  // const todo = useAppSelector((state) => state.todo);
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDes, setTodoDes] = useState('')
  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoDes(e.target.value);
  }

  const todosRedux = useAppSelector((state) => state.todos.value)

  function addTodo() {
    if (todoTitle !== "" && todoDes !== "") {
      dispatch(
        addTodos({

            id: uuidv4(),
            title: todoTitle,
            description: todoDes,
            // subTasks: [],
            isSubTask: false,
            parentId: null,
          },
        )
      );
      setTodoTitle("");
      setTodoDes("");
    }
  }

  function deleteTodo(item: ITodo) {
    // const currentTodos = state.value
    // console.log(state.value)
    // console.log(currentTodos)
   
    const newArr = todosRedux.filter((el) => 
      // el.isSubTask ? item.id !== el.parentId || item.id !== el.id : item.id !== el.id 
    item.id !== el.id 
    )
    dispatch(deleteTodos(newArr));
  }

  return (
    <div className={styles.todoList}>
      {!isSubTask && (<div className={styles.todoList__container}>
        <Input
          value={todoTitle}
          onChange={handleChangeTitle}
          fullWidth
          placeholder="Title"
        ></Input>
        <Input
          value={todoDes}
          onChange={handleChangeDescription}
          fullWidth
          placeholder="Description"
        ></Input>
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
        </div>
        )}
      
  
      {todos.map((item: ITodo, index: number) => (
        <TodoListItem onDelete={() => deleteTodo(item)} key={item.id} item={item} />
      ))}
    </div>
  );
};

export default TodoList;
