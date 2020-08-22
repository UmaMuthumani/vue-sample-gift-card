<template>
  <span>
    <div class="d-flex align-items-center container h-100">
      <div class="container-fluid">
        <div class="row justify-conent-center align-items-center">
          <div class="col col-sm-6 col-md-6">
            <form>
              <div class="form-group">
                <label for="username">User Name</label>
                <input type="text" class="form-control" id="username" aria-describedby="User Name" placeholder="Enter UserName" v-model="user.username">
              </div>
              <div class="form-group">
                <label for="userpassword">Password</label>
                <input type="password" class="form-control" id="userPassword" v-model="user.userpassword" placeholder="Password">
              </div>
              <div>
                <button type="button" class="btn btn-primary float-left" v-on:click="Login()">Login</button>
              </div>
              <button type="button" class="btn btn-primary float-right" v-on:click="signUp()">SignUp</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      user: {
        username: "",
        userpassword: "",
      },
      users: [],
    };
  },
  methods: {
    signUp: function () {
      this.$router.push({ path: "/signUp" });
    },
    Login: function () {
      this.$http
        .get("http://localhost:3000/consumers")
        .then((res) => {
          this.users = res.data;
          this.validateUser();
        })
        .catch((err) => console.error(err));
    },
    validateUser: function () {
      let isValidUser = false;
      this.users.forEach((x) => {
        if (
          this.user.username.toLowerCase() == x.userName.toLowerCase() &&
          this.user.userpassword == x.userPassword
        ) {
          this.$store.commit("setloggedInStatus", true);
          this.$store.commit("setLoggedInUserId", x.id);
          isValidUser = true;
        }
      });
      if (isValidUser) {
        if (this.$store.getters.getLoggedInUserId == 1) {
          this.$router.push({ path: "/manageOrders" });
        } else {
          this.$router.push({ path: "/order" });
        }
      }
    },
  },
};
</script>