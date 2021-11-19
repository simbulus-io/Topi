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
</style>