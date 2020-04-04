import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from "react-native-modal";

/**
 * プロパティ定義
 */
export interface RouteHistoryListMenuProps {
  onDialogDismiss: () => void;
  menuTitles: string[];
  isModalVisible: boolean;
}

/**
 * State定義
 */
export interface RouteHistoryListMenuState {
  menuTitles: string[];
}

/**
 * ルート履歴画面でロングタップした時に表示されるポップアップメニュー
 */
export default class RouteHistoryListMenu extends React.Component<RouteHistoryListMenuProps, RouteHistoryListMenuState> {

  /**
   * コンストラクタ
   * @param props 
   */
  constructor(props: RouteHistoryListMenuProps) {
    super(props);
    this.state = {
      menuTitles: props.menuTitles
    }
  }

  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <FlatList
          data={this.props.menuTitles}
          renderItem={value => this.renderList(value.item)}
          keyExtractor={(value, index) => index.toString()} />
      </Modal>
    )
  }

  renderList = (item) => {
    return (
      <ListItem title={item} onPress={() => { this.props.onDialogDismiss() }} />
    )
  }
}

/**
 * Define view styles.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
})
