<template>
  <div>
    <Header header="Premier's Awards: Administration" lead="" />
    <Card>
      <template #title>
        Manage Users
      </template>
      <template #content>
        Activate registered user accounts, modify user info and remove users.
      </template>
      <template #footer>
        <Button @click="()=>{navigate('users-list')}">Users Management</Button>
      </template>
    </Card>
    <Card>
      <template #title>
        Manage Nominations
      </template>
      <template #content>
        Modify submitted and draft nominations.
      </template>
      <template #footer>
        <Button @click="()=>{navigate('list-nominations')}">Nominations Management</Button>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
import {useRouter} from "vue-router/dist/vue-router";
const indexRouter = useRouter();

const navigate = (name) => {
  indexRouter.push({name: name});
}
</script>
