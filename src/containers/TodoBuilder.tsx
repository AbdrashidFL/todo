import todoStore from "../stores/todo-store.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import {TodoItem} from "../components/TodoItem.tsx";
import imgPlus from "./../assets/add.svg"

export const TodoBuilder = observer(() =>{
    const {
        listTodo,
        getTodoList,
        setPage,
        page,
        loading,
        setLoading,
    } = todoStore
    const wrapperTodoRef = useRef<HTMLDivElement | null>(null);


    const handleScroll = () => {
        const wrapper = wrapperTodoRef.current
        if (wrapper) {
            const { scrollTop, scrollHeight, clientHeight } = wrapper;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                // Достигнут конец контейнера. Загрузите следующую порцию данных.
                if (!loading) {
                    setLoading(true);
                    setPage();
                }
            }
        }
    };

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
    }, []);

    useEffect(() => {
        getTodoList().then(()=>{
            setLoading(false)
        });
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