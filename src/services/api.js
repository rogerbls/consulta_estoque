import axios from 'axios';

const api = axios.create({
    baseURL: 'http://138.99.22.48:83/pedidosweb/api'
});

export default api;