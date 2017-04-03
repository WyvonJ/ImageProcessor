<template>
	<header class="titlebar">
		<span class="revocation">
			<i class="material-icons grey">replay</i>
		</span>
		<div class="window-actions">
			<span class="min">
				<i class="material-icons grey">remove</i>
			</span>
			<span class="close">
				<i class="material-icons red">clear</i>
			</span>
		</div>
</header>
</template>

<script>
	
</script>

<style scoped>
	.titlebar{
		height: 28px;
		width: 100%;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		background-color: #0f0f0f;
		z-index: 88;
	}
	.revocation{
		float: left;
	}
	.window-actions{
		display: inline-block;
		float: right;
	}
	.material-icons{
		font-size: 24px;
		transition: all .3s cubic-bezier(.04,.36,.16,1);
	}
	.material-icons.grey{
		color: #808080;
	}
	.material-icons.red{
		color: #f44336;
	}
	.material-icons.red:hover{
		background-color: #f44336;
		color: #fff;
	}
	span{
		cursor: pointer;
		padding: 2px 0 2px 2px;
		height: 100%;
	}
	.material-icons:hover{
		color: white;
	}
	.titlebar:after{
		content: "";
		clear: right;
	}
</style>
