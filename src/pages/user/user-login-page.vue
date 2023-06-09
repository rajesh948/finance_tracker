<template>
  <div class="title">Login</div>

  <div class="my-5 d-flex justify-center">
    <v-form ref="form" class="w-50" lazy-validation>
      <v-alert
        v-if="errorMessage"
        closable
        :text="errorMessage"
        class="ma-10"
        type="error"
        variant="tonal"
      ></v-alert>
      <v-text-field
        v-model="user.email"
        :rules="validationRules.email"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :counter="8"
        :append-icon="showIcon"
        :type="showPassword"
        @click:append="onDisplayPassword"
        :rules="validationRules.password"
        label="Password"
      ></v-text-field>

      <v-btn class="me-4" @click="onSubmitForm"> submit </v-btn>
      <v-btn class="me-4" @click="onGoToRegisterPage">
        Create New Account</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { validationSchema } from "@/utils/validation/formValidation";
import { userLogin, fetchUserTransaction } from "@/services/";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMessage: null,
      validationRules: { ...validationSchema },
      showPass: false,
    };
  },
  methods: {
    ...mapActions("user", ["addLoginUserData"]),
    ...mapActions("transaction", ["addTransactionList"]),
    async onSubmitForm() {
      const form = await this.$refs.form.validate();

      if (form.valid) {
        const loginUserData = userLogin(this.user);
        if (loginUserData) {
          this.addLoginUserData(loginUserData);
          this.addTransactionList(fetchUserTransaction(loginUserData.id));

          localStorage.setItem(
            "token",
            "3r8wb7frfb347rfb34rfb3749brf9378rfb023tf23"
          );
          this.$router.push({ name: "viewAllTransactions" });
        } else {
          this.errorMessage = "invalid email or password !!";
        }
      }
    },
    onDisplayPassword() {
      this.showPass = !this.showPass;
    },
    onGoToRegisterPage() {
      this.$router.push({ name: "register" });
    },
  },
  computed: {
    showIcon() {
      return this.showPass ? "mdi-eye" : "mdi-eye-off";
    },
    showPassword() {
      return this.showPass ? "text" : "password";
    },
  },
};
</script>
