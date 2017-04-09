# Image-Processor 图像处理

> An electron-vue project
> 基于Electron和Vue的图像处理软件 使用了ElementUI的滑动条组件
> 实现图像的基本处理以及各种滤镜

## 基本调整
![](/app/images/1.png)

## 滤镜功能
![](/app/images/2.png)

---

##图像处理
基本
*旋转
*镜像
调整
*亮度 对比度 曝光度 阴影 高光
*色度（饱和度） 色调 添加杂色
增强
*暗角 锐化 马赛克 怀旧 模糊 etc

*待添加*
1. [ ] 按比例裁剪 
2. [ ] 任意角度旋转
3. [ ] 滤镜效果预览
4. [ ] 亮度和色度预览窗口
5. [ ] 兼容性问题
6. [ ] 待续...

---
## Build Setup

``` bash
# install dependencies 安装项目依赖
npm install

# serve with hot reload at localhost:9080 热加载运行
npm run dev

# build electron app for production 构建生产版软件 貌似要翻墙 然后windows上面需要以管理员模式打开命令行 
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).
---


This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
