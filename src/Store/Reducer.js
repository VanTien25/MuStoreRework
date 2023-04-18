import { CHECKOUT } from "./constants"

const initState = []

function Reducer(state = initState, action) {
    switch (action.type) {
        case CHECKOUT:
            return [action.payload]
        default:
            throw new Error('Invalid action.')
    }
}

export { initState }
export default Reducer