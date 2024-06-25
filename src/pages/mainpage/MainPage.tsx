import TodoList from "../../components/todos/TodoList/TodoList.tsx";
import classes from "./style.module.css";
import { useAppSelector } from "../../hooks/ReduxHooks.ts";

const MainPage = () => {
  const todos = useAppSelector((state) => state.todos.value);
  // function getEpicTask() {
  //   return todos.filter((item) => item.isSubTask === false)
  // }
  // const epicTodosArr = getEpicTask()
  
  return (
    <div className={classes.page}>
      <TodoList todos={todos}/>
    </div>
  );
};

export default MainPage;
