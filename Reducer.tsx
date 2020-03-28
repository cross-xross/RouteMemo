import { combineReducers, createStore } from 'redux';
import { Drive, DriveImpl, DriveCondition } from './domains/Drive';
import { Route, RouteImpl } from './domains/Route';
import { dateFormat } from './util/dateFormat'

// actions.js
// actionはreduxの機能でなく、オブジェクトを作るための純粋なjsの関数です。
export const addNewRecord = () => ({
    type: 'ADD_NEW_RECORD'
})

export const addPointName = (newPointName: string) => ({
    type: 'ADD_POINT_NAME',
    pointName: newPointName
})

export const loadAllRoutes = (routes: Route[], currentRouteId: number) => ({
    type: 'LOAD_ALL_ROUTES',
    routes: routes,
    currentRouteId: currentRouteId
})

export const loadRoute = (route: Route) => ({
    type: 'LOAD_ROUTE',
    route: route
})

export const saveRoute = () => ({
    type: 'SAVE_ROUTE'
})

export const createRoute = () => ({
    type: 'CREATE_ROUTE'
})

export const renameRoute = (routeId: number, newRouteName: string) => ({
    type: 'RENAME_ROUTE',
    routeId: routeId,
    newRouteName: newRouteName
})

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
const initState = () => {
    const newCurrentRoute = createNewRoute()
    const newRoutes = []
    newRoutes.push(newCurrentRoute)
    return {
        isModalVisible: false,
        allRoutes: newRoutes,
        currentRoute: newCurrentRoute,
        currentRouteId: newCurrentRoute.id
    }
}

// reducers.js
// reduxではglobal stateを巨大なjson(store)として管理します。stateの変更はjsonの書き換えによってのみ管理します。
// actionは純粋なjsのオブジェクトを作る関数であることを思い出してください。
// reducerはactionで生成されたオブジェクトを受け取り、巨大なjson(store)を書き換える関数です。
const reducer = (state = initState(), action) => {
    switch (action.type) {
        // ドライブレコード追加
        case 'ADD_NEW_RECORD': {
            const newDrives = addNewRecordImpl(state.currentRoute.drives)
            const latestDrive = getLatestDrive(newDrives)
            const newCurretRoute = {
                ...state.currentRoute,
                drives: newDrives
            }
            return {
                ...state,
                currentRoute: newCurretRoute,
                isModalVisible: latestDrive.mode === DriveCondition.WAIT_FOR_POINT_NAME
            }
        }
        // 地点名追加
        case 'ADD_POINT_NAME': {
            const newDrives = state.currentRoute.drives.map((drive, index) => {
                if (index !== state.currentRoute.drives.length - 1) return drive;
                drive.pointName = action.pointName
                return drive;
            })
            const newCurretRoute = {
                ...state.currentRoute,
                drives: newDrives
            }
            return {
                ...state,
                currentRoute: newCurretRoute,
                isModalVisible: false
            }
        }
        // ルート新規生成
        case 'CREATE_ROUTE': {
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
            return {
                ...state,
                allRoutes: newRoutes,
                currentRoute: newCurrentRoute,
                currentRouteId: newCurrentRoute.id
            }
        }
        // ルートをstateに保存
        case 'LOAD_ALL_ROUTES': {
            const newRoutes = [...action.routes]
            let newCurrentRouteId = action.currentRouteId
            // 現在のルートを読み込み
            let newCurrentRoute = action.routes.find((value) => value.id === newCurrentRouteId)
            if (typeof newCurrentRoute === "undefined") {
                // 現在のルートを新規生成
                newCurrentRoute = createNewRoute()
                newCurrentRouteId = newCurrentRoute.id
                newRoutes.push(newCurrentRoute)
            }
            return {
                ...state,
                allRoutes: newRoutes,
                currentRoute: newCurrentRoute,
                currentRouteId: newCurrentRouteId
            }
        }
        // Actionで渡されたルートをstateのcurrentRouteに保存
        case 'LOAD_ROUTE': {
            // currentRouteをallRoutesに保存する
            const newRoutes = state.allRoutes.map(value => {
                if (value.id !== state.currentRouteId) return value
                return state.currentRoute
            })

            // Actionで渡されたRouteをcurrentRouteとcurrentRouteIdに設定する
            if (action.route.id !== state.currentRouteId) {
                const newRoute = { ...action.route }
                return {
                    ...state,
                    allRoutes: newRoutes,
                    currentRoute: newRoute,
                    currentRouteId: newRoute.id
                }
            } else {
                return {
                    ...state,
                    allRoutes: newRoutes
                }
            }
        }
        // currentRouteをallRoutesに保存、まだ使ってない、不要かも
        case 'SAVE_ROUTE': {
            const newRoutes = state.allRoutes.map(value => {
                if (value.id !== state.currentRouteId) return value
                return state.currentRoute
            })
            return {
                ...state,
                allRoutes: newRoutes
            }
        }
        // ルート名変更
        case 'RENAME_ROUTE': {
            const newRoutes = renameRouteImpl(state.allRoutes, action.routeId, action.newRouteName)
            if (state.currentRouteId !== action.routeId) {
                return {
                    ...state,
                    allRoutes: newRoutes
                }
            } else {
                const newCurrentRoute = { ...state.currentRoute }
                newCurrentRoute.routeName = action.newRouteName
                return {
                    ...state,
                    allRoutes: newRoutes,
                    currentRoute: newCurrentRoute
                }
            }
        }
        default:
            return state;
    }
}

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

export const reducers = combineReducers({
    user: reducer
})

// store.js
export const store = createStore(reducers)

// storeは巨大なjsonです。storeの中身を取り出すにはgetStateメソッドを使います。
// エミュレータでcommand + dを押し、enable remote debugをクリックしましょう。
// debuggerが現れるので、consoleタブをクリックし、エミュレータ上でアプリをcommandd + rで再起動しましょう。
console.log(store.getState)

// arrayやobjectを綺麗に表示したい時はconsole.tableが便利です。
console.table(store.getState)

// storeはjsonです。つまりjsのオブジェクトです。 jsの関数のtypeofでstoreのstateがオブジェクトであることを確かめましょう。
console.log(typeof store.getState)

// storeもまたjsのオブジェクトであり、４つしかメソッドを持たないことを確認しておきましょう。
console.log(store)