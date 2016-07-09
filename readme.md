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

``` javascript

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

##### navTo
参数说明
- route 
- query
- replace





