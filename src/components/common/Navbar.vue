<template>
  <div class="navbar-fixed">
    <Menubar :model="menu">
      <template #start>
        <img alt="Government of British Columbia" :src="logoSrc" height="60" class="mr-2">
      </template>
      <template #end>
        <Button class="mr-4" label="Profile" icon="pi pi-user" @click="toggleProfile" />
        <Button class="mr-4" label="Help" icon="pi pi-question-circle" @click="toggleHelp" />
      </template>
    </Menubar>
  </div>
    <Sidebar v-model:visible="isProfileVisible">
      <div class="flex mb-4">
        <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
        <div class="col-6"><h3>{{current.username}}</h3></div>
      </div>
      <div v-if="!isRegistered">You are not currently registered.</div>
      <div v-else class="grid">
        <div class="col-6"><b>Username (IDIR):</b></div>
        <div class="col-6">{{current.username}}</div>
        <div class="col-6"><b>First Name:</b></div>
        <div class="col-6">{{current.firstname}}</div>
        <div class="col-6"><b>Last Name:</b></div>
        <div class="col-6">{{current.lastname}}</div>
        <div class="col-6"><b>Roles:</b></div>
        <div class="col-6">
          <div v-for="role in current.roles">{{role}}</div>
        </div>
      </div>
    </Sidebar>
  <Sidebar class="p-sidebar-lg" position="bottom" v-model:visible="isHelpVisible">
    <Help />
  </Sidebar>
</template>

<script setup>
import {onBeforeMount, onMounted, onUnmounted, ref} from 'vue';
import logoSrc from '@/assets/BCID_H_rgb_pos.png';
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import Help from "@/components/common/Help.vue";

// get current user
const { current, error, isAdmin, isRegistered, isSuperAdmin, isNominator } = storeToRefs(authDataStore());

// toggle sidebars
const isProfileVisible = ref(false);
const isHelpVisible = ref(false);
const menu = ref([]);

// show/hide user profile
const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value;
}

// show/hide help panel
const toggleHelp = () => {
  isHelpVisible.value = !isHelpVisible.value;
}

// handle menu scroll effects
const menuClass = ref('');
const onScroll = () => {
  menuClass.value = window.top.scrollY > 120
      ?  'navbar-fixed'
      : '';
}

onBeforeMount(async() => {
  // initialize user
  const authStore = authDataStore();
  await authStore.currentUserInit();

  // add admin menu items

  menu.value.push({
    label: isAdmin.value ? 'Premiers Awards: Admin' : 'Premiers Awards: Nominate',
        icon:'pi pi-fw pi-home',
      class: 'font-bold',
      url: import.meta.env['BASE_URL']
  });

  menu.value.push({
    label:'About',
        icon:'pi pi-fw pi-external-link',
      url: 'https://premiersawards.gww.gov.bc.ca'
  });

  if (isAdmin.value) {
    menu.value.push({
      label:'Users',
      icon:'pi pi-fw pi-users',
      url: import.meta.env['BASE_URL'] + 'users'
    });
  }

  // add nominator menu items
  if (isNominator.value || isAdmin.value) {
    menu.value.push({
      label:'Nominations',
      icon:'pi pi-fw pi-bookmark',
      url: import.meta.env['BASE_URL'] + 'nominations'
    });
  }

  // add super-admin menu items
  if (isSuperAdmin.value) {
    menu.value.push({
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      url: import.meta.env['BASE_URL'] + 'settings'
    });
  }

});

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
});

</script>
<style>
.p-menubar {
  background-color: #DDD !important;
}
.navbar-fixed {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  z-index: 1100;
  width: 100%;
  height: auto;
}

@media screen and (max-width: 960px) {
  .navbar-fixed {
    overflow: visible;
  }
}

</style>