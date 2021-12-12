<template>
  <div >
    USER HOME
    <br />
    <button @click="logout()" class="button is-danger">Logout</button>
    <br />
      <!-- 	Card -->
      <div class="grid">
        <div v-if="podcasts.length">
          <div v-for="podcast in podcasts" :key="podcast.title" :class="card">
              <div class="card">
            <header class="card-header">
              <p class="card-header-title">Podcast</p>
            </header>
            <div class="card-content">
              <div class="content">
                {{ podcast.title }} by {{ podcast.name }}
              </div>
            </div>
            <footer class="card-footer">
              <button
                @click="joinPodcast(podcast)"
                class="button is-success join_center"
              >
                Join
              </button>
            </footer>
          </div>
          </div>

          <!-- rrdry -->
          <!-- </div> -->
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserHome",
  data() {
    return {
      podcasts: [],
    };
  },
  beforeCreate() {
    axios.get("http://localhost:5000/podcast/getSessions").then((res) => {
      this.podcasts = res.data;
      console.log(res, res.data);
      console.log("!!!");
      console.log(this.podcasts);
    });
  },
  methods: {
    joinPodcast(podcast) {
      console.log(this.podcasts);
      console.log(podcast);
      axios
        .post("http://localhost:5000/podcast/joinSession", {
          joinee: this.$store.getters.userId,
          podcast: podcast,
        })
        .then((res) => {
          console.log(res.data);
          console.log("yes done");
          this.$store.dispatch("joinedSession", res.data);
          console.log(this.$store.getters.getsessiontitle);
          this.$router.push("/join_podcast");
        });
    },
    async logout() {
      await this.$store.dispatch("logout");
      console.log(this.$store.getters.getsessiontitle);
      console.log(this.$store.getters.getuserId);
      console.log(this.$store.getters.getEmail);
      console.log(this.$store.getters.getPodcaster);
      console.log(this.$store.getters.getName);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.grid {
  display: flex; /* establish flex container */
        flex-direction: row; /* make main axis horizontal (default value) */
        
        align-items: center; /* center items vertically, in this case */
        flex-wrap: wrap;
}

.card{
  margin: 20px;
}

.join_center {
  margin: auto;
  width: 70px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
