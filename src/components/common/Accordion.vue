<template>
  <div>

    <!-- Accordion -->
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1 border-0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            class="m-2 text-left"
            v-b-toggle="`accordion-${id}`"
            role="tab"
            :variant="$props.variant"
          >
            <span class="when-open"><BIconChevronCompactDown /></span>
            <span class="when-closed"><BIconChevronCompactUp /></span>
            {{$props.title}}
          </b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${id}`" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <slot name="text"></slot>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

  </div>
</template>

<script>

import {genID} from '@/services/validation.services'
import { BIconChevronCompactUp, BIconChevronCompactDown } from 'bootstrap-vue'


export default {
  name: "accordion",
  components: {
    BIconChevronCompactUp, BIconChevronCompactDown
  },
  props: {
    title: String,
    variant: String
  },
  data () {
    return {
      id: genID()
    }
  }
};

</script>
