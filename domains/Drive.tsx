export interface Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;

  isAllAreaInputed(): boolean;
  moveNextInput(): void;
}

export class DriveImpl implements Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;

  /**
   * コンストラクタ
   */
  constructor(id: number, pointName?: string, arrivalTime?: string, departureTime?: string) {
    this.id = id;
    this.pointName = pointName;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
  }

  /**
   * 入力完了かどうかを取得します
   */
  isAllAreaInputed(): boolean {
    if (this.arrivalTime !== undefined &&
              this.pointName !== undefined &&
              this.departureTime !== undefined) {
      return true;
    }
    return false;
  }

  moveNextInput() {
    if (this.arrivalTime === undefined) {
      // このコードを通ることはないはず
      this.arrivalTime = (new Date()).toLocaleTimeString();
    } else if (this.pointName === undefined) {
      console.log("pointName undefined.");
      console.log("dialog visible.");
    } else if (this.departureTime === undefined) {
      this.departureTime = (new Date()).toLocaleTimeString();
    }
  }
}
