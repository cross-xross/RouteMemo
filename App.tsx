import * as React from 'react';
import { View, Button, StyleSheet, FlatList } from 'react-native';
import Modal from "react-native-modal";

import {Drive} from './components/Drive';
import DriveList, {DeviceListProps} from './components/DriveList';
import DriveListManager from './components/DriveListManager';
import PointNameDialog, { PointNameDialogState } from './components/PointNameDialog';

interface AppState {
  drives: Drive[];
  isModalVisible: boolean;
}

/**
 * ApplicationComponent
 */
export default class App extends React.Component<{}, AppState> {

  drivesManager: DriveListManager = new DriveListManager(this);

  /**
   * Constructor
   */
  constructor(props: {}) {
    super(props);
    this.state = {
      drives: this.drivesManager.drives,
      isModalVisible: false
    } as AppState;
  }
 
  /**
   * render main view.
   */
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.drives}
          renderItem={value => this.renderList(value.item)}
          keyExtractor={value => `${value.id}`}
        />
        <View>
          <Button
            title="Record"
            onPress={this.handleRecordBtnClick}
          />
        </View>
        <Modal isVisible={this.state.isModalVisible}>
          <PointNameDialog onDialogDismiss={this.handleDialogDismiss} />
        </Modal>
      </View>
    );
  }

  /**
   * render drive process list
   */
  renderList = (item: Drive) => {
    //Optional型のアンラップはもう少し丁寧にやる
    return (
      <DriveList
        pointName={item.pointName!}
        arrivalTime={item.arrivalTime!}
        departureTime={item.departureTime!}
      />
    );
  };

  handleRecordBtnClick = () => {
    this.drivesManager.addNewRecord();
  }

  /**
   * handle modal dialog event.
   */
  handleDialogDismiss = (value: PointNameDialogState) => {
    if (value !== undefined) {
      this.drivesManager.addPointName(value.pointName);
    }
    this.toggleModal(false);
  }

  toggleModal = (v: boolean) => {
    this.setState({isModalVisible: v} as AppState);
  }

}

/**
 * Define view styles.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
