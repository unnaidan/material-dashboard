import {
    SET_AUTH,
    SET_SELECTION,
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

const setSelection = selection => ({
    type: SET_SELECTION,
    selection
})

export {
    setAuth,
    setSelection,
    removeAuth
}
