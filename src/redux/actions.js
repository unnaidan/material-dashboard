import {
    SET_AUTH,
    REMOVE_AUTH
} from './actionTypes'

const setAuth = (user, token) => ({
    type: SET_AUTH,
    payload: {
        user,
        token
    }
})

const removeAuth = () => ({
    type: REMOVE_AUTH
})

export {
    setAuth,
    removeAuth
}
