import { combineReducers, createStore } from 'redux';
import { Drive, DriveImpl, DriveCondition } from './domains/Drive';

// actions.js
// actionはreduxの機能でなく、オブジェクトを作るための純粋なjsの関数です。
export const addNewRecord = () => ({
    type: 'ADD_NEW_RECORD'
})

export const addPointName = (newPointName: string) => ({
    type: 'ADD_POINT_NAME',
    pointName: newPointName
})

export const loadDrives = (drives: Drive[]) => ({
    type: 'LOAD_DRIVES',
    drives: drives
})

const INITIAL_STATE = {
    isModalVisible: false,
    drives: []
}

// reducers.js
// reduxではglobal stateを巨大なjson(store)として管理します。stateの変更はjsonの書き換えによってのみ管理します。
// actionは純粋なjsのオブジェクトを作る関数であることを思い出してください。
// reducerはactionで生成されたオブジェクトを受け取り、巨大なjson(store)を書き換える関数です。
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_NEW_RECORD': {
            const newDrives = addNewRecordImpl(state.drives)
            const latestDrive = getLatestDrive(newDrives)
            return {
                ...state,
                drives: newDrives,
                isModalVisible: latestDrive.mode === DriveCondition.WAIT_FOR_POINT_NAME
            }
        }
        case 'ADD_POINT_NAME': {
            const newDrives = state.drives.map((drive, index) => {
                if (index !== state.drives.length - 1) return drive;
                drive.pointName = action.pointName
                return drive;
            })
            return {
                ...state,
                drives: newDrives,
                isModalVisible: false
            }
        }
        case 'LOAD_DRIVES': {
            return {
                ...state,
                drives: [...action.drives]
            }
        }
        default:
            return state;
    }
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
                new Date().toLocaleTimeString(),
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
        newDrive.arrivalTime = new Date().toLocaleTimeString()
    } else if (newDrive.pointName === undefined) {
    } else if (newDrive.departureTime === undefined) {
        newDrive.departureTime = new Date().toLocaleTimeString()
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