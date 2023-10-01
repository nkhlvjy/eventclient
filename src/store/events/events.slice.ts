import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { EventType } from '../../types/EventTypes'

export type EventsSliceType = {
    allEvents: EventType[];
    registeredEvents: EventType[]
}

const initialState: EventsSliceType = {
    allEvents: [],
    registeredEvents: []
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        updateAllEvents: (state: EventsSliceType, action: PayloadAction<EventType[]>) => {
            state.allEvents = action.payload
        },

        updateRegisteredEvents: (state: EventsSliceType, action: PayloadAction<EventType[]>) => {
            state.registeredEvents = action.payload
        }
    }
})

export const {updateAllEvents, updateRegisteredEvents} = eventsSlice.actions
