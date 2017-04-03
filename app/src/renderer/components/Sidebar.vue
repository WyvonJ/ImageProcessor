<template>
  <aside class="sidebar">
    <div class="shape-modify">
      <div class="rotate" @click="adjustChange('rotate')">
        <img src="./icon/rotate_90_degrees_ccw.svg" alt="rotate_90_degrees_ccw">
        <br/>
        <span>旋转</span>
      </div>
      <div class="mirror" @click="adjustChange('mirror')">
        <img src="./icon/compare.svg" alt="compare">
        <br/>
        <span>镜像</span>
      </div>
      <div class="tab-caption">
        <input type="radio" name="widget-tab" id="adjust" checked="checked" />
        <input type="radio" name="widget-tab" id="enhance" />
        <div class="tab-title">
          <transition-group name="slide-fade" tag="ul">
            <li class="adjust" key="adjust">
              <label for="adjust">调整</label>
            </li>
            <li class="enhance" key="enhance">
              <label for="enhance">滤镜</label>
            </li>
          </transition-group>
        </div>
        <div class="tab-box">
          <ul class="tab-list-wrapper">
            <li class="adjust-box">
              <div class="light" :class="{'toggled':toggleLight}">
                <div class="light-title">
                  <button class="toggle" @click="toggleLightSettings">
					        <img src="./icon/arrow_drop_down.svg"  :class="{'toggled':toggleLight}" alt="arrow_drop_down">
                    <span>亮度</span>
                  </button>
                  <button class="reset" @click="resetLight">重置</button>
                  <el-slider :min="min" :max="max" :step="step" v-model="lightValue" @change="adjustChange"></el-slider>
                </div>
                <ul class="detailed-settings">
                  <li>
                    <span>对比度</span>
                    <el-slider :min="min" :max="max" :step="step" v-model="contrastValue" @change="adjustChange"></el-slider>
                  </li>
                  <li>
                    <span>曝光度</span>
                    <el-slider :min="min" :max="max" :step="step" v-model="exposureValue" @change="adjustChange"></el-slider>
                  </li>
                  <li>
                    <span>阴影</span>
                    <el-slider :min="min" :max="max" :step="step" v-model="shadowValue" @change="adjustChange"></el-slider>
                  </li>
                  <li>
                    <span>高光</span>
                    <el-slider :min="min" :max="max" :step="step" v-model="highlightValue" @change="adjustChange"></el-slider>
                  </li>
                </ul>
              </div>
              <div class="color" :class="{'toggled':toggleColor}">
                <div class="color-title">
                  <button class="toggle" @click="toggleColorSettings">
					        <img src="./icon/arrow_drop_down.svg"  :class="{'toggled':toggleLight}" alt="arrow_drop_down">
                    <span>色度</span>
                  </button>
                  <button class="reset" @click="resetColor">重置</button>
                  <el-slider :min="min" :max="max" :step="step" v-model="colorValue" @change="adjustChange"></el-slider>
                </div>
                <ul class="detailed-settings">
                  <li>
                    <span>色调</span>
                    <el-slider :min="min" :max="max" :step="step" v-model="tintValue" @change="adjustChange"></el-slider>
                  </li>
                  <li>
                    <span>杂色</span>
                    <el-slider :min="min" :max="max" :step="step" v-model="noiseValue" @change="adjustChange"></el-slider>
                  </li>
                </ul>
              </div>
            </li>
            <li class="enhance-box">
              <p>选择一个效果</p>
              <input id="original" value="original" type="radio" v-model="enhance" checked="checked"  @change="adjustChange"/>
              <input id="edge" value="edge" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="sharp" value="sharp" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="pixel" value="pixel" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="dotted" value="dotted"type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="embossment" value="embossment" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="sepia" value="sepia" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="blur" value="blur" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="invert" value="invert" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="greyscale" value="greyscale" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="decoloration" value="decoloration" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="threshold" value="threshold" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="polaroid" value="polaroid" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="overall" value="overall" type="radio" v-model="enhance" @change="adjustChange"/>
              <input id="corrode" value="corrode" type="radio" v-model="enhance" @change="adjustChange"/>
              <ul class="filters">
                <li class="original"><label for="original">原图</label></li>
                <li class="edge"><label for="edge">暗角</label></li>
                <li class="sharp"><label for="sharp">锐化</label></li>
                <li class="pixel"><label for="pixel">马赛克</label></li>
                <li class="dotted"><label for="dotted">屏幕点阵</label></li>
                <li class="embossment"><label for="embossment">浮雕</label></li>
                <li class="sepia"><label for="sepia">怀旧</label></li>
                <li class="blur"><label for="blur">模糊</label></li>
                <li class="invert"><label for="invert">反色</label></li>
                <li class="greyscale"><label for="greyscale">灰度图</label></li>
                <li class="decoloration"><label for="decoloration">去色</label></li>
                <li class="threshold"><label for="threshold">阈值</label></li>
                <li class="polaroid"><label for="polaroid">宝利来</label></li>
                <li class="overall"><label for="overall">增强</label></li>
                <li class="corrode"><label for="corrode">腐蚀</label></li>
              </ul>
              <el-slider class="filter-slider" :min="fmin" :max="fmax" :step="fstep" v-model="filterValue" @change="adjustChange" v-if="showSlider"></el-slider>
            </li>
          </ul>
        </div>
      </div>
      <div class="edit-actions">
        <div class="undo-all-edits" @click="undoAllEdits">
        <img src="./icon/undo.svg" alt="undo"> 全部重置
        </div>
        <div class="save-image" @click="saveImage">
         <img src="./icon/save.svg" alt="save">保存
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import $cu from './jsUtils/CanvasUtil'
import $aj from './jsUtils/Adjust'
import $eh from './jsUtils/Enhance'
import { MessageBox } from 'element-ui'
export default {
  data() {
      return {
        lightValue: 0,
        colorValue: 0,
        contrastValue: 0,
        exposureValue: 0,
        shadowValue: 0,
        highlightValue: 0,
        tintValue: 0,
        noiseValue: 0,
        enhance: 'original',
        min: -1,
        max: 1,
        step: 0.01,
        fmin: 0,
        fmax: 1,
        fstep: 0.01,
        filterValue: 0.5,
        toggleLight: true,
        toggleColor: true,
        showSlider: false,
        mirror:false,
        ctx: {},
        _image: {}
      }
    },
    mounted() {
      let _canvas = document.getElementById('canvas')
      this.ctx = _canvas.getContext('2d')
      this._image = this.$parent.$data.image
    },
    watch: {
      enhance: 'toggleEnhanceSlider'
    },
    methods: {
      toggleLightSettings() {
        this.toggleLight = !this.toggleLight
      },
      toggleColorSettings() {
        this.toggleColor = !this.toggleColor
      },
      resetLight() {
        this.lightValue = 0
        this.contrastValue = 0
        this.exposureValue = 0
        this.shadowValue = 0
        this.highlightValue = 0
        this.adjustChange()
      },
      resetColor() {
        this.colorValue = 0
        this.tintValue = 0
        this.noiseValue = 0
        this.adjustChange()
      },
      adjustChange(type) {
        //每次修改之前绘制原图
        $cu.drawInCenter(this.ctx, this._image)
          //防止每次进行重复运算
        this.lightValue === 0 ? 1 : $aj.light(this.ctx, this.lightValue)

        this.contrastValue === 0 ? 1 : $aj.contrast(this.ctx, this.contrastValue)
        this.highlightValue === 0 ? 1 : $aj.highlight(this.ctx, this.highlightValue)
        this.exposureValue === 0 ? 1 : $aj.exposure(this.ctx, this.exposureValue)
        this.shadowValue === 0 ? 1 : $aj.shadow(this.ctx, this.shadowValue)

        this.colorValue === 0 ? 1 : $aj.color(this.ctx, this.colorValue)
        this.tintValue === 0 ? 1 : $aj.tint(this.ctx, this.tintValue)
        this.noiseValue === 0 ? 1 : $aj.warmth(this.ctx, this.noiseValue)
        switch (this.enhance) {
          case 'original':
            break
          case 'sepia':
          case 'invert':
          case 'greyscale':
          case 'decoloration':
          case 'polaroid':
          case 'overall':
            $eh.filter(this.ctx, this.enhance)
            break
          case 'threshold':
            $eh.threshold(this.ctx, this.filterValue)
            break
          case 'edge':
            $eh.edge(this.ctx, this.filterValue, 255)
            break
          case 'sharp':
            $eh.sharp(this.ctx, this.filterValue)
            break
          case 'pixel':
            $eh.pixel(this.ctx, this.filterValue)
            break
          case 'dotted':
            $eh.dotted(this.ctx, this.filterValue, this.filterValue - 1)
            break
          case 'blur':
            $eh.blur(this.ctx, 3, this.filterValue)
            break
          case 'embossment':
            $eh.embossment(this.ctx)
            break
          case 'corrode':
            $eh.corrode(this.ctx)
            break
        }
        if(type==='mirror'){
        	 $eh.mirror(this.ctx)
        }
           
        if(type==='rotate')
            $eh.rotate(this.ctx,this._image)

      },
      toggleEnhanceSlider() {
        this.showSlider = false
        switch (this.enhance) {
          case 'threshold':
            this.fmin = 0
            this.fmax = 255
            this.fstep = 1
            this.filterValue = 128
            this.showSlider = true
            break
          case 'blur':
            this.fmin = 0
            this.fmax = 8
            this.fstep = 1
            this.filterValue = 4
            this.showSlider = true
            break
          case 'pixel':
            this.fmin = 0
            this.fmax = 10
            this.fstep = 1
            this.filterValue = 5
            this.showSlider = true
            break
          case 'dotted':
            this.fmin = 1
            this.fmax = 5
            this.fstep = 1
            this.filterValue = 1
            this.showSlider = true
            break
          case 'edge':
            this.fmin = 0
            this.fmax = 10
            this.fstep = 1
            this.filterValue = 5
            this.showSlider = true
            break
          case 'sharp':
            this.fmin = 0
            this.fmax = 1
            this.fstep = 0.1
            this.filterValue = 0.5
            this.showSlider = true
            break
        }
      },
      undoAllEdits() {
        this.resetLight()
        this.resetColor()
        this.enhance = 'original'
        this.adjustChange()
      },
      saveImage() {
        let type = this.$parent.$data.fileType
        let name = this.$parent.$data.fileName
          //最后保存的时候根据修改的值应用在原图上
        let imgData = this.ctx.canvas.toDataURL(type)
        imgData = imgData.replace(this._fixType(type), 'image/octet-stream')
        this.saveFile(imgData, name)
      },
      _fixType(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg')
        let r = type.match(/png|jpeg|bmp|gif/)[0]
        return 'image/' + r
      },
      saveFile(data, filename) {
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        let event = document.createEvent('MouseEvents')
        save_link.href = data
        save_link.download = filename
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        save_link.dispatchEvent(event)
      }
    }
}


