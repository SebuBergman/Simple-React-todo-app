import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from "react-router-dom";
import TheContextProvider, { TheContext } from "./TheContext";
import TodoList from './components/TodoList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NavBar from './navbar/Navbar.js';

import './App.css';

export default function App() {
    const [value, setValue] = useState('todolist');
    const handleTabChange = (event, value) => {
        setValue(value);
    };

    return (
      <TheContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoList />}></Route>
            {/*<Route path="settings" element={<SettingsPage />} />*/}
          </Routes>
        </BrowserRouter>
      </TheContextProvider>
      /*
    <div className="App">
        <Tabs value={value} onChange={handleTabChange}>
            <Tab value="todolist" label="TodoList" />
        </Tabs>
        {value === 'todolist' && <TodoList />}
    </div>);*/
    );
}