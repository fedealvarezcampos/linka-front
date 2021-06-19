import useAPIGet from '../hooks/useAPIGet';
import axios from 'axios';

// const authConfig = {
//     headers: { Authorization: `Bearer ${token}` },
// };

const baseURL = 'https://linkah.herokuapp.com/api';

const useGetProfile = username => useAPIGet(username && `${baseURL}/users/${username}`);

const useGetActivity = (user, token) => useAPIGet(user && `${baseURL}/users/${user}/activity`, token);

const userValidation = async uuid => {
    const { data } = await axios.get(`${baseURL}/users/validate/${uuid}`);
    return data;
};

const login = async credentials => {
    const { data } = await axios.post(`${baseURL}/users/login`, credentials);
    return data;
};

const register = async credentials => {
    const { data } = await axios.post(`${baseURL}/users`, credentials);
    return data;
};

const updateUser = async (username, formData, token) => {
    const { data } = await axios.put(`${baseURL}/users/${username}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { useGetProfile, useGetActivity, userValidation, login, register, updateUser };
