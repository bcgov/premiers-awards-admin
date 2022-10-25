<template>
  <div>
      <b-table
        stacked
        :items="[user]"
        :fields="['username', 'role', 'firstname', 'lastname', 'email']"
        >
      </b-table>
  </div>
</template>

<script>

export default {
  name: "user-profile",
  components: {},
  computed : {
    user () {
      return this.$store.getters.getUser
    }
  }
};
</script>

