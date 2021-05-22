import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserContextProvider from './context/UserContext';
import ModalContextProvider from './context/ModalContext';
import reportWebVitals from './test/reportWebVitals';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <ModalContextProvider>
                <Router>
                    <App />
                </Router>
            </ModalContextProvider>
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
