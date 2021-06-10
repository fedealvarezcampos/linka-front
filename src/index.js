import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import ModalContextProvider from './context/ModalContext';
import reportWebVitals from './test/reportWebVitals';
import './styles/index.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ScrollToTop from './helpers/ScrollToTop';

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <ModalContextProvider>
                <Router>
                    <ScrollToTop />
                    <ErrorBoundary>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </ErrorBoundary>
                </Router>
            </ModalContextProvider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
