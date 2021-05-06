/**
 * @file 微应用缓存策略
 */

const events = require('events')

const NAME_SPACE = 'NE_MICRO_APP'
const CONTAINER = 'containers'
const CONTAINER_EMITTER = 'contanier-emitter'

export function createCache(length = 50) {
  const keys = []
  const cacheLength = length

  function cache(key, value) {
    if (typeof key === 'function') {
      const cb = key
      return keys.map(k => cb(k.replace(/\s$/, ''), cache[key + ' ']))
    }

    if (keys.push(key + ' ') > cacheLength) {
      delete cache[keys.shift()]
    }
    return value == null ? cache[key + ' '] : (cache[key + ' '] = value)
  }
  return cache
}

export function setCache(key, value) {
  if (window[NAME_SPACE] == null) {
    window[NAME_SPACE] = {}
  }

  window[NAME_SPACE][key] = value
}

export function getCache(key) {
  return window[NAME_SPACE] && window[NAME_SPACE][key]
}

export function getContainer(appName) {
  return getCache(CONTAINER)(appName)
}

export function setContainer(appName, node) {
  getCache(CONTAINER)(appName, node)
}

/**
 * events
 */
let onuninstall
if (getCache(CONTAINER_EMITTER) == null) {
  const contanierEmitter = new events.EventEmitter()
  setCache(CONTAINER_EMITTER, contanierEmitter)
  onuninstall = (cb) => {
    contanierEmitter.once('delete', cb)
  }
}
export { onuninstall }

/**
 * 创建微应用缓存容器
 */
if (getCache(CONTAINER) == null) {
  setCache(CONTAINER, new Proxy(createCache(100), {
    deleteProperty(target, propKey) {
      getCache(CONTAINER_EMITTER).emit('delete', propKey)
      return true
    }
  }))
}
