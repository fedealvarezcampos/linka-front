import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDetectClickOut, useDetectClickOutActivity } from '../hooks/useDetectClickOut';
import { useClosingKey } from '../hooks/useClosingKey';
import { useModal, useSetModal } from '../context/ModalContext';
import { useGetActivity, useGetProfile } from '../api/users';
import { motion } from 'framer-motion';
import NavProfile from './NavProfile';
import Login from './Login';
import UserNavMenu from './UserNavMenu';
import RecentActivity from './RecentActivity';
import '../assets/anims.css';

function Header({ error, setError }) {
	const user = useSelector(s => s.user);
	const username = useSelector(s => s.user?.username);
	const token = useSelector(s => s.user?.token);

	const modal = useModal();
	const setModal = useSetModal();
	const [hovered, setHovered] = useState(false);
	const [scrollPoint, setScrollPoint] = useState(false);

	const activityData = useGetActivity(username, token);
	const profileData = useGetProfile(user?.username);

	const { show, setShow, nodeRef } = useDetectClickOut(false, setError);
	const { activityMenu, setActivityMenu, nodeRefAct } = useDetectClickOutActivity(false);
	useClosingKey('Escape', show, setShow);

	useEffect(() => {
		document.addEventListener('scroll', () => {
			const scrollCheck = window.scrollY > 60;
			if (scrollCheck !== scrollPoint) {
				setScrollPoint(scrollCheck);
			}
		});
	}, [scrollPoint]);

	return (
		<>
			<header className={`header ${!user ? 'noUser' : ''} ${scrollPoint ? 'shadowed' : ''}`}>
				<NavLink className="logo" shadow="Linkah" to="/">
					<motion.span
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="logoTitle"
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
					>
						Linkah
						<span className="flicker">
							<i
								className={`shake-constant shake-little bi bi-lightning-charge-fill ${
									hovered ? 'shake-rotate hoveredIcon' : null
								}`}
							/>
						</span>
					</motion.span>
				</NavLink>
				{show && !user && (
					<Login
						show={show}
						setShow={setShow}
						nodeRef={nodeRef}
						error={error}
						setError={setError}
					/>
				)}
				{user && (
					<>
						<motion.nav
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: 0.3 } }}
							className="headerButtons"
						>
							<button
								aria-label="activity"
								className={`button navButton ${activityMenu ? 'active' : ''}`}
								onClick={() => setActivityMenu(!activityMenu)}
							>
								<i className="bi bi-lightning-charge-fill" />
							</button>
							<NavLink
								to={'/dms'}
								activeClassName="active"
								className="button navButton"
								aria-label="private messages"
							>
								<i className="bi bi-envelope-fill" />
							</NavLink>
							<NavLink
								to={'/new-link'}
								activeClassName="active"
								className="button navButton"
								aria-label="new post"
							>
								<i className="bi bi-plus-circle-fill" />
							</NavLink>
						</motion.nav>
					</>
				)}
				{user ? (
					<NavProfile love={profileData?.love} setShow={setShow} nodeRef={nodeRef} />
				) : (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
						className="unloggedHead"
					>
						<button className="button" onClick={() => setShow(true)}>
							<p>LOG IN</p>
						</button>
						<button className="button register" onClick={() => setModal(!modal)}>
							<p>REGISTER</p>
						</button>
					</motion.div>
				)}
				<UserNavMenu show={show} setShow={setShow} nodeRef={nodeRef} />
			</header>
			{activityMenu && (
				<ul
					ref={nodeRefAct}
					className={`activityListContainer dropMenu ${
						activityData?.length === 0 ? 'noActivity' : ''
					}`}
				>
					{activityData &&
						activityData.map((note, i) => (
							<RecentActivity
								key={i}
								note={note}
								setError={setError}
								setActivityMenu={setActivityMenu}
							/>
						))}
					{activityData?.length === 0 && (
						<div>
							No activity yet! <i className="bi bi-lightning-charge-fill"></i>
							<i className="bi bi-lightning-charge-fill"></i>
							<i className="bi bi-lightning-charge-fill"></i>
						</div>
					)}
				</ul>
			)}
		</>
	);
}

export default Header;
