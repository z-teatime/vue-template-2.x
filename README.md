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

`roles` *@deprecated*

目前项目没有涉及到用户角色权限. 跳过. 

原理: 定义好角色. 在注册路由的时候, 把角色信息写入 `mete.roles` 属性中. 获取到路由信息后, 调用 `filterAsyncRoutes` 来过虑路由. 

📁 相关代码位置: `src\store\modules\permission.js:8` 



### 3. 按钮权限 

`v-permission`

原理: 点击菜单, 会向后台获取菜单的所有按钮权限信息, 保存到 `localStorage` 中. 

📁 相关代码位置: 

​	指令: `src\directive\permission\permission.js` 

​	路由拦截: `src\permission.js:34` 

示例:

```vue
<div v-permission="vip">
    这是会员才能看的
</div>
```



## 📚 路由管理

路由使用 vue-router. 在根目录下的 router 文件配置.

📁 相关代码位置: `src\router\index.js`

```js
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
```

1. 使 keep-alive 生效必须满足2个条件:

   1.1 **组件名称和路由名称一致.**

   1.2 路由中noCache不为true.

   

## 📚 状态管理

使用 vuex 做状态管理.

命名空间:

1. app: 项目应用的一些配置, 如是否默认开启侧边栏, 标题名称等.
2. errorLog: 错误日志.
3. options: 一些全局使用的枚举值.
4. **permission: 权限相关的数据.**
5. settings: 项目的一些配置, 如主题颜色, 是否开启标签栏等.
6. tagsView: 标签栏.
7. user: 用户相关.



## 📚 用户登录

`@nestark/auth`

用户登录模块默认接入 **统一后台登录**. 

🔗 文档: http://git.miguan.com/frontend/nestark/blob/master/packages/@nestark/auth/README.md

🔗 统一后台登录项目文档: https://98du.yuque.com/98du/sgyhmw/nrzhta



## 📚 请求拦截

`@nestark/request`

使用 `axios` 做请求拦截, 并处理约定好的错误码. 

🔗 文档: http://git.miguan.com/frontend/nestark/blob/master/packages/@nestark/request/README.md



## 📚 UI

系统 UI 基于 `element-ui` 改造和扩展. 

🔗 后台 UI 规范(蓝湖): https://lanhuapp.com/web/#/item/project/board?pid=18ae143e-8169-44b2-85c0-c8f9e96ab437&teamId=5c1064b9-dcdb-4ee1-b641-9d7c5e70eb2b

相关依赖: 

1. `vue-theme`: 对样式进行改造. 
2. `98du-ui`: 对应样式以及组件进行改造. 
3. `widget`: 经典的增删改相关组件. 表格相关的组件. 



## 📚 关于微前端

🔗 关于微应用开发的一些事项: https://98du.yuque.com/98du/sgyhmw/oxmn12
