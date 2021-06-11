import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetPosts = sort => useAPIGet((sort && `${baseURL}/posts?sort=${sort}`) || `${baseURL}/posts`);

const useGetSomePosts = (sort, page) => useAPIGet(`${baseURL}/posts?sort=${sort}&page=${page}&limit=4`);

const useGetMostLiked = () => useAPIGet(`${baseURL}/posts?sort=mostliked`);

const useGetSinglePost = (postId, token) => useAPIGet(`${baseURL}/posts/${postId}`, token);

const useGetResults = (value, token) => useAPIGet(`${baseURL}/search?q=${value}`, token);

const getSearchResults = async (value, token) => {
    const { data } = await axios.get(`${baseURL}/search?q=${value}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

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

export {
    useGetPosts,
    useGetSomePosts,
    useGetMostLiked,
    useGetSinglePost,
    useGetResults,
    getSearchResults,
    publishLink,
    likePost,
};
