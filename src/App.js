import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useModal } from './context/ModalContext';
import Home from './components/Home';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import UserConfig from './components/UserConfig';
import Modal from './components/Modal';
import ShapeDivider from './components/ShapeDivider';
import RegisterForm from './components/RegisterForm';
import NewPostForm from './components/NewPostForm';
import ErrorMessage from './components/ErrorMessage';
import 'normalize.css';
import './assets/icons/coolicons.css';
import './styles/App.css';

function App() {
    const modal = useModal();
    const [error, setError] = useState();

    return (
        <>
            <Helmet>
                <title>Linkah</title>
            </Helmet>
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
                <Route path="/settings" exact>
                    <UserConfig setError={setError} />
                </Route>
                <Route path="/new-link" exact>
                    <NewPostForm setError={setError} />
                </Route>
                <Route path="/">
                    <ErrorMessage />
                </Route>
            </Switch>
            <ShapeDivider />
        </>
    );
}

export default App;
