import { useUser } from '../context/UserContext';
import { useSetModal } from '../context/ModalContext';
import { NavLink } from 'react-router-dom';
import NavProfile from './NavProfile.js';
import users from './users.json';
import './Header.css';

function Header({ setShow }) {
    const user = useUser();
    const setModal = useSetModal();

    return (
        <>
            <header className="header">
                <NavLink className="logo" to="/">
                    LOGO
                </NavLink>
                {user ? (
                    <NavProfile user={users} />
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
            </header>
        </>
    );
}

export default Header;
