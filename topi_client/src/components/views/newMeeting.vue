<template>
  <newMeetingBox v-if='showModal == true'>
    <div class='Info'>
        <h1>Create Meeting</h1>
            <p><label><b>Information</b></label></p>
            <p><input placeholder="Meeting Info." required></p>
            <button @click='showModal = false'>Create Meeting</button>
    </div>
    </newMeetingBox>
</template>

<script>
export default {}
</script>

