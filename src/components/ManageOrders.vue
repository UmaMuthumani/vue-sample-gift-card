<template>
  <span>
    <div>
      <navhead></navhead>
    </div>
    <div>
      <b-table responsive hover :items="mappedResult" :fields="fields" 
      :tbody-tr-class="rowClass">
        <template v-slot:cell(status)="data">
          <b class="text-info">{{data.value}}</b>
        </template>
        <template v-slot:custom-foot>
          <b-tr>
            <b-td colspan=4 class="text-right"><b> Total Commission</b></b-td>
            <b-td colspan=5><b> {{summaryTotal}}</b></b-td>
          </b-tr>
        </template>
      </b-table>
  </span>
</template>

<script>
export default {
  name: "ManagerOrders",
  data() {
    return {
      fields: [
        { key: "id", label: "Order Id" },
        { key: "fullName", label: "Receipient Name" },
        { key: "orderedDate", label: "Ordered Date" },
        { key: "GiftCardValue", label: "Gift Card Value" },
        { key: "comissionValue", label: "Comissions (5%)" },
        { key: "status", label: "Delivery Status" },
      ],
      mappedResult: [],
      summaryTotal: 0,
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
    let total = 0;
    this.$http
      .get("http://localhost:3000/orders?status_ne=Delivered")
      .then((res) => {
        this.mappedResult = res.data;
        this.mappedResult.forEach(function (e) {
          e.fullName = e.firstName + " " + e.LastName;
          e.commissionValue = e.GiftCardValue * 0.05;
          total = total + e.comissionValue;
        });
        this.summaryTotal = total;
      });
    this.$nextTick(function () {});
  },
};
</script>