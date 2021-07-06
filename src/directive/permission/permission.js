function checkPermission(el, binding) {
  const { value } = binding

  if (value == null) {
    el.parentNode && el.parentNode.removeChild(el)
    return false
  }

  // TODO: 目前只有轩辕有用到按钮权限.
  const info = JSON.parse(localStorage.getItem('XY_MENU_ACTION') || '{}')
  const hasPermission = !!info[value]

  if (!hasPermission) {
    el.parentNode && el.parentNode.removeChild(el)
  }

  return hasPermission
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
