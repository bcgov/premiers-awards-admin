<script setup lang="ts">
import AcknowledgmentNomineeFieldset from "../fieldsets/AcknowledgmentNomineeFieldset.vue";
</script>

<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>
      This award recognizes one or more BC Public Service organizations that
      have delivered a program, service or initiative resulting in substantial
      benefits to their organization(s), the public service or people in British
      Columbia.
    </p>
    <p>Considerations include, but are not limited to:</p>
    <ul>
      <li>
        Applying a customer-centric approach to the heart of the design and/or
        implementation of the partnership
      </li>
      <li>
        Applying inclusive employee or partner engagement practices with diverse
        interested parties and external groups
      </li>
      <li>
        Improvement to quality, cost-effectiveness or productivity of services
        to internal partners
      </li>
      <li>
        Improving government-to-business or government-to-resident service
        delivery
      </li>
      <li>
        Measurable benefits to either their organization(s) and/or the people in
        British Columbia through process improvements to transform business
        practices, and/or support sustainable revenue generation or savings
      </li>
      <li>
        Designing the policy or program framework with an evidence-based or
        evidence-informed process
      </li>
      <li>
        Inclusive engagement practices reflecting a diverse population within
        British Columbia such as the use of GBA+ and other inclusive program
        development tools
      </li>
    </ul>

    <OrganizationsFieldset />
    <NominationTitleFieldset />
    <NominatorsFieldset />
    <ContactsFieldset />
    <AcknowledgmentFieldset />
    <NomineesFieldset />
    <PartnersFieldset />
    <EvaluationsFieldset>
      <template v-slot:summary_overview></template>
      <template v-slot:context_overview>
        <p>
          Describe why the new approach to the program, service or initiative
          was undertaken (to provide background and perspective for the judges).
        </p>
      </template>
      <template v-slot:complexity_overview>
        <div>
          <p>
            Describe the scope and scale of the delivery of the program, service
            or initiative resulting in substantial benefits to their
            organization, the public service or people of British Columbia.
            Examples include, but are not limited to:
          </p>
          <ul>
            <li>Size of the program, service or initiative</li>
            <li>Risks encountered and overcome</li>
            <li>Constraints such as time frame, financial or policy</li>
            <li>
              Challenges around aligning stakeholder or partner group interests
            </li>
            <li>
              Technical or organizational difficulties identified and addressed
            </li>
          </ul>
        </div>
      </template>

      <template v-slot:approach_overview>
        <p>
          Identify key aspects of the approach taken in the delivery of the new
          program, service or initiative. Examples include, but are not limited
          to:
        </p>
        <ul>
          <li>
            Taking a customer-centric approach to the heart of the design and/or
            implementation of the partnership
          </li>
          <li>
            Supporting innovation, risk taking and a commitment to ongoing
            improvements by incorporating or contributing to best practices
          </li>
          <li>Removing barriers to overcome constraints</li>
          <li>
            Applying change resilience strategies to support success while going
            through change and transformation
          </li>
          <li>
            Devoting attention to cross-government processes critical for
            meeting partner group needs
          </li>
        </ul>
      </template>
      <template v-slot:impact_overview>
        <p>
          Describe, using metrics where applicable, to support the outcomes the
          program, service or initiative has on the organization, public service
          or people of British Columbia, examples include, but are not limited
          to:
        </p>
        <ul>
          <li>Process improvements in business practices</li>
          <li>
            Extent to which the outcomes and objectives significantly improve
            government-to-business or government-to-citizen service delivery
          </li>
          <li>
            Increased client satisfaction due to high quality service delivery
          </li>
          <li>
            Measurable benefits to either their organization(s) and/or the
            citizens of British Columbia through process improvements
            transforming business practices and/or supporting sustainable
            revenue generation or savings
          </li>
          <li>
            Operational efficiencies as demonstrated by financial or other key
            performance indicators
          </li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
    <AcknowledgmentNomineeFieldset />
  </div>
  <!-- end nomination form -->
</template>
