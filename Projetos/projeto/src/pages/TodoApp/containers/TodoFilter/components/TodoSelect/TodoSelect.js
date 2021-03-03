import React, {useEffect} from 'react'
import styles from './TodoSelect.module.css'

function TodoSelect({value, onOptionChange, options}) {
    
    return(
        <select 
        className ={styles.select}
        value={value} onChange={onOptionChange}> 
            {options.map( (option) => {
                return <option 
                value={option.value} 
                key={option.value}>
                {option.title} </option>
            })}
        </select>
    )
}

export default TodoSelect;