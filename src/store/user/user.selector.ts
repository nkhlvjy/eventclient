import {StateType} from '../store'
import {UserSliceType} from './user.slice'

export const userSliceSelector = (state: StateType): UserSliceType => {
    return state.user
}
