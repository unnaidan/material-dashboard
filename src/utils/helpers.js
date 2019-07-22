import { debounce } from 'lodash'

/**
 * Join paths
 * 
 * @param  {...any} args 
 * @returns {String}
 */
const pathJoin = (...args) => {
    return args.join('/')
}

/**
 * Lodash debounce function
 */
const debounced = debounce(callFunc => {
    callFunc()
}, 500)

export {
    pathJoin,
    debounced
}
