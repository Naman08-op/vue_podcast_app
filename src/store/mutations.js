const mutations = {
    setUser(state, payload) {
      state.userId= payload.userId
      state.emailId= payload.emailId

    },
    setError(state, payload) {
      state.error = payload;
    },
    setPodcaster(state,payload){
      state.isPodcaster = payload.isPodcaster
      state.name=payload.name
      state.isOnline= payload.isOnline
      state.otherId= payload.otherId
      
    },
    setTitle(state,payload){
      state.title= payload.title
    },
    joinedSession(state,payload){
      state.sessiontitle=payload.sessiontitle,
      state.sessionownerUID=payload.sessionownerUID,
      state.sessionname=payload.sessionname,
      state.sessionstarted_at=payload.sessionstarted_at    
    },
    logout(state){
      state.user= null, 
      state.error= null,
      state.userId=null,
      state.emailId=null,
      state.isPodcaster=null,
      state.isOnline=null,
      state.title=null,
      state.name=null,
      state.sessiontitle=null,
      state.sessionownerUID=null,
      state.sessionname=null,
      state.sessionstarted_at=null
    }
  };
  
  export default mutations;