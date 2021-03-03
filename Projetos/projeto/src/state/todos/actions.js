import * as todosTypes from './types';

/* Função vai possuir um Id, Title e Completed*/ 

export function addTodo(title){
    return {
        type: todosTypes.ADD_TODO,
        /* Payload é o que a função vai carregar com ele */ 
        payload:{
            title: title
        }
    }
}

export function toggleTodoStatus(id, completed)
{
    return {
        type: todosTypes.TOGGLE_TODO_STATUS,
        payload: {
            id: id,
            completed: completed
        }
    }
}

export function toggleTodoTitle(id, title){
    return {
        type: todosTypes.TOGGLE_TODO_TITLE,
        payload: {
            id: id,
            title: title
        }
    }
}

export function removeTodo(id){
    return {
        type: todosTypes.REMOVE_TODO,
        payload: {
            id: id,
        }
    }
}