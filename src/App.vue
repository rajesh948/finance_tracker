<template>
  <headerComponent />
  <router-view></router-view>
</template>

<script lang="ts">
import headerComponent from "@/components/header/header-component.vue";
import { defineComponent } from "vue";
import "@/utils/helper/setDataIntoStore.helper.ts";
export default defineComponent({
  name: "App",
  components: {
    headerComponent,
  },
});
</script>
