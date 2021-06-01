import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetPosts = () => useAPIGet(`${baseURL}/posts`);

const useGetSinglePost = (postId, token) => useAPIGet(`${baseURL}/posts/${postId}`, token);

// const useGetSinglePost = async (postId, token) => {
//     const { data } = await axios.get(`${baseURL}/posts/${postId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return data;
// };

const publishLink = async (form, token) => {
    const { data } = await axios.post(`${baseURL}/posts`, form, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { useGetPosts, useGetSinglePost, publishLink };
