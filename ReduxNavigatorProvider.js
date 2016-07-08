/**
 *
 * Created by weimeng on 16/7/7.
 */


import React, {
  Component,
} from 'react'

import {
  Navigator,
  BackAndroid,
  Alert,
  ToastAndroid,
  Platform
} from 'react-native'

import { connect } from 'react-redux'

import {navConsumeAll} from "./internal-action"
import {navBack} from "./action"
import * as NAV_METHODS from "./nav_methods"

class ReduxNavigatorProvider extends Component{

  constructor(){
    super()
    this.__id_counter = 1
    this._renderScene = this._renderScene.bind(this)
    this.exit_try = 0

  }

  static defaultProps = {
    backToInitial : false
  }

  static propTypes = {
    initialRoute : React.PropTypes.object.isRequired,
    renderScene : React.PropTypes.func.isRequired,
    configureScene : React.PropTypes.func,
  }

  componentDidMount(){
    if(Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', (() => {

        console.log("aaa")
        if(this.refs.nav.getCurrentRoutes().length === 1) {
          if(this.exit_try === 0) {
            ToastAndroid.show("再按一次回退键离开", ToastAndroid.SHORT)
            setTimeout( (() => {
              this.exit_try --   
            }).bind(this), 3000)
            this.exit_try ++
            return true
          } else {
            BackAndroid.exitApp()
          }
        } else {
          this.props.dispatch(navBack())
        }
      }).bind(this));
    }

  }

  _navTo(evt_id, {route, replace}){
    if(!replace) {
      this.refs.nav.push(route)
    } else {
      this.refs.nav.replace(route)
    }
    this.props.dispatch( navConsumeAll(evt_id) )
  }

  _navReload(evt_id){
    let stack = this.refs.nav.getCurrentRoutes().slice()
    const current = stack.pop()
    current.key = null
    stack.push(current)
    this.refs.nav.immediatelyResetRouteStack(stack)
    this.props.dispatch(navConsumeAll(evt_id))
  }

  _navBack(event_id, {backToFilter, refresh, emptyTarget}){

    let stack = this.refs.nav.getCurrentRoutes()

    let popTo = null
    let idx = stack.length - 1
    // Calculate new route stack 
    if(backToFilter) {

      while(stack.length > 0) {
        if(backToFilter(stack[stack.length - 1])) {
          popTo = stack[stack.length - 1]
          break
        } else {
          stack.pop()
          idx --
        }
      }
    }

    if(popTo) {
      if(refresh) {
        popTo.__key = null
        this.refs.nav.replaceAtIndex(popTo, idx)
      }
      this.refs.nav.popToRoute(popTo)
    } else {
      if(refresh) {
        stack[stack.length - 2].__key = null
        this.refs.nav.replaceAtIndex(stack[stack.length - 2], stack.length - 2)
      }
      if(stack.length > 1) {
        this.refs.nav.pop()
      } else {

        if(emptyTarget) {
          this.refs.nav.immediatelyResetRouteStack([emptyTarget])
        }
      }
    }

    this.props.dispatch(navConsumeAll(event_id))
  }

  _navReload(event_id) {
    let stack = this.refs.nav.getCurrentRoutes()
    stack[stack.length - 1].__key = null
    this.refs.nav.replaceAtIndex(stack[stack.length - 1], stack.length - 1)
    this.props.dispatch(navConsumeAll(event_id))
  }

  _navReset(event_id, {route} ) {
    this.refs.nav.resetTo(route)
    this.props.dispatch(navConsumeAll(event_id))
  }

  componentWillReceiveProps(nextProps){

    const {_message_queue, __event_id_counter} = nextProps.navigator

    if( _message_queue.length > 0) {
      const params = _message_queue.pop()
      const { method } = params

      switch( method ) {
        case NAV_METHODS.NAV_TO:
          this._navTo(__event_id_counter, params)
          break
        
        case NAV_METHODS.NAV_RELOAD:
          this._navReload(__event_id_counter, params)
          break
        
        case NAV_METHODS.NAV_BACK :
          this._navBack(__event_id_counter, params)
          break
        
        case NAV_METHODS.NAV_RELOAD :
          this._navReload(__event_id_counter, params)

        case NAV_METHODS.NAV_RESET :  
          this._navReset(__event_id_counter, params)
      }

    }


  }

  shouldComponentUpdate(nextProps, nextState){
    // Nerver render navigator again
    // Unless parent control of navigator changed
    return false
  }

  _renderScene(route, navigator){
    if(!route.__key) {
      route.__key = this.__id_counter++
    }
    const C = this.props.renderScene(route, route.query)
    const {query} = route

    const newElement = React.cloneElement(C, {key : route.__key})
    console.log(newElement)
    return newElement
  }



  render() {
    const {initialRoute, renderScene, configureScene, ...other} = this.props
    if(!initialRoute) {
      return null
    }
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this._renderScene}
        configureScene={configureScene}
        {...other}
        ref="nav"
      />
    )
  }
}


const mapStateToProps = state => {
  if(!state.navigator) {
    throw "reducer navigator not defined"
  }
  return {
    navigator : state.navigator
  }
}

module.exports = connect(mapStateToProps)(ReduxNavigatorProvider)





