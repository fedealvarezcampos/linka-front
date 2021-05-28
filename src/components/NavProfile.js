import { useSelector } from 'react-redux';
import { useClosingKey } from '../hooks/useClosingKey';

function NavProfile({ show, setShow }) {
    const user = useSelector(s => s.user);

    useClosingKey('Escape', show, setShow);

    return (
        <div onClick={() => setShow(!show)} className="navProfile">
            <i className="bi bi-caret-down-fill"></i>
            <div
                className="avatar"
                style={{ backgroundImage: `url(http://localhost:3001/images/avatars/${user.avatar})` }}
            />
            <div>
                <p className="profileName">{user.username}</p>
                <p className="love">
                    {user.love}
                    <i className="ci-heart_fill"></i>
                </p>
            </div>
        </div>
    );
}

export default NavProfile;

// /home/fede/linka/static/images/avatars/10b16a10-884f-492b-9cd8-358a6651098f.jpg
