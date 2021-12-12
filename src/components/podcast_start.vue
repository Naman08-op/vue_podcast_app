
<template>
  <div >
      {{title}}<br>{{name}}
      <br>  
      <p>{{formattedElapsedTime}}</p>
    <button @click="startPodcast" class="button is-success">Start</button>
    <button @click="stop" class="button is-danger">Stop</button>
    <button @click="endPodcast" class="button is-link">END PODCAST</button>
    
  </div> 
</template>

<script>
import axios from "axios";
export default {
  name: "PodcastStart",
  data() {
    return {
        title:this.$store.getters.getTitle,
      elapsedTime: 0,
      timer: undefined,
      name:this.$store.getters.getName
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    },
    startPodcast(){
        console.log( this.title),
        console.log(this.name)
        console.log(this.$store.getters.userId),
        axios
        .post("http://localhost:5000/podcast/startPodcast",{
            title: this.title,
            ownerUID:this.$store.getters.userId,
            name:this.name
        }).then(res=>{
            console.log(res.data)
        })
        this.start()
        console.log(this.title)
    },
    //THIS ONE HAS A BUG> NEEDS TO BE FIXED>
     endPodcast(){
         console.log( this.title),
        console.log(this.$store.getters.userId)
        axios
        .post("http://localhost:5000/podcast/endSession",{
            title: this.title,
            uid:this.$store.getters.userId
        }).then(res=>{
            console.log(res.data)
        })
    //    axios.post("http://localhost:5000/podcast/endSession",{
    //         title: this.title,
    //         uid:this.$store.getters.userId
    //     }).then(res=>{
    //         console.log(res.data)
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    this.stop()
        this.$router.push("/podcast_home")
    }
  }
};
</script>
