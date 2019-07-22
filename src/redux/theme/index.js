import { createReducer } from 'redux-create-reducer'
import {
    START_LOADING,
    END_LOADING,
    INCREMENT_PENDING_REQUESTS,
    DECREMENT_PENDING_REQUESTS,
    SET_ITEMS,
    SELECT
} from './actionTypes'

const state = {
    loading: false,
    pendingRequests: 0,
    items: [],
    selects: []
}

const mutations = {
    [START_LOADING](state) {
        return {
            ...state,
            loading: true
        }
    },
    [END_LOADING](state) {
        return {
            ...state,
            loading: false
        }
    },
    [INCREMENT_PENDING_REQUESTS](state) {
        return {
            ...state,
            pendingRequests: state.pendingRequests + 1
        }
    },
    [DECREMENT_PENDING_REQUESTS](state) {
        return {
            ...state,
            pendingRequests: state.pendingRequests - 1
        }
    },
    [SET_ITEMS](state, { items }) {
        return {
            ...state,
            items
        }
    },
    [SELECT](state, { selects }) {
        return {
            ...state,
            selects
        }
    }
}

export default createReducer(
    state,
    mutations
)
