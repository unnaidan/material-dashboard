import { store } from './store'

const user = () => {
    const { auth } = store.getState()

    return auth.user
}

const token = () => {
    const { auth } = store.getState()

    return auth.token
}

export {
    user,
    token
}
