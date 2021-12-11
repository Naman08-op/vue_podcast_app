<template>
  <div>
    USER HOME
    <br>
    <button @click="logout()" class="button is-danger">Logout</button>
    <br />
    <div v-if="podcasts.length">
      <div v-for="podcast in podcasts" :key="podcast.title" :class= "card">
        <div>
          
          <section class="section">
            <div class="zcontainer">
              <!-- 	Card 1	 -->
              <div class="zcard">
                <header class="card-header">
                  <p class="card-header-title">Podcast</p>
                  <a
                    href="#"
                    class="card-header-icon"
                    aria-label="more options"
                  >
                    <span class="icon">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div class="card-content">
                  <div class="content">
                    {{ podcast.title }} by {{ podcast.name }}
                    <br />
                    
                  </div>
                </div>
                <footer class="card-footer">
                  <button @click="joinPodcast(podcast)" class="button is-success">Join</button>
                  
                </footer>
              </div>
            </div>
          </section>
        </div>
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
      console.log("!!!")
      console.log(this.podcasts)
    });
  },
  methods: {
    joinPodcast(podcast) {
        console.log(this.podcasts)
      console.log(podcast);
      axios
        .post("http://localhost:5000/podcast/joinSession", {
          joinee: this.$store.getters.userId,
          podcast: podcast,
        })
        .then((res) => {
          console.log(res.data);
          console.log("yes done");
          this.$store.dispatch("joinedSession", res.data)
          console.log(this.$store.getters.getsessiontitle)
          this.$router.push("/join_podcast")
        });
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
  },
};
</script>

<style>
.zcontainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0.5em;
}

.zcard {
  height: max-content;
}
</style>
