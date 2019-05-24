import {
    createStore,
    combineReducers
} from 'redux'
import {
    persistStore,
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import theme from './theme'

const config = {
    storage,
    key: 'redux',
    whitelist: [
        'auth'
    ]
}

const persistedReducer = persistReducer(config, combineReducers({
    auth,
    theme
}))

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
}
