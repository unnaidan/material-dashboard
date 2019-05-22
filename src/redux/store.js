import { createStore } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
    SET_AUTH,
    REMOVE_AUTH
} from './actionTypes'

const state = {
    auth: false
}

const mutations = {
    [REMOVE_AUTH](state) {
        return {
            ...state, auth: false
        }
    },
    [SET_AUTH](state, { payload }) {
        const { user, token } = payload

        return {
            ...state, auth: {
                user,
                token
            }
        }
    }
}

const config = {
    key: 'redux',
    storage
}

const persistedReducer = persistReducer(config, createReducer(
    state,
    mutations
))

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
}
