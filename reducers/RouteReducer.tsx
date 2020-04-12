import { createSlice } from '@reduxjs/toolkit';
import { Drive, DriveImpl, DriveCondition } from '../domains/Drive'
import { Route, RouteImpl } from '../domains/Route';
import { dateFormat } from '../util/dateFormat'

export interface RouteReducerInterface {
  isModalVisible: boolean
  allRoutes: Route[]
  currentRoute: Route
  currentRouteId: number
  isRouteHistoryPopupMenuVisible: boolean
  isRouteNameEntryDialogVisible: boolean
}

/**
 * 新規ルート生成
 */
const createNewRoute = (): Route => {
  const now = new Date()
  const newCurrentRoute = new RouteImpl(
    now.getTime(),
    dateFormat.format(now, 'yyyy/MM/dd hh:mm') + 'のルート'
  )
  return newCurrentRoute
}

/**
 * stateの初期値
 */
const initialState: RouteReducerInterface = setUpState()
function setUpState(): RouteReducerInterface {
  const newCurrentRoute = createNewRoute()
  const newRoutes = []
  newRoutes.push(newCurrentRoute)
  return {
    isModalVisible: false,
    allRoutes: newRoutes,
    currentRoute: newCurrentRoute,
    currentRouteId: newCurrentRoute.id,
    isRouteHistoryPopupMenuVisible: false,
    isRouteNameEntryDialogVisible: false
  }
}

export default createSlice({
  name: 'route',
  initialState: initialState,
  reducers: {
    // ドライブレコード追加
    ADD_NEW_RECORD: (state: RouteReducerInterface, action) => {
      const newDrives = addNewRecordImpl(state.currentRoute.drives)
      const latestDrive = getLatestDrive(newDrives)
      const newCurretRoute = {
        ...state.currentRoute,
        drives: newDrives
      }
      state.currentRoute = newCurretRoute
      state.isModalVisible = (latestDrive.mode === DriveCondition.WAIT_FOR_POINT_NAME)
    },
    // 地点名追加
    ADD_POINT_NAME: (state: RouteReducerInterface, action) => {
      const newDrives = state.currentRoute.drives.map((drive, index) => {
        if (index !== state.currentRoute.drives.length - 1) return drive;
        drive.pointName = action.payload.pointName
        return drive;
      })
      const newCurretRoute = {
        ...state.currentRoute,
        drives: newDrives
      }
      state.currentRoute = newCurretRoute
      state.isModalVisible = false
    },
    // ルート新規生成
    CREATE_ROUTE: (state: RouteReducerInterface, action) => {
      // currentRouteをallRoutesに保存する
      let issaved = false
      const newRoutes = state.allRoutes.map(value => {
        if (value.id !== state.currentRouteId) return value
        issaved = true
        return state.currentRoute
      })
      if (!issaved) newRoutes.push(state.currentRoute)

      // currentRouteに新しいRouteを設定する
      const newCurrentRoute = createNewRoute()
      newRoutes.push(newCurrentRoute)
      state.allRoutes = newRoutes
      state.currentRoute = newCurrentRoute
      state.currentRouteId = newCurrentRoute.id
    },
    // actionで渡された全ルートをstateに保存
    LOAD_ALL_ROUTES: (state: RouteReducerInterface, action) => {
      const newRoutes = [...action.payload.routes]
      let newCurrentRouteId = action.payload.currentRouteId
      // 現在のルートを読み込み
      let newCurrentRoute = action.payload.routes.find((value) => value.id === newCurrentRouteId)
      if (typeof newCurrentRoute === 'undefined') {
        // 現在のルートを新規生成
        newCurrentRoute = createNewRoute()
        newCurrentRouteId = newCurrentRoute.id
        newRoutes.push(newCurrentRoute)
      }
      state.allRoutes = newRoutes
      state.currentRoute = newCurrentRoute
      state.currentRouteId = newCurrentRouteId
    },
    // Actionで渡されたルートをstateのcurrentRouteに保存
    LOAD_ROUTE: (state: RouteReducerInterface, action) => {
      // currentRouteをallRoutesに保存する
      const newRoutes = state.allRoutes.map(value => {
        if (value.id !== state.currentRouteId) return value
        return state.currentRoute
      })

      // Actionで渡されたRouteをcurrentRouteとcurrentRouteIdに設定する
      if (action.payload.route.id !== state.currentRouteId) {
        const newRoute = { ...action.payload.route }
        state.allRoutes = newRoutes
        state.currentRoute = newRoute
        state.currentRouteId = newRoute.id
      } else {
        state.allRoutes = newRoutes
      }
    },
    // currentRouteをallRoutesに保存、まだ使ってない、不要かも
    SAVE_ROUTE: (state: RouteReducerInterface, action) => {
      const newRoutes = state.allRoutes.map(value => {
        if (value.id !== state.currentRouteId) return value
        return state.currentRoute
      })
      state.allRoutes = newRoutes
    },
    // ルート名変更
    RENAME_ROUTE: (state: RouteReducerInterface, action) => {
      const newRoutes = renameRouteImpl(state.allRoutes, action.payload.routeId, action.payload.newRouteName)
      if (state.currentRouteId !== action.payload.routeId) {
        state.allRoutes = newRoutes
      } else {
        const newCurrentRoute = { ...state.currentRoute }
        newCurrentRoute.routeName = action.payload.newRouteName
        state.allRoutes = newRoutes
        state.currentRoute = newCurrentRoute
      }
    },
    // ルート履歴画面ポップアップメニュー表示切り替え
    SET_ROUTE_HISTORY_POPUPMENU_VISIBLE: (state: RouteReducerInterface, action) => {
      state.isRouteHistoryPopupMenuVisible = action.payload.visible
    },
    // ルート名入力ダイアログ表示
    SET_ROUTE_NAME_ENTRY_DIALOG_VISIBLE: (state: RouteReducerInterface, action) => {
      state.isRouteNameEntryDialogVisible = action.payload.visible
    },
    // ルート削除（未実装）
    DELETE_ROUTE: (state: RouteReducerInterface, action) => {
    }
  }
})

