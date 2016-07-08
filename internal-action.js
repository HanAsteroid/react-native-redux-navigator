/**
 * Created by weimeng on 16/7/7.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import {
  NAVIGATOR_CONSUME,
  NAVIGATOR_PRODUCE,
  NAVIGATOR_SET_INITAL
} from "./nav_action_types"

/**
 * Action creator to consume all events in queue.
 */
export const navConsumeAll = (event_id) => {
  return {
    type: NAVIGATOR_CONSUME,
    event_id
  }
}