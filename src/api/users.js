import useAPIGet from '../hooks/APIhooks';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const useGetProfile = username => useAPIGet(`${baseURL}/users/${username}`);

const login = async credentials => {
    const { data } = await axios.post(`${baseURL}/users/login`, credentials);
    return data;
};

const register = async credentials => {
    const { data } = await axios.post(`${baseURL}/users`, credentials);
    return data;
};

export { useGetProfile, login, register };
