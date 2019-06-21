import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.15.18:3030'
    baseURL: 'https://crud-alunos-server.herokuapp.com/'
});

export default api;