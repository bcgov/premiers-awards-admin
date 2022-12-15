<template>
  <div class="navbar-fixed">
    <Menubar :model="items">
      <template #start>
        <img alt="logo" :src="logoSrc" height="60" class="mr-2">
      </template>
      <template #end>
        <Button class="mr-4" label="Profile" icon="pi pi-user" @click="toggleProfile" />
      </template>
    </Menubar>
  </div>
    <Sidebar v-model:visible="isProfileVisible">
      <div class="flex mb-4">
        <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
        <div class="col-6"><h3>{{current.username}}</h3></div>
      </div>
      <div class="grid">
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
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import logoSrc from '@/assets/BCID_H_rgb_pos.png';
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";

// get current user
const { current, error, isAdmin, isSuperAdmin, isNominator } = storeToRefs(authDataStore());

// toggle profile sidebar
const isProfileVisible = ref(false);
const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value;
}

// init menu items
const menuItems = [
    {
      label: isAdmin ? 'Premiers Awards: Admin' : 'Premiers Awards: Nominate',
      icon:'pi pi-fw pi-home',
      class: 'font-bold',
      url: isAdmin ? import.meta.env['BASE_URL'] : import.meta.env['BASE_URL'] + 'nominate'
    },
    {
      label:'About',
      icon:'pi pi-fw pi-external-link',
      url: 'https://premiersawards.gww.gov.bc.ca'
    }
];

// add admin menu items
if (isAdmin) {
  menuItems.push({
    label:'Users',
    icon:'pi pi-fw pi-users',
    url: import.meta.env['BASE_URL'] + 'users'
  });
}

// add super-admin menu items
if (isSuperAdmin) {
  menuItems.push({
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
    url: '#'
  });
}

// add nominator menu items
if (isNominator) {
  menuItems.push({
    label:'Nominations',
    icon:'pi pi-fw pi-bookmark',
    url: import.meta.env['BASE_URL'] + 'nominations'
  });
}

// handle menu scroll effects
const menuClass = ref('');
const onScroll = () => {
  menuClass.value = window.top.scrollY > 120
      ?  'navbar-fixed'
      : '';
}
onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
});

// set filtered menu items
const items = ref(menuItems);

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

</style>