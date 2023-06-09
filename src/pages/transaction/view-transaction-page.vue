<template>
  <v-sheet
    v-if="transaction"
    :elevation="5"
    border
    rounded
    class="ma-10 py-5 d-flex justify-space-around"
  >
    <v-table class="w-75">
      <thead class="text-left text-h4">
        <tr>
          <th>Field</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody class="text-h6">
        <tr>
          <td>Transaction Date</td>
          <td>{{ transaction.date }}</td>
        </tr>
        <tr>
          <td>Month Year</td>
          <td>{{ transaction.monthYear }}</td>
        </tr>
        <tr>
          <td>Transaction Type</td>
          <td>{{ transaction.type }}</td>
        </tr>
        <tr>
          <td>From Account</td>
          <td>{{ transaction.fromAccount }}</td>
        </tr>
        <tr>
          <td>To Account</td>
          <td>{{ transaction.toAccount }}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>{{ transaction.amount }}</td>
        </tr>
        <tr>
          <td>Receipt</td>
          <td>
            <v-img
              :width="200"
              aspect-ratio="16/9"
              cover
              :src="transaction.receipt"
            ></v-img>
          </td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>{{ transaction.notes }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-btn
      class="me-4"
      color="red"
      @click="onDeleteTransaction(transaction.id)"
    >
      Delete Transaction
    </v-btn>
  </v-sheet>
  <v-chip
    v-else
    class="d-flex justify-center text-h3 ma-16 pa-16 font-weight-black"
    variant="plain"
  >
    Transaction is Not Available
  </v-chip>
</template>
<script>
import { deleteTransaction } from "@/services";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("transaction", ["deleteTransactionList"]),
    onDeleteTransaction(transactionId) {
      deleteTransaction(parseInt(transactionId));
      this.deleteTransactionList(parseInt(transactionId));
      this.$router.push({ name: "viewAllTransactions" });
    },
  },
  computed: {
    ...mapGetters("transaction", ["getTransactionList"]),
    transaction() {
      return this.getTransactionList?.find(
        (transaction) => +transaction.id === +this.$route.params.transactionId
      );
    },
  },
};
</script>
