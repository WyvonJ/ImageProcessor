let value = 128

let Enhance = {
  //颜色矩阵 滤镜
  filter: (context, type, value) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let d = context.getImageData(0, 0, cw, ch)
    let _d = colorFilter(d, Filters[type])
    context.putImageData(_d, 0, 0)
  },
  threshold: (context, value) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let d = context.getImageData(0, 0, cw, ch)
    let threshold = [
      0.3086 * 255, 0.6094 * 255, 0.0820 * 255, 0, -255 * value,
      0.3086 * 255, 0.6094 * 255, 0.0820 * 255, 0, -255 * value,
      0.3086 * 255, 0.6094 * 255, 0.0820 * 255, 0, -255 * value,
      0, 0, 0, 1, 0
    ]
    let _d = colorFilter(d, threshold)
    context.putImageData(_d, 0, 0)
  },
  sharp: (context, lambda) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let d = context.getImageData(0, 0, cw, ch)
    let data = d.data
    for (let i = 0, n = data.length; i < n; i += 4) {
      let ii = i / 4
      let row = parseInt(ii / cw)
      let col = ii % cw
      if (row == 0 || col == 0) continue

      let A = ((row - 1) * cw + (col - 1)) * 4
      let B = ((row - 1) * cw + col) * 4
      let E = (ii - 1) * 4

      for (let j = 0; j < 3; j++) {
        let delta = data[i + j] - (data[B + j] + data[E + j] + data[A + j]) / 3
        data[i + j] += delta * lambda
      }
    }
    context.putImageData(d, 0, 0)

  },
  edge: (context, _R, _lastLevel) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let imgData = context.getImageData(0, 0, cw, ch)
    let R = _R
      //暗角最终的级别 0 - 255
    let lastLevel = _lastLevel || 30
    let data = imgData.data
    let xLength = R * 2 + 1

    //计算中心点
    let middleX = cw / 2
    let middleY = ch / 2

    //计算距中心点最长距离
    let maxDistance = dist(0, 0, middleX, middleY)
      //开始产生暗角的距离
    let startDistance = maxDistance * (1 - R / 10)
    let f = function(x, p0, p1, p2, p3) {
        //基于三次贝塞尔曲线 
        return p0 * Math.pow((1 - x), 3) + 3 * p1 * x * Math.pow((1 - x), 2) + 3 * p2 * x * x * (1 - x) + p3 * Math.pow(x, 3)
      }
      //计算当前点应增加的暗度
    let calDark = (x, y, p) => {
        //计算距中心点距离
        let distance = dist(x, y, middleX, middleY)
        let currBilv = (distance - startDistance) / (maxDistance - startDistance)
        if (currBilv < 0) currBilv = 0
          //应该增加暗度
        return f(currBilv, 0, 0.02, 0.3, 1) * p * lastLevel / 255
      }
      //区块
    for (let x = 0; x < cw; x++) {
      for (let y = 0; y < ch; y++) {
        let realI = y * cw + x
        for (let j = 0; j < 3; j++) {
          let dDarkness = calDark(x, y, data[realI * 4 + j]);
          data[realI * 4 + j] -= dDarkness
        }
      }
    }
    context.putImageData(imgData, 0, 0)

  },
  pixel: (context, _R) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let imgData = context.getImageData(0, 0, cw, ch)
    let data = imgData.data
    let xLength = _R * 2 + 1

    for (let x = 0, n = parseInt(cw / xLength); x < n; x++) {
      for (let y = 0, m = parseInt(ch / xLength); y < m; y++) {
        let average = [],
          sum = [0, 0, 0]
        for (let i = 0; i < xLength; i++) {
          for (let j = 0; j < xLength; j++) {
            let realI = (y * xLength + i) * cw + x * xLength + j
            sum[0] += data[realI * 4]
            sum[1] += data[realI * 4 + 1]
            sum[2] += data[realI * 4 + 2]
          }
        }
        average[0] = sum[0] / (xLength * xLength)
        average[1] = sum[1] / (xLength * xLength)
        average[2] = sum[2] / (xLength * xLength)
        for (let i = 0; i < xLength; i++) {
          for (let j = 0; j < xLength; j++) {
            let realI = (y * xLength + i) * cw + x * xLength + j
            data[realI * 4] = average[0]
            data[realI * 4 + 1] = average[1]
            data[realI * 4 + 2] = average[2]
          }
        }
      }
    }
    context.putImageData(imgData, 0, 0)
  },
  dotted: (context, _R, _r) => {
    let R = parseInt(_R) || 1
      //内小圆半径
    let r = parseInt(_r) || 1

    let cw = context.canvas.width
    let ch = context.canvas.height
    let imgData = context.getImageData(0, 0, cw, ch)
    let data = imgData.data
    let xLength = R * 2 + 1
      //构造距离模板
    let disTmlMatrix = []
    let r2 = r * r
    for (let x = -R; x < R; x++) {
      for (let y = -R; y < R; y++) {
        if ((x * x + y * y) > r2) {
          disTmlMatrix.push([x, y])
        }
      }
    }
    let xyToIFun = (x, y, z) => {
        z = z || 0
        return (y * cw + x) * 4 + z
      }
      //将大于距离外面的透明度置为0
    for (let x = 0, n = parseInt(cw / xLength); x < n; x++) {
      for (let y = 0, m = parseInt(ch / xLength); y < m; y++) {
        let middleX = parseInt((x + 0.5) * xLength)
        let middleY = parseInt((y + 0.5) * xLength)
        for (let i = 0; i < disTmlMatrix.length; i++) {
          let dotX = middleX + disTmlMatrix[i][0]
          let dotY = middleY + disTmlMatrix[i][1]
          data[xyToIFun(dotX, dotY, 3)] = 225
          data[xyToIFun(dotX, dotY, 2)] = 225
          data[xyToIFun(dotX, dotY, 0)] = 225
          data[xyToIFun(dotX, dotY, 1)] = 225
        }
      }
    }
    context.putImageData(imgData, 0, 0)
  },
  blur: (context, _r, _s) => {

    let cw = context.canvas.width
    let ch = context.canvas.height
    let imgData = context.getImageData(0, 0, cw, ch)
    let pixes = imgData.data
    let gaussMatrix = [],
      gaussSum = 0,
      x, y,
      r, g, b, a,
      i, j, k, len

    let radius = _r
    let sigma = _s


    radius = Math.floor(radius) || 3
    sigma = sigma || radius / 3

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma)
    b = -1 / (2 * sigma * sigma)
      //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
      g = a * Math.exp(b * x * x)
      gaussMatrix[i] = g
      gaussSum += g

    }
    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
      gaussMatrix[i] /= gaussSum
    }
    //x 方向一维高斯运算
    for (y = 0; y < ch; y++) {
      for (x = 0; x < cw; x++) {
        r = g = b = a = 0
        gaussSum = 0
        for (j = -radius; j <= radius; j++) {
          k = x + j
          if (k >= 0 && k < cw) { //确保 k 没超出 x 的范围
            //r,g,b,a 四个一组
            i = (y * cw + k) * 4
            r += pixes[i] * gaussMatrix[j + radius]
            g += pixes[i + 1] * gaussMatrix[j + radius]
            b += pixes[i + 2] * gaussMatrix[j + radius]
              // a += pixes[i + 3] * gaussMatrix[j]
            gaussSum += gaussMatrix[j + radius]
          }
        }
        i = (y * cw + x) * 4;
        // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
        // console.log(gaussSum)
        pixes[i] = r / gaussSum
        pixes[i + 1] = g / gaussSum
        pixes[i + 2] = b / gaussSum
          // pixes[i + 3] = a ;
      }
    }
    //y 方向一维高斯运算
    for (x = 0; x < cw; x++) {
      for (y = 0; y < ch; y++) {
        r = g = b = a = 0
        gaussSum = 0
        for (j = -radius; j <= radius; j++) {
          k = y + j
          if (k >= 0 && k < ch) { //确保 k 没超出 y 的范围
            i = (k * cw + x) * 4
            r += pixes[i] * gaussMatrix[j + radius]
            g += pixes[i + 1] * gaussMatrix[j + radius]
            b += pixes[i + 2] * gaussMatrix[j + radius]
              // a += pixes[i + 3] * gaussMatrix[j];
            gaussSum += gaussMatrix[j + radius]
          }
        }
        i = (y * cw + x) * 4
        pixes[i] = r / gaussSum
        pixes[i + 1] = g / gaussSum
        pixes[i + 2] = b / gaussSum
      }
    }
    context.putImageData(imgData, 0, 0)
  },
  //浮雕
  embossment: (context) => {

    let cw = context.canvas.width
    let ch = context.canvas.height
    let imgData = context.getImageData(0, 0, cw, ch)
    let data = imgData.data
    let outData = []
    for (let i = 0; i < data.length; i += 4) {
      let ii = i / 4
      let row = parseInt(ii / cw)
      let col = ii % cw;
      let A = ((row - 1) * cw + (col - 1)) * 4
      let G = (row + 1) * cw * 4 + (col + 1) * 4

      if (row == 0 || col == 0)
        continue
      for (let j = 0; j < 3; j++) {
        outData[i + j] = data[A + j] - data[G + j] + 127.5
      }
      outData[i + 4] = data[i + 4]
    }
    for (let i = 0; i < data.length; i++) {
      data[i] = outData[i] || data[i]
    }
    context.putImageData(imgData, 0, 0)
  },
  corrode(context, value) {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let imgData = context.getImageData(0, 0, cw, ch)
    let data = imgData.data
    let R = parseInt(value) || 3;

    for (let x = 0; x < cw; x++) {

      for (let y = 0; y < ch; y++) {

        let randomI = parseInt(Math.random() * R * 2) - R; //区块随机代表
        let randomJ = parseInt(Math.random() * R * 2) - R; //区块随机代表
        let realI = y * cw + x;
        let realJ = (y + randomI) * cw + x + randomJ;

        for (let j = 0; j < 3; j++) {
          data[realI * 4 + j] = data[realJ * 4 + j];
        }

      }

    }
    context.putImageData(imgData, 0, 0)
  },
  mirror: (context) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let d = context.getImageData(0, 0, cw, ch)
    let _d = []
    for (let i = 0; i < d.height; i++) {
      for (let j = 0; j < d.width; j++) {
        _d[i * cw * 4 + j * 4 + 0] = d.data[i * cw * 4 + (cw - j) * 4 + 0]
        _d[i * cw * 4 + j * 4 + 1] = d.data[i * cw * 4 + (cw - j) * 4 + 1]
        _d[i * cw * 4 + j * 4 + 2] = d.data[i * cw * 4 + (cw - j) * 4 + 2]
        _d[i * cw * 4 + j * 4 + 3] = d.data[i * cw * 4 + (cw - j) * 4 + 3]
      }
    }
    for (let i = 0; i < d.data.length; i += 4) {
      d.data[i] = _d[i]
      d.data[i + 1] = _d[i + 1]
      d.data[i + 2] = _d[i + 2]
      d.data[i + 3] = _d[i + 3]
    }
    context.putImageData(d, 0, 0)
  },
  rotate: (context,img) => {
    let cw = context.canvas.width
    let ch = context.canvas.height
    let canvas = context.canvas

    var n = img.getAttribute('step')
    if(n== null) 
     {
      n=0
     } 
    (n>3)? n=0:n++
    img.setAttribute('step',n)
    switch(n) {
      default :
      case 0 :
        canvas.setAttribute('width', img.width)
        canvas.setAttribute('height', img.height)
        context.rotate(0 * Math.PI / 180)
        context.drawImage(img, 0, 0)
        break;
      case 1 :
        canvas.setAttribute('width', img.height)
        canvas.setAttribute('height', img.width)
        context.rotate(90 * Math.PI / 180)
        context.drawImage(img, 0, -img.height)
        break
      case 2 :
        canvas.setAttribute('width', img.width)
        canvas.setAttribute('height', img.height)
        context.rotate(180 * Math.PI / 180)
        context.drawImage(img, -img.width, -img.height)
        break
      case 3 :
        canvas.setAttribute('width', img.height)
        canvas.setAttribute('height', img.width)
        context.rotate(270 * Math.PI / 180)
        context.drawImage(img, -img.width, 0)
        break
    }
  }
}

