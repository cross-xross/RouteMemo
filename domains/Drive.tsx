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
}
