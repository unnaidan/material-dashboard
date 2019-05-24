import { createReducer } from 'redux-create-reducer'
import {
    SET_AUTH,
    REMOVE_AUTH
} from './actionTypes'

const state = {
    user: null,
    token: null
}

const mutations = {
    [REMOVE_AUTH](state) {
        return {
            ...state,
            user: null,
            token: null
        }
    },
    [SET_AUTH](state, { payload }) {
        const { user, token } = payload

        return {
            ...state,
            user,
            token
        }
    }
}

export default createReducer(
    state,
    mutations
)
