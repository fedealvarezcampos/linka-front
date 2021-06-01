import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetComments = id => useAPIGet(`${baseURL}/posts/${id}/comments`);

const postComment = async (text, id, token) => {
    const { data } = await axios.post(`${baseURL}/posts/${id}/comments`, text, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { postComment, useGetComments };
