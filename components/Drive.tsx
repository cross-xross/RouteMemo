export interface Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;
}

export class DriveImpl implements Drive {
  id: number;
  pointName?: string;
  arrivalTime?: string;
  departureTime?: string;

  constructor(id: number) {
    this.id = id;
  }
}
