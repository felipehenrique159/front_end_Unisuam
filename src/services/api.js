import axios from 'axios'

const api = axios.create({
    baseURL:'localhost:8010/api/'
})

export default api