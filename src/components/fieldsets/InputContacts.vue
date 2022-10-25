<template>
  <div>


    <!-- Nomination Contacts -->
    <b-card bg-variant="light" class="mb-3">
      <b-form-group
        :id="`fieldset-contacts-primary`"
        label="Nomination Contact"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-2"
      >
        <slot name="overview">
        <p>The nomination contact will be responsible for providing/confirming information that is relevant to the nomination. This may include confirming partner organizations, providing correct titles, checking spelling and providing pictures. The nomination contact should be someone who has been directly involved in the nomination.</p>
        </slot>

        <b-form-group
          id="fieldset-nominator-primary-firstname"
          label="First Name"
          label-for="input-nominator-primary-firstname"
        >
          <b-form-input
            id="input-nominator-primary-firstname"
            v-model="contacts.primary.firstname"
            placeholder="Enter the given name of the nominator"
            :state="validate('primary', 'firstname')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('primary', 'firstname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('primary', 'firstname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="fieldset-nominator-primary-lastname"
          label="Last Name"
          label-for="input-nominator-primary-lastname"
        >
          <b-form-input
            id="input-nominator-primary-lastname"
            v-model="contacts.primary.lastname"
            placeholder="Enter the last name of the nominator"
            :state="validate('primary', 'lastname')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('primary', 'lastname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('primary', 'lastname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="fieldset-nominator-primary-email"
          label="Email"
          label-for="input-nominator-primary-email"
          description=""
        >
          <b-form-input
            type="email"
            id="input-nominator-primary-email"
            v-model="contacts.primary.email"
            placeholder="Enter the email address of the nominator"
            :state="validate('primary', 'email')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('primary', 'email')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('primary', 'email')">
            Valid email address.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="fieldset-nominator-primary-phone"
          label="Phone"
          label-for="input-nominator-primary-phone"
        >
          <b-form-input
            id="input-nominator-primary-phone"
            v-model="contacts.primary.phone"
            placeholder="###-###-####"
            :state="validate('primary', 'phone')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('primary', 'phone')">
            Enter a valid phone number.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('primary', 'phone')">
            Valid phone number.
          </b-form-valid-feedback>
        </b-form-group>

      </b-form-group>
    </b-card>

    <!-- Video Contact -->
    <b-card bg-variant="light" class="mb-3">
      <b-form-group
        :id="`fieldset-nominators-video`"
        label="Video Contact"
        description=""
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-2"
      >
        <slot name="video-contact">
          <p>The video contact acts as the nomination liaison and will work directly with the Premier’s Awards video production team to confirm interviewees, filming locations, and assist with the coordination of supporting video footage and materials.</p>
        </slot>
        <b-form-group
          id="fieldset-nominator-video-firstname"
          label="First Name"
          label-for="input-nominator-video-firstname"
        >
          <b-form-input
            id="input-nominator-video-firstname"
            v-model="contacts.video.firstname"
            placeholder="Enter the given name of the video contact"
            :state="validate('video', 'firstname')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('video', 'firstname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('video', 'firstname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="fieldset-nominator-video-lastname"
          label="Last Name"
          label-for="input-nominator-video-lastname"
        >
          <b-form-input
            id="input-nominator-video-lastname"
            v-model="contacts.video.lastname"
            placeholder="Enter the last name of the video contact"
            :state="validate('video', 'lastname')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('video', 'lastname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('video', 'lastname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="fieldset-nominator-video-email"
          label="Email"
          label-for="input-nominator-video-email"
        >
          <b-form-input
            type="email"
            id="input-nominator-video-email"
            v-model="contacts.video.email"
            placeholder="Enter the email address of the video contact"
            :state="validate('video', 'email')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('video', 'email')">
            Please enter a valid email address.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('video', 'email')">
            Valid email address.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group label="Filming Locations">

          <b-card bg-variant="grey" class="mb-2">
          <p>Please identify the location(s) where the nomination video would likely be filmed. This may also include possible interviewee locations.</p>
          <b-form-group
            v-for="(location, counter) in contacts.video.locations"
            v-bind:key="counter"
            label-cols-lg="3"
            :label="`Location ${contacts.video.locations.length > 1 ? counter + 1 : ''}`"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-4"
          >
            <b-form-group
              :id="`fieldset-nominator-video-locations-${counter}-address`"
              label="Address"
              :label-for="`input-nominator-video-locations-${counter}-address`"
            >
              <b-form-input
                :id="`input-nominator-video-locations-${counter}-address`"
                v-model="location.address"
                placeholder="Enter the address of this location"
                :state="validate(counter, 'location')"
                :disabled="submitted"
              >
              </b-form-input>
              <b-form-invalid-feedback :state="validate(counter, 'location')">
                This field is required
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validate(counter, 'location')">
                Completed correctly.
              </b-form-valid-feedback>
            </b-form-group>

            <b-form-group
              :id="`fieldset-nominator-video-locations-${counter}-city`"
              label="City"
              :label-for="`input-nominator-video-locations-${counter}-city`"
            >
              <b-form-input
                :id="`input-nominator-video-locations-${counter}-city`"
                v-model="location.city"
                placeholder="Enter the city of this location"
                :state="validate(counter, 'location')"
                :disabled="submitted"
              >
              </b-form-input>
              <b-form-invalid-feedback :state="validate(counter, 'location')">
                This field is required
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validate(counter, 'location')">
                Completed correctly.
              </b-form-valid-feedback>
            </b-form-group>

            <b-button
              v-if="contacts.video.locations.length > 1"
              variant="outline-primary"
              @click="removeLocation(counter)"
              :disabled="submitted"
            >
              Remove Location
            </b-button>

          </b-form-group>
        </b-card>
        <b-button
          block
          variant="outline-primary"
          @click="addLocation()"
          :disabled="submitted"
        >Add Filming Location</b-button>
        </b-form-group>

      </b-form-group>
    </b-card>

    </div>
</template>

<script>

import {validateEmail, validatePhone} from '@/services/validation.services'

const init = {
  primary: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  },
  video: {
    firstname: '',
    lastname: '',
    email: '',
    locations: [{
      address: '',
      city: ''
    }]
  }
}

export default {
  name: "contacts-input",
  computed: {
    contacts: {
      get () {
        return this.$store.getters.getNomination.contacts || init;
      },
      set (value) {
        this.$store.dispatch("setNomination", {contacts: value})
      }
    },
    validate() {
      return (id, field) => {

        const fields = {
          firstname: () => {
            return this.contacts[id].firstname.length > 0
          },
          lastname: () => {
            return this.contacts[id].lastname.length > 0
          },
          phone: () => {
            return validatePhone(this.contacts[id].phone)
          },
          email: () => {
            return validateEmail(this.contacts[id].email)
          },
          location: () => {
            return this.contacts.video.locations[id].city.length > 0
              && this.contacts.video.locations[id].address.length > 0
          }
        }
        // console.log(fields[field](), field, id, this.nominators[id].title)
        if (fields[field] === 'undefined') return false;
        return !!fields[field]();
      }
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  },
  methods: {
    addLocation(){
      this.contacts.video.locations.push({
        city: '',
        address: ''
      })
    },
    removeLocation(counter){
      if (this.contacts.video.locations.length > 1)
        this.contacts.video.locations.splice(counter,1);
    }
  }
};
</script>
