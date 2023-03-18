import React, { useState, useRef, useEffect, Checkbox } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import APIHelper from "./APIHelper.js"
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckBoxChecked from '@mui/icons-material/CheckBox';
import CheckBoxSquare from '@mui/icons-material/CheckBoxOutlineBlank';
import Stack from'@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from '../../../context/AuthContext';
import { auth } from '../../firebase/Firebase';
import NavBar from '../../../navbar/Navbar';

import '../../../App.css';
import '../../../Todo.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function TodoList() {
    const [checked, setChecked] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({task: "", date: ""});
    
    const gridRef = useRef();

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
            const todos = await APIHelper.getAllTodos()
            setTodos(todos)
        }
        fetchTodoAndSetTodos();

        //console.log(todos);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                const uid = user.uid;
                //setauthenticated(true);
            } else {
                // User is signed out
                //setauthenticated(false);
                console.log("user is logged out");
            }
        });
    }, [])

    //Check if the input is changed
    const inputChanged = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }

    const createTodo = async e => {
        e.preventDefault()
        if (!todo) {
            alert("please enter something")
            return
        }
        if (todos.some(({ task }) => task === todo.task)) {
            alert(`Task: ${todo} already exists`)
            return
        }
        const newTodo = await APIHelper.createTodo(todo.task, todo.date)
        setTodos([...todos, newTodo])
    }

    const updateTodo = async (e, id) => {
        e.stopPropagation();
        const payload = {completed: !todos.find(todo => todo._id === id).completed}
        const updatedTodo  = await APIHelper.updateTodo(id, payload);
        setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));
        setChecked(!checked);
    }

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation()
            await APIHelper.deleteTodo(id)
            setTodos(todos.filter(({ _id: i }) => id !== i))
        } catch (err) {}
    }

    return (
      <div>
        <NavBar></NavBar>
        <div>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <div className="todoInput">
                    <h4>Add todo:</h4>
                    <div className="addtodo">
                        <input
                            className="input"
                            type="type"
                            variant="standard"
                            name="task"
                            placeholder="New Todo"
                            value={todo.task}
                            onChange={inputChanged}
                        />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                className="date"
                                label="Date"
                                value={todo.date}
                                inputFormat="dd.MM.yyyy"
                                mask="__.__.____"
                                onChange={(newValue) => {
                                    setTodo({ ...todo, date: newValue });
                                }}
                                renderInput={(params) => <TextField variant="standard" {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="addbuttoncontainer">
                        <Button type="submit" onClick={createTodo} variant="contained" className="addbutton" startIcon={<AddIcon />}>Add new task</Button>
                    </div>
                </div>
            </Stack>
            <span id="animationAction"></span>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <div>
                    <ul className="list-group my-5" id="todolist">
                        {todos.length ? todos.map(({ _id, task, date, completed }, i) => (
                        <li
                            key={i}
                            id="todos"
                            className="list-group-item d-flex justify-content-between my-2"
                        >
                            <h6 id="todotitle" className={`mt-1 mb-0 align-middle ${completed ? "completed" : ""}`}>{task}</h6>
                            <div className="todo-icon">
                                <input
                                    type="checkbox"
                                    //className={styles.checkbox}
                                    checked={completed}
                                    onChange={(e) => updateTodo(e, _id)}
                                />
                                <IconButton aria-label="delete" className="mx-2 text-warning">
                                    <EditIcon /*onClick={e => editTodo(e, _id)}*/ />
                                </IconButton>
                                <IconButton aria-label="delete" className="mx-2 text-danger">
                                    <DeleteIcon onClick={e => deleteTodo(e, _id)}/>
                                </IconButton>
                            </div>
                        </li>
                        )): <p>No Todos Yet</p>}
                    </ul>
                </div>
            </Stack>
          </div>
      </div>
    );
}

export default TodoList;