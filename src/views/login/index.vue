<template>
  <div class="login" />
</template>

<script>
import { setToken, setUserName, setUserId, USER_NAME, TOKEN, USER_ID } from '@/utils/auth'

export default {
  name: 'Login',
  created() {
    // 本地调试缓存cookies数据
    /* http://localhost:9803/?nauth_username=%E5%BA%84%E8%90%8D%E5%8D%8E&nauth_userid=1261&
      nauth_dduserid=15965910986283586&nauth_ddunionid=7vvdiSqWnsVFl34bgVZzDAQiEiE&
      nauth_token=EHR_a4c5ebf96e664281aae96c1d8582d9f2 */
    if (process.env.NODE_ENV !== 'production') {
      const params = this.$route.query
      if (params[TOKEN.replace(/-/g, '_')] != null) {
        setToken(params[TOKEN.replace(/-/g, '_')])
        setUserName(params[USER_NAME.replace(/-/g, '_')])
        setUserId(params[USER_ID.replace(/-/g, '_')])
        this.$router.push('/')
        return
      }
    }
    this.goAuth()
  },
  methods: {
    goAuth() { // 跳转到统一登录
      window.location.href = `${process.env.VUE_APP_LOGIN_API}/login?url=${process.env.VUE_APP_DOMAIN}/login`
    },
  },
}
</script>
