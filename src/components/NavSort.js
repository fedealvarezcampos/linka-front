import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/NavSort.css';

function NavSort({ sort, setSort, page, setPage }) {
	const user = useSelector(s => s.user);

	const [sortMenu, setSortMenu] = useState(false);

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			sortMenu && setSortMenu(false);
		}, 3000);

		return () => clearTimeout(timeoutID);
	}, [sortMenu]);

	const handleSorting = sorting => {
		setSortMenu(false);
		setSort(sorting);
		page && setPage(2);
		window.scrollTo(0, 0);
	};

	const mostRecent = (
		<>
			<i className="bi bi-alarm-fill" />
			<span>Most recent</span>
		</>
	);

	const bestToday = (
		<>
			<i className="bi bi-trophy-fill" />
			<span>Top rated</span>
		</>
	);

	const mostDiscussed = (
		<>
			<i className="bi bi-chat-square-dots-fill" />
			<span>Most discussed</span>
		</>
	);

	return (
		<>
			{user && !sortMenu && (
				<div className="sortMenuReleaseContainer">
					<div className="sortMenuRelease" onMouseOver={() => setSortMenu(true)}>
						{(sort === '' && mostRecent) ||
							(sort === 'mostliked' && bestToday) ||
							(sort === 'discussed' && mostDiscussed)}
					</div>
				</div>
			)}
			{user && sortMenu && (
				<div className="sortMenuContainer">
					<div
						className="sortMenu dropMenu"
						onMouseEnter={() => setSortMenu(true)}
						onMouseLeave={() => setSortMenu(false)}
					>
						<div className="sortMenuLinkTitle">
							<i className="bi bi-filter-square-fill" />
							<span>Sorting by:</span>
						</div>
						<div className="sortMenuLink">
							<div onClick={() => handleSorting('')}>{mostRecent}</div>
						</div>
						<div className="sortMenuLink">
							<div onClick={() => handleSorting('mostliked')}>{bestToday}</div>
						</div>
						<div className="sortMenuLink" onClick={() => handleSorting('discussed')}>
							{mostDiscussed}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default NavSort;
