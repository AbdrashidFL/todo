import {makeAutoObservable} from "mobx";
import {IResponseTodoItem} from "../interfaces/store.ts";
import {instance} from "../api/instance.ts";
import {ITodoItem} from "../interfaces/todo.ts";
import {format} from "date-fns";
import {faker} from "@faker-js/faker";

class Todo {
    listTodo: ITodoItem[] = [];
    page: number = 1;
    loading: boolean = false;
    lastTodoItem: number | null = null;
    constructor() {
        makeAutoObservable(this)
    }
    setLastTodoItem = (value: number) => {
        this.lastTodoItem = value
    }
    setLoading = (value: boolean) =>{
        this.loading = value
    }
    setPage = () =>{
        this.page = this.page + 1
    }
    getTodoList = async () =>{
        try {
            const {data, status}: {data: IResponseTodoItem[], status: number} = await instance.get(`?_page=${this.page}`); //?_limit=5&_pages=1
            if(status === 200){
                if(data.length !== 0){
                    this.setLoading(true)
                    const random = (max: number, min: number) =>{
                        return Math.floor(Math.random() * (max - min) + min)
                    }
                    const newData: ITodoItem[] = data.map((item) => {
                        const date = faker.date.betweens({
                            from: '2022-01-01T00:00:00.000Z',
                            to: '2023-01-01T00:00:00.000Z',
                            count: 2
                        })
                        const todoItem: ITodoItem = {
                            userId: item.userId,
                            id: item.id,
                            title: item.title,
                            subtitle: faker.lorem.paragraph(random(5, 1)),
                            completed: item.completed,
                            startDate: format(date[0], "MMM d, hh:mm a"),
                            endDate: format(date[1], "MMM d, hh:mm a"),
                            tags: ['Entity title', 'Front-end']
                        };
                        return todoItem;
                    })
                    this.setLastTodoItem(newData[newData.length-1].id)
                    this.listTodo = this.listTodo.concat(newData)
                }
            }else{
                throw new Error('Error get todo list')
            }
        }catch (e){
            console.log(e)
        }
    }
}
export default new Todo()