import useAPIGet from '../hooks/useAPIGet';
import axios from 'axios';

// const authConfig = {
//     headers: { Authorization: `Bearer ${token}` },
// };

const baseURL = 'http://localhost:8080/api';

const useGetProfile = username => useAPIGet(username && `${baseURL}/users/${username}`);

const useGetActivity = (user, token) => useAPIGet(user && `${baseURL}/users/${user}/activity`, token);

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

export { useGetProfile, useGetActivity, login, register, updateUser };
