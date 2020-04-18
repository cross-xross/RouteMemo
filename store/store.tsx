import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'
import routeModule from '../reducers/RouteReducer'

export interface AppStateInterface {
  route: any
}

const rootReducer = combineReducers({
  route: routeModule.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatch = typeof store.dispatch

export default store

