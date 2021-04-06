import axios from 'axios';
import { DataContainer } from '../interfaces/data-container';
import { Comic } from '../interfaces/comic';

const API_KEY = '3974d080b9c415768aec0a778181e0eb'; // REPLACE THIS WITH YOUR KEY

const api = axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data.data;
    }
});

export function getComics(): Promise<DataContainer<Comic>> {
    return api.get('/comics', {
        params: {
            apikey: API_KEY,
            limit: 10,
            hasDigitalIssue: true,
        },
    });
}