import useAPIGet from '../hooks/APIhooks';

const baseURL = 'http://localhost:3001/api';

const useGetProfile = username => useAPIGet(`${baseURL}/users/${username}`);

export { useGetProfile };
