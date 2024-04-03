import React, { useEffect, useState } from 'react';
import styles from './todo.module.css';


const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
                const json = await response.json();
                setTodos(json);
                //console.log(todos)
            } 
            catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const filterTodos = () => {
        if (filter === 'all') {
            return todos;
        }
        if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        }
        if (filter === 'uncompleted') {
            return todos.filter((todo) => !todo.completed);
        }
    };

    const filteredTodos = filterTodos();

    return (
        <div className={styles.container}>
            <div className={styles.btns}>
                <button onClick={() => setFilter('all')} className={styles.btn}>all</button>
                <button onClick={() => setFilter('completed')} className={styles.btn}>completed</button>
                <button onClick={() => setFilter('uncompleted')} className={styles.btn}>incompleted</button>
            </div>

            {filteredTodos && filteredTodos.map((todo) => (
                <div key={todo.id}>
                    <p className={todo.completed ? styles.completed : ''}>{todo.title}</p>
                </div>
            ))
            }
        </div>
    );
    };

    export default Todo;