import { Drive } from './Drive';

/**
 * ルートクラス
 * IDは「Date.now()」を設定する
 */
export interface Route {
  id: number
  drives: Drive[]
  routeName?: string
  timestamp?: number
}

export class RouteImpl implements Route {
  id: number
  drives: Drive[]
  routeName?: string
  timestamp?: number

  /**
   * コンストラクタ
   */
  constructor(id: number, routeName: string = '') {
    this.id = id
    this.drives = []
    this.routeName = routeName
  }

}
