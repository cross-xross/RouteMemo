import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route } from '../domains/Route';
import { createRoute, renameRoute, loadRoute, saveRoute } from '../Reducer'

export class RouteHistory extends React.Component<RouteHistoryProps> {
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
            </View>
        );
    }

    /**
     * render drive process list
     */
    renderList = (item: Route) => {
        return (
            <ListItem title={item.routeName} onPress={() => this._onTapRoute(item)}>
            </ListItem>
        )
    }

    /**
     * ルート名タップ時の処理
     */
    _onTapRoute = (item: Route) => {
        this.props.loadRoute(item)
        this.props.navigation.navigate('Entry', item);
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
});


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

type RouteHistoryProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
