import React, { useEffect, useState, useMemo } from 'react';
import styles from './todo.module.css';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    // const [filteredTodos, setFilteredTodos] = useState([]);

    const getTodos = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
        const json = await response.json();
        setTodos(json);
    }

    useEffect(() => {
        getTodos();
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

    const handleChangeState = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {...todo, completed: !todo.completed};
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    // useEffect(() => {
    //     setFilteredTodos(todos.filter((todo) => {
    //         if (filter === 'all') {
    //             return todos;
    //         }
    //         if (filter === 'completed') {
    //             return todos.filter((todo) => todo.completed);
    //         }
    //         if (filter === 'uncompleted') {
    //             return todos.filter((todo) => !todo.completed);
    //         }
    //     }));
    // }, [todos, filter]);

    // const filterTodos = useMemo(() => {
    //     return todos.filter((todo) => {
    //         if (filter === 'all') {
    //             return todos;
    //         }
    //         if (filter === 'completed') {
    //             return todos.filter((todo) => todo.completed);
    //         }
    //         if (filter === 'uncompleted') {
    //             return todos.filter((todo) => !todo.completed);
    //         }
    //     })
    // }, [todos]);


    return (
        <div className={styles.container}>
            <div className={styles.btns}>
                <button onClick={() => setFilter('all')} className={styles.btn}>all</button>
                <button onClick={() => setFilter('completed')} className={styles.btn}>completed</button>
                <button onClick={() => setFilter('uncompleted')} className={styles.btn}>incompleted</button>
            </div>

            {filteredTodos && filteredTodos.map((todo) => (
                <button key={todo.id} onClick={() => handleChangeState(todo.id)} className={styles.todo}>
                    <p className={todo.completed ? styles.completed : styles.uncompleted}>{todo.title}</p>
                </button>
            ))
            }
        </div>
    );
    };

    export default Todo;