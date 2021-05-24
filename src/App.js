import { Switch, Route } from 'react-router-dom';
import { useModal } from './context/ModalContext';
import { useState } from 'react';
import { useDetectClickOut } from './hooks/useDetectClickOut.js';
import { useClosingLoginKey } from './hooks/useClosingKey';
import Home from './components/Home';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import Modal from './components/Modal';
import ShapeDivider from './components/ShapeDivider';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import 'normalize.css';
import './assets/icons/coolicons.css';
import './App.css';

function App() {
    const modal = useModal();
    const [error, setError] = useState();
    const { show, setShow, nodeRef, triggerRef } = useDetectClickOut(false);
    useClosingLoginKey('Escape', show, setShow);

    return (
        <>
            {modal && (
                <Modal error={error} setError={setError}>
                    <RegisterForm setError={setError} />
                </Modal>
            )}
            <Header setShow={setShow} />
            {show && <Login nodeRef={nodeRef} error={error} setError={setError} />}
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/users/:username" exact>
                    <UserProfile />
                </Route>
                <Route path="/">
                    <div>TODOMAL</div>
                </Route>
            </Switch>
            <ShapeDivider />
        </>
    );
}

export default App;
