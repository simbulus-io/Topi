<template>
    <div class="device-tables row w-100" v-if="updated">    
        <!-- Video Table -->
        <div class="col-sm-6 m-2">
            <div class="input-header mb-2"><b>Your Video Inputs</b></div>
            <b-table-simple small caption-top responsive>
                <b-thead>
                    <b-tr>
                        <b-th colspan="1">Label</b-th>
                        <b-th colspan="1">Status</b-th>
                    </b-tr>
                </b-thead>
    
                <b-tbody>
                    <b-tr v-for="device in video_devices" v-bind:key="device.label">
                        <b-td>{{device.label}}</b-td>
                        <b-td class="text-center" v-if="device.status == 'Nominal'">
                            <font-awesome-icon icon="check" class="positive" />
                        </b-td>
                        <b-td class="error text-center" v-else>
                            <font-awesome-icon icon="exclamation" class="negative mr-2" /> {{device.status}}
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>
    
        <!-- Audio Table -->
        <div class="col-sm-6 m-2">
            <div class="input-header mb-2"><b>Your Audio Inputs</b></div>
            <b-table-simple small caption-top responsive>
                <b-thead>
                    <b-tr>
                        <b-th colspan="1">Label</b-th>
                        <b-th colspan="1">Status</b-th>
                    </b-tr>
                </b-thead>
    
                <b-tbody>
                    <b-tr v-for="device in audio_devices" v-bind:key="device.label">
                        <b-td>{{device.label}}</b-td>
                        <b-td class="text-center" v-if="device.status == 'Nominal'">
                            <font-awesome-icon icon="check" class="positive" />
                        </b-td>
                        <b-td class="error text-center" v-else>
                            <font-awesome-icon icon="exclamation" class="negative mr-2" /> {{device.status}}
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>
    </div>
</template>

<script lang="ts" src="./device_table.ts"></script>

<style lang="scss" scoped>
@media (min-width: 576px) {
    .device-tables {
        display: flex;
        flex-wrap: nowrap !important;
    }
}

@import "@/style/common.scss";
.positive {
    color: $woot_tutor_green;
}

.negative {
    color: $woot_tutor_red;
}

.error {
    color: $woot_tutor_red;
}

.table thead th {
    background: $woot_tutor_brightblue;
    color: white
}

.table tbody tr {
    text-align: left;
}

.input-header {
    font-size: 20px;
}
</style>