import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Reducer'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import RouteEntry from './components/RouteEntry'
import RootScreen from './components/RootScreen'
import RouteHistory from './components/RouteHistory'

const RootStack = createStackNavigator(
  {
    Root: RootScreen,
    Entry: RouteEntry,
    History: RouteHistory
  },
  {
    initialRouteName: 'Root'
  }
)

const AppContainer = createAppContainer(RootStack);

/**
 * ApplicationComponent
 */
export default class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
