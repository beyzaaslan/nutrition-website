import axios from 'axios';
import { endpoints } from './api';

export const getUsers = async () => {
    return await axios.get(endpoints.user);
};

export const getUserById = async (id: number) => {
    return await axios.get(`${endpoints.user}/${id}`);
};
