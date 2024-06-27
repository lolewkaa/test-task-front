import TodoList from "../../components/todos/TodoList/TodoList.tsx";
import classes from "./style.module.css";
import { useAppSelector } from "../../hooks/ReduxHooks.ts";


const MainPage = () => {
  const todos = useAppSelector((state) => state.todos.value);
  //крашится потому что когда добавляю эпик таску у меня снова массив только из эпик
  function getEpicTask() {
    return todos.filter((item) => item.isSubTask === false)
  }
  const epicTodosArr = getEpicTask()
// console.log(todos)
  return (
    <div className={classes.page}>
      <TodoList todos={epicTodosArr}/>
    </div>
  );
};

export default MainPage;
