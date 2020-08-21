import Vue from 'vue';
import Vuex from "vuex";


Vue.use(Vuex);

const authentication = {
    state: {
        loggedInUserId: 0,
        loggedIn: false
    },
    getters: {
        getLoggedInUserId: function (state) {
            return state.loggedInUserId;
        }
    },
    mutations: {
        setloggedInStatus(state, value) {
            state.loggedIn = value;
        },
        setLoggedInUserId(state, value) {
            state.loggedInUserId = value;
        }
    },
    actions: {

    }
}
export const store = new Vuex.Store({
    modules: {
        authentication: authentication
    }
})