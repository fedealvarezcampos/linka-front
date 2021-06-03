import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetPosts = () => useAPIGet(`${baseURL}/posts`);

const useGetMostLiked = () => useAPIGet(`${baseURL}/posts?sort=mostliked`);

const useGetSinglePost = (postId, token) => useAPIGet(`${baseURL}/posts/${postId}`, token);

const likePost = async (postId, body, token) => {
    const { data } = await axios.post(`${baseURL}/posts/${postId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const publishLink = async (form, token) => {
    const { data } = await axios.post(`${baseURL}/posts`, form, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { useGetPosts, useGetMostLiked, useGetSinglePost, publishLink, likePost };
