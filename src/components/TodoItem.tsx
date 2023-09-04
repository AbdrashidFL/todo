import {FC} from "react";
import {ITodoItem} from "../interfaces/todo.ts";
import {TodoItemTags} from "./TodoItemTags.tsx";
import imgAvatar from "./../assets/avatar.png"
export const TodoItem: FC<{data: ITodoItem}> = ({data}) =>{
    return(
        <>
            <div className="todo-item">
                <label className="todo-item__title">
                    <input type="checkbox" defaultChecked={data.completed}/>
                    <p>{data.title}</p>
                </label>
                <div className="todo-item__date">
                    <p>{data.startDate}</p>
                    <p>{data.endDate}</p>
                </div>
                <h4 className="todo-item__subtitle">{data.subtitle}</h4>
                <div className="todo-item__footer">
                    <div className="todo-item__footer-tags">
                        {
                            data.tags.map((item, index)=>(
                                <TodoItemTags text={item} key={index}/>
                            ))
                        }
                    </div>
                    <img src={imgAvatar} alt="Avatar" className="todo-item__footer-avatar"/>
                </div>
            </div>
        </>
    )
}