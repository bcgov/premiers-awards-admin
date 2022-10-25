<template>
  <div>

    <b-alert show v-if="user && isRegistered" variant="info">
      <p v-if="user.role === 'inactive'">
        Your registration is currently under review. Please check back regularly for updates.
      </p>
      <p v-else>
        You are currently registered as a(n) <b>{{user.role}}</b>.
      </p>
    </b-alert>

    <b-form v-if="user && !isRegistered">
      <b-card bg-variant="light" class="mb-3">
        <b-form-group
          id="fieldset-user-register-username"
          label="Username"
          label-for="input-user-register-username"
        >
          <b-form-input
            id="input-user-register-username"
            :disabled="true"
            :value="user.username"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-user-register-firstname"
          label="First Name"
          label-for="input-user-register-firstname"
        >
          <b-form-input
            id="input-user-register-firstname"
            v-model="user.firstname"
            placeholder="Enter user's given name"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-user-register-lastname"
          label="Last Name"
          label-for="input-user-register-lastname"
        >
          <b-form-input
            id="input-user-register-lastname"
            v-model="user.lastname"
            placeholder="Enter user's last name"
          />
        </b-form-group>

        <b-form-group
          id="input-group-user-register-email"
          label="Email"
          label-for="input-user-register-email"
        >
          <b-form-input
            type="email"
            id="input-user-register-email"
            v-model="user.email"
            placeholder="Enter user's email"
          >
          </b-form-input>

          <b-form-invalid-feedback :state="!user.email || isEmail">
            Enter a valid email
          </b-form-invalid-feedback>

        </b-form-group>

        <b-form-group
          id="input-group-user-register-submit"
          label-for="input-user-register-submit"
        >
          <b-button
            v-if="mode==='edit'"
            @click="update"
            :disabled="!validation"
            class="m-2"
            type="button"
            variant="info">Update</b-button>
          <b-button
            v-else
            @click="register"
            :disabled="!validation"
            class="m-2"
            type="button"
            variant="info">Register</b-button>
          <b-button
            v-if="mode==='edit'"
            class="m-2"
            type="button"
            @click="reroute('/admin/user/list')"
          >Return to Manage Users</b-button>
        </b-form-group>
      </b-card>
    </b-form>
    <b-navbar fixed="bottom" align="right">
      <b-alert
        v-if="message.text"
        show="5"
        fade
        dismissible
        :variant="message.type"
        @dismissed="message={text:'', type:''}"
      >
        {{message.text}}
      </b-alert>
    </b-navbar>
  </div>
</template>

<script>

import {validateEmail} from '@/services/validation.services'
import api from '@/services/api.services';

export default {
  name: "user-input",
  data () {
    return {
      user: null,
      error: false,
      message: ''
    }
  },
  computed: {
    mode () {
      return this.$route.name === 'admin-user-edit' ? 'edit' : 'register'
    },
    isEmail () {
      return validateEmail(this.user.email)
    },
    validation () {
      return !!this.user.guid && !!this.user.username
    },
    isRegistered() {
      const currentUser = this.$store.getters.getUser;
      return this.mode === 'register' && !!currentUser.role;
    }
  },
  methods: {
    async reroute(uri) {
      await this.$router.push(uri)
    },
    async register () {
      try {
        await this.$store.dispatch("setMessage", {
          text: 'Registering user...',
          type: 'info',
          spinner: true
        })
        // handle data submission
        const response = await api.post(`users/register`, this.user)
        const {data=null} = response || {}
        this.user = data || this.user
        await this.$store.dispatch("setMessage", {
          text: 'Successfully registered user!',
          type: 'success'
        })

      } catch (err) {
        console.error(err);
        await this.$store.dispatch('handleError',
          {text: 'User could not be registered.', type: 'danger'}
        )
      }
    },
    async update () {
      try {
        await this.$store.dispatch("setMessage", {
          text: 'Updating user data...',
          type: 'info',
          spinner: true
        })
        // handle data submission
        await api.post(`users/update/${this.user.guid}`, this.user)
        await this.$store.dispatch("setMessage", {
          text: 'Successfully updated user data!',
          type: 'success'
        })

      } catch (err) {
        console.error(err);
        await this.$store.dispatch('handleError',
          {text: 'User data could not be updated.', type: 'danger'}
        )
      }
    }
  },
  async beforeCreate() {
    try {
      await this.$store.dispatch('setMessage',
        {text: 'Loading user data...', type: 'info', spinner: true})
      if (this.$route.name === 'admin-user-edit' && this.$route.params.guid) {
        // load requested user data
        this.user = await this.$store.dispatch('getUserById', this.$route.params.guid)
      } else {
        await this.$store.dispatch('login')
        this.user = await this.$store.getters.getUser
      }
      await this.$store.dispatch('resetMessage')
    }
    catch (err) {
      console.error(err)
      await this.$store.dispatch('handleError',
        {text: 'User data failed to load.', type: 'danger'}
      )
    }
  }
};
</script>
