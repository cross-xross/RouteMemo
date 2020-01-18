import {Drive, DriveImpl, DriveCondition} from './Drive';

/**
 * 運転履歴を保持するドメインクラスです
 */
export default class DriveHistory {

  private drives: Drive[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.drives = this.initializeDrives();
  }

  /**
   * ログを追加します
   */
  addNewRecord = () => {
    if (this.getLatestDrive().isAllAreaInputed()) {
      this.drives.push(new DriveImpl(this.drives.length, 
        undefined, 
       (new Date()).toLocaleTimeString(), 
        undefined,
        DriveCondition.WAIT_FOR_POINT_NAME));
    } else {
      this.drives = this.drives
        .map((drive, index) => {
          if (index !== this.drives.length - 1) return drive;
          drive.moveNextInput();
          return drive;
        });
    }
  }

  /*
   * 地点名を追加します
   * @param newPointName 
   */
  addPointName(newPointName: string) {
    this.drives = this.drives
      .map((drive, index) => {
        if (index !== this.drives.length - 1) return drive;
        drive.pointName = newPointName;
        return drive;
      });
  }

  /**
   * 運転履歴を取得します
   */
  getDriveList() : Drive[] {
      return this.drives;
  }

  /**
   * 一番新しい運転履歴を取得します
   */
  getLatestDrive() : Drive {
    return this.drives[this.drives.length - 1];
  }
  
  /**
   * initialize state value;
   */
  private initializeDrives = () => {
    return [
      new DriveImpl(0, 'スタート地点', "",""), 
      new DriveImpl(1, '村営駐車場', "",""),
      new DriveImpl(2, '休憩所', "",""),  
    ]
  }

}