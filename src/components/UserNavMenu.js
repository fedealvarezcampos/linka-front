import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import '../styles/UserNavMenu.css';

function UserNavMenu({ show, setShow, nodeRef }) {
    const history = useHistory();
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();

    const handleLogout = e => {
        e.stopPropagation();
        setShow(!show);
        dispatch({ type: 'LOGOUT' });
        history.replace('/');
    };

    return (
        <>
            {show && user && (
                <div ref={nodeRef} className="userMenu dropMenu">
                    <div className="userMenuProfileLink">
                        <NavLink
                            activeClassName="active"
                            to={`/users/${user.username}`}
                            onClick={() => setShow(!show)}
                        >
                            <i className="bi bi-file-person-fill"></i>
                            <span>Profile</span>
                        </NavLink>
                    </div>
                    <div className="userMenuSettingsLink">
                        <NavLink activeClassName="active" to={`/settings`} onClick={() => setShow(!show)}>
                            <i className="bi bi-gear-fill"></i>
                            <span>Settings</span>
                        </NavLink>
                    </div>
                    <div className="userMenuLogOutLink" onClick={handleLogout}>
                        <div>
                            <i className="bi bi-door-closed-fill"></i>
                            <span>Log out</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserNavMenu;
