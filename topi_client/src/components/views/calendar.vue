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
                    <h1> Test Dates </h1>
                    <div class="info">
                        <p class="event"> 
                            <b style="color:#2c3e50">Algorithms: 09/15/21 </b>
                        </p>
                        <p class="event"> 
                            <b style="color:#2c3e50">Programming Languages: 09/15/21</b>
                        </p>
                        <p class="event"> 
                            <b style="color:#2c3e50">Prob/Stats: TBD </b>
                        </p>
                    </div>
                </div>
            </div>

            <div class="cal">
                <div class="cal-body">
                    <h1> Study Times </h1>
                    <div class="info">
                        <p class="event"> 
                            <b style="color:#2c3e50">9:00AM-10:00AM </b>
                        </p>
                        <p class="event"> 
                            <b style="color:#2c3e50">2:00PM-4:00PM</b>
                        </p>
                        <p class="event"> 
                            <b style="color:#2c3e50">7:00PM-7:30PM</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {}
</script>

<style scoped>

/* Row, Sections in row */
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