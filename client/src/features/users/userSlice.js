import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        firstName: '',
        lastName: '',
        estimatedDueDate: '',
        phoneNumber: '',
        weeklySchedule: [],
        timeZone: '',
        dailySchedule: '',
    },
    reducers: {
        setCurrentUser: (state, {
            payload: {
                _id,
                firstName,
                lastName,
                estimatedDueDate,
                phoneNumber,
                weeklySchedule,
                timeZone,
                dailySchedule
            }
        }) => {
            state._id = _id
            state.firstName = firstName
            state.lastName = lastName
            state.estimatedDueDate = estimatedDueDate
            state.phoneNumber = phoneNumber
            state.weeklySchedule = weeklySchedule
            state.timeZone = timeZone
            state.dailySchedule = dailySchedule
        }
    },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice

export const selectCurrentUser = (state) => state.user