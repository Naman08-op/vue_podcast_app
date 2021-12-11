import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import LandingForm from "../components/landing_form.vue"
import UserHome from "../components/User_home.vue";
import PodcastHome from "../components/Podcast_home.vue"
import PodcastStart from "../components/podcast_start.vue"
import JoinPodcast from "../components/join_podcast.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    alias:"/"
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path:'/landing_form',
    name:"LandingForm",
    component:LandingForm
  },
  {
    path:'/user_home',
    name:"UserHome",
    component:UserHome
  },
  {
    path:'/podcast_home',
    name:"PodcastHome",
    component:PodcastHome
  },
  {
    path:'/podcast_start',
    name:"PodcastStart",
    component:PodcastStart
  },
  {
    path:'/join_podcast',
    name:"JoinPodcast",
    component:JoinPodcast
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
