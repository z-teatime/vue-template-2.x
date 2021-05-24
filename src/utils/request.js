import { create } from '@nestark/request'
import { Message } from 'element-ui'

export default create({
  baseURL: process.env.VUE_APP_BASE_API + `/api`,
  Message: {
    error(message) {
      Message({
        message: message,
        type: 'error',
      })
    }
  },
})
