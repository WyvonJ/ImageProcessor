let Adjust = {
    //亮度调节
    light: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      let threshold = 128
      for (let i = 0; i < d.data.length; i += 4) {
        d.data[i] = d.data[i] + (value * threshold)
        d.data[i + 1] = d.data[i + 1] + (value * threshold)
        d.data[i + 2] = d.data[i + 2] + (value * threshold)
      }
      context.putImageData(d, 0, 0)
    },
    //nRGB = RGB + (RGB - Threshold) * Contrast / 255
    //or 本程序选用的下面这个公式求对比度
    //color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5; >0
    //color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5; >0
    contrast: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let threshold = 128
      let d = context.getImageData(0, 0, cw, ch)
      for (let i = 0; i < d.data.length; i += 4) {
        if (value > 0) {
          d.data[i] = (d.data[i] - threshold) / (1 - value) + 127.5
          d.data[i + 1] = (d.data[i + 1] - threshold) / (1 - value) + 127.5
          d.data[i + 2] = (d.data[i + 2] - threshold) / (1 - value) + 127.5
        } else {
          d.data[i] = (d.data[i] - threshold) * (1 + value) + 127.5
          d.data[i + 1] = (d.data[i + 1] - threshold) * (1 + value) + 127.5
          d.data[i + 2] = (d.data[i + 2] - threshold) * (1 + value) + 127.5
        }

      }
      context.putImageData(d, 0, 0)
    },
    exposure: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      let threshold = 128
      for (let i = 0; i < d.data.length; i += 4) {
        d.data[i] = Math.min(255, Math.max(0, d.data[i] * Math.pow(2, 2 * value)))
        d.data[i + 1] = Math.min(255, Math.max(0, d.data[i + 1] * Math.pow(2, 2 * value)))
        d.data[i + 2] = Math.min(255, Math.max(0, d.data[i + 2] * Math.pow(2, 2 * value)))
      }
      context.putImageData(d, 0, 0)
    },
    highlight: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      let hsl = rgb2hsl(d.data) //转换为HSL模型
        //注意 d.data类型为 Uint8ClampedArray 值被限定为[0,255]之间的整数
        //所以返回的值会丢失精度
      let al = averageLuminance(d.data) //获取平均亮度
        //console.log(hsl, d.data)
      for (let i = 0; i < hsl.length; i += 4) {
        if (hsl[i + 2] >= al) {
          d.data[i] = d.data[i] + (value * 127.5)
          d.data[i + 1] = d.data[i + 1] + (value * 127.5)
          d.data[i + 2] = d.data[i + 2] + (value * 127.5)
        }
      }
      context.putImageData(d, 0, 0)
    },
    shadow: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      let hsl = rgb2hsl(d.data)
      let al = averageLuminance(d.data)
      for (let i = 0; i < hsl.length; i += 4) {
        if (hsl[i + 2] < al) {
          d.data[i] = d.data[i] + (value * 127.5)
          d.data[i + 1] = d.data[i + 1] + (value * 127.5)
          d.data[i + 2] = d.data[i + 2] + (value * 127.5)
        }
      }
      context.putImageData(d, 0, 0)
    },
    /***********************************************/
    color: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      let hsl = rgb2hsl(d.data)
      let rgb
      for (let i = 0; i < hsl.length; i += 4) {
        //将s增大再转回去
        hsl[i + 1] = hsl[i + 1] + value
      }
      rgb = hsl2rgb(hsl)
      for (let i = 0; i < rgb.length; i += 4) {
        d.data[i] = rgb[i]
        d.data[i + 1] = rgb[i + 1]
        d.data[i + 2] = rgb[i + 2]
      }
      context.putImageData(d, 0, 0)
    },
    tint: function(context, value) {
      let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      let hsl = rgb2hsl(d.data)
      let rgb
      for (let i = 0; i < hsl.length; i += 4) {
        //将s增大再转回去
        hsl[i] = hsl[i] + value * 360
      }
      rgb = hsl2rgb(hsl)
      for (let i = 0; i < rgb.length; i += 4) {
        d.data[i] = rgb[i]
        d.data[i + 1] = rgb[i + 1]
        d.data[i + 2] = rgb[i + 2]
      }
      context.putImageData(d, 0, 0)
    },
    warmth: function(context, value) {
    	let cw = context.canvas.width
      let ch = context.canvas.height
      let d = context.getImageData(0, 0, cw, ch)
      for (let i = 0; i < d.data.length; i += 4) {
        d.data[i] = d.data[i]+Math.random()*255*value
        d.data[i + 1] = d.data[i + 1]+Math.random()*255*value
        d.data[i + 2] = d.data[i + 2]+Math.random()*255*value
      }
      context.putImageData(d, 0, 0)
    },

    clarity: function(context, value) {},
    vignette: function(context, value) {}
  }
  //RGBA 转 HSLA
let rgb2hsl = (data) => {
  let max, min
  let r, g, b
  let h, s, l = 0
  let HSL = []
  for (let i = 0; i < data.length; i += 4) {
    r = data[i] / 255
    g = data[i + 1] / 255
    b = data[i + 2] / 255
    max = Math.max(r, g, b)
    min = Math.min(r, g, b)
    l = (max + min) / 2.0
    if (max == min) {
      h = s = 0 // achromatic
    } else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h *= 60
    }
    HSL[i] = h
    HSL[i + 1] = s
    HSL[i + 2] = l
  }
  return HSL
}

let hsl2rgb = (data) => {
  let r, g, b
  let h, s, l
  let RGB = []
  for (let i = 0; i < data.length; i += 4) {
    h = data[i]
    h = (h > 360) ? 360 : ((h < 0) ? 0 : h)
    h /= 360
    s = data[i + 1]
    s = ((s > 1) ? 1 : ((s < 0) ? 0 : s)) //越界检查
    l = data[i + 2]
    l = ((l > 1) ? 1 : ((l < 0) ? 0 : l))
    if (s == 0) {
      r = g = b = l
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s
      let p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
    RGB[i] = Math.round(r * 255)
    RGB[i + 1] = Math.round(g * 255)
    RGB[i + 2] = Math.round(b * 255)
  }
  return RGB
}
let hue2rgb = (p, q, t) => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

let averageLuminance = (data) => {
  //计算平均亮度
  let max, min
  let R, G, B, L = 0
  for (let i = 0; i < data.length; i += 4) {
    R = data[i] / 255
    G = data[i + 1] / 255
    B = data[i + 2] / 255
    L += (Math.max(R, G, B) + Math.min(R, G, B)) / 2.0
  }
  return L / data.length * 4
}

let dist = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

export default Adjust
