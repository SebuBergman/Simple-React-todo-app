import React, { useState, useRef, useEffect, Checkbox } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import APIHelper from "./APIHelper.js"
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from'@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from '../../../context/AuthContext';
import { auth } from '../../firebase/Firebase';
import NavBar from '../../../navbar/Navbar';

import '../../../App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TodoList() {
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
        console.log(todos);
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
        e.stopPropagation()
        const payload = {
            completed: !todos.find(todo => todo._id === id).completed
        }
        const updatedTodo = await APIHelper.updateTodo(id, payload)
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)))
    }

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation()
            await APIHelper.deleteTodo(id)
            setTodos(todos.filter(({ _id: i }) => id !== i))
        } catch (err) {}
    }
 
    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
            </label>
        );
    };

    return (
      <div>
        <NavBar></NavBar>
        <div>
          <div>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <h4>Add todo:</h4>
                <TextField
                    label="Description"
                    variant="standard"
                    name="task"
                    value={todo.task}
                    onChange={inputChanged}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
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
                <Button onClick={createTodo} variant="contained" className="buttonadd" startIcon={<AddIcon />}>Add</Button>
            </Stack>
            <span id="animationAction"></span>
            <div style={{ width: 1000, height: 400, margin: "auto" }} >
                <ul>
                    {todos.length ? todos.map(({ _id, task, date, completed }, i) => (
                    <li
                        key={i}
                        onClick={e => updateTodo(e, _id)}
                        className={completed ? "completed" : ""}
                    >
                        {task}
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={e => deleteTodo(e, _id)} />
                        </IconButton>
                    </li>
                    )): <p>No Todos Yet</p>}
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TodoList;