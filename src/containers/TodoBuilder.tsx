import todoStore from "../stores/todo-store.ts";
import {observer} from "mobx-react-lite";
import {useCallback, useEffect, useRef} from "react";
import {TodoItem} from "../components/TodoItem.tsx";
import imgPlus from "./../assets/add.svg"

export const TodoBuilder = observer(() =>{
    const {
        listTodo,
        getTodoList,
        setPage,
        page,
        loading
    } = todoStore

    const wrapperTodoRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = useCallback(() => {
        const wrapper = wrapperTodoRef.current;
        if(wrapper !== null){
            if((wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) && !loading){
                setPage();
            }
        }
    }, [loading]);

    useEffect(() => {
        const wrapper = wrapperTodoRef.current;
        if (wrapper) {
            wrapper.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (wrapper) {
                wrapper.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    useEffect(() => {
        void getTodoList();
    }, [page]);
    return(
        <>
            <div className="todo">
                <div className="container">
                    <div className="todo-header">
                        <h2 className="todo-header__title">Today</h2>
                        <div className="todo-header__btns">
                            <button className="todo-header__btns-add"><img src={imgPlus} alt="Add"/></button>
                            <button className="todo-header__btns-type">2</button>
                        </div>
                    </div>
                    <div className="todo-wrap" ref={wrapperTodoRef}>
                        {
                            listTodo.map((item, index)=>(
                                <TodoItem data={item} key={index}/>
                            ))
                        }
                        {loading && <p className="todo-wrap__loading">Загрузка данных...</p>}
                    </div>
                </div>
            </div>
        </>
    )
});