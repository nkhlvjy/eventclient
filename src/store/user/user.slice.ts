import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserType } from '../../types/UserType';

export type UserSliceType = {
    user: UserType | undefined;
}

const initialState: UserSliceType = {
    user: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state: UserSliceType, action: PayloadAction<UserType>) => {
            state.user = action.payload
        },
    }
})

export const {updateUser} = userSlice.actions
