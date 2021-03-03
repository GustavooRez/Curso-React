import React, {useContext, useCallback, useState} from 'react';
import TodoItem from './components/TodoItem/TodoItem.js';
import TodosContext from '../../../../state/todos/Context';
import * as todosActions from '../../../../state/todos/actions';
import styles from './TodoList.module.css';
import TodoModal from './components/TodoModal/TodoModal.js';
import FilterContext from '../../../../state/filter/Context'

/* Função de filtro para retornar cada um dos itens correspondentes*/
function filteredList(list, curFilter) {
    switch (curFilter){
        case 'all':
            return list
        
        case 'active': 
            return list.filter((item) => {
                return item.completed === false
            })
        
        case 'completed': 
            return list.filter((item) => {
                return item.completed === true
            })

        default: 
            throw new Error ()
    }
}

function TodoList(){
    const {todos, dispatchToTodos} = useContext(TodosContext)

    /* Deletar o Item*/
    const handleDelete = useCallback((id) => {
        dispatchToTodos(todosActions.removeTodo(id))
    }, [dispatchToTodos])

    /* Atualizar o título do Item*/
    const handleTitleUpdate = useCallback((id,title) =>{
        dispatchToTodos(todosActions.toggleTodoTitle(id,title))
    },[dispatchToTodos] )

    /* Atualizar o status do Item*/
    const handleStatusUpdate = useCallback((id, completed) => {
        dispatchToTodos(todosActions.toggleTodoStatus(id,completed))
    }, [dispatchToTodos] )

    const [curId, setCurId] = useState(null);

    /* Abertura do Modal*/
    const handleModalOpen = useCallback((id) => {
        setCurId(id)
    },[]);
    
    /*Fechamento do Modal*/ 
    const handleModalClose = useCallback(() => {
        setCurId(null)
    },[]);

    /* Pegar o título da Aplicação */
    const getTitle = useCallback((id) => {
        const curTodo = todos.find((todo) => {
            return todo.id === id
        })
        return curTodo.title
    }, [todos])

    const {filter} = useContext(FilterContext)

    

    return (
    <div className={styles.container}>
       <ul>
            {filteredList(todos, filter).map((todo) => {
                return(
                    <TodoItem 
                    key={todo.id} 
                    id={todo.id}
                    title={todo.title}
                    completed = {todo.completed} 
                    onModalOpen= {handleModalOpen}
                    onStatusUpdate = {handleStatusUpdate} 
                    onDelete={handleDelete}
                    />
                )
            })}
       </ul>
        {curId && (
        <TodoModal 
            todoId={curId}
            onModalClose={handleModalClose} 
            onTitleUpdate={handleTitleUpdate}
            findTitle = {getTitle}
        />)}
    </div>
    
    )
}

export default TodoList;