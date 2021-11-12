<template>
<div>
    <h1> {{ title }} </h1>
    <p> 
    <i> {{ welcomeMsg }} </i>
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
                            </p></b></p>
                        <div><i>No new events...</i></div>
                    <p><button type="submit" class="new-meeting" @click=getEvents>New Meeting</button></p>
                </div>
            </div>
            
            <div class="cal">
                <div class="cal-body">
                    <h1>Add events</h1>
                    <p><label for="info"><b>Information</b></label></p>
                    <p><input type="info" placeholder="Event Name" v-model="infoNew" required></p>
                    <p><label for="date"><b>Date</b></label></p>
                    <p><input type="date" placeholder="Event Date" v-model="dateNew" required></p>
                    <button class="new-meeting" @click='createEvent'>Add Event</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang='ts'>

export default {

    data () {
        return {
            title: 'Topi Scheduling Page',
            welcomeMsg: 'Here you can see your upcoming events, as well as create/delete any events as you see fit.',
            events:  [],
            infoNew: '',
            dateNew: Date,
            delID: '',
        }
    },

    // methods to 
    // 1. create new events in user's list -> DONE
    // 2. delete events from user's list
    // 3. way to grab all events from db
    // 4. create new link method
    // need to
    // 1. find way to update page as new events are created/deleted
    // 2. css styling being funky on page
    // 3. create links? 
    // 4. where are links going to be stored? or will they be created using method
    methods: {

        async getEvents(this: any): Promise<any> {
            await fetch('/topi/get-events')
            .then(res => res.json())
            .then(userEvents => {
                // this.events = userEvents
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

}

    // data () {
    //     return {
    //         currUser: Store.state.User,
    //         events: '',
    //         infoX: '',
    //         dateX: '',
    //     }
    // },

    // methods: {
        
    //     async getUserEvents(): Promise<any> {
    //         const userEvents = await fetch('/topi/login')
    //         this.events = userEvents;
    //     }

    // },
    // mounted() {
    // async getEvents () {
        //     // console.log(Store.state.User)
        //     // return fetch('topi/get-evnets')
        //     //     .then(res => res.json())
        //     //     .then(result => this.events = result )
        //     //     .catch(err => console.log(err.message))
        //     try {
        //         const res = await fetch('/topi/login')
        //         .then(res => this.events = res);
        //         if (this.events == null) { console.log('No events :(')}
        //     } catch (e: any) {
        //         const err = e as Error
        //         return err.message
        //     }
        // },

        

        // createEvent: function() {
        //     const temp = {
        //         date: this.dateX,
        //         info: this.infoX
        //     }
        //     fetch('/create-event',  {
        //         method: 'POST',
        //         headers: { "Content-Type": "application/json"},
        //         body: JSON.stringify(temp),
        //     })
        //     // .then(this.getEvents())
        //     .catch(err => console.log(err.message))
        // },


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