<template>
  <div>
    <b-card bg-variant="light" class="mb-3">
      <b-form-group
        id="input-group-evaluation"
        label="Evaluation Considerations"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-2"
      >
        <p>
          <strong>The combined sections below must not exceed <u>{{ counts.max.total }}</u> words.</strong>
        </p>

        <b-form-group
          id="input-group-evaluation-summary"
          :label="`Summary (${counts.max.summary} words maximum)`"
          label-size="lg"
          label-for="input-evaluation-summary"
        >
          <slot name="summary_overview">
            <p>In this section, provide a brief statement summarizing the main points of the nomination. The purpose of the summary is to give the adjudicators and judges a condensed and objective account of the main idea(s) and accomplishment(s) of the nomination.</p>
            <p><em>(Note that this section will be used by the Premier’s Awards team for communications purposes if this nomination is selected as a finalist.)</em></p>
          </slot>

          <b-form-textarea
            id="input-evaluation-summary"
            v-model="evaluation.summary"
            placeholder="Enter the text here..."
            rows="5"
            max-rows="6"
            :state="validateSummary"
            :disabled="submitted"
          >
          </b-form-textarea>
          <b-form-invalid-feedback v-if="!loading" :state="validateSummary">
            Summary word count: {{counts.summary}} / {{counts.max.summary}}
            <span v-if="counts.total === 0">(Evaluation is empty)</span>
            <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateSummary">
            Summary word count: {{counts.summary}} / {{counts.max.summary}}
          </b-form-valid-feedback>
        </b-form-group>
      </b-form-group>

      <b-form-group
        id="input-group-evaluation-context"
        :label="`Context (${counts.max.context} words maximum)`"
        label-size="lg"
        label-for="input-evaluation-context"
      >
        <slot name="context_overview"></slot>

        <b-form-textarea
          id="input-evaluation-context"
          v-model="evaluation.context"
          placeholder="Enter the text here..."
          rows="5"
          max-rows="6"
          :state="validateContext"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validateContext">
          Context word count: {{counts.context}} / {{counts.max.context}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validateContext">
          Context word count: {{counts.context}} / {{counts.max.context}}
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        v-if="!!this.$slots.complexity_overview"
        id="input-group-evaluation-complexity"
        label="Complexity"
        label-size="lg"
        label-for="input-evaluation-complexity"
      >
        <slot name="complexity_overview"></slot>
        <b-form-textarea
          id="input-evaluation-complexity"
          v-model="evaluation.complexity"
          placeholder="Enter the text here..."
          rows="5"
          max-rows="6"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validation">
          Complexity word count: {{counts.complexity}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Complexity word count: {{counts.complexity}}
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        v-if="!!this.$slots.approach_overview"
        id="input-group-evaluation-approach"
        label="Approach"
        label-size="lg"
        label-for="input-evaluation-approach"
      >
        <slot name="approach_overview"></slot>
        <b-form-textarea
          id="input-evaluation-approach"
          v-model="evaluation.approach"
          placeholder="Enter the text here..."
          rows="5"
          max-rows="6"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validation">
          Approach word count: {{counts.approach}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Approach word count: {{counts.approach}}
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        v-if="!!this.$slots.valuing_people_overview"
        id="input-group-evaluation-valuing-people"
        label="Valuing People"
        label-size="lg"
        label-for="input-evaluation-valuing-people"
      >
        <slot name="valuing_people_overview"></slot>
        <b-form-textarea
          id="input-evaluation-valuing-people"
          v-model="evaluation.valuing_people"
          placeholder="Enter the text here..."
          rows="5"
          max-rows="6"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validation">
          Valuing People word count: {{counts.valuing_people}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Valuing People word count: {{counts.valuing_people}}
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        v-if="!!this.$slots.commitment_overview"
        id="input-group-evaluation-commitment"
        label="Commitment to the Organization"
        label-size="lg"
        label-for="input-evaluation-commitment"
      >
        <slot name="commitment_overview"></slot>
        <b-form-textarea
          id="input-evaluation-commitment"
          v-model="evaluation.commitment"
          placeholder="Enter the text here..."
          rows="5"
          max-rows="6"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validation">
         Commitment word count: {{counts.commitment}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Commitment word count: {{counts.commitment}}
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        v-if="!!this.$slots.contribution_overview"
        id="input-group-evaluation-contribution"
        label="Contribution to BC Public Service Excellence "
        label-size="lg"
        label-for="input-evaluation-contribution"
      >
        <slot name="contribution_overview"></slot>
        <b-form-textarea
          id="input-evaluation-contribution"
          v-model="evaluation.contribution"
          placeholder="Enter the text here..."
          rows="5"
          max-rows="6"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validation">
          Contribution word count: {{counts.contribution}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Contribution word count: {{counts.contribution}}
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        v-if="!!this.$slots.impact_overview"
        id="input-group-evaluation-impact"
        label="Impact"
        label-size="lg"
        label-for="input-evaluation-impact"
      >
        <slot name="impact_overview"></slot>
        <b-form-textarea
          id="input-evaluation-impact"
          v-model="evaluation.impact"
          placeholder="Enter your text here..."
          rows="5"
          max-rows="6"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-textarea>
        <b-form-invalid-feedback v-if="!loading" :state="validation">
          Impact word count: {{counts.impact}}
          <span v-if="counts.total === 0">(Evaluation is empty)</span>
          <span v-if="counts.total > counts.max.total">(Evaluation word count exceeded)</span>
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Impact word count: {{counts.impact}}
        </b-form-valid-feedback>
      </b-form-group>

    </b-card>
  </div>
</template>

<script>

export default {
  name: "evaluation-input",
  computed: {
    evaluation: {
      get () {
        return this.$store.getters.getNomination.evaluation;
      },
      set (value) {
        this.$store.dispatch("setNomination", {evaluation: value})
        this.$store.dispatch("setValidation", {counts: {
            total: this.totalCount,
            summary: this.summaryCount,
            context: this.contextCount
        }})
      }
    },
    validation() {
      return this.$store.getters.getValidation.evaluation
    },
    loading() {
      return this.$store.getters.isLoading
    },
    counts() {
      return this.$store.getters.getValidation.counts
    },
    validateSummary() {
      return this.counts.summary <= this.counts.max.summary && this.validation
    },
    validateContext() {
      return this.counts.context <= this.counts.max.context && this.validation
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    },
  }
}
</script>

