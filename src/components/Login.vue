<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3 ">
        <form>
          <div class="form-group">
            <label for="username">User Name</label>
            <input type="text" class="form-control" id="username
            " aria-describedby="User Name" placeholder="Enter UserName" v-model="user.username" :class="{ 'is-invalid': $v.user.username.$error }">
            <div v-if="!$v.user.username.required" class="invalid-feedback">User Name is required</div>
            <div v-if="!$v.user.username.minLength" class="invalid-feedback">User Name is must be atleast {{$v.user.username.$params.minLength.min}} characters</div>

          </div>
          <div class="form-group">
            <label for="userpassword">Password</label>
            <input type="password" class="form-control" id="userPassword" v-model="user.userpassword" placeholder="Password" :class="{ 'is-invalid': $v.user.userpassword.$error }">
            <div v-if="!$v.user.userpassword.required" class="invalid-feedback">Password is required</div>
            <div v-if="!$v.user.userpassword.minLength" class="invalid-feedback">Must be at least  {{$v.user.userpassword.$params.minLength.min}}  characters and contain a lowercase character, uppercase character and a number.
            </div>

          </div>
          <div>
            <button type="button" class="btn btn-primary float-left" v-on:click="Login()">Login</button>
          </div>
          <button type="button" class="btn btn-secondary float-right" v-on:click="signUp()">SignUp</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
// import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { required, minLength } from "vuelidate/lib/validators";
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
  validations: {
    user: {
      username: { required, minLength: minLength(4) },
      userpassword: { required, minLength: minLength(5) },
 
      // lastName: { required },
      // email: { required, email },
      // password: { required, minLength: minLength(6) },
      // confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },
  methods: {
    signUp: function () {
      this.$router.push({ path: "/signUp" });
    },
    Login: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
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
<style scoped>
body,
html {
  height: 100%;
}
</style>