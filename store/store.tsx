import { combineReducers, createStore, applyMiddleware } from 'redux'
import RouteReducer from '../reducers/RouteReducer'
import thunkMiddleware from 'redux-thunk'

export interface AppStateInterface {
  route: any
}

const reducers = combineReducers<AppStateInterface>({
  route: RouteReducer.reducer
})

export default createStore(reducers, applyMiddleware(thunkMiddleware))
