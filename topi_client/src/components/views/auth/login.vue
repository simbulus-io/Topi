<template>
<div>
    <div class="title">
        <h1> {{ Welcome }} </h1>
        <p><i>Welcome back!</i></p>
    </div>
    <div>

        <form id="login-form" v-on:submit='tryLogin'>
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
</template>


<script lang="ts">

export default {

    data () {
        return {
            Welcome: 'Topi Login Page',
            About: 'About Saga Education',
            Mines: 'About Mines Field Session Group Topi',
            Forgot: 'Forgot Password?',
            Home: 'Back Home?',

            email: '',
            password: '',
        }
    },
     methods: {

        // Trying to send email & password using fetch (which should go through proxy)
        // but when console logging email & password in user_helpers.ts login() func. 
        // they are null / undefined
        // * same issue as registerUser() in register.vue *
        tryLogin(this: any) {
            console.log(this.email)
            return fetch('/topi/login', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
            .then(res => res.json())
            .catch(err => err.message)
        }
    }
}

</script>
    

    


    // methods: {
    //     // loginUser: function(this:any) {
    //     //     console.log(this.data)
    //     //     fetch(URL, {
    //     //         method: 'GET',
    //     //         headers: { 'Content-Type': 'application/json' },
    //     //         credentials: 'include',
    //     //         body: JSON.stringify(this.data),
    //     //     })
    //     //     .then(res => res.json())
    //     //     .catch(err => console.log(err.message))
    //     // },

    //     const login = () => {
    //         try {
    //             const res = await fetch(URL, {
    //                 method: 'get',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ 
    //                     email: this.email,
    //                     password: this.password
    //                  })
    //             })
    //         } catch (err) {
    //             console.log(err.message)
    //         }
    //     }
        
    // }



<style scoped>

/* Title, Logo, Welcome */
.title {
    margin: 0 auto;
    width: 600px;
    font-display: italic;
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
    opacity: 0.8;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.container {
    padding: 40px;
}
.remember {
    padding: 10px 50px;
}

/* Relevant Links Div */
#options {
    border: 5px groove #04AA6D;
    margin: 15px auto;
    width: 300px;
    text-align: center;
    background-color: bisque;  
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

</style>