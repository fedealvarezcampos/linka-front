import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';

const { REACT_APP_BASEAPI: baseURL } = process.env;

const useGetProfile = username => useAPIGet(username && `${baseURL}/users/${username}`);

const useGetActivity = (user, token) => useAPIGet(user && `${baseURL}/users/${user}/activity`, token);

const userValidation = async uuid => {
    const { data } = await axios.get(`${baseURL}/users/validate/${uuid}`);
    return data;
};

const getUserId = async (username, token) => {
    const { data } = await axios.get(`${baseURL}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
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

const deleteUser = async (username, token) => {
    const { data } = await axios.delete(`${baseURL}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { useGetProfile, getUserId, useGetActivity, userValidation, login, register, updateUser, deleteUser };
