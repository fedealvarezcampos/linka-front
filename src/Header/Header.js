import NavProfile from './NavProfile.js';
import users from './users.json';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">LOGO</div>
            <NavProfile user={users} />
        </header>
    );
}

export default Header;
