<template>
  <v-card>
    <v-chip
      color="#FB8C00"
      class="px-6 py-5 ma-5 text-h6 font-weight-black"
      label
    >
      {{ title }}
    </v-chip>
    <v-card-title>
      <v-text-field
        v-model="searchValue"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        @input="searchingInTransaction"
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-table class="text-center">
      <thead>
        <tr>
          <th v-for="item in tableHeadItems" :key="item.id">
            <v-chip :prepend-icon="item.icon" variant="text">
              {{ item.name }}
              <v-btn
                v-if="item.value"
                icon="mdi-sort"
                @click="onSortTransactionField(item.value)"
                variant="text"
              >
              </v-btn>
            </v-chip>
          </th>
        </tr>
      </thead>

      <tbody v-if="transactionData[0]">
        <tr v-for="transaction in transactionData" :key="transaction.id">
          <td>{{ getDateFormat(transaction.date) }}</td>
          <td>
            <v-chip :color="getColor(transaction.monthYear)" label>
              {{ transaction.monthYear }}
            </v-chip>
          </td>
          <td>
            <v-chip :color="getColor(transaction.type)" label>
              {{ transaction.type }}
            </v-chip>
          </td>
          <td>
            <v-chip :color="getColor(transaction.fromAccount)" label>
              {{ transaction.fromAccount }}
            </v-chip>
          </td>
          <td>
            <v-chip :color="getColor(transaction.toAccount)" label>
              {{ transaction.toAccount }}
            </v-chip>
          </td>
          <td>
            {{ getRupeeFormat(transaction.amount) }}
          </td>
          <td>
            <v-img
              :width="100"
              aspect-ratio="16/9"
              cover
              :src="transaction.receipt"
            ></v-img>
          </td>
          <td>{{ transaction.notes }}</td>
          <td>
            <v-btn
              prepend-icon="mdi-eye"
              @click="onGoToViewPage(transaction.id)"
            >
              View
            </v-btn>
            <v-btn
              prepend-icon="mdi-eye"
              @click="onGoToEditPage(transaction.id)"
            >
              Edit
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="transactionData[0]">
      <v-chip class="ma-5 font-weight-black" label> Pages : </v-chip>
      <v-btn :id="uniqueId" color="primary">
        {{ selectedRecordsNumber }}
      </v-btn>
      <v-menu class="" :activator="'#' + uniqueId">
        <v-list>
          <v-list-item
            v-for="(item, index) in displayNumberOfRecords"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="onPerformPagination(item)">{{
              item
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-pagination
        v-model="selectedPage"
        :length="numberOfPages"
        rounded="circle"
      ></v-pagination>
    </div>
    <v-chip
      v-else
      class="d-flex justify-center text-h3 ma-16 pa-16 font-weight-black"
      variant="plain"
    >
      No Filter Results.
    </v-chip>
  </v-card>
</template>
<script>
import {
  getColor,
  getRupeeFormat,
  getDateFormat,
} from "@/utils/helper/transaction.helper";
export default {
  props: {
    transactions: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "All Transaction List",
    },
  },

  data() {
    return {
      sortOrder: "descending",
      sortField: null,
      transactionsList: this.transactions,
      selectedPage: 1,
      selectedRecordsNumber: null,
      numberOfPages: null,
      displayNumberOfRecords: [1, 2, 3, 5, 10],

      tableHeadItems: [
        {
          id: 1,
          name: "Transaction Date",
          value: "date",
          icon: "mdi-calendar-range",
        },
        { id: 2, name: "Month Year", value: "monthYear", icon: "mdi-domain" },
        { id: 3, name: "Transaction Type", value: "type", icon: "mdi-adjust" },
        {
          id: 4,
          name: "From Account",
          value: "fromAccount",
          icon: "mdi-cash-multiple",
        },
        {
          id: 5,
          name: "To Account",
          value: "toAccount",
          icon: "mdi-cash-multiple",
        },
        { id: 6, name: "Amount", value: "amount", icon: "mdi-currency-usd" },
        { id: 7, name: "Receipt", value: "", icon: "mdi-receipt" },
        { id: 8, name: "Notes", value: "notes", icon: "mdi-note-check" },
        { id: 9, name: "Action", value: "", icon: "mdi-gesture-double-tap" },
      ],
      searchValue: "",
    };
  },
  created() {
    this.selectedRecordsNumber =
      this.transactions.length > 3 ? 3 : this.transactions.length;
    this.numberOfPages = Math.ceil(
      this.transactions.length / this.selectedRecordsNumber
    );
  },
  methods: {
    getColor,
    getDateFormat,
    getRupeeFormat,
    onGoToViewPage(transactionId) {
      this.$router.push({
        name: "viewTransaction",
        params: { transactionId: transactionId },
      });
    },
    onGoToEditPage(transactionId) {
      this.$router.push({
        name: "editTransaction",
        params: { transactionId: transactionId },
      });
    },
    onSortTransactionField(fieldName) {
      if (this.sortField != fieldName) {
        this.sortOrder = "descending";
        this.sortField = fieldName;
      }
      if (this.sortOrder === "ascending") {
        this.sortOrder = "descending";
        this.transactionsList = this.sortingInTwoWay(
          this.transactionsList,
          fieldName,
          "descending"
        );
      } else if (this.sortOrder === "descending") {
        this.sortOrder = "ascending";
        this.transactionsList = this.sortingInTwoWay(
          this.transactionsList,
          fieldName,
          "ascending"
        );
      }
    },

    sortingInTwoWay(transactionsList, fieldName, mode) {
      transactionsList.sort((a, b) => {
        if (fieldName === "amount") {
          a = parseInt(a[fieldName]);
          b = parseInt(b[fieldName]);
        } else if (fieldName === "date" || fieldName === "monthYear") {
          a = +new Date(a[fieldName]);
          b = +new Date(b[fieldName]);
        } else {
          a = a[fieldName].trim();
          b = b[fieldName].trim();
        }

        if (mode === "ascending") {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        } else if (mode === "descending") {
          if (b > a) {
            return 1;
          }
          if (b < a) {
            return -1;
          }
          return 0;
        }
      });
      return transactionsList;
    },
    searchingInTransaction() {
      this.transactionsList = this.transactions.filter((data) => {
        const transactionValue = Object.values(data);
        transactionValue.splice(7, 1);
        return transactionValue.some((val) =>
          String(val).toLowerCase().includes(this.searchValue.toLowerCase())
        );
      });
    },
    onPerformPagination(numberOfRecords) {
      this.selectedRecordsNumber = numberOfRecords;
      this.selectedPage = 1;
      this.numberOfPages = Math.ceil(
        this.transactions.length / numberOfRecords
      );
    },
  },
  computed: {
    transactionData() {
      return this.transactionsList.slice(
        (this.selectedPage - 1) * this.selectedRecordsNumber,
        (this.selectedPage - 1) * this.selectedRecordsNumber +
          this.selectedRecordsNumber
      );
    },
    uniqueId() {
      return this.title.replaceAll(" ", "");
    },
  },
};
</script>

<style scoped>
.sort {
  cursor: pointer;
}
</style>
