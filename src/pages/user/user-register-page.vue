<template>
  <div class="title">Register</div>
  <div class="my-5 d-flex justify-center">
    <v-form ref="form" class="w-50" lazy-validation>
      <v-text-field
        v-model="user.name"
        :rules="validationRules.name"
        label="Name"
      ></v-text-field>

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
      <v-btn class="me-4" @click="onGoToLogin">
        Already have an account ?</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { validationSchema } from "@/utils/validation/formValidation";
import { userRegistration } from "@/services/";
export default {
  data() {
    return {
      user: {
        id: Date.now(),
        name: "",
        password: "",
        email: "",
        active: "false",
      },
      showPass: false,
      validationRules: validationSchema,
    };
  },
  methods: {
    async onSubmitForm() {
      const form = await this.$refs.form.validate();

      if (form.valid) {
        userRegistration(this.user);
        this.$router.push({ name: "login" });
      }
    },
    onDisplayPassword() {
      this.showPass = !this.showPass;
    },
    onGoToLogin() {
      this.$router.push({ name: "login" });
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
