export default interface ITodo {
    id: string,
    title:string,
    description:string,
    isSubTask: boolean,
    parentId?: string,
}