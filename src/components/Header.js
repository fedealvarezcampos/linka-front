import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useSetModal } from '../context/ModalContext';
import { useDetectClickOut } from '../hooks/useDetectClickOut';
import { useClosingKey } from '../hooks/useClosingKey';
import NavProfile from './NavProfile.js';
import Login from './Login';
import UserNavMenu from './UserNavMenu';
import './Header.css';

function Header({ error, setError }) {
    const { show, setShow, nodeRef } = useDetectClickOut(false);
    const user = useUser();
    const setModal = useSetModal();
    useClosingKey('Escape', show, setShow);
    console.log(user);

    return (
        <>
            <header className="header">
                <NavLink className="logo" to="/">
                    LOGO
                </NavLink>
                {show && !user && (
                    <Login setShow={setShow} nodeRef={nodeRef} error={error} setError={setError} />
                )}
                {user ? (
                    <NavProfile setShow={setShow} nodeRef={nodeRef} user={user} />
                ) : (
                    <div className="unloggedHead">
                        <button className="button" onClick={() => setShow(true)}>
                            <p>LOG IN</p>
                        </button>
                        <button className="button register" onClick={() => setModal(true)}>
                            <p>REGISTER</p>
                        </button>
                    </div>
                )}
                <UserNavMenu show={show} nodeRef={nodeRef} />
            </header>
        </>
    );
}

export default Header;
