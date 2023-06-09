<template>
  <div class="title">{{ mode }} Transaction</div>
  <div class="my-10 d-flex justify-center">
    <v-form class="w-50" ref="form" lazy-validation>
      <v-text-field
        v-model="transaction.date"
        type="date"
        label="Transaction Date"
        :rules="validationRules.isRequired"
      ></v-text-field>

      <v-select
        v-model="transaction.monthYear"
        :items="monthYearList"
        :rules="validationRules.isRequired"
        label="Select Month Year"
      ></v-select>
      <v-select
        v-model="transaction.type"
        :items="transactionTypeList"
        :rules="validationRules.isRequired"
        label="Transaction Type"
      ></v-select>
      <v-select
        v-model="transaction.fromAccount"
        :items="accountList"
        :rules="accountRules"
        label="From Account"
      ></v-select>
      <v-select
        v-model="transaction.toAccount"
        :items="accountList"
        :rules="accountRules"
        label="To Account"
      ></v-select>
      <v-text-field
        v-model="transaction.amount"
        :rules="validationRules.amount"
        label="Amount"
      ></v-text-field>
      <v-card class="mx-auto" max-width="344" v-if="isShowImage">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close-circle" @click="closeImage"></v-btn>
        </v-card-actions>
        <v-img :src="transaction.receipt" height="200px" cover></v-img>
      </v-card>
      <v-file-input
        v-else
        :rules="validationRules.image"
        accept=".png ,.jpg,.jpeg"
        label="Receipt"
        showSize
        @change="convertImgToDataUrl"
      ></v-file-input>
      <v-textarea
        label="Notes"
        :rules="validationRules.note"
        v-model="transaction.notes"
      ></v-textarea>
      <v-btn class="me-4" @click="submitAction"> {{ mode }} Transaction </v-btn>
    </v-form>
  </div>
</template>

<script>
import { addTransaction, editTransaction } from "@/services/";
import { validationSchema } from "@/utils/validation/formValidation";
import { mapActions } from "vuex";
export default {
  props: {
    transactionData: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
    },
  },
  data() {
    return {
      showImage: false,
      validationRules: { ...validationSchema },
      accountRules: [(value) => this.accountValidation(value)],
      transaction: this.transactionData,
      monthYearList: [
        "Jan 2023",
        "Feb 2023",
        "Mar 2023",
        "Apr 2023",
        "May 2023",
        "Jun 2023",
        "Jul 2023",
        "Aug 2023",
        "Sep 2023",
        "Oct 2023",
        "Nov 2023",
        "Dec 2023",
      ],
      transactionTypeList: ["Home Expense", "Personal Expense", "Income"],
      accountList: [
        "Personal Account",
        "Real Living",
        "My Dream Home",
        "Full Circle",
        "Core Realtors",
        "Big Block",
      ],
    };
  },

  methods: {
    ...mapActions("transaction", [
      "addTransactionList",
      "updateTransactionList",
    ]),
    accountValidation(value) {
      if (!value) {
        return "please select  account";
      }
      if (this.transaction.toAccount === this.transaction.fromAccount) {
        return "Please Choose Different option";
      }
      return true;
    },
    async onSubmitAddTransaction() {
      const form = await this.$refs.form.validate();

      if (form.valid) {
        addTransaction(JSON.parse(JSON.stringify(this.transaction)));
        this.addTransactionList(JSON.parse(JSON.stringify(this.transaction)));
        this.$router.push({ name: "viewAllTransactions" });
      }
    },
    async onSubmitEditTransaction() {
      const form = await this.$refs.form.validate();

      if (form.valid) {
        editTransaction(JSON.parse(JSON.stringify(this.transaction)));
        this.updateTransactionList(
          JSON.parse(JSON.stringify(this.transaction))
        );
        this.$router.push({ name: "viewAllTransactions" });
      }
    },
    convertImgToDataUrl(event) {
      const image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", () => {
        this.transaction.receipt = reader.result;
      });
    },
    closeImage() {
      this.showImage = true;
    },
  },
  computed: {
    submitAction() {
      return this.mode === "Edit"
        ? this.onSubmitEditTransaction
        : this.onSubmitAddTransaction;
    },
    isShowImage() {
      return this.mode === "Edit" && !this.showImage;
    },
  },
};
</script>
