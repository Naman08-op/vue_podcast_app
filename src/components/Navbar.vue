<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="align-items: center;">
      <img
        src=""
        style="height: 50px; margin: 20px;"
      />
      <span class="has-text-weight-medium is-size-4">
        Podcast Application
      </span>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              v-for="item of navItems"
              :key="item.name"
              :to="item.to"
              class="button is-primary"
            >
              <span class="icon">
                <i :class="`fas fa-${item.icon}`"></i>
              </span>
              <strong>{{ item.name }}</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { name: "Login", to: "/login", icon: "lock" },
        { name: "Register", to: "/register", icon: "key" }
      ]
    };
  }
};
</script>