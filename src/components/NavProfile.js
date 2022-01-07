import { useSelector } from 'react-redux';
import { useClosingKey } from '../hooks/useClosingKey';
import { motion } from 'framer-motion';

function NavProfile({ show, setShow, love }) {
	const { REACT_APP_SERVER: baseURL } = process.env;
	const { REACT_APP_STATIC: staticURL } = process.env;

	const user = useSelector(s => s.user);

	useClosingKey('Escape', show, setShow);

	return (
		<motion.div
			initial={{ opacity: 0, y: -15 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
			onClick={() => setShow(!show)}
			className="navProfile"
		>
			<i className="bi bi-caret-down-fill" />
			<div
				className="avatar"
				style={
					user?.avatar
						? { backgroundImage: `url(${staticURL}images/avatars/${user.avatar})` }
						: { backgroundImage: `url(${baseURL}images/avatars/default.jpg` }
				}
			/>
			<div>
				<p className="profileName">{user.username}</p>
				<p className="love">
					{love}
					<i className="ci-heart_fill"></i>
				</p>
			</div>
		</motion.div>
	);
}

export default NavProfile;

// /home/fede/linka/static/images/avatars/10b16a10-884f-492b-9cd8-358a6651098f.jpg
