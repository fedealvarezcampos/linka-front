import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
                        <i className="bi bi-file-person-fill"></i>
                        <Link to={`/users/${user.username}`} onClick={() => setShow(false)}>
                            <span>Profile</span>
                        </Link>
                    </div>
                    <div className="userMenuSettingsLink">
                        <i className="bi bi-gear-fill"></i>
                        <Link to={`/users/${user.username}/settings`} onClick={() => setShow(false)}>
                            <span>Settings</span>
                        </Link>
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
