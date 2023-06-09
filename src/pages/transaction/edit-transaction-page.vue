<template>
  <commonFormComponent
    v-if="transaction"
    :transactionData="transaction"
    mode="Edit"
  />
  <v-chip
    v-else
    class="d-flex justify-center text-h3 ma-16 pa-16 font-weight-black"
    variant="plain"
  >
    Transaction is Not Available
  </v-chip>
</template>

<script>
import commonFormComponent from "@/components/common/common-form-component";
import { mapGetters } from "vuex";
export default {
  components: {
    commonFormComponent,
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
