import { Switch, Route } from 'react-router-dom';
import { useModal, useSetModal } from './context/ModalContext';
import { useState } from 'react';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Modal from './components/Modal';
import ShapeDivider from './components/ShapeDivider';
import RegisterForm from './components/RegisterForm';
import 'normalize.css';
import './resource/icons/coolicons.css';
import './App.css';

function App() {
    const modal = useModal();
    const setModal = useSetModal();
    const [error, setError] = useState();

    return (
        <>
            {modal && (
                <Modal error={error} setError={setError}>
                    <RegisterForm setError={setError} />
                </Modal>
            )}
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/users/:username" exact>
                    <UserProfile />
                </Route>
            </Switch>
            <ShapeDivider />
        </>
    );
}

export default App;
