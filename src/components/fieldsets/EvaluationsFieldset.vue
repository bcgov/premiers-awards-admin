<template>
  <div id="evaluation-fieldset" class="card">
    <h3>Evaluation Considerations</h3>
    <div class="p-fluid grid">
      <div class="field col-12">
        The combined sections below must not exceed
        <u>{{ wordCountsMax.total }}</u> words.
        <Message
          v-if="wordCounts.total > wordCountsMax.total"
          :closeable="false"
          severity="error"
          >Evaluation total word count exceeded</Message
        >
        <Message
          v-if="wordCounts.total === 0"
          :closeable="false"
          severity="warn"
          >Evaluation is empty</Message
        >
      </div>
      <div class="field col-12">
        <Fieldset
          :disabled="submitted"
          :legend="`Summary (${wordCountsMax.summary} words maximum)`"
          :toggleable="true"
        >
          <slot name="summary_overview">
            <p>
              In this section, provide a brief statement summarizing the main
              points of the nomination. The purpose of the summary is to give
              the adjudicators and judges a condensed and objective account of
              the main idea(s) and accomplishment(s) of the nomination.
            </p>
            <p>
              <em
                >(Note that this section will be used by the Premier’s Awards
                team for communications purposes if this nomination is selected
                as a finalist.)</em
              >
            </p>
          </slot>
          <Editor
            v-model="selected.evaluation.summary"
            :modules="{
              clipboard: {
                matchVisual: false,
              },
            }"
            @text-change="
              () => {
                v$.summary.$touch();
                v$.total.$touch();
              }
            "
            editorStyle="height: 320px"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage
            :closeable="false"
            :severity="
              wordCounts.summary > wordCountsMax.summary ? 'error' : 'info'
            "
          >
            Section word count: {{ wordCounts.summary }} /
            {{ wordCountsMax.summary }}
            <span v-if="wordCounts.summary > wordCountsMax.summary">
              (exceeds limit)</span
            >
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          :disabled="submitted"
          :legend="`Context (${wordCountsMax.context} words maximum)`"
        >
          <slot name="context_overview"></slot>
          <Editor
            v-model="selected.evaluation.context"
            editorStyle="height: 320px"
            @text-change="
              () => {
                v$.total.$touch();
                v$.total.$touch();
              }
            "
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage
            :closeable="false"
            :severity="
              wordCounts.context > wordCountsMax.context ? 'error' : 'info'
            "
          >
            Section word count: {{ wordCounts.context }} /
            {{ wordCountsMax.context }}
            <span v-if="wordCounts.context > wordCountsMax.context">
              (limit exceeded)</span
            >
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          v-if="hasEvaluation('complexity')"
          :disabled="submitted"
          legend="Complexity"
          :togglable="true"
        >
          <slot name="complexity_overview"></slot>
          <Editor
            v-model="selected.evaluation.complexity"
            editorStyle="height: 320px"
            @text-change="v$.total.$touch()"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage :closeable="false" severity="info">
            Section word count: {{ wordCounts.complexity }}
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          v-if="hasEvaluation('approach')"
          :disabled="submitted"
          legend="Approach"
        >
          <slot name="approach_overview"></slot>
          <Editor
            v-model="selected.evaluation.approach"
            editorStyle="height: 320px"
            @text-change="v$.total.$touch()"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage :closeable="false" severity="info">
            Section word count: {{ wordCounts.approach }}
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          v-if="hasEvaluation('valuing_people')"
          :disabled="submitted"
          legend="Valuing People"
        >
          <slot name="valuing_people_overview"></slot>
          <Editor
            v-model="selected.evaluation.valuing_people"
            editorStyle="height: 320px"
            @text-change="v$.total.$touch()"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage :closeable="false" severity="info">
            Section word count: {{ wordCounts.valuing_people }}
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          v-if="hasEvaluation('commitment')"
          :disabled="submitted"
          legend="Commitment"
        >
          <slot name="commitment_overview"></slot>
          <Editor
            v-model="selected.evaluation.commitment"
            editorStyle="height: 320px"
            @text-change="v$.total.$touch()"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage :closeable="false" severity="info">
            Section word count: {{ wordCounts.commitment }}
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          v-if="hasEvaluation('contribution')"
          :disabled="submitted"
          legend="Contribution"
        >
          <slot name="contribution_overview"></slot>
          <Editor
            v-model="selected.evaluation.contribution"
            editorStyle="height: 320px"
            @text-change="v$.total.$touch()"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage :closeable="false" severity="info">
            Section word count: {{ wordCounts.contribution }}
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>

        <Fieldset
          v-if="hasEvaluation('impact')"
          :disabled="submitted"
          legend="Impact"
        >
          <slot name="impact_overview"></slot>
          <Editor
            v-model="selected.evaluation.impact"
            editorStyle="height: 320px"
            @text-change="v$.total.$touch()"
          >
            <template #toolbar>
              <EditorToolbar />
            </template>
          </Editor>
          <InlineMessage :closeable="false" severity="info">
            Section word count: {{ wordCounts.impact }}
          </InlineMessage>
          <InlineMessage
            v-if="wordCounts.total > wordCountsMax.total"
            :closeable="false"
            :severity="error"
          >
            Total evaluation word count exceeded.
          </InlineMessage>
        </Fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia/dist/pinia";
import { authDataStore } from "@/stores/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { nominationsDataStore } from "@/stores/nominations.store";
import { helpers } from "@vuelidate/validators";
import { settingsStore } from "@/stores/settings.store";

const settings = settingsStore();

// get current user
const { current } = storeToRefs(authDataStore());

// load nominations state
const { selected, submitted, error, wordCounts } = storeToRefs(
  nominationsDataStore()
);

const nomination = settings.lookup("categories", selected.value.category);
const wordCountsMax = settings.lookup("wordCounts", undefined, true);

// check if nomination includes evaluation section
const hasEvaluation = (section) => {
  return (nomination.evaluation || []).includes(section);
};

// apply validators
const v$ = useVuelidate(
  {
    summary: {
      accepted: helpers.withMessage("Summary has exceeded word limit.", () => {
        return wordCounts.value.summary < wordCounts.value.max.summary;
      }),
    },
    context: {
      acccepted: helpers.withMessage("Context has exceeded word limit.", () => {
        return wordCounts.value.summary < wordCounts.value.max.summary;
      }),
    },
    total: {
      accepted: helpers.withMessage(
        "Total word count has exceeded limit.",
        () => {
          return wordCounts.value.total < wordCounts.value.max.total;
        }
      ),
    },
  },
  selected.evaluation
);
</script>
