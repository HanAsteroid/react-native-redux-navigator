/**
 *
 * Created by weimeng on 16/4/20.
 */

import invariant from 'invariant'

import {
  NAVIGATOR_CONSUME,
  NAVIGATOR_PRODUCE,
  NAVIGATOR_SET_INITAL
} from "./nav_action_types"


import * as NAV_METHODS from './nav_methods'


/**
 * Navigator to a route
 * @param route a route : route := route => {name, component}
 */
export const navTo = (route, query , replace = false) => {
  invariant(route, "navTo fail, argument route is required")
  invariant(route['name'], 'navTo fail, route must have child prop name')
  invariant(route['Component'], 'navTo fail, route must have child prop Component')
  query = query|| {}
  return dispatch => {
    requestAnimationFrame( () => {
      dispatch({
        type: NAVIGATOR_PRODUCE,
        params : {
          method : NAV_METHODS.NAV_TO,
          route : {...route, query},
          replace
        }
      })
    })
  }
}



/**
 * Action creator to producer a navigation back event.
 */
export const navBack = (params) => {
  params = params || {}
  const {backToFilter, refresh = false, emptyTarget} = params
  return dispatch => {
    requestAnimationFrame ( () => {
      dispatch({
        type : NAVIGATOR_PRODUCE,
        params : {
          method : NAV_METHODS.NAV_BACK,
          backToFilter,
          refresh,
          emptyTarget,
        }
      })
    })
  }
}


export const navReset = (route) => {
  return {
    type : NAVIGATOR_PRODUCE,
    params : {
      method : NAV_METHODS.NAV_RESET,
      route : {...route},
    }

  }
}

export const navReload = () => {
  return {
    type : NAVIGATOR_PRODUCE,
    params : {
      method : NAV_METHODS.NAV_RELOAD,
    }
  }
}