import { combineReducers } from 'redux'

import globalsReducer from './globals'
import usersReducer from './users'

const rootReducer = combineReducers({
    globals: globalsReducer,
    users: usersReducer
})

export default rootReducer