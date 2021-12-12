/* eslint-disable */ 
<template>
<div id="login">
  <div class="buttons">
    <button @click="loginPage()" class="button is-success">Login</button>
    <button @click="registerPage()" class="button is-success">Register</button>
  </div>
  <div></div>
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-content">
          <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
            <button @click="resetError()" class="delete"></button>
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="margin-top: 0.3em; margin-left: 1em">
                <li
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
            </div>
          </div>
          <form>
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="validate()" class="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      email: null,
      password: null,
      validationErrors: [],
      firebaseError: "",
    };
  },
  methods: {
    ...mapActions(["signInAction", "podcaster"]),
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();

      // email validation
      if (!this.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (/.+@.+/.test(this.email) != true) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid.");
      }
      // password validation
      if (!this.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (/.{6,}/.test(this.password) != true) {
        this.validationErrors.push(
          "<strong>Password</strong> must be at least 6 characters long"
        );
      }
      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signIn();
      }
    },
    signIn() {
      try {
        this.signInAction({ email: this.email, password: this.password });
        axios
          .get("http://localhost:5000/podcast/user/" + this.$store.getters.userId)
          .then((response) => {
            console.log("justin")
            console.log(response)
            if (response.data) {
              console.log(response.data);
              this.$store.dispatch("podcaster", response.data);
              //this.podcaster(response.data.success);
              console.log(this.$store.getters.getPodcaster);
              if (this.$store.getters.getPodcaster === true)
                this.$router.push("/podcast_home");
          else {
            this.$router.push("/user_home");
              }
            } else {
              this.$router.push("/landing_form");
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    loginPage(){
      this.$router.push("/login")
    },
    registerPage(){
      this.$router.push("/register")
    }
  },
};
</script>

<style>
  #login {
  margin:auto; }
  button {
    width:15%;
  }
</style>