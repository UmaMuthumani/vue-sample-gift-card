<template>
  <span>
    <div class="d-flex align-items-center">
      <div class="container-fluid">
        <div class="row justify-content-center align-items-center"></div>
        <div class="col col-sm-6 col-md-6">
          <form>
            <div class="form-group">
              <label for="username">User Name</label>
              <input type="text" class="form-control" id="username" aria-describedby="User Name" v-model="consumers.userName" placeholder="Enter UserName">
            </div>
            <div class="form-group">
              <label for="userpassword">Password</label>
              <input type="password" class="form-control" id="userPassword" placeholder="Password" v-model="consumers.userPassword">
            </div>
            <div class="form-group">
              <label for="userconfirmPassword">Confirm Password</label>
              <input type="password" class="form-control" id="userConfirmPassword" placeholder=" Confirm Password">
            </div>
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" id="useremail" placeholder="Email Address" v-model="consumers.userEmail">
            </div>

            <button type="button" class="btn btn-primary float-right" v-on:click="register()">Register</button>
          </form>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  name: "SignUp",
  data: function () {
    return {
      consumers: {
        userName: "",
        userPassword: "",
        userConfirmPassword: "",
        userEmail: "",
      },
    };
  },
  methods: {
    register: function () {
      this.$http
        .post("http://localhost:3000/consumers", {
          userName: this.consumers.userName,
          userPassword: this.consumers.userPassword,
          userEmail: this.consumers.userEmail,
          Admin: false,
        })
        .then(
          (res) => {
            console.log(res.data.id);
            this.$store.commit("setloggedInStatus", true);
            this.$store.commit("setLoggedInUserId", res.data.id);
            this.$router.push({ path: "/order" });
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
};
</script>