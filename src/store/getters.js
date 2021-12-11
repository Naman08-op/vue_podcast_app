const getters = {
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    },
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    getEmail(state){
      return state.emailId;
    },
    getPodcaster(state){
      return state.isPodcaster;
    },
  
    getOtherId(state){
      return state.otherId;
    },
    getIsOnline(state){
      return state.isOnline;
    },
    getTitle(state){
        return state.title;
    },
    getName(state){
      return state.name;
    },
    getsessiontitle(state){
      return state.sessiontitle
    },
    getsessionownerUID(state){
      return state.sessionownerUID
    },
    getsessionname(state){
      return state.sessionname
    },
    getsessionstarted_at(state){
      return state.sessionstarted_at
    }

  };
  
  export default getters;