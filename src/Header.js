import { useState } from 'react';
import RegisterForm from './RegisterForm';
import Modal from './Modal';
import NavProfile from './NavProfile.js';
import Button from './Button';
import users from './users.json';
import './Header.css';

function Header() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(false);

    return (
        <header className="header">
            <div className="logo">LOGO</div>
            {user ? (
                <NavProfile user={users} />
            ) : (
                <div>
                    <Button className="register">REGISTER</Button>
                    <Button>LOGIN</Button>
                </div>
            )}
            {open && (
                <Modal>
                    <RegisterForm />
                </Modal>
            )}
        </header>
    );
}

export default Header;
