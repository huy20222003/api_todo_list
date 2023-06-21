import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { AuthProvider } from './Context/AuthContext';
import { TodosProvider } from './Context/TodosContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TodosProvider>
        <App/>
      </TodosProvider>
    </AuthProvider>
  </React.StrictMode>
)
