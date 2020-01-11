import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import Modal from "react-native-modal";

import DriveList, {DeviceListProps} from './components/DriveList';
import PointNameDialog, { PointNameDialogState } from './components/PointNameDialog';

interface AppState {
  drives: Drive[];
  isModalVisible: boolean;
}

interface Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;
}

class DriveImpl implements Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;

  constructor(id: number) {
    this.id = id;
  }
}


/**
 * ApplicationComponent
 */
export default class App extends React.Component<{}, AppState> {

  /**
   * Constructor
   */
  constructor(props: {}) {
    super(props);
    this.state = this.initializeState();
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

  /**
   * handle Record button touched.
   */
  handleRecordBtnClick = () => {
    let updatedDrive;
    let addDrive = false;
    let tmpDrives = [...this.state.drives]
                      .map((drive, index) => {
                        if (index !== this.state.drives.length - 1) return drive;
                        updatedDrive = this.updateDriveInfo(drive);
                        if (updatedDrive === null) {
                          updatedDrive = {...drive};
                          addDrive = true;
                        }
                        return updatedDrive;
                      });
    if (addDrive) {
      // 最後の地点の出発時刻まで記録済なので、新しい地点オブジェクトを追加
      const newDrive = new DriveImpl(this.state.drives.length);
      newDrive.arrivalTime = (new Date()).toLocaleTimeString();
      tmpDrives.push(newDrive);
    }
    this.setState({drives: tmpDrives} as AppState);
  }

  private updateDriveInfo = (drive: Drive) => {
    const newDrive = {...drive};
    if (drive.arrivalTime === undefined) {
      // このコードを通ることはないはず
      newDrive.arrivalTime = (new Date()).toLocaleTimeString();
    } else if (drive.pointName === undefined) {
      this.toggleModal(true);
    } else if (drive.departureTime === undefined) {
      newDrive.departureTime = (new Date()).toLocaleTimeString();
    } else {
      // 最後の地点の出発時刻まで記録済
      return null;
    }
    return newDrive;
  }

  /**
   * handle modal dialog event.
   */
  handleDialogDismiss = (value: PointNameDialogState) => {
    if (value !== undefined) {
      let tmpDrives = [...this.state.drives]
      .map((drive, index) => {
        if (index !== this.state.drives.length - 1) return drive;
        const newDrive = {...drive};
        newDrive.pointName = value.pointName;
        return newDrive;
      });
      this.setState({drives: tmpDrives} as AppState)
    }
    this.toggleModal(false);
  }

  toggleModal = (v: boolean) => {
    this.setState({isModalVisible: v} as AppState);
  }

  /**
   * initialize state value;
   */
  private initializeState = () => {
    return {
      drives: [
        {
          id: 0,
          arrivalTime: "",
          pointName: 'スタート地点',
          departureTime: ""
        },
        {
          id: 1,
          arrivalTime: "",
          pointName: '村営駐車場',
          departureTime: ""
        },
        {
          id: 2,
          arrivalTime: "",
          pointName: '休憩所',
          departureTime: ""
        },
      ],
      isModalVisible: false
    } as AppState
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
