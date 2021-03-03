import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './TodoModal.module.css'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete-icon.svg'

function TodoModal({ id, onModalClose, onTitleUpdate, findTitle }) {
    const { getFieldProps, errors, handleSubmit } = useFormik({
        
        /* Ele requer o ID do item para fazer a modificação*/ 
        initialValues: {
            title: findTitle(id)
        },

        /*Validação*/
        validationSchema: yup.object({
            title: yup.string().required('Você precisa preencher uma tarefa')
        }),

        validateOnChange: false,
        validateOnBlur:false,

        /*Envio da aplicação e fechamento do modal*/
        onSubmit: (values, formikBag) => {
            onTitleUpdate(id, values.title)
            formikBag.setFieldValue('title', '', false)
            onModalClose()
        }
    })

    return (
        <>
            <div className={styles.backdrop} onClick={onModalClose} />

            <div className={styles.modal}>
                <form onSubmit={handleSubmit}>
                    <button className={styles.closebuton} onClick={onModalClose}> <DeleteIcon /> </button>

                    <input className={styles.input}
                        type='text'
                        placeholder='Novo Título'
                        autoComplete='off'
                        {...getFieldProps('title')} />
                    { errors.title ?
                        (<small className={styles.error}>{errors.title} </small>) : null}
                    <button className={styles.submit} type='submit'>Atualizar Tarefa </button>
                </form>
            </div>
        </>
    )
}

export default TodoModal;