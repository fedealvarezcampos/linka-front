import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'https://linkah.herokuapp.com/api';

const useGetComments = id => useAPIGet(`${baseURL}/posts/${id}/comments`);

const postComment = async (text, id, token) => {
    const { data } = await axios.post(`${baseURL}/posts/${id}/comments`, text, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const postReply = async (text, id, parentId, token) => {
    const { data } = await axios.post(`${baseURL}/posts/${id}/comments/${parentId}`, text, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const deleteComment = async (id, commentId, token) => {
    const { data } = await axios.delete(`${baseURL}/posts/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { postComment, postReply, deleteComment, useGetComments };
