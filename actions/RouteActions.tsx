import { createAction } from '@reduxjs/toolkit'
import { Route } from '../domains/Route';

// actions.js
// actionはreduxの機能でなく、オブジェクトを作るための純粋なjsの関数です。
export const addNewRecord = createAction<string>('ADD_NEW_RECORD')

export const addPointName = createAction('ADD_POINT_NAME', (newPointName: string) => ({
  payload: {
    pointName: newPointName
  }
}))

export const loadAllRoutes = createAction('LOAD_ALL_ROUTES', (routes: Route[], currentRouteId: number) => ({
  payload: {
    routes: routes,
    currentRouteId: currentRouteId
  }
}))

export const loadRoute = createAction('LOAD_ROUTE', (route: Route) => ({ payload: { route: route } }))

export const saveRoute = createAction<string>('SAVE_ROUTE')

export const createRoute = createAction<string>('CREATE_ROUTE')

export const renameRoute = createAction('RENAME_ROUTE', (routeId: number, newRouteName: string) => ({
  payload: {
    routeId: routeId,
    newRouteName: newRouteName
  }
}))

export const setRouteHistoryPopupMenuVisible = createAction('SET_ROUTE_HISTORY_POPUPMENU_VISIBLE', (visible: boolean) => ({
  payload: {
    visible: visible
  }
}))

export const deleteRoute = createAction<string>('DELETE_ROUTE')

export const setRouteNameEntryDialogVisible = createAction('SET_ROUTE_NAME_ENTRY_DIALOG_VISIBLE', (visible: boolean) => ({
  payload: {
    visible: visible
  }
}))