</script>

<style scoped>
  .sidebar
{
    position: absolute;
    z-index: 512;
    top: 0;
    right: 0;

    box-sizing: border-box;
    width: 256px;
    height: 100%;

    text-align: center;

    background-color: #0f0f0f;
}

.rotate,.mirror
{
    font-weight: lighter;
    padding: 8px;
    cursor: pointer;
    user-select: none;
    transition: all .4s cubic-bezier(.04,.36,.16,1);
    position: relative;
    border: 1px transparent solid;
    background-color: #343434;
    width: 50%;
    display: inline-block;
    box-sizing: border-box;
}
.rotate{
    float: left;
}
.rotate:hover,.mirror:hover
{
    border: #03a9f4 1px solid;
    -webkit-box-shadow: 0 0 6px #03a9f4;
       -moz-box-shadow: 0 0 6px #03a9f4;
            box-shadow: 0 0 6px #03a9f4;
}
.rotate img,.mirror img
{
    transition: all .3s cubic-bezier(.04,.36,.16,1);
}
.rotate:hover img
{
	transform: rotateZ(-360deg);
}
.mirror:hover img
{
	transform: rotateY(-180deg);
}
button
{
    color: #bcbcbc;
}
button:hover
{
    color: #fff;
}
li
{
    list-style: none;
}
span
{
    font-weight: lighter;
}
.tab-caption input
{
    line-height: 56px;

    display: inline-block;
    float: left;

    width: 50%;
    height: 56px;

    cursor: pointer;
    vertical-align: center;
}
.tab-title
{
    font-size: 13px;
    font-weight: lighter;

    height: 43px;

    color: #cacaca;
}
.tab-title label
{
    font-size: 16px;
    line-height: 40px;

    display: block;

    cursor: pointer;
}

