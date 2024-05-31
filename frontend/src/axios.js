import axios from 'axios';

export const host = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': "123",
    }
})