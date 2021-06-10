import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/NavSort.css';

function NavSort({ setSort }) {
    const user = useSelector(s => s.user);

    const [sortMenu, setSortMenu] = useState(false);

    const handleSorting = sorting => {
        setSortMenu(false);
        setSort(sorting);
    };

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
                        <div className="sortMenuLinkTitle">
                            <div>
                                <i className="bi bi-filter-square-fill" />
                                <span>Sorting by:</span>
                            </div>
                        </div>
                        <div className="sortMenuLink">
                            <div onClick={() => handleSorting('')}>
                                <i className="bi bi-alarm-fill" />
                                <span>Most recent</span>
                            </div>
                        </div>
                        <div className="sortMenuLink">
                            <div onClick={() => handleSorting('mostliked')}>
                                <i className="bi bi-trophy-fill" />
                                <span>Best today</span>
                            </div>
                        </div>
                        <div className="sortMenuLink" onClick={() => handleSorting('discussed')}>
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