.tab-title ul li
{
    display: inline-block;
    float: left;

    width: 50%;
    margin: 0;

    transition: all .4s cubic-bezier(.04,.36,.16,1);
    text-align: center;
    vertical-align: top;

    border-bottom: 3px transparent solid;
    background-color: #343434;
}
.tab-title ul li:hover
{
    color: white;
}
.tab-title ul::after
{
    clear: both;

    content: '';
}
.tab-caption input
{
    display: none;
}
.tab-box .tab-list-wrapper > li
{
    display: none;
}
.tab-box
{
    overflow-y: scroll;

    height: calc(100vh - 210px);
    margin-top: 20px;

    transition: all .4s cubic-bezier(.04,.36,.16,1);
}
.tab-box::-webkit-scrollbar
{
    width: 8px;
    height: 16px;

    background-color: #f5f5f5;
}

.tab-box::-webkit-scrollbar-track
{
    background-color: #1f1f1f;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}

.tab-box::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    background-color: #555;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
#adjust:checked ~ .tab-title .adjust,
#enhance:checked ~ .tab-title .enhance
{
    border-bottom: 3px #03a9f4 solid;
}
#adjust:checked ~ .tab-box .adjust-box,
#enhance:checked ~ .tab-box .enhance-box
{
    display: block;
}
.light,
.color
{
    overflow: hidden;

    height: 64px;

    transition: all .3s cubic-bezier(.04,.36,.16,1);
}
.light.toggled
{
    height: 356px;
}
.color.toggled
{
    height: 224px;
}
.toggle
{
    line-height: 24px;

    width: 64px;
    height: 24px;
    margin-right: 120px;
}
.toggle img
{
    position: relative;
    top: 6px;

    transition: all .3s cubic-bezier(.04,.36,.16,1);
    transform: rotateZ(-90deg);
}
.toggle img.toggled
{
    transform: rotateZ(0);
}
.reset
{
    font-size: smaller;
}
.el-slider
{
    display: inline-block;

    width: 212px;
}
.detailed-settings
{
    text-align: center;

    background-color: #2a2a2a;
}
.detailed-settings li
{
    margin-top: 8px;
}

.filters
{
    margin-top: 16px;
}

.filters li
{
    line-height: 80px;

    display: inline-block;

    width: 74px;
    height: 74px;
    margin-bottom: 4px;
    cursor: pointer;
    transition: all .4s cubic-bezier(.04,.36,.16,1);

    border: 2px transparent solid;
}
.filters li:hover
{
    border: 2px #4e4e4e solid;
}
.filters li label
{
    display: block;

    width: 100%;
    height: 100%;
}
#original:checked ~ .filters .original,
#edge:checked ~ .filters .edge,
#sharp:checked ~ .filters .sharp,
#pixel:checked ~ .filters .pixel,
#dotted:checked ~ .filters .dotted,
#embossment:checked ~ .filters .embossment,
#sepia:checked ~ .filters .sepia,
#blur:checked ~ .filters .blur,
#invert:checked ~ .filters .invert,
#greyscale:checked ~ .filters .greyscale,
#decoloration:checked ~ .filters .decoloration,
#threshold:checked ~ .filters .threshold,
#polaroid:checked ~ .filters .polaroid,
#overall:checked ~ .filters .overall,
#corrode:checked ~ .filters .corrode
{
    border: #03a9f4 2px solid;
    -webkit-box-shadow: 0 0 6px #03a9f4;
       -moz-box-shadow: 0 0 6px #03a9f4;
            box-shadow: 0 0 6px #03a9f4;
}
.edit-actions
{
    position: absolute;
    z-index: 1024;
    bottom: 0;

    width: 224px;
    height: 48px;
    margin: 16px 16px 2px 16px;
}
.edit-actions div
{
    font-size: 16px;
    line-height: 48px;

    display: inline-block;
    float: left;

    width: 50%;
    height: 48px;

    cursor: default;
    transition: all .4s cubic-bezier(.04,.36,.16,1);

    background-color: #1f1f1f;
}
.edit-actions div:first-child
{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.edit-actions div:last-child
{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.edit-actions div:hover
{
    background-color: #03a9f4;
}
.edit-actions div .material-icons
{
    position: relative;
    top: 6px;
}
.filter-slider{
	width: 200px;
}

</style>
