import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { useModal, useSetModal } from './context/ModalContext';
import { useLogNote } from './context/LogNoteContext';
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
import DirectMessages from './components/DirectMessages';
import 'normalize.css';
import './assets/icons/coolicons.css';
import './styles/App.css';

function App() {
    const token = useSelector(s => s.user?.token);

    const modal = useModal();
    const setModal = useSetModal();
    const logNote = useLogNote();
    const [sort, setSort] = useState('');
    const [error, setError] = useState();

    return (
        <>
            <Helmet>
                <title>Linkah</title>
            </Helmet>
            {modal && !token && (
                <Modal error={error} setError={setError}>
                    <RegisterForm modal={modal} setModal={setModal} setError={setError} />
                </Modal>
            )}
            <Header error={error} setError={setError} />
            <Switch>
                <Route path={['/', '/users/validate/:uuid']} exact>
                    <Home sort={sort} setSort={setSort} setError={setError} />
                </Route>
                <Route path="/users/:username" exact>
                    <UserProfile />
                </Route>
                <Route path="/posts/:postId/:postTitle" exact>
                    <SinglePostPage setError={setError} />
                </Route>
                <Route path="/settings" exact>
                    <UserConfig setError={setError} />
                </Route>
                <Route path="/new-link" exact>
                    <NewLink setError={setError} />
                </Route>
                <Route path="/search" exact>
                    <SearchResults sort={sort} setSort={setSort} />
                </Route>
                <Route path="/posts/:postId/:postTitle" exact>
                    <SinglePostPage setError={setError} />
                </Route>
                <Route path={'/dms'} exact>
                    <DirectMessages setError={setError} />
                </Route>
                <Route path="/">
                    <ErrorMessage />
                </Route>
            </Switch>
            <ShapeDivider />
            {logNote && <ToastContainer autoClose={2500} limit="3" />}
        </>
    );
}

export default App;
