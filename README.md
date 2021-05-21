# vue-admin-template-2.x

vue-admin 后台管理模板.  vue 2.x 版本. 



## 🎯 注意点

1. **本地开必须要开启 `eslint`.**
2. **项目提交 `git` 有 `eslint` 校验和提交信息校验. 按照规范来.** 
3. 项目使用 `ne-cli` 创建成功后, 请修改 `README.md` 文件和 `package.json` 文件中的项目基本信息. 
4. 尽量对框架代码进行改造添加.(避免框架更新后, 难以合并)



## 📚 权限控制

### 1. 路由权限

原理: 后台返回路由信息. 前端注册. 利用组件的 `path` 进行匹配注册.

📁 相关代码位置: `src\store\modules\permission.js:54` 

```js
api.getMenu(data => {
    // 装换成 vue-router 路由信息对象
    const routes = data.map(o => transfromRoute(o))
    // 动态设置路由, 包含静态路由
    store.dispatch('generateRoutes', {
        // 角色信息, 后台不涉及角色权限, 默认都填 'admin', 管理者
        roles: ['admin'], 
        routes: routes
    })
})
```



### 2. 角色权限

目前项目没有涉及到用户角色权限. 

原理: 定义好角色. 在注册路由的时候, 把角色信息写入 `mete.roles` 属性中. 获取到路由信息后, 调用 `filterAsyncRoutes` 来过虑路由. 

📁 相关代码位置: `src\store\modules\permission.js:8` 



### 3. 按钮权限 TODO.

原理: 后台返回(一般是登录之后获取用户信息的时候返回)一些按钮权限的校验码. 利用这些来判断. 代码中使用自定义指令 `v-code="xxxxxxxx"`. 

📁 相关代码位置: 

示例:

```vue
```



## 📚 用户登录

用户登录模块默认接入 **统一后台登录**. 使用 `@nestark/auth` 包. 

🔗 文档: http://git.miguan.com/frontend/nestark/blob/master/packages/@nestark/auth/README.md

🔗 统一后台登录项目文档: https://98du.yuque.com/98du/sgyhmw/nrzhta



## 📚 统一登录拦截

`@nestark/request`



## 📚 UI

系统 UI 基于 `element-ui` 改造和扩展. 

🔗 后台 UI 规范(蓝湖): https://lanhuapp.com/web/#/item/project/board?pid=18ae143e-8169-44b2-85c0-c8f9e96ab437&teamId=5c1064b9-dcdb-4ee1-b641-9d7c5e70eb2b

相关依赖: 

1. `vue-theme`: 对样式进行改造. 
2. `98du-ui`: 对应样式以及组件进行改造. 
3. `widget`: 经典的增删改相关组件. 表格相关的组件. 



## 📚 关于微前端

🔗 关于微应用开发的一些事项: https://98du.yuque.com/98du/sgyhmw/oxmn12
