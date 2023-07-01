import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { AuthProvider } from './Context/AuthContext';
import { TodosProvider } from './Context/TodosContext';
import GlobalStyles from '../src/GlobalStyles/GlobalStyles'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
        <AuthProvider>
          <TodosProvider>
            <App/>
          </TodosProvider>
        </AuthProvider>
      </GlobalStyles>
  </React.StrictMode>
)
