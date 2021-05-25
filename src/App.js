import { Switch, Route } from 'react-router-dom';
import { useModal } from './context/ModalContext';
import { useState } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import Modal from './components/Modal';
import ShapeDivider from './components/ShapeDivider';
import RegisterForm from './components/RegisterForm';
import 'normalize.css';
import './assets/icons/coolicons.css';
import './components/anims.css';
import './App.css';

function App() {
    const modal = useModal();
    const [error, setError] = useState();

    return (
        <>
            {modal && (
                <Modal error={error} setError={setError}>
                    <RegisterForm setError={setError} />
                </Modal>
            )}
            <Header error={error} setError={setError} />
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
