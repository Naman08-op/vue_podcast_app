//import firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const actions = {
  signUpAction({ commit }, payload) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((response) => {
        console.log(response);
        console.log(response.user.uid);
        console.log(response.user.email);
        commit("setUser", {
          userId: response.user.uid,
          emailId: response.user.email,
        });
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  signInAction({ commit }, payload) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((response) => {
        console.log(response);
        console.log(response.user.uid);
        console.log(response.user.email);
        commit("setUser", {
          userId: response.user.uid,
          emailId: response.user.email,
        });
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },
  podcaster(context, payload) {
    console.log(payload);
    context.commit("setPodcaster", {
      isPodcaster: payload.isPodcaster,
      name:payload.name,
      isOnline: payload.isOnline,
      otherId: payload.uid
    });
  },
  title(context,payload){
    console.log(payload)
    context.commit("setTitle",{
      title:payload.title
    })
  },
  joinedSession(context,payload){
    console.log(payload.title,payload.ownerUID,payload.name,payload.started_at)
    context.commit("joinedSession",{
      sessiontitle:payload.title,
      sessionownerUID:payload.ownerUID,
      sessionname:payload.name,
      sessionstarted_at:payload.started_at
    })
    
  },
  logout(context){
    context.commit("logout",{
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
    })
  }
};

export default actions;
