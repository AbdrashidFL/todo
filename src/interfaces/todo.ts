export interface ITodoItem{
    userId: number,
    id: number,
    title: string,
    subtitle: string
    completed: boolean,
    startDate: string,
    endDate: string,
    tags: string[]
}