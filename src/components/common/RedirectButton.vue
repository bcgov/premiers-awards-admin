<template>
  <div>
    <b-container v-if="show" style="height: 200px">
      <b-row class="h-100 text-center" align-v="center">
        <b-col>
          <b-button
            class="m-2"
            type="button"
            @click="reroute(uri)"
          >{{label}}</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

export default {
  name: "redirect-button",
  props: {
    show: Boolean,
    label: String,
    uri: String
  },
  methods: {
    async reroute(uri) {
      await this.$router.push(uri)
    }
  }
};
</script>
