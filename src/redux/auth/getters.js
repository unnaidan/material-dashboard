import { store } from './../store'

const token = () => {
    const { token } = store.getState().auth

    return token
}

export {
    token
}
