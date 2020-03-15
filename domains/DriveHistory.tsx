import { Drive, DriveImpl, DriveCondition } from './Drive';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
});

/**
 * 運転履歴を保持するドメインクラスです
 */
export default class DriveHistory {
  private drives: Drive[];

  /**
   * コンストラクタ
   */
  constructor(newdrives: Drive[]) {
    if (newdrives === null) {
      this.drives = this.initializeDrives();
    } else {
      this.drives = newdrives;
    }
  }

  save = () => {
    try {
      storage.save({
        key: 'drives',
        data: this.drives
      });
    } catch (error) {
      // Error saving data
    }
  };

  load = async () => {
    try {
      const result: Drive[] = await storage.load({ key: 'drives' });
      const drives: Drive[] = result.map(drive => {
        return new DriveImpl(
          drive.id,
          drive.pointName,
          drive.arrivalTime,
          drive.departureTime,
          DriveCondition.WAIT_FOR_POINT_NAME
        );
      });
      this.drives = drives;
    } catch (error) {
      console.warn('err:' + error);
    }
  };

  /**
   * ログを追加します
   */
  // addNewRecord = () => {
  //   if (this.drives.length === 0 || this.getLatestDrive().isAllAreaInputed()) {
  //     this.drives.push(
  //       new DriveImpl(
  //         this.drives.length,
  //         undefined,
  //         new Date().toLocaleTimeString(),
  //         undefined,
  //         DriveCondition.WAIT_FOR_POINT_NAME
  //       )
  //     );
  //   } else {
  //     this.drives = this.drives.map((drive, index) => {
  //       if (index !== this.drives.length - 1) return drive;
  //       drive.moveNextInput();
  //       return drive;
  //     });
  //   }
  // };

  /*
   * 地点名を追加します
   * @param newPointName
   */
  // addPointName(newPointName: string) {
  //   this.drives = this.drives.map((drive, index) => {
  //     if (index !== this.drives.length - 1) return drive;
  //     drive.pointName = newPointName;
  //     return drive;
  //   });
  // }

  /**
   * 運転履歴を取得します
   */
  // getDriveList(): Drive[] {
  //   return this.drives;
  // }

  /**
   * 一番新しい運転履歴を取得します
   */
  // getLatestDrive(): Drive {
  //   return this.drives[this.drives.length - 1];
  // }

  /**
   * initialize state value;
   */
  private initializeDrives = () => {
    return [
      // new DriveImpl(0, 'スタート地点', '', ''),
      // new DriveImpl(1, '村営駐車場', '', ''),
      // new DriveImpl(2, '休憩所', '', '')
    ];
  };
}
