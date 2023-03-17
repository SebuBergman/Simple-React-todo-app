import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import APIHelper from "./APIHelper.js"
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
import e from 'cors';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({task: "", date: ""});
    const [task, setTask] = useState("");
    
    const gridRef = useRef();

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
            const todos = await APIHelper.getAllTodos()
            setTodos(todos)
        }
        fetchTodoAndSetTodos();

        console.log(todos);

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
        console.log(id);
        e.stopPropagation()
        const payload = {
            completed: !todos.find(todo => todo.id === id).completed,
        }
        const updatedTodo = await APIHelper.updateTodo(id, payload)
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)))
    }

    const deleteTodo = async (e, id) => {
        console.log(id);
        try {
            e.stopPropagation()
            await APIHelper.deleteTodo(id)
            setTodos(todos.filter(({ _id: i }) => id !== i))
        } catch (err) {}
    }

    const columns = [
        { field: "task", sortable: true, filter: true, floatingFilter: true },
        { field: "date", sortable: true, filter: true, floatingFilter: true },
        { field: "completed", sortable: true, floatingFilter: true },
        { field: "_id", sortable: true, floatingFilter: true, width: 300, },
        {
            headerName: 'Edit task',
            field: "edit",
            cellRenderer: (params) => (
                <Button onClick={e => updateTodo(e, params.row.id)}
                >
                    Edit
                </Button>
            ),
        },
        {
            headerName: 'Delete task',
            field: "delete",
            cellRenderer: (params) => (
                <Button onClick={e => deleteTodo(e, params.row.id)}
                >
                    Delete
                </Button>
            ),
        }
    ];

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
            <div
              className="ag-theme-alpine"
              style={{ width: 1000, height: 400, margin: "auto" }}
            >
              <AgGridReact
                ref={gridRef}
                onGridReady={(params) => (gridRef.current = params.api)}
                rowData={todos}
                columnDefs={columns}
                rowSelection="single"
                animateRows={true}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TodoList;