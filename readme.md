### React Native redux navigator

#### 概述
React Native的Navigator需要将navigator作为属性传入子组件，增加了父子组件之间的耦合。 react-native-redux-navigator在Navigator的基础之上，增加了redux的支持。



#### 安装
``` shell
npm install react-native-redux-navigator --save
```


#### 使用方法

##### 配置reducer

react-native-redux-navigator 需要一个名称叫做navigator的reducer，在配置combineReducer的地方：
``` javascript

import {navigator} from 'react-native-redux-navigator'

const reducers = combineReducers({
   // ...
   navigator
   // ...
});

```

##### 使用组件
ReduxNavigatorProvider组件封装了Navigator，在其基础上结合了redux进行工作。 
``` javascript
import {ReduxNavigatorProvider} from 'react-native-redux-navigator'
// ...
// 具体属性参考React Native Navigator
// React Native Navigator的属性都可以使用
<ReduxNavigatorProvider
  initialRoute={{name : "index"}}
  renderScene={(route, query) => {
    return <View><Text>hello</Text></View>
  }}
  configScene={(route) => Navigator.SceneConfigs.FloatFromRight}
/>
      

```

#### 路由actions

import actions:
``` javascript

import { navTo, navBack, navReset, navReload }  from "react-native-redux-navigator"
```

##### navTo (route, query , replace = false)
跳转到某一路由
参数说明
- route 路由对象
- query 页面参数（类似html页面的query）
- replace 默认值是false, 这个参数决定路由执行push还是replace

##### navBack({backToFilter, refresh = false, emptyTarget} )
回退
参数说明
- backToFilter 传入一个函数， 决定回退到某一张页面
- emptyTarget 路由对象： 如果已经在第一张页面了， 然后去哪里
- refresh

``` javascript
// 回退到某一张name = 'Login'的页面
dispatch( {backToFilter : navBack( (route) => route.name === 'Login' )} )

// 回退一张页面
dispatch( navBack() )

// 回退一张页面并刷新
// 比如到某张页面需要登录， 然后登录完成后，回退到之前的页面并刷新
dispatch( navBack({refresh : true}) )

// 如果已经在第一张页面了， 则回退到首页
dispatch( navBack({emptyTarget : {name : "Home"}})


```

#### navReset(route)
重置整个路由栈，比




