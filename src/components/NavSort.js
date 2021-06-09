import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../styles/NavSort.css';

function NavSort({ show, setShow, nodeRef, setSort }) {
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();

    const handleLogout = e => {
        e.stopPropagation();
        setShow(!show);
        dispatch({ type: 'LOGOUT' });
        return <Redirect to="/" />;
    };

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <div className="sortMenuContainer">
                <div ref={nodeRef} className="sortMenu dropMenu">
                    <div className="sortMenuLink">
                        <div onClick={() => setSort('')}>
                            <i className="bi bi-file-person-fill"></i>
                            <span>Most recent</span>
                        </div>
                    </div>
                    <div className="sortMenuLink">
                        <div onClick={() => setSort('mostliked')}>
                            <i className="bi bi-gear-fill"></i>
                            <span>Best today</span>
                        </div>
                    </div>
                    <div className="sortMenuLink" onClick={() => setSort('discussed')}>
                        <div>
                            <i className="bi bi-door-closed-fill"></i>
                            <span>Most discussed</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavSort;
