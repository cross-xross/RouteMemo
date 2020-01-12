import {Drive, DriveImpl} from './Drive';
import App from '../App';

export default class DriveListManager {

  drives: Drive[];
  parent: App;

  constructor(p: App) {
    this.parent = p;
    this.drives = this.initializeDrives();
  }

  /**
   * handle Record button touched.
   */
  addNewRecord = () => {
    let updatedDrive;
    let addDrive = false;
    let tmpDrives = [...this.drives]
                      .map((drive, index) => {
                        if (index !== this.drives.length - 1) return drive;
                        updatedDrive = this.updateDriveInfo(drive);
                        if (updatedDrive === null) {
                          updatedDrive = {...drive};
                          addDrive = true;
                        }
                        return updatedDrive;
                      });
    if (addDrive) {
      // 最後の地点の出発時刻まで記録済なので、新しい地点オブジェクトを追加
      const newDrive = new DriveImpl(this.drives.length);
      newDrive.arrivalTime = (new Date()).toLocaleTimeString();
      tmpDrives.push(newDrive);
    }
    this.drives = tmpDrives;
    this.parent.setState({drives: this.drives});
    console.log("addNewRecord end.");
  }

  private updateDriveInfo = (drive: Drive) => {
    const newDrive = {...drive};
    if (drive.arrivalTime === undefined) {
      // このコードを通ることはないはず
      newDrive.arrivalTime = (new Date()).toLocaleTimeString();
    } else if (drive.pointName === undefined) {
      console.log("pointName undefined.");
      this.parent.toggleModal(true);
      console.log("dialog visible.");
    } else if (drive.departureTime === undefined) {
      newDrive.departureTime = (new Date()).toLocaleTimeString();
    } else {
      // 最後の地点の出発時刻まで記録済
      return null;
    }
    return newDrive;
  }

  addPointName(newPointName: string) {
    let tmpDrives = [...this.drives]
    .map((drive, index) => {
      if (index !== this.drives.length - 1) return drive;
      const newDrive = {...drive};
      newDrive.pointName = newPointName;
      return newDrive;
    });
    this.drives = tmpDrives;
    this.parent.setState({drives: this.drives});
  }

  /**
   * initialize state value;
   */
  private initializeDrives = () => {
    return [
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
      ]
  }

}