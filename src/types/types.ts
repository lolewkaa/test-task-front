export default interface ITodo {
    id: number,
    title:string,
    description:string,
    subTasks?: Array<ITodo>,
    isSubTask: boolean
}