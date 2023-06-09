<template>
  <div v-if="getTransactionList?.length">
    <div class="ma-10 flex-column justify-left aline-center">
      <v-chip
        color="primary"
        class="px-6 py-5 ma-5 text-h6 font-weight-black"
        label
      >
        Group By :
      </v-chip>
      <v-btn id="menu-activator" color="primary"> {{ selectedGroup }} </v-btn>

      <v-menu class="" activator="#menu-activator">
        <v-list>
          <v-list-item
            v-for="(item, index) in groupByItems"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="onPerformGroupBy(item)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <commonTableComponent
      :transactions="getTransactionList"
      v-if="!arrayOfGroupByTransactions"
    />
    <div v-else v-for="(value, key) in arrayOfGroupByTransactions" :key="key">
      <commonTableComponent :transactions="value" :title="key" />
      <v-divider :thickness="20" color="primary"></v-divider>
    </div>
  </div>
  <v-chip
    v-else
    class="d-flex justify-center text-h3 ma-16 pa-16 font-weight-black"
    variant="plain"
  >
    Transaction is Not Available
  </v-chip>
</template>

<script>
import commonTableComponent from "@/components/common/common-table-component";
import { mapGetters } from "vuex";

export default {
  components: {
    commonTableComponent,
  },
  data() {
    return {
      selectedGroup: "Select",
      groupByItems: [
        { title: "None", value: "none" },
        { title: "Month Year", value: "monthYear" },
        { title: "Transaction Type", value: "type" },
        { title: "From Account", value: "fromAccount" },
        { title: "To Account", value: "toAccount" },
      ],

      arrayOfGroupByTransactions: null,
    };
  },
  methods: {
    onPerformGroupBy(item) {
      if (item.value === "none") {
        this.selectedGroup = "select";
        return (this.arrayOfGroupByTransactions = null);
      }
      this.selectedGroup = item.title;
      const fieldObject = {};
      this.getTransactionList.forEach((transactionObj) => {
        Object.entries(transactionObj).forEach((field) => {
          if (field[0] === item.value) {
            if (!fieldObject[field[1]]) {
              fieldObject[field[1]] = [transactionObj];
            } else {
              fieldObject[field[1]].push(transactionObj);
            }
          }
        });
      });
      this.arrayOfGroupByTransactions = fieldObject;
    },
  },
  computed: {
    ...mapGetters("transaction", ["getTransactionList"]),
  },
};
</script>
