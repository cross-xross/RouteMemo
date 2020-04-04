import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route } from '../domains/Route';
import RouteHistoryListMenu from './RouteHistoryListMenu';
import { createRoute, renameRoute, loadRoute, saveRoute } from '../Reducer'

export class RouteHistory extends React.Component<RouteHistoryProps> {
  isPopupMenuVisible = false

  render() {
    return (
      <View style={styles.container}>
        <Text>Route History</Text>
        <FlatList<Route>
          data={this.props.allRoutes}
          renderItem={value => this.renderList(value.item)}
          keyExtractor={value => `${value.id}`}
        />
        <View>
          <Button title="NewRoute" onPress={this.props.createRoute} />
        </View>
        <RouteHistoryListMenu
          menuTitles={["rename", "delete", "export"]}
          isModalVisible={this.isPopupMenuVisible}
          onDialogDismiss={this.handleDialogDismiss}
        />
      </View>
    )
  }

  /**
   * render drive process list
   */
  renderList = (item: Route) => {
    return (
      <ListItem
        title={item.routeName}
        onPress={() => this.handleRouteTop(item)}
        onLongPress={() => this.handleRouteLongTop(item)} />
    )
  }

  /**
   * ルート名タップ時の処理
   */
  handleRouteTop = (item: Route) => {
    this.props.loadRoute(item)
    this.props.navigation.navigate('Entry', item);
  }

  /**
   * ルート名ロングタップ時の処理
   */
  handleRouteLongTop = (item: Route) => {
    //ポップアップを表示
    this.isPopupMenuVisible = true
  }

  /**
   * モーダルダイアログで発生したイベントハンドリング
   */
  handleDialogDismiss = () => {
    this.isPopupMenuVisible = false
    alert('dismiss')
  }

  /**
   * Renameボタン押下時の処理
   */
  renameRoute = () => {
    this.props.renameRoute(this.props.currentRouteId, 'ルート名変更しました')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = state => ({
  allRoutes: state.user.allRoutes,
  currentRoute: state.user.currentRoute,
  currentRouteId: state.user.currentRouteId
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  renameRoute: (routeId: number, newRouteName: string) => dispatch(renameRoute(routeId, newRouteName)),
  createRoute: () => dispatch(createRoute()),
  loadRoute: (route: Route) => dispatch(loadRoute(route)),
  saveRoute: () => dispatch(saveRoute())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteHistory)

interface NavigatorProps {
  navigation: NavigationScreenProp<any, any>,
}

type RouteHistoryProps = NavigatorProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
