<template>
<div>
    <div class="title">
        <div>
        <h1> {{ Welcome }} </h1>
        <p><i>Welcome back!</i></p>
        </div>
        
    </div>
    <div>
        <form id="login-form" v-on:submit.prevent='tryLogin'>
            <div class="container">

                <!-- Email Input -->
                <label style="font-size:20px" for="email"><b>Email</b></label>
                <input type="text" 
                    placeholder="Enter Your Email" 
                    v-model="email" 
                    required>

                <!-- Password Input -->
                <label style="font-size:20px" for="password"><b>Password</b></label>
                <input type="password" 
                    placeholder="Enter Your Password" 
                    v-model="password" 
                    required>

                <!-- Button & Checkbox -->
                <div class="remember">
                    <button 
                        type='submit' 
                        id="login">
                        Login
                    </button>
                    <label>
                        <input 
                        type="checkbox" 
                        checked="checked" 
                        name="remember"> 
                        <i>Remember me</i>
                    </label>
                </div>
            </div>
        </form>

        <!-- Nav. Links -->
        <div class='x1'>
            <div><img id='logo' src='../../../assets/saga.png'></div>
            <div>
                <div id="options">
                    <ul id="ul-links">            
                        <li><router-link to="/about">{{ About }}</router-link></li>
                        <li><router-link to="/about">{{ Mines }}</router-link></li>
                        <li><router-link to='/forgot'>{{ Forgot }}</router-link></li>
                        <li><router-link to="/">{{ Home }}</router-link></li>
                    </ul>
                </div> 
            </div>
        </div>
    </div>
</div>
</template>


<script lang="ts">
import Alert from 'vue-simple-alert';
import Router from '../../../router';
import Store from '../../../store/store';
import Vue from 'vue';

export default Vue.extend({
    data () {   
        return {
            Welcome: 'Topi Login Page',
            About: 'About Saga Education',
            Mines: 'About Mines Field Session Group Topi',
            Forgot: 'Forgot Password?',
            Home: 'Back Home?',
            email: '',
            password: '',

            check: false
        }
    },


    methods: {
        async tryLogin(this: any) {
            try {
            const res = await fetch('/topi/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
            .then(res => {
                this.validate(res)
                this.$store.state.user.email = this.email
            }).then(none => {
                this.email = '',
                this.password = ''
            })
            } catch(e: any) {
                const err = e as Error
                return err.message
            }
        },
        async validate(check: any) {
            try {
                const rt = (check.status == 200) ? true : false
                if (rt) {
                    console.log("Status 200: (login)")
                    Alert.confirm("Login Success!").then(() => {
                        Router.push('/calendar')
                    })
                } else {
                    Alert.alert("Invalid login, try again please!")
                    console.log("Status 403: Incorrect information (login)")
                }
            } catch(e: any) {
                const err = e as Error
                return err.message
            }
        }
    }
})
</script>
<style scoped>

/* Title, Logo, Welcome */
.title {
    margin: 0 auto;
    /* width: 600px; */
    display:inline-flex
    /* font-display: italic; */
}

/* Login form */
#login-form {
    border: 5px groove #04AA6D;
    margin: 0 auto;
    width: 600px;
    text-align: center;
    background-color:blanchedalmond;   
}

/* Input fields */
input[type=text], input[type=password] {
    width: 100%;
    padding: 15px 10px ;
    margin: 10px 0;
    display: inline-block;
    border: 5px solid #ccc;
    box-sizing: border-box;
}

/* Buttons, Remember me */
#login {
    transition-duration: 0.4s;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 10px;
    cursor: pointer;
    width: 50%;
    border-radius: 12px;
}
#login:hover {
    opacity: 0.9;
    background: linear-gradient(Green, salmon);
    text-emphasis-color: black;
}
.container {
    padding: 40px;
}
.remember {
    padding: 10px 50px;
}

/* Relevant Links Div */
#options {
    border: 3px groove #04AA6D;
    margin: 40px 10px 10px 10px;
    width: 300px;
    text-align: center;
    background-color: bisque;  
    display:inline-flex;
    /* padding: 5px; */
}

/* Relevant Links List */
#ul-links{
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 300px;
    background-color: darkslategray;
    overflow: hidden;
}

/* Link styling */
li {
    text-align: center;
    border-bottom: 1px solid black;
}
li a {
    display: block;
    color: beige;
    padding: 8px 8px;
    text-decoration: none;
}
li a:hover {
    background-color: #111;
    color: white;
}
.x1 {
    display: inline-flex;
    padding: 5px;
    margin: 5px;
}
#logo {
    border:#04AA6D 3px groove;
}


</style>