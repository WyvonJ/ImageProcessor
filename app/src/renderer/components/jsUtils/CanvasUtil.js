let CanvasUtil = {
  scaleInCenter: function(context, image, scale, noOver) {
    //获得原有canvas长宽  
    let cw = context.canvas.width
    let ch = context.canvas.height
      //获得缩放后的canvas长宽  
    let scaledCw = cw * scale
    let scaledCh = ch * scale
      //获得相对新canvas的缩放对象  
    let scaleObj = this.getScaleObj(image, scaledCw, scaledCh, noOver)
      //获取原有canvas中心坐标  
    let canvasCenterX = context.canvas.width / 2
    let canvasCenterY = context.canvas.height / 2
      //相对于canvas中心点计算，图像顶点  
    let imageStartPointX = canvasCenterX - scaleObj.width / 2
    let imageStartPointY = canvasCenterY - scaleObj.height / 2
      //绘制图像  
    context.drawImage(image, imageStartPointX, imageStartPointY, scaleObj.width, scaleObj.height)
  },
  //将image缩放后绘制到canvas中心  
  drawInCenter: function(context, image) {
    let canvasCenterX = context.canvas.width / 2
    let canvasCenterY = context.canvas.height / 2
    let scaleObj = this.getScaleObj(image, context.canvas.width, context.canvas.height)
      //计算图像顶点  
    let imageStartPointX = canvasCenterX - scaleObj.width / 2
    let imageStartPointY = canvasCenterY - scaleObj.height / 2
      //绘制图像  
    context.drawImage(image, imageStartPointX, imageStartPointY, scaleObj.width, scaleObj.height)
  },
  //获得图像相对与一个矩形的缩放对象  
  getScaleObj: function(image, width, height, noOver) {
    noOver = noOver === undefined ? true : noOver
    let scaleW, scaleH
    let widthLonger = image.width - width
    let heightLonger = image.height - height
    if (noOver) {
      if (widthLonger <= 0 && heightLonger <= 0) {
        scaleW = image.width
        scaleH = image.height
        return {
          width: scaleW,
          height: scaleH
        }
      }
    }
    //固定宽度缩放  
    if (widthLonger >= heightLonger) {
      scaleW = width
      let percent = width / image.width
      scaleH = image.height * percent
    }
    //固定长度缩放  
    else {
      scaleH = height;
      let percent = height / image.height
      scaleW = image.width * percent
    }
    return {
      width: scaleW,
      height: scaleH
    }
  },

  clearCanvas: function(context) {
    let cw = context.canvas.width
    let ch = context.canvas.height
    context.clearRect(0, 0, cw, ch)
  },

  resizeCanvas: function(context, image) {
    context.canvas.width = image.width
    context.canvas.height = image.height
  }
}


export default CanvasUtil
