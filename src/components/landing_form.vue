<template>
  <div>
    Hi form page landing
    <form>
      <div class="field">
        <label class="label">name</label>
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder="Enter your name"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">UserID</label>
        <div class="control">
          <input type="text" :placeholder="this.userID" />
        </div>
      </div>
      <label class="checkbox">
        <input type="checkbox" v-model="podcaster" />
        Are you a podcaster?
      </label>
      <div class="field">
        <p class="control">
          <button @click.prevent="submit()" class="button is-success">
            Proceed
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LandingForm",
  data() {
    return {
      name: null,
      userID: null,
      podcaster: false,
      emailId: null,
    };
  },
  created() {
    this.emailId = this.$store.getters.getEmail;
   this.userID= this.$store.getters.userId
    console.log(this.emailId);
  },
  methods: {
    submit() {
      axios
        .post("http://localhost:5000/podcast/signup", {
          name: this.name,
          userID: this.$store.getters.userId,
          isPodcaster: this.podcaster,
          emailId: this.emailId,
        })
        .then((response) => {
          console.log(response);
          console.log("!!!!!!!!!!!!")
          console.log(JSON.parse(response.config.data));

          console.log(response.error);
          this.$store.dispatch("podcaster", JSON.parse(response.config.data));
          //this.podcaster(response.data.success);
          console.log(this.$store.getters.getPodcaster);
          if (this.$store.getters.getPodcaster === true)
            this.$router.push("/podcast_home");
          else {
            this.$router.push("/user_home");
          }
        });
    },
  },
};
</script>
