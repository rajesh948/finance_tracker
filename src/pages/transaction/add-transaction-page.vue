<template>
  <commonFormComponent :transactionData="transaction" mode="Add" />
</template>

<script>
import commonFormComponent from "@/components/common/common-form-component";
import { mapGetters } from "vuex";

export default {
  components: {
    commonFormComponent,
  },
  data() {
    return {
      transaction: {
        id: Date.now(),
        userId: null,
        date: null,
        monthYear: null,
        type: null,
        fromAccount: null,
        toAccount: null,
        amount: null,
        receipt: null,
        notes: null,
      },
    };
  },
  created() {
    this.transaction.userId = this.getLoginUserData.id;
  },
  computed: {
    ...mapGetters("user", ["getLoginUserData"]),
  },
};
</script>
