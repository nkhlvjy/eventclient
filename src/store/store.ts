import { configureStore } from '@reduxjs/toolkit';
import { eventsSlice, EventsSliceType } from './events/events.slice';

export type StateType = {
	[eventsSlice.name]: EventsSliceType;
};

export const store = configureStore<StateType>({
	reducer: {
		[eventsSlice.name]: eventsSlice.reducer,
	},
});
