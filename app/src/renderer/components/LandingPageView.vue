<template>
  <div class="main-container">
    <div id="open-file-holder">
      <div class="input-wrapper">
        <i class="material-icons">photo</i>
        <label for="open-image">打开</label>
        <input type="file" value="打开" id="open-image" accept="image/png,image/jpeg,image/bmp" name="open">
      </div>
      <span class="tip" v-if="!imgSrc">
        <i class="material-icons">input</i>
        请拖拽图像到此或者点击打开按钮载入图像
      </span>
      <div id="image-holder">
        <canvas id="canvas">
          不支持canvas绘图
        </canvas>
      </div>
    </div>
    <div class="disable-mask" v-if="!imgSrc"></div>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Sidebar from './Sidebar'
  import { ipcRenderer } from 'electron'
  import $cu from './jsUtils/CanvasUtil'
  export default {
    data() {
        return {
          imgOpened:false,
          imgSrc: '',
          image:new Image(),
          currentProp: 0,
          min: -1,
          max: 1,
          step: 0.01,
          fileType:'',
          fileName:''
        }
      },
      components: {
        Sidebar
      },
      methods: {
        resetCanvasSize() {}
      },
      mounted() {
        let open = document.getElementById('open-image'),
          holder = document.getElementById('open-file-holder'),
          _canvas = document.getElementById('canvas'),
          ctx = _canvas.getContext('2d'),
          _this = this,
          reader = new FileReader(),
          _image = this.image,
          src
 
        _canvas.addEventListener('mousewheel', (event) => {
          //if(!_image.src) return
          //console.log(_image)
         
        })
        open.addEventListener('change', (event) => {
          reader.onload=(eve) => {
            src = eve.target.result
            _image.src = src
            _this.imgSrc = src
            $cu.resizeCanvas(ctx,_image)
            $cu.clearCanvas(ctx)
            $cu.drawInCenter(ctx, _image)
            _canvas.style.maxWidth=_image.width>holder.clientWidth?holder.clientWidth:_image.width
            _canvas.style.maxHeight=_image.height>holder.clientHeight?holder.clientHeight:_image.height
          }
          let file=event.target.files[0]
          this.fileName=file.name
          this.fileType=file.type
          ipcRenderer.send('set-title',file.name)
          reader.readAsDataURL(file)
        })
        holder.addEventListener('dragover', (e) => {
          e.preventDefault()
          return false
        })
        holder.addEventListener('drop', (event) => {
          event.preventDefault()
          
            reader.onload=(eve) => {
            src = eve.target.result
            _image.src = src
            _this.imgSrc = src
            $cu.resizeCanvas(ctx,_image)
            $cu.clearCanvas(ctx)
            $cu.drawInCenter(ctx, _image)
            _canvas.style.maxWidth=_image.width>holder.clientWidth?holder.clientWidth:_image.width
            _canvas.style.maxHeight=_image.height>holder.clientHeight?holder.clientHeight:_image.height
          }
          let file=event.dataTransfer.files[0]
          this.fileType=file.type
          this.fileName=file.name
          ipcRenderer.send('set-title',file.name)
          reader.readAsDataURL(file)
        })
        window.addEventListener('resize',()=>{
          if(!_image.src){
            _canvas.style.maxWidth=_image.width>holder.clientWidth?holder.clientWidth:_image.width
            _canvas.style.maxHeight=_image.height>holder.clientHeight?holder.clientHeight:_image.height
          }
        })
      },
      beforeDestroy(){
        window.removeEventListener('resize')
      },
      name: 'landing-page'
  }

</script>

<style scoped>
#open-file-holder {
  position: absolute;
  width: calc(100vw - 282px);
  height: calc(100vh - 52px);
  left: 2px;
  top: 44px;
  border-radius: 3px;
  border: 1px transparent dashed;
  transition: all .3s cubic-bezier(.04, .36, .16, 1);
}

#open-file-holder:hover {
  border: 1px #03a9f4 dashed;
}

#open-file-holder:hover .tip {
  transition: all .3s cubic-bezier(.04, .36, .16, 1);
  color: #03a9f4;
}

#open-image {
  display: none;
}
#canvas{
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}
#image-holder {
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; 
  justify-content: center;
}
.input-wrapper {
  position: absolute;
  top: -40px;
  left: 10px;
  height: 32px;
  width: 84px;
  line-height: 32px;
  border: 1px transparent solid;
  transition: all .3s cubic-bezier(.04, .36, .16, 1);
  border-radius: 3px;
}

.input-wrapper:hover {
  border: 1px #03a9f4 solid;
  -webkit-box-shadow: 0 0 6px #03a9f4;
  -moz-box-shadow: 0 0 6px #03a9f4;
  box-shadow: 0 0 6px #03a9f4;
}

.input-wrapper label {
  position: absolute;
  width: 88px;
  height: 32px;
  left: 6px;
  cursor: pointer;
}

i {
  position: relative;
  top: 4px;
  left: -24px;
}

.tip {
  position: absolute;
  left: calc(50% - 166px);
  top: 50%;
  z-index: 50;
}
.disable-mask{
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2048;
  width: 256px;
  height: 100%;
  cursor: not-allowed;
}

</style>
