import axios from 'axios'
import { store } from './../redux/store'
import { token } from './../redux/getters'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
})

instance.interceptors.request.use(config => {
    const state = store.getState()
    config.headers.Authorization = `Bearer ${token(state)}`

    return config
})

instance.interceptors.response.use(response => {
    return response.data
})

export default instance
