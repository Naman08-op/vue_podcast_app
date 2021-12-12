<template>
  <div>
    HELLO<br />
    {{ title }} <br />
    <p>{{formattedElapsedTime}}</p>
    <button @click="leave()" class="button is-link">Leave</button>
  </div>
</template>

<script>
export default {
  name: "JoinPodcast",
  data() {
    return {
      podcasts: [],
      title: "",
      started_at: undefined,
      ownerUID: "",
      name: "",
      elapsedTime: 0,
      timer: undefined,
    };
  },
  created() {
    this.title = this.$store.getters.getsessiontitle;
    this.started_at = this.$store.getters.getsessionstarted_at;
    this.ownerUID = this.$store.getters.getsessionownerUID;
    this.name = this.$store.getters.getsessionname;
    console.log(this.title, this.started_at, this.ownerUID, this.name);
    this.elapsedTime = Date.now() - this.started_at;
    console.log(Date.now())
  
this.startTimer();
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      // console.log(utc)
      return utc.substr(utc.indexOf(":") - 2, 8);
    },
  },
  methods: {
    leave() {
      this.$router.push("user_home");
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
      console.log(this.formattedElapsedTime);
    },
    
  },
};
</script>
