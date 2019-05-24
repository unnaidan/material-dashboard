import { store } from './../store'

const selected = () => {
    const { selection } = store.getState().theme

    return selection[0] || false
}

export {
    selected
}
