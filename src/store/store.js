import Vue from "vue";
import Vuex from "vuex";

import char from "./modules/char"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        char
    }
});