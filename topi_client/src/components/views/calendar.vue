<template>
<div class = 'modal-backdrop'>
    <h1> {{ title }} </h1>
    <h2> Hello, {{ name }} </h2>
    <p><i> {{ welcomeMsg }} </i></p>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Modal -->
    <newMeetingBox v-if='showModal == true' class='modal'>
        <div class='modal'> 
            <h1 style='padding:10px; margin:0px 0px;'><i class="fa fa-fw fa-camera"></i>  Create Meeting</h1>
                <p><i>Enter information about the meeting you would like to create...</i></p>
                <div class='modal-container'>

                    <!-- User input - Meeting ID -->
                    <div class='modal-row'>
                        <div class='modal-col-1'>
                            <modal-label style='font-size:20px;'><b>Meeting-ID:    </b></modal-label>
                        </div>
                        <div class='modal-col-2'> 
                        <input placeholder="..." 
                                type='modal-text'
                                v-model='meetInfo' 
                                required
                                style='margin:0px 0px 0px 5px; padding:5px'>
                        </div>
                    </div>
                    <!-- User input - anything else? -->
                    <div class='modal-row'>
                        <div class='modal-col-1'>
                            <modal-label style='font-size:20px;'><b>Information:</b></modal-label>
                        </div>
                        
                        <div class='modal-col-2'>
                            <input placeholder="..." 
                                type='modal-text'
                                v-model='random' 
                                required
                                style='margin:0px 0px 0px 5px; padding:5px'>
                        </div>
                    </div>
                    <!-- Dropdown (Created temp arr. 'userList')-->
                    <div class=modal-row>
                        <div class='modal-col-1'>
                            <div class="dropdown">
                                <div>Add a student?</div>
                                <div class="dropContent" 
                                    v-for='user in userList' 
                                    v-bind:key='user'>
                                    <x>{{user}}</x>
                                </div>
                            </div>
                        </div>
                        <!-- Buttons -->
                        <div class='modal-col-1'>
                            <div class='createMeetButton'>
                                <button 
                                    class='modal-buttons'
                                    @click='showModal = false' 
                                    v-on:click='toMeeting'>
                                    Create Meeting</button></div>
                            
                        </div>
                        <div class='modal-col-1'>
                            <div class='closeButton'>
                                <button 
                                    class='modal-buttons'
                                    @click='showModal = false' >
                                    Close</button></div>
                        </div>
                    </div>
                </div>
        </div>
    </newMeetingBox>

    <!-- User Calendar  -->
    <div class="row">
        <div class="col">
            <div class="cal">
                <div class="cal-body">
                    <h1> Events </h1>
                    <p class="info" v-if='hasEvents == true'>
                        <b class="media" v-for="event in allEvents" :key="event._id">
                            <p class="event" v-if="event.email == name"> 
                                <button @click='toMeeting'>&#9658;</button>
                                | {{ event.date }} | {{ event.info }} |
                                <button class="event-button" 
                                    @click='deleteEvent'> 
                                    Delete</button>
                            </p>
                        </b>
                    </p>
                    <p v-else>No Events</p>
                    <p><button id="show-modal" @click='showModal = true'>New Meeting</button></p>
                </div>
            </div>
            <div class="cal-add-events">
                    <h1>Add events</h1>
                    <p><label for="info"><b>Information</b></label></p>
                    <p><input type="info" placeholder="Event Name" v-model="infoToSend" required></p>
                    <p><label for="date"><b>Date</b></label></p>
                    <p><input type="date" placeholder="Event Date" v-model="dateToSend" required></p>
                    <button @click='createEvent'>Add Event</button>
            </div>
        </div>
    </div>
</div>
</template>



<script lang='ts'>
import Router from '../../router'
import Vue from 'vue';

