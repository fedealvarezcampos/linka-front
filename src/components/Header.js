import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { CSSTransition } from 'react-transition-group';
import { useModal, useSetModal } from '../context/ModalContext';
import { useDetectClickOut } from '../hooks/useDetectClickOut';
import { useClosingKey } from '../hooks/useClosingKey';
import NavProfile from './NavProfile';
import Login from './Login';
import UserNavMenu from './UserNavMenu';
import { useGetProfile } from '../api/users';
import NavSort from './NavSort';

function Header({ error, setError, setSort }) {
    const user = useSelector(s => s?.user);

    const { show, setShow, nodeRef } = useDetectClickOut(false, setError);
    useClosingKey('Escape', show, setShow);

    const modal = useModal();
    const setModal = useSetModal();
    const profileData = useGetProfile(user?.username);

    return (
        <>
            <header className="header">
                <NavLink className="logo" to="/">
                    LOGO
                </NavLink>
                {show && !user && (
                    <Login
                        show={show}
                        setShow={setShow}
                        nodeRef={nodeRef}
                        error={error}
                        setError={setError}
                    />
                )}
                <button className="button navButton">
                    <i className="bi bi-lightning-charge-fill"></i>
                </button>
                <NavLink to={'/new-link'} activeClassName="active" className="button navButton">
                    <i className="bi bi-plus-circle-fill"></i>
                </NavLink>
                {user ? (
                    <NavProfile love={profileData?.love} setShow={setShow} nodeRef={nodeRef} />
                ) : (
                    <div className="unloggedHead">
                        <button className="button" onClick={() => setShow(true)}>
                            <p>LOG IN</p>
                        </button>
                        <button className="button register" onClick={() => setModal(!modal)}>
                            <p>REGISTER</p>
                        </button>
                    </div>
                )}
                <UserNavMenu show={show} setShow={setShow} nodeRef={nodeRef} />
            </header>
            <NavSort setSort={setSort} />
        </>
    );
}

export default Header;
