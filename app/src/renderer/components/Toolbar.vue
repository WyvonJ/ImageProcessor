<template>
	<div class="toolbar">
	<div class="file-buttons">
		<button type="button" @click="openImage">
			<i class="material-icons">photo</i>
			打开
		</button>
		<button type="button">
		<i class="material-icons">save</i>
		保存</button>
	</div>
	</div>
</template>

<script>
	export default{
		methods:{
			openImage(){
				
			}
		}
	}
</script>

<style type="text/css" media="screen" scoped>
	.toolbar{
		height: 36px;
		width: 100%;
		position: relative;
		top: 4px;
		left: 0;
		right: 0;
		text-align: left;
	}
	.file-buttons{
		position: absolute;
		left: 0;
	}
	.material-icons{
		position: relative;
		top: 6px;
	}
	button{
		width: 80px;
		line-height: 32px;
	}
	button:hover{
		border:#35a5e5 1px solid;
		box-shadow: 0 0 3px rgba(81, 203, 238, 1);
		-webkit-box-shadow: 0 0 3px rgba(81, 203, 238, 1);
		-moz-box-shadow: 0 0 3px rgba(81, 203, 238, 1);
		}
</style>
