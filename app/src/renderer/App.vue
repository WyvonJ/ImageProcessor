<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  export default {
    store
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
   height: 100%; 
   margin: 0;
   padding: 0;
   
  }

  body {
    background: rgba(6, 6, 6, .90);
    font-family: Microsoft Yahei UI,Microsoft Yahei, Lato, Helvetica, sans-serif;
    color: white;
    justify-content: center;
    text-align: center;
    cursor: default;
    -webkit-user-select:      none;
       -moz-user-select: -moz-none;
        -ms-user-select:      none;
            user-select:      none;
    -khtml-user-select: none;

  }

  button{
    outline: none;
    margin: 0;
    padding: 0;
    border: 1px transparent solid;
    font-family: inherit;
    font-size: 16px;
    background-color: transparent;
    color: white;
    cursor: pointer;
    transition: all .4s cubic-bezier(.04,.36,.16,1);
    border-radius: 3px;
  }
</style>
