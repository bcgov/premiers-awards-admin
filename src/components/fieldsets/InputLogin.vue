<template>
  <div>

      <b-form @submit="submit" class="p-3">
        <b-form-group
          id="input-group-user-login-email"
          label="Email"
          label-for="input-user-login-email"
        >
          <b-form-input
            type="email"
            id="input-user-login-email"
            v-model="user.email"
            placeholder="Enter your email"
            :state="isEmail"
            required
          >
          </b-form-input>

          <b-form-invalid-feedback :state="isEmail">
            Enter a valid email
          </b-form-invalid-feedback>

        </b-form-group>

        <b-form-group
          id="input-group-user-login-password"
          label="Password"
          label-for="input-user-login-password"
        >
          <b-form-input
            type="password"
            id="input-user-login-password"
            v-model="user.password"
            placeholder="Enter your password"
            required
            autocomplete="current_password"
          >
          </b-form-input>

          <b-button class="m-2" type="submit" variant="primary">Sign In</b-button>

        </b-form-group>
        <b-alert v-if="message" show :variant="error ? 'danger' : 'success'">{{message}}</b-alert>

      </b-form>

  </div>
</template>

<script>

import {genID, validateEmail} from '@/services/validation.services'

const id = genID();

export default {
  name: "login-input",
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      id: id,
      error: false,
      message: ''
    }
  },
  computed: {
    isEmail () {
      return validateEmail(this.user.email)
    }
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      try {
        const response = await this.$store.dispatch('login', this.user);
        this.error = false
        this.message = 'Successfully logged in!'
      } catch (err) {
        console.error(err);
        this.error = true
        this.message = 'Your login credentials are not valid.'
      }
    }
  }
};
</script>

