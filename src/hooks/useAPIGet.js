import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function useAPIGet(url, token) {
	const dispatch = useDispatch();
	const [result, setResult] = useState(null);

	useEffect(() => {
		url &&
			axios
				.get(
					url,
					token && {
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then(res => {
					const { data } = res;

					setResult(data);
				})
				.catch(error => {
					let err = error.response.data.error;

					if (err === 'invalid token' || err === 'jwt expired') {
						dispatch({ type: 'LOGOUT' });
						localStorage.clear('session');
					}
				});
	}, [url, token, dispatch]);

	return result;
}

export default useAPIGet;
