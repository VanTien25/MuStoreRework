import { CHECKOUT} from './constants'

export const checkout = payload => ({
    type: CHECKOUT,
    payload
})