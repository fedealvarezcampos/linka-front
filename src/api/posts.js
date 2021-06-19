import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'https://linkah.herokuapp.com/api';

const useGetPosts = sort => useAPIGet((sort && `${baseURL}/posts?sort=${sort}`) || `${baseURL}/posts`);

const useGetSomePosts = (sort, page) => useAPIGet(`${baseURL}/posts?sort=${sort}&page=${page}&limit=4`);

const useGetSinglePost = (postId, token) => useAPIGet(`${baseURL}/posts/${postId}`, token);

const useGetResults = (value, sort, token) => useAPIGet(`${baseURL}/search?q=${value}&sort=${sort}`, token);

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

const deletePost = async (postId, token) => {
    const { data } = await axios.delete(`${baseURL}/posts/delete/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export {
    useGetPosts,
    useGetSomePosts,
    useGetSinglePost,
    useGetResults,
    getSearchResults,
    publishLink,
    likePost,
    deletePost,
};
