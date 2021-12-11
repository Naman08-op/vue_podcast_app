import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const initialState = () => {
  return { 
    user: null, 
    error: null,
    userId:null,
    emailId:null,
    isPodcaster:null,
    isOnline:null,
    title:null,
    name:null,
    sessiontitle:null,
    sessionownerUID:null,
    sessionname:null,
    sessionstarted_at:null
    
  };
};

export default new Vuex.Store({
  state: initialState(),
  mutations: mutations,
  actions: actions,
  getters: getters,
});
