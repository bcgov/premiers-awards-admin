<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>
      This award recognizes one or more BC Public Service organizations that
      have delivered a program, service or initiative resulting in substantial
      benefits to their organization(s), the public service or citizens.
    </p>
    <p>Considerations may include but are not limited to</p>
    <ul>
      <li>
        Applying a citizen-centric or customer-centric approach to the heart of
        the design and/or implementation of the partnership
      </li>
      <li>
        Applying inclusive employee or citizen engagement practices with diverse
        stakeholder groups
      </li>
      <li>
        Improvement to quality, cost-effectiveness or productivity of services
        to internal stakeholders
      </li>
      <li>
        Improving government-to-business or government-to-citizen service
        delivery
      </li>
      <li>
        Measurable benefits to either their organization(s) and/or the citizens
        of British Columbia through process improvements to transform business
        practices, and/or support sustainable revenue generation or savings
      </li>
    </ul>
    <AcknowledgmentFieldset />
    <OrganizationsFieldset />
    <NominationTitleFieldset />
    <NominatorsFieldset />
    <ContactsFieldset />
    <NomineesFieldset />
    <PartnersFieldset />
    <EvaluationsFieldset>
      <template v-slot:summary_overview></template>
      <template v-slot:context_overview>
        <p>
          Briefly describe why the new approach to the program, service or
          initiative was undertaken to provide background and perspective.
        </p>
      </template>
      <template v-slot:complexity_overview>
        <div>
          <p>
            Describe the scope and scale of the delivery of the program, service
            or initiative resulting in substantial benefits to their
            organization, the public service or citizens of British Columbia
            including, but not limited to
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
          program, service or initiative including, but not limited to
        </p>
        <ul>
          <li>
            Applying a citizen-centric or customer-centric approach to the heart
            of the design and/or implementation of the partnership
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
            meeting stakeholder needs
          </li>
        </ul>
      </template>
      <template v-slot:impact_overview>
        <p>
          Describe and use metrics (if applicable) to support the outcomes the
          program, service or initiative has on the organization, public service
          or citizens of British Columbia including, but not limited to
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
  </div>
  <!-- end nomination form -->
</template>
