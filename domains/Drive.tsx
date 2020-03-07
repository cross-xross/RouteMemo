export enum DriveCondition {
  WAIT_FOR_ARRIVAL,
  WAIT_FOR_POINT_NAME
}

export interface Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;
  mode: DriveCondition;

  // isAllAreaInputed(): boolean;
  // moveNextInput(): void;
}

export class DriveImpl implements Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;
  mode: DriveCondition;

  /**
   * コンストラクタ
   */
  constructor(
    id: number,
    pointName?: string,
    arrivalTime?: string,
    departureTime?: string,
    mode?: DriveCondition
  ) {
    this.id = id;
    this.pointName = pointName;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.mode = mode;
  }

  // load = newDrive => {
  //   this.id = newDrive.id;
  //   this.pointName = newDrive.pointName;
  //   this.arrivalTime = newDrive.arrivalTime;
  //   this.departureTime = newDrive.departureTime;
  //   this.mode = newDrive.mode;
  // };

  /**
   * 入力完了かどうかを取得します
   */
  // isAllAreaInputed(): boolean {
  //   if (
  //     this.arrivalTime !== undefined &&
  //     this.pointName !== undefined &&
  //     this.departureTime !== undefined
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  // moveNextInput() {
  //   if (this.arrivalTime === undefined) {
  //     // このコードを通ることはないはず
  //     this.arrivalTime = new Date().toLocaleTimeString();
  //   } else if (this.pointName === undefined) {
  //   } else if (this.departureTime === undefined) {
  //     this.departureTime = new Date().toLocaleTimeString();
  //     this.mode = DriveCondition.WAIT_FOR_ARRIVAL;
  //   }
  // }
}
