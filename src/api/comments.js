import axios from 'axios';
// import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const postComment = async (id, form, token) => {
    const { data } = await axios.post(`${baseURL}/posts/${id}/comments`, form, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { postComment };
