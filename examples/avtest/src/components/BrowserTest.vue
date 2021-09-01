<template>
    <div class='browser-info w-75'>
        <h2 v-bind:class='browser_alert_color' role='alert'>{{browser_alert}} </h2>
        <div class='d-flex justify-content-center'>
            <!-- from vuex avtest module -->
            <div>
                You are running <b>{{operating_system.name}}</b><br> Browser Size <b>{{browser_width}} x {{browser_height}}</b> <br> Screen Size <b>{{window_width}} x {{window_height}} </b>
                <div v-if='is_websocket_enabled === true'>
                    Websockets <b>ARE</b> supported by your browser 
                </div>
                <div v-else> Websockets are NOT supported by your browser </div>
            </div>
        </div>

        <div>
            <div class='mt-4'>
                <DeviceTable/>
            </div>
    
            <b-button variant='primary' to='/audio' v-if='next_button_visibility'>
                <b>Next Test </b>
                <font-awesome-icon icon='chevron-right' />
            </b-button>
        </div>
    </div>
</template>

<script lang='ts' src='./browser_test.ts'></script>

<style scoped>
body {
    font-family: Georgia, 'Times New Roman', Times, serif;
}

h2 {
    margin: 40px 0 40px 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

.browser-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin-top: 56px;
}

/*This is modifying the btn-primary colors but you could create your own .btn-something class as well*/

.btn-primary {
    border-radius: 0;
    color: #fff;
    background-color: #544972;
    border-color: #544972;
    /*set the color you want here*/
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open>.dropdown-toggle.btn-primary {
    color: #fff;
    background-color: #f47321;
    border-color: #f47321;
    /*set the color you want here*/
}
</style>
