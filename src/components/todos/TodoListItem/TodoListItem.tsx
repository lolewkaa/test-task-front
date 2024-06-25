import { FC, useState } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../../types/types.ts";
import { Button, Input } from "@mui/material";
import {
  addSubTodos,
  addTodos,
} from "../../../store/slices/todosSlice.ts";
import { useAppSelector, useAppDispatch } from "../../../hooks/ReduxHooks.ts";
import {
  setSubTodoDescription,
  setSubTodoTitle,
} from "../../../store/slices/subTodoSlice.ts";

type TodoItemListProps = {
  item: ITodo;
  onDelete: (item: ITodo) => void;
};

const TodoListItem: FC<TodoItemListProps> = ({ item, onDelete }) => {
  const [newTodo, setIsNewTodo] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
    subTasks: item.subTasks,
  });
  const [isActiveInput, setIsActiveInput] = useState(false);
  const todos = useAppSelector((state) => state.todos.value);
  const subTodo = useAppSelector((state) => state.subTodo);

  const dispatch = useAppDispatch();

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: e.target.value,
      description: newTodo.description,
      subTasks: item.subTasks,
    });
  }
  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: newTodo.title,
      description: e.target.value,
      subTasks: item.subTasks,
    });
  }

  function handleChangeSubTitle(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSubTodoTitle(e.target.value));
  }

  function handleChangeSubDescription(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSubTodoDescription(e.target.value));
  }

  function saveTodo() {
    const index = todos.findIndex((el: ITodo) => el.id === item.id);
    const newarr = todos.slice();
    newarr.splice(index, 1, {
      id: newTodo.id,
      title: newTodo.title,
      description: newTodo.description,
      isSubTask: false,
      subTasks: newTodo.subTasks,
    });
    dispatch(addTodos(newarr));
    setIsActiveInput(false);
  }

  function addSubTodo(parentId: number, subtask: ITodo) {
    dispatch(
      addTodos([
        ...todos,
        {
          id: todos.length,
          title: subtask.title,
          description: subtask.description,
          subTasks: [],
          isSubTask: true,
        },
      ])
    );
    const subTaskObject = {
      id: todos.length,
      title: subTodo.title,
      description: subTodo.description,
      isSubTask: true,
      subTasks: [],
    };

    dispatch(
      addSubTodos({
        parentId: parentId,
        subtaskId: subTaskObject.id,
      })
    );

    console.log(todos);
    dispatch(setSubTodoTitle(""));
    dispatch(setSubTodoDescription(""));
    console.log(todos);
  }
  return (
    <div className={styles.item}>
      {isActiveInput && (
        <>
          <div className={styles.item__inputContainer}>
            <Input
              value={newTodo.title}
              onChange={handleChangeTitle}
              placeholder="Title"
              fullWidth
            />
            <Input
              value={newTodo.description}
              onChange={handleChangeDescription}
              placeholder="Description"
              fullWidth
            />
          </div>
          <div className={styles.item__buttonContainer}>
            <Button
              style={{ width: "90px" }}
              onClick={saveTodo}
              variant="contained"
            >
              Save
            </Button>
            <Button
              style={{ width: "90px" }}
              onClick={() => onDelete(item)}
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </>
      )}
      {isActiveInput === false && (
        <>
          <div className={styles.item__textContainer}>
            <p className={styles.item__title}>{item.title}</p>
            <p className={styles.item__description}>{item.description}</p>
          </div>
          <div className={styles.item__buttonContainer}>
            <Button
              style={{ width: "90px" }}
              variant="contained"
              onClick={() => setIsActiveInput(true)}
            >
              Change
            </Button>
            <Button
              style={{ width: "90px" }}
              onClick={() => onDelete(item)}
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={() => addSubTodo(item.id, subTodo)}
              style={{ width: "90px" }}
              variant="contained"
            >
              Subtask
            </Button>
            <Input
              value={subTodo.title}
              onChange={handleChangeSubTitle}
              placeholder="Title"
              fullWidth
            />
            <Input
              value={subTodo.description}
              onChange={handleChangeSubDescription}
              placeholder="Description"
              fullWidth
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoListItem;
