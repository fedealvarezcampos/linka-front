import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSetModal } from '../context/ModalContext';
import { useDetectClickOut } from '../hooks/useDetectClickOut';
import { useClosingKey } from '../hooks/useClosingKey';
import NavProfile from './NavProfile';
import Login from './Login';
import UserNavMenu from './UserNavMenu';

function Header({ error, setError }) {
    const { show, setShow, nodeRef } = useDetectClickOut(false);
    useClosingKey('Escape', show, setShow);

    const setModal = useSetModal();
    const user = useSelector(s => s.user);

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
                    <NavProfile setShow={setShow} nodeRef={nodeRef} />
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
                <UserNavMenu show={show} setShow={setShow} nodeRef={nodeRef} />
            </header>
        </>
    );
}

export default Header;
