import { login, /* logout,  */getInfo } from '@/api/user'
import { getToken, setToken, removeToken, plat } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Login from '@/views/login'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha, ckey } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password,
        captcha,
        encKey: ckey,
        platForm: plat
      }).then(data => {
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', username)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(/* {
        username: state.name,
        Authorization: `Bearer ${state.token}`,
      } */).then(data => {
        /* {
          "id": 1,
          "username": "admin",
          "email": "admin@admin.com",
          "mobile": "18888888888",
          "sex": 1,
          "department_id": 1,
          "created_at": "2019-04-26 10:46:56",
          "updated_at": "2020-08-28 09:43:00",
          "status": 1
        } */
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { username: name } = data

        const roles = ['admin']
        const avatar = '/favicon.ico'
        const introduction = ''

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve({ ...data, roles })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit/* , state, dispatch */ }) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    // window.location.href = `${process.env.VUE_APP_LOGIN_API}/login?url=${process.env.VUE_APP_DOMAIN}/login`
    Login.methods.goAuth.call(this)

    return Promise.resolve()
    // return new Promise((resolve, reject) => {
    //   // commit('SET_TOKEN', '')
    //   // commit('SET_ROLES', [])
    //   // removeToken()
    //   // resetRouter()
    //   // router.push('/login')

    //   // // reset visited views and cached views
    //   // // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //   // dispatch('tagsView/delAllViews', null, { root: true })
    //   // resolve()

    //   logout({
    //     username: store.getters.name,
    //     platForm: plat
    //   }).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()

    //     // reset visited views and cached views
    //     // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //     dispatch('tagsView/delAllViews', null, { root: true })

    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
