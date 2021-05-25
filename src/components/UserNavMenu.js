import { useUser } from '../context/UserContext';
import './UserNavMenu.css';

function UserNavMenu({ show, nodeRef }) {
    const user = useUser();

    return (
        <>
            {show && user && (
                <div ref={nodeRef} className="userMenu dropMenu">
                    <div className="userMenuProfileLink">
                        <i className="bi bi-file-person-fill"></i>
                        <span>Profile</span>
                    </div>
                    <div className="userMenuSettingsLink">
                        <i className="bi bi-gear-fill"></i>
                        <span>Settings</span>
                    </div>
                    <div className="userMenuLogOutLink">
                        <i className="bi bi-door-closed-fill"></i>
                        <span>Log out</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserNavMenu;
