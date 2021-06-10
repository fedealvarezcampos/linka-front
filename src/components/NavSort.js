import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../styles/NavSort.css';

function NavSort({ setSort }) {
    const user = useSelector(s => s.user);

    const [sortMenu, setSortMenu] = useState(false);

    return (
        <>
            {user && !sortMenu && (
                <div className="sortMenuReleaseContainer">
                    <div className="sortMenuRelease" onMouseOver={() => setSortMenu(true)}>
                        <i className="bi bi-filter-square-fill" />
                        <span>Sort links</span>
                    </div>
                </div>
            )}
            {user && sortMenu && (
                <div className="sortMenuContainer">
                    <div
                        className="sortMenu dropMenu"
                        onMouseOver={() => setSortMenu(true)}
                        onMouseLeave={() => setSortMenu(false)}
                    >
                        <div className="sortMenuLink">
                            <div onClick={() => setSort('')}>
                                <i className="bi bi-alarm-fill" />
                                <span>Most recent</span>
                            </div>
                        </div>
                        <div className="sortMenuLink">
                            <div onClick={() => setSort('mostliked')}>
                                <i className="bi bi-trophy-fill" />
                                <span>Best today</span>
                            </div>
                        </div>
                        <div className="sortMenuLink" onClick={() => setSort('discussed')}>
                            <div>
                                <i className="bi bi-chat-square-dots-fill" />
                                <span>Most discussed</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavSort;
