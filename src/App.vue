<template>
  <header>
    <Navbar />
  </header>
  <main>
    <Toast position="bottom-right" />
    <Message
      :closable="false"
      v-if="notification.message"
      :severity="notification.severity"
    >
      {{ notification.message }}
    </Message>
    <RouterView />
  </main>
  <div
    v-if="nodeENV === 'development' || isDevSite"
    className="testing-banner w-screen bg-orange-500 fixed top-0 m-0 text-center"
  >
    Test Environment
  </div>
</template>

<script setup>
import Navbar from "@/components/common/Navbar.vue";
import { settingsStore } from "@/stores/settings.store";
import { onBeforeMount, ref } from "vue";
import { authDataStore } from "@/stores/auth.store";
import messages from "@/services/message.services";
import { storeToRefs } from "pinia/dist/pinia";

// initialization
const { current } = storeToRefs(authDataStore());
const notification = ref({ severity: "", message: "" });

// check environment
const nodeENV = process.env.NODE_ENV;

// Check if the URL contains the dev site url
const currentUrl = window.location.href;
const isDevSite =
  currentUrl.includes(
    "https://pa-test-4015f5-test.apps.silver.devops.gov.bc.ca/nominations/"
  ) || currentUrl.includes("localhost");

// load user data
onBeforeMount(async () => {
  const settings = settingsStore();
  await settings.getAll();
  // subscribe to auth store actions
  const authStore = authDataStore();
  authStore.$onAction(({ name, store, _, after }) => {
    after(() => {
      // post message
      const { text = "" } = messages.get(name) || {};
      if (store.getErrors) {
        notification.value = {
          severity: "error",
          message: text || store.getErrors.text,
        };
      }
    });
  });
  // initialize current user
  authStore.currentUserInit();
});
</script>

<style>
@import "primevue/resources/primevue.min.css";
@import "primevue/resources/themes/mdc-light-indigo/theme.css";
@import "primeicons/primeicons.css";
@import "/node_modules/primeflex/primeflex.css";
</style>

<style lang="scss">
@import "@/assets/_theme.scss";
.testing-banner {
  z-index: 9999;
}
</style>
