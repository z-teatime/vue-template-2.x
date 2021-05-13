import nestarkAuth from '@nestark/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: nestarkAuth.token,
  name: nestarkAuth.getUserInfo().username,
  avatar: '/img/icons/avatar.png',
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
  },
}

const actions = {
  async getInfo({ commit }) {
    return nestarkAuth.getUserInfoAll().then(({ data }) => {
      commit('SET_AVATAR', data.avatar)
      commit('SET_ROLES', ['admin'])
      commit('SET_INTRODUCTION', data.position)
      return {
        ...data,
        roles: ['admin'],
      }
    }).catch(() => {
      commit('SET_AVATAR', '/img/icons/avatar.png')
    })
  },
  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    // const token = role + '-token'

    // commit('SET_TOKEN', token)
    // setToken(token)

    // const { roles } = await dispatch('getInfo')

    // resetRouter()

    // // generate accessible routes map based on roles
    // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // // dynamically add accessible routes
    // router.addRoutes(accessRoutes)

    // // reset visited views and cached views
    // dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
