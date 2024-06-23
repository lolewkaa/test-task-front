export default interface ITodo {
    title:string,
    description:string,
    underTasks?: Array<ITodo>
}