import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { useModal } from './context/ModalContext';
import Home from './components/Home';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import UserConfig from './components/UserConfig';
import Modal from './components/Modal';
import ShapeDivider from './components/ShapeDivider';
import RegisterForm from './components/RegisterForm';
import NewLink from './components/NewLink';
import ErrorMessage from './components/ErrorMessage';
import SinglePostPage from './components/SinglePostPage';
import SearchResults from './components/SearchResults';
import 'normalize.css';
import './assets/icons/coolicons.css';
import './styles/App.css';

function App() {
    const modal = useModal();
    const [sort, setSort] = useState('');
    const [logNote, setLogNote] = useState(false);
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
                    <Home
                        sort={sort}
                        setSort={setSort}
                        logNote={logNote}
                        setLogNote={setLogNote}
                        setError={setError}
                    />
                </Route>
                <Route path="/users/:username" exact>
                    <UserProfile />
                </Route>
                <Route path="/posts/:postId/:postTitle" exact>
                    <SinglePostPage setLogNote={setLogNote} setError={setError} />
                </Route>
                <Route path="/settings" exact>
                    <UserConfig setLogNote={setLogNote} setError={setError} />
                </Route>
                <Route path="/new-link" exact>
                    <NewLink setLogNote={setLogNote} setError={setError} />
                </Route>
                <Route path="/search" exact>
                    <SearchResults />
                </Route>
                <Route path="/">
                    <ErrorMessage />
                </Route>
            </Switch>
            <ShapeDivider />
            {logNote && <ToastContainer limit="3" />}
        </>
    );
}

export default App;
