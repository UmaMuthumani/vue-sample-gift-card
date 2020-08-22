<template>
  <span>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
          <img class="headerlogo" src="../assets\img/gift-card-gift-card-generic-featured-250x250.jpg" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{path: '/order'}" v-if="!IsCurrentUserAdmin">New Order</b-nav-item>
            <b-nav-item :to="{path: '/orderHistory'}" v-if="!IsCurrentUserAdmin">Order History</b-nav-item>
            <b-nav-item :to="{path: '/ManageOrders'}" v-if="IsCurrentUserAdmin">Report</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout()"> Sign Out </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </span>
</template>

<script>
export default {
  name: "NavigationHeader",
  data: function () {
    return { IsCurrentUserAdmin: false };
  },
  mounted: function () {
    if (this.$store.getters.getLoggedInUserId == 1) {
      this.IsCurrentUserAdmin = true;
    }
  },
  components: {},
  methods: {
    logout: function () {
      this.$store.commit("setloggedInStatus", false);
      this.$store.commit("setLoggedInUserId", null);
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.headerlogo {
  width: 80px;
  height: 80px;
  float: right;
  border: none;
  border-radius: 80%;
}
</style>