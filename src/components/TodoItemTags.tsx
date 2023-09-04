import {FC} from "react";

export const TodoItemTags: FC<{text: string}> = ({text}) =>{
    return(
        <>
            <div className="todo-item__footer-tags-item">{text}</div>
        </>
    )
}