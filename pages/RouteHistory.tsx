import * as React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem } from 'react-native-elements'
import Dialog from "react-native-dialog"
import { Route } from '../domains/Route'
import RouteHistoryListMenu from '../components/RouteHistoryListMenu'
import {
  createRoute, renameRoute, loadRoute, setRouteHistoryPopupMenuVisible, setRouteNameEntryDialogVisible
} from '../actions/RouteActions'

/**
 * ApplicationComponent
 */
export default () => {
  return (
    <View style={styles.container}>
      <RouteHistoryArea />
      <ButtonArea />
      <ModalArea />
      <MenuArea />
    </View>
  )
}

let selectedRouteId = -1

/**
 * ルート表示領域
 */
const RouteHistoryArea = (props) => {

  const allRoutes = useSelector(state => state.user.allRoutes)
  const dispatch = useDispatch()

  return (
    <View>
      <Text>Route History</Text>
      <FlatList<Route>
        data={allRoutes}
        renderItem={value => renderList(value.item)}
        keyExtractor={value => `${value.id}`}
      />
    </View>
  )

  /**
   * リスト描画
   * @param item 
   */
  function renderList(item: Route) {
    return (
      <ListItem
        title={item.routeName}
        onPress={() => handleRouteTop(item)}
        onLongPress={() => handleRouteLongTop(item)} />
    )
  }

  /**
   * ルート名タップ時の処理
   */
  function handleRouteTop(item: Route) {
    dispatch(loadRoute(item))
    props.navigation.navigate('Entry', item);
  }

  /**
   * ルート名ロングタップ時の処理
   */
  function handleRouteLongTop(item: Route) {
    selectedRouteId = item.id
    dispatch(setRouteHistoryPopupMenuVisible(true))
  }
}

/**
 * ボタン表示領域
 */
const ButtonArea = () => {
  const dispatch = useDispatch()

  return (
    <Button title="NewRoute" onPress={handleNewRouteBtnClick} />
  )

  /**
   * NewRouteボタン押下時の処理
   */
  function handleNewRouteBtnClick() {
    dispatch(createRoute())
  }
}

/**
 * モーダル表示領域
 */
const ModalArea = () => {
  let currentRouteName = ''

  const isRouteNameEntryDialogVisible = useSelector(state => state.user.isRouteNameEntryDialogVisible)
  const dispatch = useDispatch()

  return (
    <Dialog.Container visible={isRouteNameEntryDialogVisible}>
      <Dialog.Title>ルート名変更</Dialog.Title>
      <Dialog.Input label="変更後のルート名称を入力してください。" onChangeText={(routeName) => { currentRouteName = routeName }} />
      <Dialog.Button label="Cancel" onPress={() => { dispatch(setRouteNameEntryDialogVisible(false)) }} />
      <Dialog.Button label="OK" onPress={handleRenameRouteOK} />
    </Dialog.Container>
  )

  /**
   * ルート名変更
   */
  function handleRenameRouteOK() {
    dispatch(renameRoute(selectedRouteId, currentRouteName))
    dispatch(setRouteNameEntryDialogVisible(false))
  }
}

/**
 * メニュー表示領域
 */
const MenuArea = () => {
  const isRouteHistoryPopupMenuVisible = useSelector(state => state.user.isRouteHistoryPopupMenuVisible)
  const dispatch = useDispatch()

  return (
    <RouteHistoryListMenu
      menuItems={[
        {
          menuTitle: 'rename',
          onMenuPress: () => { beginRenameRoute() }
        }
      ]}
      isModalVisible={isRouteHistoryPopupMenuVisible}
    />
  )

  /**
   * ルート名入力ダイアログ表示
   */
  function beginRenameRoute() {
    dispatch(setRouteHistoryPopupMenuVisible(false))
    dispatch(setRouteNameEntryDialogVisible(true))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})