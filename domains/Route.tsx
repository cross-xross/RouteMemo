import { Drive } from './Drive';

export interface Route {
  id: number
  drives: Drive[]
  routeName?: string
  timestamp?: string
}

export class RouteImpl implements Route {
  id: number
  drives: Drive[]
  routeName?: string
  timestamp?: string

  /**
   * コンストラクタ
   */
  constructor(id: number, routeName: string = '') {
    this.id = id
    this.drives = []
    this.routeName = routeName
  }

}
