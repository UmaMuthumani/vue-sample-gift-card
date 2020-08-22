<template>
  <span>
    <div>
      <navhead></navhead>
    </div>
    <div>
      <b-table responsive hover :items="mappedResult" :fields="fields" :tbody-tr-class="rowClass">
        <template v-slot:cell(status)="data">
          <b class="text-info">{{data.value}}</b>
        </template>
      </b-table>
    </div>
  </span>
</template>

<script>
export default {
  name: "OrderHistory",
  data() {
    return {
      fields: [
        { key: "id", label: "Order Id" },
        { key: "fullName", label: "Receipient Name" },
        { key: "orderedDate", label: "Ordered Date" },
        { key: "GiftCardValue", label: "Gift Card Value" },
        { key: "commissionValue", label: "Comissions (5%)" },
        { key: "status", label: "Delivery Status" },
      ],
      mappedResult: [],
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type != "row") return;
      if (item.status == "Delivered") return "table-success";
    },
  },
  computed: {},
  mounted() {
    this.$http
      .get(
        "http://localhost:3000/orders?userId=" +
          this.$store.getters.getLoggedInUserId)
      .then((res) => {
        this.mappedResult = res.data;
        this.mappedResult.forEach(function (e) {
          e.fullName = e.FirstName + " " + e.LastName;
          e.commissionValue = e.GiftCardValue * 0.05;
        });
      });
    this.$nextTick(function () {});
  },
};
</script>