/**
 * ルート名を変更します
 */
const renameRouteImpl = (routes: Route[], routeId: number, newRouteName: string): Route[] => {
  const newRoutes = routes.map(value => {
    if (value.id !== routeId) return value
    const newRoute = { ...value }
    newRoute.routeName = newRouteName
    return newRoute
  })
  return newRoutes
}

/**
 * ログを追加します
 */
const addNewRecordImpl = (drives: Drive[]): Drive[] => {
  let newDrives
  if (drives.length === 0 || isAllAreaInputed(getLatestDrive(drives))) {
    newDrives = [...drives]
    newDrives.push(
      new DriveImpl(
        drives.length,
        undefined,
        Date.now(),
        undefined,
        DriveCondition.WAIT_FOR_POINT_NAME
      )
    )
  } else {
    newDrives = drives.map((drive, index) => {
      if (index !== drives.length - 1) return drive;
      return moveNextInput(drive);
    })
  }
  return newDrives
}

const moveNextInput = (drive: Drive): Drive => {
  const newDrive = { ...drive }
  if (newDrive.arrivalTime === undefined) {
    // このコードを通ることはないはず
    newDrive.arrivalTime = Date.now()
  } else if (newDrive.pointName === undefined) {
  } else if (newDrive.departureTime === undefined) {
    newDrive.departureTime = Date.now()
    newDrive.mode = DriveCondition.WAIT_FOR_ARRIVAL
  }
  return newDrive
}

const isAllAreaInputed = (drive: Drive): boolean => {
  if (
    drive.arrivalTime !== undefined &&
    drive.pointName !== undefined &&
    drive.departureTime !== undefined
  ) {
    return true;
  }
  return false;
}

/**
 * 一番新しい運転履歴を取得します
 */
const getLatestDrive = (drives: Drive[]): Drive => {
  return drives[drives.length - 1];
}
