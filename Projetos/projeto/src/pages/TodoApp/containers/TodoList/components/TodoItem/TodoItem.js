import React, {useState, useCallback, useEffect} from 'react';
import {ReactComponent as UpdateIcon} from '../../../../../../assets/icons/update-icon.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/icons/delete-icon.svg'
import styles from './TodoItem.module.css'

function TodoItem({id, title, completed, onModalOpen, onStatusUpdate, onDelete}) {
    /* Checagem que muda a tarefa para completa*/
    const [isChecked, setIsChecked] = useState(completed);
    const handleChange = useCallback((evt) => {setIsChecked(evt.target.checked)}, [])

    /* Efeito que atualiza toda vez que é atualizado */
    useEffect(() => {
        onStatusUpdate(id, isChecked)
    }, [onStatusUpdate, id, isChecked])
   
    /* Deletar o Item*/
    const handleDelete = useCallback(() => {
        onDelete(id)
    }, [onDelete, id])
    
    /*Abrir o modal*/
    const handleModalOpen = useCallback( () => {
        onModalOpen(id)
    }, [onModalOpen, id])
    
    /* Função que executa*/
    return (

    <li className={styles.item}> 
        <span className={completed ? styles.completed : null}>{title}</span> 
        <div className={styles.controlButtons}>
            <button onClick={handleModalOpen}> <UpdateIcon/> </button>
            <input type = 'checkbox' checked={isChecked} onChange={handleChange}/>
             <button onClick= {handleDelete}> <DeleteIcon/> </button>

        </div>
        
    </li>
    )
} 

export default TodoItem