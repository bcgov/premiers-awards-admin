<template>
  <div id="partners-fieldset">
    <h3>Partners</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <slot name="overview">
            <p>
              A partner is a ministry or external organization essential to the
              success of the nominated project or initiative. A partner should
              be significantly involved in the development and work of the
              nominated project or initiative.
            </p>
            <p>Please enter a maximum of 12 partner organizations below.</p>
            <p>
              <b
                >Note: Please confirm the accuracy of your partner
                organizations’ names</b
              >
              – what is entered here will be used to populate the Premier’s
              Awards website and will be displayed in print at the Premier’s
              Awards ceremony, should your nomination be selected as a finalist.
            </p>
            <p>
              <b>Note:</b> If there is interest to submit more than 12, please
              email
              <a href="mailto:PremiersAwards@gov.bc.ca"
                >PremiersAwards@gov.bc.ca</a
              >
              to discuss. This list determines the number of award materials
              (framed certificates, trophies, etc.) ordered should the
              nomination become a finalist.
            </p>
            <Message
              :closable="false"
              v-if="selected.partners.length >= maxPartners"
              severity="warn"
            >
              You have reached the maximum of 12 partners.
            </Message>
          </slot>
        </div>
        <div
          v-for="(partner, index) in selected.partners"
          v-bind:key="index"
          class="field col-12"
        >
          <div class="card">
            <div class="p-fluid grid">
              <div class="field col-11">
                <PartnerFieldset :partner="partner" :index="index" />
              </div>
              <div class="field col-1">
                <Button
                  aria-label="Delete Partner"
                  icon="pi pi-trash"
                  @click="remove(index)"
                  :disabled="selected.submitted"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field md:col-9 col-12">
          <p>
            <b>Number of partners:</b> {{ selected.partners.length }} /
            {{ maxPartners }} Maximum
          </p>
        </div>
        <div class="field md:col-3 col-12">
          <Button
            :disabled="
              selected.partners.length >= maxPartners || selected.submitted
            "
            label="Add Partner"
            icon="pi pi-plus"
            @click="add"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- End Partners -->
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { nominationsDataStore } from "@/stores/nominations.store";

// validator
const v$ = useVuelidate();

// initialize references
const { selected, items, loading, error } = storeToRefs(nominationsDataStore());
const store = nominationsDataStore();

// partners settings
const maxPartners = 12;

// add partner to selected nomination
const add = store.addPartner;

// delete partner from nomination
const remove = store.removePartner;
</script>
