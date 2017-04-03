let EventUtil = {
  addEventListener: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, element, false)
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler)
    } else {
      element["on" + type] = handler
    }
  }
  removeEventListener: function(element, type, handler) {
    if (element.removeEventListener) {
      element.addEventListener(type, element, false)
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler)
    } else {
      element["on" + type] = null
    }
  }
  getEvent: function(event) {
    return event ? event : window.event
  }
  getTarget: function(event) {
    return event.target || event.srcElement
  }
  preventDefault: function(event) {
    if (event.preventDefault) {
      element.preventDefault()
    } else {
      event.returnValue = false
    }
  }
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBublle = true
    }
  }
}
export default EventUtil
