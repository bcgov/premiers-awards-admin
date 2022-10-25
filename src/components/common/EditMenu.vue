<template>
  <div>
    <b-button
      v-if="show.includes('view')"
      size="sm"
      class="m-1"
      @click="reroute(`/view/${id}`)"
    >
      View
    </b-button>
    <b-button
      v-if="show.includes('edit')"
      size="sm"
      :disabled="disabled"
      class="m-1"
      @click="reroute(`/edit/${settings.year}/${category}/${id}`)"
    >
      Edit
    </b-button>
    <b-button
      v-if="show.includes('delete')"
      size="sm"
      :disabled="disabled"
      class="m-1"
      @click="reroute(`/delete/${id}`)"
    >
      Delete
    </b-button>
  </div>
</template>
<script>

export default {
  name: "global-message",
  props: {
    id: String,
    disabled: Boolean,
    category: String,
    show: Array
  },
  computed : {
    nomination () {
      return this.$store.getters.getNomination
    },
    settings () {
      return this.$store.getters.getSettings
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    async reroute(uri) {
      await this.$router.push(uri)
    },
  }
};
</script>
