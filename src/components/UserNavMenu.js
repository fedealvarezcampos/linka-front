import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './UserNavMenu.css';

function UserNavMenu({ show, setShow, nodeRef }) {
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();

    const handleLogout = e => {
        e.stopPropagation();
        setShow(false);
        dispatch({ type: 'LOGOUT' });
        <Redirect to="/" />;
    };

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <>
            {show && user && (
                <div ref={nodeRef} className="userMenu dropMenu">
                    <div className="userMenuProfileLink">
                        <NavLink
                            activeClassName="active"
                            to={`/users/${user.username}`}
                            onClick={() => setShow(false)}
                        >
                            <i className="bi bi-file-person-fill"></i>
                            <span>Profile</span>
                        </NavLink>
                    </div>
                    <div className="userMenuSettingsLink">
                        <NavLink activeClassName="active" to={`/settings`} onClick={() => setShow(false)}>
                            <i className="bi bi-gear-fill"></i>
                            <span>Settings</span>
                        </NavLink>
                    </div>
                    <div className="userMenuLogOutLink" onClick={handleLogout}>
                        <i className="bi bi-door-closed-fill"></i>
                        <span>Log out</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserNavMenu;