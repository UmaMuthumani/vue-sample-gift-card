<template>
  <span>
    <div>
      <navhead></navhead>
    </div>
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <form class="col-12">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="orderDetails.firstName" :class="{ 'is-invalid': $v.orderDetails.firstName.$error }">
              <div v-if="!$v.orderDetails.firstName.required" class="invalid-feedback">First Name is required</div>
              <div v-if="!$v.orderDetails.firstName.minLength" class="invalid-feedback">First Name must be atleast {{$v.orderDetails.firstName.$params.minLength.min}} characters</div>

            </div>
            <div class="form-group col-md-6">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="orderDetails.lastName" :class="{ 'is-invalid': $v.orderDetails.lastName.$error }">
              <div v-if="!$v.orderDetails.lastName.required" class="invalid-feedback">Last Name is required</div>
              <div v-if="!$v.orderDetails.lastName.minLength" class="invalid-feedback">Last Name must be atleast characters</div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="giftCardValue">Gift Card Value</label>
              <input type="text" class="form-control" id="giftCardValue" v-model="orderDetails.giftCardValue" :class="{ 'is-invalid': $v.orderDetails.giftCardValue.$error }">
              <div v-if="!$v.orderDetails.giftCardValue.required" class="invalid-feedback">Gift Card Value is required</div>
            </div>

            <div class="form-group col-md-6">
              <label for="totalGiftCardValue">Amount Payable (5% commission inclusive)</label>
              <input type="text" class="form-control" id="totalGiftCardValue" v-model="totalCost" disabled>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="mobileNumber">Mobile Number</label>
              <input type="number" class="form-control" id="mobileNumber" v-model="orderDetails.mobileNumber" :class="{ 'is-invalid': $v.orderDetails.mobileNumber.$error }">
              <div v-if="!$v.orderDetails.mobileNumber.required" class="invalid-feedback">Mobile Number is required</div>
              <div v-if="!$v.orderDetails.mobileNumber.minLength" class="invalid-feedback">Mobile Number must be atleast {{$v.orderDetails.mobileNumber.$params.minLength.min}} digits</div>

            </div>
            <div class="form-group col-md-6">
              <label for="address">Address</label>
              <input type="text" class="form-control" id="address" v-model="orderDetails.address" :class="{ 'is-invalid': $v.orderDetails.address.$error }">
              <div v-if="!$v.orderDetails.address.required" class="invalid-feedback">Address is required</div>
              <div v-if="!$v.orderDetails.address.minLength" class="invalid-feedback">Address must be atleast {{$v.orderDetails.address.$params.minLength.min}} characters</div>

            </div>
          </div>
          <button type="button" class="btn btn-primary float-right" v-on:click="submitOrder()">Place Order</button>
        </form>

      </div>
    </div>
  </span>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import momemt from "moment";
export default {
  name: "Order",
  data: function () {
    return {
      orderDetails: {
        firstName: "",
        lastName: "",
        giftCardValue: "",
        mobileNumber: "",
        address: "",
      },
    };
  },
  validations: {
    orderDetails: {
      firstName: { required, minLength: minLength(3) },
      lastName: { required, minLength: minLength(2) },
      giftCardValue: { required },
      mobileNumber: { required, minLength: minLength(10) },
      address: { required, minLength: minLength(6) },
    },
  },
  methods: {
    submitOrder: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$http
        .post("http://localhost:3000/orders", {
          FirstName: this.orderDetails.firstName,
          LastName: this.orderDetails.lastName,
          GiftCardValue: this.orderDetails.giftCardValue,
          TotalGiftCardValue: this.totalCost,
          MobileNumber: this.orderDetails.mobileNumber,
          Address: this.orderDetails.address,
          userId: this.$store.getters.getLoggedInUserId,
          status: "Ordered",
          orderedDate: this.formattedOrderedDate,
        })
        .then(
          (res) => {
            console.log(res);
            this.$router.push({ path: "/orderHistory" });
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
  computed: {
    totalCost: function () {
      if (this.orderDetails.giftCardValue == null) {
        return 0.0;
      }
      return this.orderDetails.giftCardValue * (1 + 0.05);
    },
    formattedOrderedDate: function () {
      return momemt().format("MM/DD/YYYY");
    },
  },
};
</script>