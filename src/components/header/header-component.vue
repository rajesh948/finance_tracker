<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title class="head font-weight-black text-h4"
        >Finance Tracker</v-toolbar-title
      >
      <v-card color="green  px-5 text-h6 ">
        {{ getLoginUserData?.name }}
      </v-card>
      <div class="px-10">
        <v-switch
          @click="toggleTheme"
          v-model="modelSwitch"
          hide-details
          inset
        ></v-switch>
      </div>

      <template v-slot:extension>
        <div>
          <router-link :to="{ name: 'viewAllTransactions' }"
            ><v-tab>View All</v-tab></router-link
          >
          <router-link :to="{ name: 'addTransaction' }"
            ><v-tab>Add Transaction</v-tab></router-link
          >
          <router-link v-if="!getLoginUserData" :to="{ name: 'register' }"
            ><v-tab>Registration</v-tab></router-link
          >
          <router-link v-if="!getLoginUserData" :to="{ name: 'login' }"
            ><v-tab>Login</v-tab></router-link
          >
          <v-tab v-if="getLoginUserData" @click="onLogout">Logout</v-tab>
        </div>
      </template>
    </v-toolbar>
  </v-card>
</template>
<script>
import { logoutUser } from "@/services";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      modelSwitch: true,
    };
  },
  methods: {
    ...mapActions("user", ["addLoginUserData"]),
    ...mapActions("transaction", ["addTransactionList"]),
    onLogout() {
      this.addLoginUserData(null);
      this.addTransactionList(null);

      localStorage.removeItem("token");
      logoutUser();

      this.$router.push({ name: "login" });
    },
    toggleTheme() {
      this.modelSwitch = !this.modelSwitch;
      this.$vuetify.theme.global.name = this.$vuetify.theme.global.current.dark
        ? "light"
        : "dark";
    },
  },
  computed: {
    ...mapGetters("user", ["getLoginUserData"]),
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
}
</style>
