<template>
<div class = 'modal-backdrop'>
    <h1> {{ title }} </h1>
    <h2> Hello, {{ name }} </h2>
    <p><i> {{ welcomeMsg }} </i></p>

    <!-- Modal -->
    <newMeetingBox v-if='showModal == true' class='modal'>
        <div class='modal'>
            <h1>Create Meeting</h1>
                <div class='inputTitle'>
                    <p><label><b>Information</b></label></p>
                        <p><input placeholder="Meeting name?" v-model='meetInfo' required></p>
                    <!-- Button -->
                    <div class='createMeetButton'>
                        <button 
                            @click='showModal = false' 
                            v-on:click='toMeeting'
                            style='margin:10px;'>
                            Create Meeting</button></div>
                    <div class='closeButton'>
                        <button 
                        @click='showModal = false' >
                        Close</button></div>
                </div>

            <!-- Dropdown (Created temp arr. 'userList')-->
            <div class="dropdown">
                <div>Add a student?</div>
                <div class="dropContent" 
                    v-for='user in userList' 
                    v-bind:key='user'>
                    <x>{{user}}</x>
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
                    <p class="info">
                        <b class="media" v-for="event in events" v-bind:key="event._id">
                            <p class="event"> {{event.info}} | {{event.date}} | 
                            <button class="event-button" @click='deleteEvent(event._id)'> delete event </button>
                            </p></b></p>
                    <p><button id="show-modal" @click='showModal = true'>New Meeting</button></p>
                </div>
            </div>
            <div class="cal">
                <div class="cal-body">
                    <h1>Add events</h1>
                    <p><label for="info"><b>Information</b></label></p>
                    <p><input type="info" placeholder="Event Name" v-model="infoNew" required></p>
                    <p><label for="date"><b>Date</b></label></p>
                    <p><input type="date" placeholder="Event Date" v-model="dateNew" required></p>
                    <button @click='createEvent'>Add Event</button>
                </div>
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
            name: this.$store.state.user.email,
            events: this.$store.state.user.events,
            title: 'Topi Scheduling Page',
            welcomeMsg: 'Here you can see your upcoming events, as well as create/delete any events as you see fit.',
            infoNew: '',
            dateNew: Date,
            delID: '',
            meetInfo: '',
            userList: ['Kenny', 'Laura', 'Adam', 'Dillon'],
        }
    },
    methods: {
        async grabUserList() {
            await fetch('/topi/get-info')
            .then(res => this.userList)
            console.log(this.userList)
        },


        async toMeeting() {
            this.$store.state.meetingId = this.meetInfo
            Router.push(`/meeting`)
        },
        async getEvents(this: any): Promise<any> {
            await fetch('/topi/get-events')
            .then(res => res.json())
            .then(userEvents => {
                return userEvents
            })
            .catch(error => console.log(error.message))
        },
        async createEvent(this: any) {
            try {
                await fetch('/topi/create-event', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        date: this.dateNew,
                        info: this.infoNew,
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
.dropdown {
    display:block;
    max-width: 100px;
    margin: 10px;
    border: 3px #04AA6D solid;
    text-align: center;
    content: center;
    background-color: aliceblue;
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
    display:inline-block;
}

.modal {
    padding: 10px;
    border: 5px #04AA6D outset;
    background: beige;
    width: 500px;
    height: 300px;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: inline-flex;
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
    border-radius: 0;
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
}
.cal {
    overflow:scroll;
    width: 300px;
    height: 400px;
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
    background-color: blanchedalmond;
    border: 5px #04AA6D;
    border-style: groove;
    /* display: inline-flex; */
    /* white-space: normal; */
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