export default Vue.extend({
    data () {
        return {
            showModal: false,
            hasEvents: false,
            name: this.$store.state.user.email,
            allEvents: [],
            userEvents: [],
            title: 'Topi Scheduling Page',
            welcomeMsg: 'Here you can see your upcoming events, as well as create/delete any events as you see fit.',
            infoToSend: '',
            dateToSend: '',
            delID: '',
            meetInfo: '',
            userList: ['Laura', 'Adam', 'Dillon'],
            test: false,
        }
    },

    mounted() {
        this.getTheEvents();
        this.eventCheck();
        this.filterEvents();
        // this.getEvents();
        // this.printEvents();
    },

    methods: {
        async filterEvents() {
            console.log(this.$store.state.user.email)
            for(let i = 0; i < this.allEvents.length; i++) {
                console.log(this.allEvents[i][1])
                if (this.allEvents[i][1] === this.$store.state.user.email) {
                    this.userEvents.push(this.allEvents[i]);
                } else {
                    console.log('No match')
                }
            }
        },

        async printEvents() {
            console.log(this.allEvents)
            console.log(this.allEvents.length)
        },

        // TODO create new array of user names from the GET
        // then use a v-for in the dropdown to iterate and 
        // output all the user names
        async grabUserList() {
            await fetch('/topi/get-info')
            .then(res => this.userList)
            console.log(this.userList)
        },

        // Creates new user meeting ID from the modal & 
        // routes the user to the meeting 
        async toMeeting() {
            this.$store.state.meetingId = this.meetInfo
            Router.push(`/meeting`)
        },

        async getEvents(this: any): Promise<any> {
            try {
                await fetch('/topi/getuserevents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: this.$store.state.user.email
                    })
                })
                .then(res => {
                    this.allEvents = res
                    this.hasEvents = true
                })
            } catch(e: any) {
                const err = e as Error
                return err.message
            }
        },

        getTheEvents: function() {
            console.log('testing')
            return fetch('/topi/get-events', {
                method: 'POST'
            })
            .then(res => res.json())
            .then(result => this.allEvents = result)
            .then(any => this.hasEvents = true)
            .catch(err => console.log(err.message))
        },

        async eventCheck() {
            if (this.userEvents.length !== 0) {
                this.hasEvents = true;
                console.log(this.hasEvents)
            } else {
                console.log('this error')
            }
        },

        async testGet(this: any): Promise<any> {
            console.log('test')
            try {
                await fetch('/topi/get-events').then((res) => {
                    this.allEvents = res
                    console.log(this.allEvents)
                })
            } catch (e:any) {
                const err = e as Error
                return err.message
            }
        },

        async createEvent(this: any): Promise<any> {
            console.log(this.$store.state.user.email)
            try {
                await fetch('/topi/create-event', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: this.$store.state.user.email,
                        date: this.dateToSend,
                        info: this.infoToSend
                    })
                })
            } catch (e: any) {
                const err = e as Error
                return err.message
            }
        },

        async deleteEvent(this: any) {
            try {
                await fetch('/topi/delete-event', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
            } catch (e: any) {
                const err = e as Error
                return err.message
            }
        }
    },
})
</script>
<style scoped>
.modal-container {
    border-radius: 5px;
    background: #b1cbbb;
    padding:12px;
}
.modal-col-1 {
    float:left;
    width: 25%;
    margin-top: 6px;
}
.modal-col-2 {
    float:left;
    width: 75%;
    margin-top: 6px;
}
input[type=modal-text] {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.modal-row {
    padding: 10px;
    align-content: center;
}
.modal-row:after{
    content:"";
    display:table;
    clear:both;
}
.modal-label {
    display:inline-block;
}

.dropdown {
    /* width: 300px; */
    padding: 7px;
    border: 3px #04AA6D solid;
    background-color: #04AA6D;
    color:white;
    font-size: 16px;
}
.dropContent {
    display: none;
    font-size: 15px;
    min-width: 70px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding:5px;
    background-color: #04AA6D;
}
.dropContent:hover {
    background-color: #04AA6D;
}
.dropContent:hover x:hover {
    background-color: yellow;
    cursor: pointer;
}
.dropdown:hover .dropContent {
    background-color: #04AA6D;
    display:block;
}
.inputTitle{
    padding: 10px 30px;
    text-align: left;
    display:inline-block;
}
.modal-buttons {
    background:#04AA6D;
    border: none;
    color: white;
    padding: 10px;
    text-decoration: none;
    font-size: 16px;
    cursor:pointer;
}
.modal-buttons:hover {
    color: lightsteelblue;
}
.modal {
    padding: 10px;
    border: 5px green outset;
    background: #b1cbbb;
    width: 600px;
    height: 400px;
    box-shadow: 2px 2px 20px 1px;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
input[type=info] {
    width: 90%;
    padding: 20px 10px ;
    display:table-column;
    border: 5px solid #ccc;
    box-sizing: border-box;
}
input[type=date]{
    width: auto;
    padding: 10px 10px ;
    /* margin: 20px 0; */
    display:table-column;
    border: 5px solid #ccc;
    box-sizing: border-box;
}
/* Row, Sections in row */
.event-button{
    padding: 5px;
    border-radius: 12px;
    border-style: outset;
    background-color:salmon ;
    color: black; 
    cursor: pointer;
}

.row {
    display: inline-flex;
    margin: 10px;
}
.col {
    border: 100px;
    display: inline-flex;
    width:100%;
    float:right;
}
.cal {
    overflow:scroll;
    overflow: hidden;
    padding: 20px;
    border: 5px #04AA6D;
    background: beige;
    border-style: groove;
    width: 500px;
    height: 500px;
}
.cal-add-events{
    border: 5px #04AA6D;
    border-style: groove;
    width: 300px;
    height:400px;
    background: beige;
}
/* Info in Section */
.event {
    margin: 10px;
    padding: 10px;
    border: 3px #04AA6D;
    border-style: groove;
    background-color:antiquewhite;
    word-break:normal;
    white-space: normal;
}

/* New Meeting */
.new-meeting{
    padding: 5px;
    border-radius: 0;
    border-style: outset;
    background-color: goldenrod ;
    color: black; 
}
.new-meeting:hover{
    transition-duration: 0.4s;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

/* Link styling */
a {
    text-decoration: none;
}
a:visited {
    color: black;
}
a:hover {
    color: teal;
}
</style>