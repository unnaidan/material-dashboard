import axios from 'axios'
import { store } from './../redux/store'

const { dispatch } = store

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    responseType: 'json'
})

instance.interceptors.request.use(config => {
    const { token } = store
        .getState()
        .auth

    if (config && config.progress) {
        dispatch({ type: 'INCREMENT_PENDING_REQUESTS' })
        dispatch({ type: 'START_LOADING' })
    }

    config.headers.Authorization = `Bearer ${token}`

    return config
})

const handleResponse = response => {
    if (response.config && response.config.progress) {
        dispatch({ type: 'DECREMENT_PENDING_REQUESTS' })
        dispatch({ type: 'END_LOADING' })
    }

    return response.data
}

const handleError = error => {
    if (error.config && error.config.progress) {
        dispatch({ type: 'DECREMENT_PENDING_REQUESTS' })
        dispatch({ type: 'END_LOADING' })
    }

    return Promise.reject(error)
}

instance.interceptors.response.use(
    handleResponse,
    handleError
)

export default instance
