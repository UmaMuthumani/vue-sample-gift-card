<template>
  <span>
    <div class="container-fluid h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3 ">
          <form>
            <div class="form-group">
              <label for="username">User Name</label>
              <input type="text" class="form-control" id="username" aria-describedby="User Name" v-model="consumers.userName" placeholder="Enter UserName" :class="{ 'is-invalid': $v.consumers.userName.$error }">
              <div v-if="!$v.consumers.userName.required" class="invalid-feedback">User Name is required</div>
              <div v-if="!$v.consumers.userName.minLength" class="invalid-feedback">User Name is must be atleast {{$v.consumers.userName.$params.minLength.min}} characters</div>

            </div>
            <div class="form-group">
              <label for="userpassword">Password</label>
              <input type="password" class="form-control" id="userPassword" placeholder="Password" v-model="consumers.userPassword" :class="{ 'is-invalid': $v.consumers.userPassword.$error }">
              <div v-if="!$v.consumers.userPassword.required" class="invalid-feedback">User Name is required</div>
              <div v-if="!$v.consumers.userPassword.minLength" class="invalid-feedback">User Name is must be atleast {{$v.consumers.userPassword.$params.minLength.min}} characters</div>

            </div>
            <div class="form-group">
              <label for="userconfirmPassword">Confirm Password</label>
              <input type="password" class="form-control" id="userConfirmPassword" placeholder=" Confirm Password" v-model="consumers.userConfirmPassword" :class="{ 'is-invalid': $v.consumers.userConfirmPassword.$error }">
              <div v-if="$v.consumers.userConfirmPassword.$error" class="invalid-feedback">
                <span v-if="!$v.consumers.userConfirmPassword.required">Confirm Password is required</span>
                <span v-else-if="!$v.consumers.userConfirmPassword.sameAsPassword">Passwords must match</span>
              </div>
            </div>
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" id="useremail" placeholder="Email Address" v-model="consumers.userEmail" :class="{ 'is-invalid': $v.consumers.userEmail.$error }">
              <div v-if="$v.consumers.userEmail.$error" class="invalid-feedback">
                <span v-if="!$v.consumers.userEmail.required">Email is required</span>
                <span v-if="!$v.consumers.userEmail.email">Email is invalid</span>
              </div>
            </div>
              <button type="button" class="btn btn-primary float-right" v-on:click="register()">Register</button>
          </form>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

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
  validations: {
    consumers: {
      userName: { required, minLength: minLength(4) },
      userPassword: { required, minLength: minLength(5) },
      userEmail: { required, email },
      userConfirmPassword: { required, sameAsPassword: sameAs("userPassword") },
    },
  },
  methods: {
    register: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
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