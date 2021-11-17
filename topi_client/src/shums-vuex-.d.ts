import Store from 'vuex';
import ComponentCustomProperties from 'vue';

declare module '@vue/runtime-core' {

    interface User {
        name: string,
        email: string, 
        uid: string,
        loggedIn: boolean,
    }

    interface ComponentCustomProperties{
        $store: typeof Store;
    }
}