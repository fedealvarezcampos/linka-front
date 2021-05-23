import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:3001/api';

export const useGetPosts = () => useAPIGet(`${baseURL}/posts`);
