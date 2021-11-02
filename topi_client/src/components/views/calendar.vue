<template>
<div>
    <h1> Topi Scheduling Page </h1>
    <p> 
        <i>Here you can see your upcoming events, as well as create/delete any
        events as you see fit.</i>
    </p>

    <div class="row">
        <div class="col">
            <div class="cal">
                <div class="cal-body">
                    <h1> Tutoring Sessions </h1>
                    <div class="info">
                        <p class="event"> 
                            <b style="color:#2c3e50">CSCI 370 Tutoring </b>
                            <a href style="text-decoration:none">08/14/21 </a>
                            <vid > <a href>&#9658;</a></vid>
                            
                        </p>
                        
                        <p class="event"> 
                            <b style="color:#2c3e50">CSCI 406 Tutoring </b>
                            <a href style="text-decoration:none">08/16/21 </a>
                            <vid > <a href>&#9658;</a></vid>
                        </p>
                        <p class="event"> 
                            <b style="color:#2c3e50">CSCI 304 Tutoring </b>
                            <a href>08/18/21 </a>
                            <vid> <a href>&#9658;</a></vid>
                        </p>

                        <button type="submit" class="new-meeting">New Meeting</button>
                    </div>
                </div>
            </div>

            <div class="cal">
                <div class="cal-body">
                    <h1> Events </h1>

                    <p class="info">
                        <b class="media" v-for="event in events" v-bind:key="event._id">
                            <p class="event"> {{event.info}} | {{event.date}} | 
                            <button class="event-button" @click='deleteEvent'> delete event </button>
                            </p>
                        </b>
                    </p>
                    
                    <p><button type="submit" class="new-meeting">New Meeting</button></p>
                    <p><button class="new-meeting"> Create Event </button></p>


                </div>
            </div>


        </div>
    </div>
</div>
</template>

<script>
const URL = 'http://localhost:5104/topi/v1.0/get-events'

export default {
    // name: 'calendar',

    data: () => ({
        events: []
    }),
    methods: {
        deleteEvent: function () {
            fetch('http://localhost:5104/topi/v1.0/delete-event')
        }
    },
    mounted() {
        fetch(URL)
            .then(res => res.json())
            .then(result => this.events = result )
            .catch(err => console.log(err.message))
    },
    

};
</script>

<style scoped>

/* Row, Sections in row */
.event-button{
    padding: 5px;
    border-radius: 0;
    border-style: outset;
    background-color:salmon ;
    color: black; 
}
.row {
    display: inline-flex;
    margin: 10px;
}
.col {
    border: 100px;
}
.cal {
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
    background-color: blanchedalmond;
    border: 5px #04AA6D;
    border-style: groove;
    display: inline-flex;
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