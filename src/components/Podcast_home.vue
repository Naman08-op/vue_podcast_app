<template>
  <div>
    Podcast HOME
    <br />
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
    }
  }
};
</script>

<style></style>
