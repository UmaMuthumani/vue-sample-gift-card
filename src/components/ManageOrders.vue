<template>
  <span>
    <div>
      <navhead></navhead>
    </div>
    <div class="overflow-auto">
      <b-table ref="my-table" sticky-header="600px" responsive hover :items="mappedResult" :fields="fields" :tbody-tr-class="rowClass">
        <template v-slot:cell(id)="data">
          <b class="text-info">{{"GF"+ data.value}}</b>
        </template>
        <template v-slot:cell(status)="data">
          <b class="text-info">{{data.value}}</b>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1" type="button">
            Mark as Delivered
          </b-button>
        </template>

        <template v-slot:custom-foot>
          <b-tr>
            <b-td colspan=4 class="text-right"><b> Total Commission</b></b-td>
            <b-td colspan=5><b> {{summaryTotal}}</b></b-td>
          </b-tr>
        </template>
      </b-table>
    </div>
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
        { key: "commissionValue", label: "Commissions (5%)" },
        { key: "status", label: "Delivery Status" },
        { key: "actions", label: "Action" },
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
    info(item, index, eventTarget) {
      let selectedOrderId = 0;
      selectedOrderId = item.id;
      console.log(eventTarget);
      console.log(eventTarget.data);
      this.$http
        .patch("http://localhost:3000/orders/" + selectedOrderId, {
          status: "Delivered",
        })
        .then(
          (res) => {
            console.log(`Row index: ${index}`);
            console.log("successfully updated" + res.status);
            //this.$emit("update-record", item);
            this.bindResult();
          },
          (err) => {
            console.log(err);
          }
        );
    },
    bindResult: function () {
      let total = 0;
      this.$http
        .get("http://localhost:3000/orders?status_ne=Delivered")
        .then((res) => {
          this.mappedResult = res.data;
          this.mappedResult.forEach(function (e) {
            e.fullName = e.FirstName + " " + e.LastName;
            e.commissionValue = e.GiftCardValue * 0.05;
            total = total + e.commissionValue;
          });
          this.summaryTotal = total;
        });
    },
    // updateRecord(e) {

    //   console.log(e.info);
    // },
  },
  computed: {},
  mounted() {
    this.bindResult();
  },
  updated() {},
};
</script>