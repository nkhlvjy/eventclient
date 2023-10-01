import {StateType} from '../store'
import {EventsSliceType} from './events.slice'

export const eventsSliceSelector = (state: StateType): EventsSliceType => {
    return state.events
}
