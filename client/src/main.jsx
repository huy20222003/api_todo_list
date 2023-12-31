import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { TodosProvider } from './Context/TodosContext';
import { UserProvider } from './Context/UserContext';
import { LabelsProvider } from './Context/LabelsContext';
import GlobalStyles from '../src/GlobalStyles/GlobalStyles';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
      <AuthProvider>
        <TodosProvider>
          <UserProvider>
            <LabelsProvider>
              <App />
            </LabelsProvider>
          </UserProvider>
        </TodosProvider>
      </AuthProvider>
    </GlobalStyles>
  </React.StrictMode>
);
