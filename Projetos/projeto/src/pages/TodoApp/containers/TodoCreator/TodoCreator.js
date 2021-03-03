import React, {useContext, useEffect, useRef} from 'react';
import {useFormik} from 'formik';
import TodosContext from '../../../../state/todos/Context';
import * as todosActions from '../../../../state/todos/actions';
import * as yup from 'yup';
import styles from './TodoCreator.module.css';

function TodoCreator(){
    const { dispatchToTodos } = useContext(TodosContext);

    const { getFieldProps, errors, handleSubmit} = useFormik({
        
        /* Valores que irão ser carregados ao ser criado*/

        initialValues: {
            title: ''
        },
        
        /* Todo Processo de Validação das informações*/
        validateOnChange: false,
        validateOnBlur:false,
        
        validationSchema: yup.object({
            title: yup.string() .required('Você precisa preencher uma tarefa')
        }),

        /* Envio das informações */
        onSubmit: (values, formikBag) => {
            dispatchToTodos(todosActions.addTodo(values.title ))
            formikBag.setFieldValue('title', '', false)
        }
    })

    /* Constante que irá ser o input do título*/ 
    const inputTitle = useRef(null);

    /* Use Effect feito para a barra ser digitavel quando o cliente entrar direto */
    useEffect(() => {
        inputTitle.current.focus()
    },[])
    
    /* Retorno e exibição da função */
    return (
        <form className={styles.container} onSubmit = {handleSubmit}>
            <input  className ={ styles.input}
            type='text' 
            placeholder = 'Nova tarefa'
            autoComplete = 'off'
            ref= {inputTitle}
            {...getFieldProps('title')}/>
            { errors.title ? 
                (<small className={styles.error}>{errors.title} </small> ) : null}
            <button className={styles.submit} type ='submit' > Adicionar Tarefa </button> 
        </form>
    )
}

export default TodoCreator;