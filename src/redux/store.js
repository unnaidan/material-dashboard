import { createStore } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
    SET_AUTH,
    SET_SELECTION,
    REMOVE_AUTH
} from './actionTypes'

const setState = (state, newValue) => ({
    ...state,
    newValue
})

const state = {
    auth: false,
    selection: []
}

const mutations = {
    [REMOVE_AUTH](state) {
        return setState(state, {
            auth: false
        })
    },
    [SET_AUTH](state, { payload }) {
        const { user, token } = payload

        return setState(state, {
            auth: {
                user,
                token
            }
        })
    },
    [SET_SELECTION](state, action) {
        const { selection } = action

        return setState(state, {
            selection
        })
    }
}

const config = {
    storage,
    key: 'redux',
    whitelist: [
        'auth'
    ]
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
