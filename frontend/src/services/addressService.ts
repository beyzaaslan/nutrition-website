import {apiRequest} from './apiHelper';
import { Address } from '../types/Address';

export const getAddresses = async (): Promise<Address[]> => {
    return await apiRequest('GET', '/address');
};

export const getAddressById = async (id: number): Promise<Address> => {
    return await apiRequest('GET', `/address/${id}`);
};

export const createAddress = async (data: Address): Promise<Address> => {
    return await apiRequest('POST', '/address', data);
};
