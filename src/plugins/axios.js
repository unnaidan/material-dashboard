import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
})

instance.interceptors.response.use(res => res.data, err => Promise.reject(err))

export default instance
