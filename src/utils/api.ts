import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:44326/api'
})
export default api;