import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from './Reducer'
import RouteEntry from './RouteEntry'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RootScreen from './RootScreen';
import RouteHistory from './RouteHistory';

const RootStack = createStackNavigator(
  {
    Root: RootScreen,
    Entry: RouteEntry,
    History: RouteHistory
  },
  {
    initialRouteName: 'Root'
  }
);

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
    );
  }
}
