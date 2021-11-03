<template>
<div>
    <div class="title">
        <h1> {{ Welcome }} </h1>
        <p><i>Welcome to Topi!</i></p>
    </div>

    <div style="border: 0">
        <form id="login-form" v-on:submit.prevent='registerUser'>
            <div class="container">

                <!-- Input first name -->
                <label style="font-size:20px" for="firstName"><b>First Name</b></label>
                <input type="text" 
                    placeholder="Enter Your first name" 
                    v-model="first" 
                    required>

                <!-- Input last name -->
                <label style="font-size:20px" for="lastName"><b>Last Name</b></label>
                <input type="text" 
                    placeholder="Enter Your last name" 
                    v-model="last" 
                    required>

                <!-- Input email -->
                <label style="font-size:20px" for="email"><b>Email</b></label>
                <input type="text" 
                    placeholder="Enter Your Email" 
                    v-model="email" 
                    required>

                <!-- Input password -->
                <label style="font-size:20px" for="password"><b>Password</b></label>
                <input type="password" 
                    placeholder="Enter Your Password" 
                    v-model="pw"
                    required>

                <!-- Button -->
                <div class="remember">
                    <button type="submit" id="login">Sign Up</button>
                </div>
            </div>
        </form>
        
        <!-- Nav. links -->
        <div id="options">
            <ul id="ul-links">            
                <li><router-link to="/about"> {{ About }} </router-link></li>
                <li><router-link to="/about"> {{ Mines }} </router-link></li>
                <li><router-link to='/forgot'> {{ Forgot }}</router-link></li>
                <li><router-link to="/"> {{Home}}</router-link></li>
            </ul>
        </div>  
    </div>
</div>
</template>


<script lang="ts">

export default {
    data ()  {
        return {
            Welcome: 'Topi Registration Page',
            About: 'About Saga Education',
            Mines: 'About Mines Field Session Group Topi',
            Forgot: 'Forgot Password?',
            Home: 'Back Home?',

            first: '',
            last: '',
            email: '',
            pw: ''
        }
    },

    methods: {
        registerUser(this: any) {
            return fetch('/topi/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    firstName: this.first,
                    lastName: this.last,
                    email: this.email,
                    password: this.pw
                })
            })
            .then(res => res.json())
            .catch(err => err.message)
        }
    }
}
  
    
</script>


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