<template>
  <div id="app">
    <div class="header">
      <a href=https://www.sagaeducation.org/>
      <img alt="Vue logo" src="./assets/saga2.png">
      </a>
    </div>
    

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div id="nav">
      <i class="fa fa-fw fa-home"></i><router-link to="/">Home</router-link> |
      <i class="fa fa-fw fa-search"></i><router-link to="/about">About</router-link> |
      <i class="fa fa-fw fa-sign-in"></i><router-link to="/login">Login</router-link> |
      <i class="fa fa-fw fa-user"></i><router-link to="/register">Register Now!</router-link>
    </div>
    <router-view/>
    <!-- <div id="footer">
      <p>Footer</p>
    </div> -->
  </div>
</template>

<style lang="less">
#app {
  font-family: Arial, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#nav {
  padding: 30px;
  background: #deeaee;
  margin-bottom: 20px;
  font-size: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding:12px;

    &.router-link-exact-active {
      color: green;
    }
  }
  a:hover {
    background-color: #ddd;
  }
}
#footer {
  padding: 20px;
  text-align: center;
}
.header {
  background-color: lightsteelblue;

}
img {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 300px;
  height: auto;
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  // background: linear-gradient(lightgreen, salmon);
  color: #fff;
  background: #b1cbbb;

}
</style>
