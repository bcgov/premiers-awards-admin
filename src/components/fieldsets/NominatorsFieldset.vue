<template>
  <div id="nominators-fieldset">
    <h3>Nominators</h3>
    <p>
      Note: this information may be used to identify you in your finalist video.
      Please avoid use of acronyms and ensure this information is accurate.
    </p>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <slot name="overview"></slot>
        </div>
        <div
          v-for="(nominator, index) in selected.nominators"
          v-bind:key="index"
          class="field col-12"
        >
          <div class="card">
            <div class="p-fluid grid">
              <div class="field col-11">
                <NominatorFieldset :nominator="nominator" :index="index" />
              </div>
              <div class="field col-1">
                <Button
                  aria-label="Delete Nominator"
                  icon="pi pi-trash"
                  @click="remove(index)"
                  :disabled="selected.submitted"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field md:col-6 col-12">
          <Button
            ref="addButtonRef"
            :disabled="
              selected.submitted || selected.nominators.length >= maxNominators
            "
            label="Add Nominator"
            icon="pi pi-plus"
            @click="add"
          />
        </div>
        <div class="field col-9">
          <Message
            :closable="false"
            v-if="selected.nominators.length >= maxNominators"
            severity="warn"
          >
            You have reached the maximum of 2 nominators.
          </Message>
        </div>
      </div>
    </div>
  </div>
  <!-- End Locations -->
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia/dist/pinia";
import { authDataStore } from "@/stores/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { nominationsDataStore } from "@/stores/nominations.store";
import { required } from "@vuelidate/validators";

// get current user
const { current } = storeToRefs(authDataStore());

// set max nominators limit
const maxNominators = 2;

// get nominations store
const store = nominationsDataStore();

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate(
  {
    nominators: { required },
  },
  selected,
);

// add nominator and blur button
const addButtonRef = ref(null);
const add = () => {
  store.addNominator();
  addButtonRef.value?.$el.blur();
};

// delete location from nomination
const remove = store.removeNominator;
</script>
