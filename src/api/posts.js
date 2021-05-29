import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetPosts = () => useAPIGet(`${baseURL}/posts`);

const publishLink = async token => {
    const { data } = await axios.post(`/posts`, token);
    return data;
};

export { useGetPosts, publishLink };
