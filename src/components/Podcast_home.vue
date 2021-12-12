<template>
  <div>
    Podcast HOME
    <br />
        <button @click="logout()" class="button is-danger">Logout</button>

    <br />
    <input
      class="input is-link"
      type="text"
      placeholder="Enter podcast title"
      v-model="title"
    />
    <br />
    <br />
    <label class="checkbox">
      <input type="checkbox" v-model="live" />
      Go live
    </label>
    <br />
    <br />
    <div class="control">
      <button @click.prevent="start()" class="button is-link">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastHome",
  data() {
    return {
      live: false,
      title: null,
    };
  },
  methods:{
    start(){
      if(this.title!==null && this.live){
        this.$store.dispatch('title',{
          title:this.title
        })
        this.$router.push("/podcast_start")
      }
      else{
        window.alert('Tick the box to go live')
      }
    },
    async logout(){
        await this.$store.dispatch("logout")
        console.log(this.$store.getters.getsessiontitle)
        console.log(this.$store.getters.getuserId)
        console.log(this.$store.getters.getEmail)
        console.log(this.$store.getters.getPodcaster)
        console.log(this.$store.getters.getName)
        this.$router.push("/login")
    }
  }
};
</script>

<style></style>
