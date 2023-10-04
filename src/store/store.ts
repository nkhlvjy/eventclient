import { configureStore } from '@reduxjs/toolkit';
import { eventsSlice, EventsSliceType } from './events/events.slice';
import { userSlice, UserSliceType } from './user/user.slice';

export type StateType = {
	[eventsSlice.name]: EventsSliceType;
	[userSlice.name]: UserSliceType;
};

export const store = configureStore<StateType>({
	reducer: {
		[eventsSlice.name]: eventsSlice.reducer,
		[userSlice.name]: userSlice.reducer
	},
});
