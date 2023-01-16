<template>
  <Fieldset id="video-locations-fieldset" legend="Filming Locations" :toggleable="true">
    <p>Please identify the location(s) where the nomination video would likely be filmed.
      This may also include possible interviewee locations.</p>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <slot name="overview"></slot>
        </div>
        <div
            v-for="(location, index) in selected.contacts.video.locations"
            v-bind:key="index"
            class="field col-12"
        >
          <div class="card">
            <div class="p-fluid grid">
              <div class="field col-11">
                <LocationFieldset :location="location" :index="index" />
              </div>
              <div class="field col-1">
                <Button icon="pi pi-trash" @click="remove(index)" :disabled="selected.submitted" />
              </div>
            </div>
          </div>
        </div>
        <div class="field col-9">
          <!--          <Message :closable="false" v-if="selected.partners.length >= maxPartners" severity="warn">-->
          <!--            You have reached the maximum.-->
          <!--          </Message>-->
        </div>
        <div class="field col-3">
          <Button
              :disabled="selected.submitted"
              label="Add Location"
              icon="pi pi-plus"
              @click="add"
          />
        </div>
      </div>
    </div>
  </Fieldset><!-- End Locations -->
</template>

<script setup>

import { storeToRefs } from 'pinia';
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";

// validator
const v$ = useVuelidate();

// initialize references
const { selected, items, loading, error, submitted } = storeToRefs(nominationsDataStore());
const store = nominationsDataStore();

// add location to selected nomination
const add = store.addLocation;

// delete location from nomination
const remove = store.removeLocation;

</script>