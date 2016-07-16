/**
 *
 * Created by ramroll on 16/7/7.
 */


const initialState = {
  _message_queue : [],
  __lock : false,
  __event_id_counter : 1,
  android_back_handler  : null
}

import {
  NAVIGATOR_CONSUME,
  NAVIGATOR_PRODUCE,
  NAVIGATOR_SET_INITAL,
  SET_ANDROID_NAV_KEY_LISTENER,
  REMOVE_ANDROID_NAV_KEY_LISTENER
} from './nav_action_types'

import * as METHOD_TYPES from './nav_methods'

const __produce = ( state, action) => {
  if(state.__lock) {
    console.warn("You have sent multiple navigation events. Check where sent event :", action)
    return state
  }
  
  
  let newState = {...state, __lock : state.__event_id_counter++}
  const {method, query = {}} = action.params
  newState._message_queue.push(action.params)
  switch (method) {
    case METHOD_TYPES.NAV_TO:
      break
    case METHOD_TYPES.NAV_BACK:
      break;
  }
  return newState

}


const __consume = ( state, action ) => {
  if( action.event_id === state.__event_id_counter) {
    return {...state, __lock : null, _message_queue:[]}
  }
  console.warn("Event id not match, dont call multiple nav*** functions same time")
  return {...state}

}


/**
 * Navigator reducer
 */
export const navigator = ( state = initialState, action ) => {

  switch ( action.type ) {

    case NAVIGATOR_SET_INITAL :
      return  {...initialState, current : action.route}

    case NAVIGATOR_PRODUCE :
      return __produce(state, action)

    case NAVIGATOR_CONSUME:
      return __consume(state, action)
    case SET_ANDROID_NAV_KEY_LISTENER :
      return {...state, android_back_handler : action.handler}
    case REMOVE_ANDROID_NAV_KEY_LISTENER :
      return {...state, android_back_handler : null}
  }

  return state

}