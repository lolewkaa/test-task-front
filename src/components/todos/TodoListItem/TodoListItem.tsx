import { FC, useEffect, useState } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../../types/types.ts";
import { Button, Checkbox, Input } from "@mui/material";
import { addTodos, saveNewTodo } from "../../../store/slices/todosSlice.ts";
import { useAppSelector, useAppDispatch } from "../../../hooks/ReduxHooks.ts";
import { v4 as uuidv4 } from "uuid";
import TodoList from "../TodoList/TodoList.tsx";
import {
  Create,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Save,
} from "@mui/icons-material";
import Popup from "../../layout/popup/popup.tsx";

type TodoItemListProps = {
  item: ITodo;
  onDelete: (item: ITodo) => void;
};

const TodoListItem: FC<TodoItemListProps> = ({ item, onDelete }) => {
  const [newTodo, setIsNewTodo] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
    isSubTask: item.isSubTask,
    parentId: item.parentId,
  });
  const [isActiveInput, setIsActiveInput] = useState(false);
  const todos = useAppSelector((state) => state.todos.value);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [subTaskDescription, setSubTaskDescription] = useState("");
  const [subData, setSubData] = useState<Array<ITodo>>([]);
  const [isVisibleSubtasks, setIsVisibleSubtasks] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useAppDispatch();

  function getSabtasks(): Array<ITodo> {
    const arrSubTasksObjects: Array<ITodo> = [];
    todos.forEach((el) => {
      if (el.parentId === item.id) {
        arrSubTasksObjects.push(el);
      }
    });

    return arrSubTasksObjects;
  }
  useEffect(() => {
    setSubData(getSabtasks());
  }, [todos]);
  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: e.target.value,
      description: newTodo.description,
      isSubTask: item.isSubTask,
      parentId: item.parentId,
    });
  }
  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: newTodo.title,
      description: e.target.value,
      isSubTask: item.isSubTask,
      parentId: item.parentId,
    });
  }

  function handleChangeSubTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setSubTaskTitle(e.target.value);
  }

  function handleChangeSubDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setSubTaskDescription(e.target.value);
  }

  function saveTodo() {
    const index = todos.findIndex((el: ITodo) => el.id === item.id);
    const newarr = todos.slice();
    const newTask = {
      id: newTodo.id,
      title: newTodo.title,
      description: newTodo.description,
      isSubTask: newTodo.isSubTask,
      parentId: newTodo.parentId,
    };

    dispatch(saveNewTodo({ newarr: newarr, index: index, newTask: newTask }));
    setIsActiveInput(false);
  }

  function addSubTodo() {
    if (subTaskTitle !== "" && subTaskDescription !== "") {
      dispatch(
        addTodos({
          id: uuidv4(),
          title: subTaskTitle,
          description: subTaskDescription,
          subTasks: [],
          isSubTask: true,
          parentId: item.id,
        })
      );
      setSubTaskTitle("");
      setSubTaskDescription("");
      setIsPopupOpen(false);
    }
  }

  return (
    <>
      <div className={styles.item}>
      <Checkbox
                style={{
                  width: "40px",
                  height: "40px",
                  padding: '0'
                }}
                defaultChecked
              />
        {isActiveInput && (
          <>
            <div className={styles.item__inputContainer}>
              <Input
                value={newTodo.title}
                onChange={handleChangeTitle}
                placeholder="Title"
                fullWidth
                style={{ fontSize: "15px", height: "36px" }}
              />
              <Input
                value={newTodo.description}
                onChange={handleChangeDescription}
                placeholder="Description"
                fullWidth
                style={{ fontSize: "15px", height: "36px" }}
              />
            </div>
            <div className={styles.item__buttonContainer}>
              <Button
                style={{
                  border: "1px solid green",
                  color: "green",
                }}
                onClick={saveTodo}
                variant="outlined"
              >
                <Save />
              </Button>
              <Button
                style={{
                  border: "1px solid red",
                  color: "red",
                }}
                onClick={() => onDelete(item)}
                variant="outlined"
              >
                <Delete />
              </Button>
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: '100px',
                  height: '47px',
                }}
                onClick={() => setIsPopupOpen(true)}
                variant="contained"
              >
                Add subtask
              </Button>
            </div>
          </>
        )}
        {!isActiveInput && (
          <>
            <div className={styles.item__textContainer}>
              <div>
                <p className={styles.item__title}>{item.title}</p>
                <p className={styles.item__description}>{item.description}</p>
              </div>
            </div>
            <div className={styles.item__buttonContainer}>
              <Button
                onClick={() => setIsActiveInput(true)}
                style={{
                  border: "1px solid green",
                  color: "green",
                }}
                variant="outlined"
              >
                <Create />
              </Button>
              <Button
                onClick={() => onDelete(item)}
                style={{
                  border: "1px solid red",
                  color: "red",
                }}
                variant="outlined"
              >
                <Delete />
              </Button>
              <></>
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: '100px',
                  height: '47px',

                }}
                variant="contained"
                onClick={() => setIsPopupOpen(true)}
              >
                Add subtask
              </Button>
            </div>
          </>
        )}
      </div>
      {!isVisibleSubtasks && (
        <Button
          onClick={() => setIsVisibleSubtasks(true)}
          style={{ fontSize: "15px", height: "30px", width: "300px" }}
          variant="outlined"
        >
          Show subtasks
          <KeyboardArrowDown />
        </Button>
      )}
      {isVisibleSubtasks && (
        <Button
          variant="outlined"
          style={{ fontSize: "15px", height: "30px", width: "300px" }}
          onClick={() => setIsVisibleSubtasks(false)}
        >
          Hide subtasks
          <KeyboardArrowUp />
        </Button>
      )}
      {isVisibleSubtasks && (
        <div>
          {subData.length !== 0 && (
            <TodoList isSubTask={true} todos={subData} />
          )}
        </div>
      )}
      {isPopupOpen && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
          addSubTodo={addSubTodo}
          subTaskTitle={subTaskTitle}
          handleChangeSubTitle={handleChangeSubTitle}
          subTaskDescription={subTaskDescription}
          handleChangeSubDescription={handleChangeSubDescription}
        />
      )}
    </>
  );
};

export default TodoListItem;
