import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Drive } from './domains/Drive';
import DriveList from './components/DriveList';
import PointNameDialog, { PointNameDialogState } from './components/PointNameDialog';
import { addNewRecord, addPointName, loadDrives } from './Reducer'
import AppStorage from './AppStorage'

const appStorage = new AppStorage()

/**
 * ApplicationComponent
 */
export class RouteEntry extends React.Component<RouteEntryProps> {
  /**
   * render main view.
   */
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.drives}
          renderItem={value => this.renderList(value.item)}
          keyExtractor={value => `${value.id}`}
        />
        <View>
          <Button title="Record" onPress={this.handleRecordBtnClick} />
          <Button title="Store" onPress={this.storeData} />
          <Button title="Restore" onPress={this.getData} />
        </View>
        <PointNameDialog
          isModalVisible={this.props.isModalVisible}
          onDialogDismiss={this.handleDialogDismiss}
        />
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
   * Recordボタン押下時の処理
   */
  handleRecordBtnClick = () => {
    this.props.addNewRecord()
  };

  /**
   * モーダルダイアログで発生したイベントハンドリング
   */
  handleDialogDismiss = (value: PointNameDialogState) => {
    if (value !== undefined) {
      this.props.addPointName(value.pointName)
    }
  };

  // componentDidMount = () => {
  //   AppState.addEventListener('change', this.handleAppStateChange);
  // };

  // componentWillUnmount = () => {
  //   AppState.removeEventListener('change', this.handleAppStateChange);
  // };

  // handleAppStateChange = nextAppState => {
  //   if (
  //     this.state.appState.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('App has come to the foreground!');
  //   }
  //   this.setState({ appState: nextAppState });
  // };

  storeData = () => {
    appStorage.saveDrivesToStorage(this.props.drives)
  };

  getData = async () => {
    try {
      const drives: Drive[] = await appStorage.loadDrivesFromStorage()
      this.props.loadDrives(drives)
    } catch (error) {
      console.warn('err:' + error)
    }
  };
}

/**
 * Define view styles.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


const mapStateToProps = state => ({
  // storeは巨大なJsonの塊なので、nameにjsonから取って来たデータを代入している。 
  name: state.user.name,
  drives: state.user.drives,
  isModalVisible: state.user.isModalVisible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNewRecord: () => dispatch(addNewRecord()),
  addPointName: (newPointName: string) => dispatch(addPointName(newPointName)),
  loadDrives: (drives: Drive[]) => dispatch(loadDrives(drives))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteEntry)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
type RouteEntryProps = StateProps & DispatchProps
