import axios from 'axios'
import { token } from './../redux/getters'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token()}`

    return config
})

instance.interceptors.response.use(response => {
    return response.data
})

export default instance
