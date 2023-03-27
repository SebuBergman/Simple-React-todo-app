import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TodoList from './components/pages/todoList/TodoList';
import Settings from './components/pages/settings/Settings';
import Entry from './components/pages/login&register/Entry';

import './App.css';

export default function App() {
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Entry />} />
          <Route
            path='/todolist'
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/settings'
            element={
                <Settings />
            }
          />
        </Routes>
      </AuthContextProvider>
  );
}