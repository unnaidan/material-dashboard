import { createReducer } from 'redux-create-reducer'
import {
    SET_SELECTION
} from './actionTypes'

const state = {
    selection: []
}

const mutations = {
    [SET_SELECTION](state, { selection }) {
        return {
            ...state,
            selection
        }
    }
}

export default createReducer(
    state,
    mutations
)
