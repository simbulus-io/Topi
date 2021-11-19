<template>
    <div>
      
      <div class="mainDiv">
        <h1 class='title'>Forgot Password</h1>
        <p>So you forgot your password huh...?</p>
        <div class="emailDiv">
          <label class="labels"><b>What is your email?</b></label>
          <input class="inputs"
            placeholder="..." 
            required>
        </div>
        <div class="emailDiv">
          <label class="labels"><b>Retype email please</b></label>
          <input class="inputs"
            placeholder="..." 
            required>
        </div>
        <div class='buttonDiv'>
          <button class='theButton' @click='fakeMsg'>Reset password!</button>
        </div>
      </div>
      <div class="final">
        <h1 class="titleTwo" >How to protect your account?</h1>
        <p><i>Some relevant links that show you how to properly keep your account secured...</i></p>
        <div id="options">
            <ul id="ul-links">            
                <li><a href='https://www.nativeintelligence.com/resources/cyber-security-links/'>Native Intelligence</a></li>
                <li><a href='https://www.upguard.com/blog/the-password-security-checklist'>How to create a secure password?</a></li>
                <li><a href='https://www.sagaeducation.org/privacy-policy'>Saga Education Privacy Policy</a></li>
                <li><a href='https://www.mines.edu/campus-safety/'>CSM Security</a></li>
            </ul>
        </div> 
      </div>
    </div>
    
</template>

<script lang='ts'>
import Alert from 'vue-simple-alert'
import Vue from 'vue';
import Router from '../../../router'
export default Vue.extend({
  methods: {
    async fakeMsg() {
      Alert.confirm("An email has been sent to the specified address below...follow it for more information").then(() => {
        Router.push('/login')
      })
    }
  }
})
</script>

<style scoped>
.final {
  padding: 40px;
}
.titleTwo {
  font-size:20px;
  /* padding:15px 0px 0px 0px; */
  /* margin:20px; */
  /* background-color: lightgrey; */
}
.title {
  padding: 0px;
  margin: 0px;
}
.mainDiv{
  border: 10px groove #0460AD;
  background-color:lightgrey;
  padding: 30px;
  width: 39%;
  display:inline-block;
}
.labels {
  float:left;
  font-size: 20px;
  padding: 5px;
}
.inputs {
  margin: 0px 0px 10px 10px;
  padding: 5px;
}

.buttonDiv {
  padding: 15px;
}
.theButton {
  width: 40%;
  padding: 12px;
  font-size: 15px;
  border: lightseagreen 3px outset;
}
.theButton:hover {
  cursor:pointer;
}
/* Link styling */
li {
    text-align: center;
    border-bottom: 1px solid black;
}
li a {
    display: inline-flex;
    color: black;
    padding: 8px 8px;
    text-decoration: none;
}
li a:hover {
    background-color: #111;
    color: white;
}
/* Relevant Links Div */
#options {
    border: 5px groove #0460AD;
    margin: 15px auto;
    width: 300px;
    text-align: center;
    background-color: lightgrey;  
}

/* Relevant Links List */
#ul-links{
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 300px;
    background-color: lightgrey;
    overflow: hidden;
}
</style>