let colorFilter = (imageData, m) => {
  let d = imageData.data
  let r, g, b, a
  for (let i = 0; i < d.length; i += 4) {
    r = d[i]
    g = d[i + 1]
    b = d[i + 2]
    a = d[i + 3]

    d[i] = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4]
    d[i + 1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9]
    d[i + 2] = r * m[10] + g * m[11] + b * m[12] + a * m[13] + m[14]
    d[i + 3] = r * m[15] + g * m[16] + b * m[17] + a * m[18] + m[19]
  }
  return imageData
}

//灰度0.2126*r+0.7152*g+0.0722*b
let Filters = {
  sepia: [
    0.393, 0.769, 0.189, 0, 0,
    0.349, 0.686, 0.168, 0, 0,
    0.272, 0.534, 0.131, 0, 0,
    0, 0, 0, 1, 0,
  ],
  greyscale: [
    0.33, 0.34, 0.33, 0, 0,
    0.33, 0.34, 0.33, 0, 0,
    0.33, 0.34, 0.33, 0, 0,
    0, 0, 0, 1, 0,
  ],
  //反相
  invert: [-1, 0, 0, 0, 255,
    0, -1, 0, 0, 255,
    0, 0, -1, 0, 255,
    0, 0, 0, 1, 0
  ],
  //去色
  decoloration: [
    0.3086, 0.6094, 0.0820, 0, 0,
    0.3086, 0.6094, 0.0820, 0, 0,
    0.3086, 0.6094, 0.0820, 0, 0,
    0, 0, 0, 1, 0
  ],
  polaroid: [
    1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, -0.03, 0.05, -0.02, 1, 0
  ],
  overall: [
    1.438, -0.122, -0.016, 0, -0.03, -0.062, 1.378, -0.016, 0, 0.05, -0.062, -0.122, 1.483, 0, -0.02,
    0, 0, 0, 1, 0
  ]
}

///辅助函数
let dist = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}



export default Enhance
