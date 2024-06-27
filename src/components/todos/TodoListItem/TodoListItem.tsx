import { FC, useEffect, useState } from "react";
import styles from "./TodoListItem.module.css";
import ITodo from "../../../types/types.ts";
import { Button, Input } from "@mui/material";
import { addSubTodos, addTodos } from "../../../store/slices/todosSlice.ts";
import { useAppSelector, useAppDispatch } from "../../../hooks/ReduxHooks.ts";
// import {
//   setSubTodoDescription,
//   setSubTodoTitle,
// } from "../../../store/slices/subTodoSlice.ts";
import { v4 as uuidv4 } from "uuid";
import TodoList from "../TodoList/TodoList.tsx";

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
    isSubTask: item.isSubTask
  });
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [isActiveSubtuskInput, setIsActiveSubtuskInput] = useState(false);
  const todos = useAppSelector((state) => state.todos.value);
  // const subTodo = useAppSelector((state) => state.subTodo);
  const [subTitle, setSubTitle] = useState('')
  const [subDes, setDes] = useState('')
  const [subData, setSubData] = useState([]);

  const dispatch = useAppDispatch();

  function getSabtasks() {
    //массив элементов у которых parentId
    //должны получить массив с данными тех todo айдишники которых содержатся в item.subtasks
    const arrSubTasksObjects: Array<ITodo> = [];
    // item.subTasks?.forEach((el) => {
    //   const res = todos.find(function (elem) {
    //     const index = todos.indexOf(elem);
    //     return el === index;
    //   });
    //   arrSubTasksObjects.push(res);
    // });
    todos.forEach((el) => {
      if (el.parentId === item.id) {
        arrSubTasksObjects.push(el)
      }
    })

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
      subTasks: item.subTasks,
      isSubTask: item.isSubTask,
    });
  }
  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNewTodo({
      id: item.id,
      title: newTodo.title,
      description: e.target.value,
      subTasks: item.subTasks,
      isSubTask: item.isSubTask,
    });
  }

  function handleChangeSubTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setSubTitle(e.target.value);
  }

  function handleChangeSubDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDes(e.target.value);
  }

  function saveTodo() {
    // const index = todos.findIndex((el: ITodo) => el.id === item.id);
    // const newarr = todos.slice();
    // newarr.splice(index, 1, {
    //   id: newTodo.id,
    //   title: newTodo.title,
    //   description: newTodo.description,
    //   isSubTask: newTodo.isSubTask,
    //   subTasks: newTodo.subTasks,
    // });
    
    // dispatch(addTodos(newarr));
      const index = subData.findIndex((el: ITodo) => el.id === item.id);

    // const newarr = subData.slice();
    // newarr.splice(index, 1, {
    //   id: newTodo.id,
    //   title: newTodo.title,
    //   description: newTodo.description,
    //   isSubTask: newTodo.isSubTask,
    //   subTasks: newTodo.subTasks,
    // })
    // setSubData(newarr)
 
    // item.title = newTodo.title
    setIsActiveInput(false);
  }

  function addSubTodo(parentId: number) {
    dispatch(
      addTodos(
        {
          id: uuidv4(),
          title: subTitle,
          description: subDes,
          subTasks: [],
          isSubTask: true,
          parentId: item.id,
        },
      )
    );
    console.log(todos)
    // dispatch(
    //   addSubTodos({
    //     newTask: {
    //       id: uuidv4(),
    //       title: subtask.title,
    //       description: subtask.description,
    //       subTasks: [],
    //       isSubTask: true,
    //       parentId: item.id,
    //     },
    //     objectParent: item,
    //   })
    // );
    // dispatch(setSubTodoTitle(""));
    // dispatch(setSubTodoDescription(""));
    setIsActiveSubtuskInput(false);
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
      {!isActiveInput && (
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
            {!isActiveSubtuskInput && (
              <Button
                onClick={() => setIsActiveSubtuskInput(true)}
                style={{ width: "90px" }}
                variant="contained"
              >
                Subtask
              </Button>
            )}
            {isActiveSubtuskInput && (
              <>
                <Button
                  onClick={() => addSubTodo(item.id)}
                  style={{ width: "90px" }}
                  variant="contained"
                >
                  Add subtask
                </Button>
                <Input
                  value={subTitle}
                  onChange={handleChangeSubTitle}
                  placeholder="Title"
                  fullWidth
                />
                <Input
                  value={subDes}
                  onChange={handleChangeSubDescription}
                  placeholder="Description"
                  fullWidth
                />
              </>
            )}
            {/* {subData.length !== 0 &&
              subData.map((item: ITodo, index: number) => (
                <TodoListItem onDelete={onDelete} key={index} item={item} />
              ))} */}
              {subData.length !== 0 &&
                <TodoList isSubTask={true} todos={subData} /> }
            {/* {item.subTasks?.length !== 0 && item.subTasks?.map((subtask) => (
              <TodoListItem
                key={subtask.id}
                item={subtask}
                onDelete={onDelete}
              />
            ))} */}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoListItem;
