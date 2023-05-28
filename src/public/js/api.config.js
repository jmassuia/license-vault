import axios from 'axios';

const api = axios.create({
    baseURL: process.env.HOST
});

module.exports = api;