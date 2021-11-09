<template>
<div>
    <h1> Topi Scheduling Page </h1>
    <p> 
        <i>Welcome {{currUser}}</i>
        <i>Here you can see your upcoming events, as well as create/delete any
        events as you see fit.</i>
    </p>

    <div class="row">
        <div class="col">
            <div class="cal">
                <div class="cal-body">
                    <h1> Events </h1>
                    <p class="info">
                        <b class="media" v-for="event in events" v-bind:key="event._id">
                            <p class="event"> {{event.info}} | {{event.date}} | 
                            <button class="event-button" @click='deleteEvent(event._id)'> delete event </button>
                            </p>
                        </b>
                    </p>
                    <p><button type="submit" class="new-meeting">New Meeting</button></p>
                </div>
            </div>
            <div class="cal">
                <div class="cal-body">
                    <h1>Add events</h1>
                    <p><label for="info"><b>Information</b></label></p>
                    <p><input type="info" placeholder="Event Name" v-model="infoX" required></p>
                    <p><label for="date"><b>Date</b></label></p>
                    <p><input type="date" placeholder="Event Date" v-model="dateX" required></p>
                    <button class="new-meeting" @click='createEvent'>Add Event</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
const URL = 'http://localhost:5104/topi/v1.0/get-events'
const dURL = 'http://localhost:5104/topi/v1.0/delete-event' 
const cURL = 'http://localhost:5104/topi/v1.0/create-event'
import Store from '../../store/store';

export default {

    data () {
        return {
            currUser: Store.state.User,
            events: [],
            infoX: '',
            dateX: '',
        }
    },

    methods: {
        
        getEvents: function() {
            console.log(Store.state.User)
            return fetch(URL)
                .then(res => res.json())
                .then(result => this.events = result )
                .catch(err => console.log(err.message))
        },

        deleteEvent: function (id) {
            console.log(id)
            fetch('/topi/delete-event', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(id)
            })
            .then(this.getEvents())
            .catch(err => console.log(err.message))
        },

        createEvent: function() {
            const temp = {
                date: this.dateX,
                info: this.infoX
            }
            fetch('/create-event',  {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(temp),
            })
            // .then(this.getEvents())
            .catch(err => console.log(err.message))
        },

    },
    mounted() {
        this.getEvents()
    },
    

};
</script>

<style scoped>
input[type=info] {
    width: 90%;
    padding: 20px 10px ;
    /* margin: 20px 0; */
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
    white-space: normal;
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