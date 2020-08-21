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
              <input type="text" class="form-control" id="firstName" v-model="orderDetails.firstName">
            </div>
            <div class="form-group col-md-6">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="orderDetails.LastName">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="giftCardValue">Gift Card Value</label>
              <input type="text" class="form-control" id="giftCardValue" v-model="orderDetails.giftCardValue">
            </div>
            <div class="form-group col-md-6">
              <label for="totalGiftCardValue">Amount Payable (5% commission inclusive)</label>
              <input type="text" class="form-control" id="totalGiftCardValue" v-model="totalCost">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="mobileNumber">Mobile Number</label>
              <input type="text" class="form-control" id="mobileNumber" v-model="orderDetails.mobileNumber">
            </div>
            <div class="form-group col-md-6">
              <label for="address">Address</label>
              <input type="text" class="form-control" id="address" v-model="orderDetails.address">
            </div>
          </div>
          <button type="button" class="btn btn-primary float-right" v-on:click="submitOrder()">Place Order</button>
        </form>
      </div>
    </div>
  </span>
</template>

<script>
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
  methods: {
    submitOrder: function () {
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