import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import Modal from "react-native-modal";

import DriveList, {DeviceListProps} from './components/DriveList';

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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
            <Text>Modal Content</Text>
            <Button title="Close modal" onPress={this.toggleModal} />
          </View>
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
    this.toggleModal;
    // let updatedDrive;
    // let tmpDrives = [...this.state.drives]
    //                   .map((drive, index) => {
    //                     if (index !== this.state.drives.length - 1) return drive;
    //                     updatedDrive = this.updateDriveInfo(drive);
    //                     return updatedDrive;
    //                   });
    // if (updatedDrive === null) {
    //   // 最後の地点の出発時刻まで記録済なので、新しい地点オブジェクトを追加
    //   const newDrive = new DriveImpl(this.state.drives.length);
    //   newDrive.arrivalTime = (new Date()).toLocaleTimeString();
    //   tmpDrives.push(newDrive);
    // }
    // this.setState({
    //   drives: tmpDrives
    // } as AppState)
  }

  private toggleModal = () => {
    this.setState(() => ({drives:this.state.drives, isModalVisible: true}));
  }

  /**
   * initialize state value;
   */
  private initializeState = () => {
    return {
      drives: [
        {
          id: 1,
          pointName: 'スタート地点',
        },
        {
          id: 2,
          pointName: '村営駐車場',
        },
      ],
      isModalVisible: false
    } as AppState    
  }

  private updateDriveInfo = (drive: Drive) => {
    const newDrive = {...drive};
    if (drive.arrivalTime === undefined) {
      // このコードを通ることはないはず
      newDrive.arrivalTime = (new Date()).toLocaleTimeString();
    } else if (drive.pointName === undefined) {
      newDrive.arrivalTime = drive.arrivalTime;
      newDrive.pointName = "新しい地点名";
    } else if (drive.departureTime === undefined) {
      newDrive.arrivalTime = drive.arrivalTime;
      newDrive.pointName = drive.pointName;
      newDrive.departureTime = (new Date()).toLocaleTimeString();
    } else {
      // 最後の地点の出発時刻まで記録済
      return null;
    }
    return newDrive;   
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
