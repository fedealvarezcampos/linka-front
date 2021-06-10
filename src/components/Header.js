import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { CSSTransition } from 'react-transition-group';
import { useModal, useSetModal } from '../context/ModalContext';
import { useDetectClickOut, useDetectClickOutActivity } from '../hooks/useDetectClickOut';
import { useClosingKey } from '../hooks/useClosingKey';
import NavProfile from './NavProfile';
import Login from './Login';
import UserNavMenu from './UserNavMenu';
import { useGetActivity, useGetProfile } from '../api/users';
import NavSort from './NavSort';
import RecentActivity from './RecentActivity';

function Header({ error, setError }) {
    const user = useSelector(s => s.user);
    const username = useSelector(s => s.user?.username);
    const token = useSelector(s => s.user?.token);

    const activityData = useGetActivity(username, token);
    const profileData = useGetProfile(user?.username);

    const modal = useModal();
    const setModal = useSetModal();
    const { show, setShow, nodeRef } = useDetectClickOut(false);
    const { activityMenu, setActivityMenu, nodeRefAct } = useDetectClickOutActivity(false);

    useClosingKey('Escape', show, setShow);

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
                <button
                    className={`button navButton ${activityMenu ? 'active' : ''}`}
                    onClick={() => setActivityMenu(!activityMenu)}
                >
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
            {activityMenu && (
                <ul ref={nodeRefAct} className="activityListContainer dropMenu">
                    {activityData &&
                        activityData.map((note, i) => (
                            <RecentActivity key={i} note={note} setError={setError} />
                        ))}
                </ul>
            )}
        </>
    );
}

export default Header;
