<template>
	<div class="slider" @mousedown="slide($event)">
		<input type="range" min="-1" max="1" step="0.01" v-model="sliderValue" name="w-slider" id="w-slider">
	</div>
</template>

<script>
	export default{
		data(){
			return {
				sliderValue: 0
			}
		},
		methods:{
			slide($event){
				this.sliderValue = $event.offsetX/112 - 1
				this.$emit('change',this.sliderValue)
			}
		}
	}
</script>

<style type="text/css">
.slider{
	display: inline-block;
	height: 30px;
	width: 224px;
}

input[type=range] {
    -webkit-appearance: none;
    width: 224px;
    border-radius: 10px; 
    cursor: pointer;
}
input[type=range]::-webkit-slider-runnable-track {
    height: 4px;
    background-color: #4d4e4f;
}
input[type=range]:focus {
    outline: none;
}
input[type=range]::-webkit-slider-thumb {
	transition: all .4s cubic-bezier(.04,.36,.16,1);
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    margin-top: -6px; /*使滑块超出轨道部分的偏移量相等*/
    background: #dedede; 
    border-radius: 8px; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
}
input[type=range]::-webkit-slider-thumb:hover {
	border:#35a5e5 1px solid;
    box-shadow: 0 0 6px rgba(81, 203, 238, 1);
		-webkit-box-shadow: 0 0 6px rgba(81, 203, 238, 1);
		-moz-box-shadow: 0 0 6px rgba(81, 203, 238, 1);
}
    
</style>