<template>
<div>
  <div class="row">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="l-col">
      <div class="cont">
        <h1>Problem Statement</h1>
        <h2>Field Session Project: Topi</h2>
        <p><i class="fa fa-quote-left fa-2x fa-ull-left"></i> The Saga Cohort will be tasked with developing an audio/video conferencing solution based on the open source video conferencing SDK Jitsi.  Saga currently uses the conferring solution from Twilio which is expensive and detracts from our mission to make high-impact tutoring affordable for all.  The project will involve full stack software engineering against a cutting edge SDK.  The client work will be node in ES6+ compatible Typescript & Haxe and will include UI/UX support from Saga’s design team.  The server side will be deployed in the AWS cloud and require the team to learn enough about cloud provisioning and deployments to effect a self-hosted solution.  The team will report directly to the VP of engineering and will be supported by the Saga engineering team as necessary.</p>
          <div class="topi-reqs">
            <div>
              <h3>Functional Requirements</h3>
                <ul class="topi-list-2">
                  <li>Jitsi Video Software Client Side Implementation</li>
                  <li>Includes audio, video tools</li>
                  <li>Smooth UI experience</li>
                  <li>Hosting on AWS EC2 Instance</li>
                  <li>Creation of REST API</li>
                  <li>Any "optional features"</li>
                </ul>
            </div>
            <div>
              <h3>Optional Requirements</h3>
                <ul class="topi-list-2">
                  <li>Please add reqs. to this list</li>
                  <li>Includes audio, video tools</li>
                  <li>Smooth UI experience</li>
                  <li>Any "optional features"</li>
                </ul>
            </div>
          </div>
          
      </div>
      <div class="cont" style='text-align:center'>
        <h1>About Saga Education</h1>
        <h2>Field Session Project: Topi</h2>
        <p><i class="fa fa-quote-left fa-2x fa-ull-left"></i> Saga Education is a national nonprofit that has served over 17,600 students with high-dose math tutoring during their regular school day. Fueling this work is a bold vision to combat educational inequity by working with school districts to unlock the power of personal relationships to nurture academic, social and emotional growth for young people. Our students and schools represent historically marginalized communities. Our mission is to provide them with rigorous, high impact tutorials that ensure they have the confidence and academic strength to achieve success in high school and beyond.For more information about Saga Education’s mission, please visit us at www.sagaeducation.org.</p>
      </div>
      <div class='cont' style='text-align: center; width:100%'>
          <img class="arc" src="../assets/ARC.png">
      </div>
    </div>
    <div class="r-col">
      <div class="cont">
        <h2 style="color:#04AA6D">About Topi</h2>
        <p>What we used...</p>
        <ul class="topi-list">
          <li>Modern ES6+ environments</li>
          <li>AWS Cloud</li>
          <li>Docker/DockerHub</li>
          <li>WebRTC</li>
          <li>Typed REST</li>
          <li>Typescript and Vue</li>
          <li>MongoDB</li>
        </ul>
      </div>
      <div class="cont" style="text-align:center">
        <h2 style="color:#04AA6D">Contact Saga</h2>
        <p>339-203-4700</p>
        <p>info@sagaeducation.org</p>
        <p>sagaeducation.org</p>
      </div>
      <div class="cont" style="text-align:center">
        <h2 style="color:#04AA6D">Contact Topi</h2>
        <p>Kenneth Fernandez: 555-0199</p>
        <p>Kenneth Fernandez: 555-0199</p>
        <p>Kenneth Fernandez: 555-0199</p>
        <p>Kenneth Fernandez: 555-0199</p>
      </div>
    </div>
  </div>
  <div class="footer">
    <h2>Footer de Kenny</h2>
    <p>Footer info. 1</p>
    <p>Footer info. 2</p>
    <p>Footer info. 3</p>
    <p>Footer info. 4</p>

  </div>
 </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.row {
  padding: 50px;
  overflow:hidden;
}
.l-col {
  float: left;
  width: 60%;

}
.topi-reqs{
  display: inline-flex;
}
.r-col {
  text-align: left;
  float: left;
  width: 40%;
  padding-left:20px;
}
.cont {
  border: #2c3e50 5px outset;
  background: #deeaee;
  padding: 20px;
  margin-top:20px;
}
.topi-list {
  list-style-type: none;
  text-align: center;
  padding: 0;
  border: 1px solid grey;
}
.topi-list li {
  padding: 8px 16px;
  border-bottom: 1px solid grey;
}
.topi-list li:hover {
  background:seagreen
}
.topi-list-2 {
  margin: 20px;
  max-width: 300px;
  list-style-type:none;
  text-align: left;
  padding:0;
  border: 1px solid grey;
}
.topi-list-2 li {
  padding: 8px 16px;
  border-bottom: 1px solid grey;
}
.topi-list-2 li:hover {
  background:seagreen
}
.footer {
  background: #deeaee;
  padding: 50px;
}
h1 {
  color: #04AA6D;
}
h2:after{
  content:' ';
  display:block;
  border: 1px solid grey;
}
/* h3 {
  text-align: left;
} */


</style>