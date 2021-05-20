import useAPIGet from '../hooks/APIhooks';
const baseURL = 'http://localhost:3001/api';

export const useGetPosts = () => useAPIGet(`${baseURL}/posts`);
