<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>
      This award recognizes joint ventures or multi-party initiatives between BC
      Public Service organizations and organizations in the broader public
      sector, other levels of government, Indigenous communities or in the
      private or non-profit sectors.
    </p>
    <p>Considerations may include but are not limited to:</p>
    <ul>
      <li>
        Development and management of sustained strategic partnerships with
        other government, private sector, volunteer or non-profit organizations,
        integrating policy and/or service delivery to better serve British
        Columbians
      </li>
      <li>
        Measurable benefits to either their organization(s) and/or the citizens
        of British Columbia through process improvements transforming business
        practices, and/or supporting sustainable revenue generation or savings
      </li>
      <li>
        Applying inclusive employee or citizen engagement practices with diverse
        stakeholder groups
      </li>
      <li>
        Improvements to the quality, cost-effectiveness, or productivity of
        services to internal stakeholders
      </li>
      <li>
        Improvements to government-to-business or government-to-citizen program
        or service delivery
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
          Briefly describe why the partnership was undertaken, to provide
          background and perspective.
        </p>
      </template>
      <template v-slot:complexity_overview>
        <p>
          Describe the scope and scale of the joint ventures or multi-party
          initiatives including, but not limited to:
        </p>
        <ul>
          <li>Size of the project, process or initiative</li>
          <li>Risks encountered and overcome</li>
          <li>
            Ability to encounter and overcome constraints such as time frame,
            technical, financial, organizational or policy
          </li>
          <li>
            Challenges around aligning stakeholder or partner group interests
          </li>
          <li>Technical or organizational difficulties addressed</li>
        </ul>
      </template>
      <template v-slot:approach_overview>
        <p>
          Identify key aspects of the approach and partnership including, but
          not limited to:
        </p>
        <ul>
          <li>
            Development and management of sustained strategic partnerships with
            other government, private sector, volunteer or non-profit
            organizations, integrating policy and/or service delivery to better
            serve British Columbians
          </li>
          <li>
            Building relationships with internal or external stakeholder(s) to
            achieve mutually beneficial goals or mandates
          </li>
          <li>
            Applying a citizen-centric or customer-centric approach to the heart
            of the design and/or implementation of the partnership
          </li>
          <li>
            Applying inclusive employee or citizen engagement practices with
            diverse stakeholder groups
          </li>
          <li>
            Demonstrating creativity and/or use of new technology or methods
            such as Behavioural Insights or Service Design to achieve results
          </li>
          <li>Applying a risk and/or change management strategy</li>
          <li>
            Applying and/or developing best practices to remove barriers that
            may have prevented the successful outcome of the project
          </li>
        </ul>
      </template>
      <template v-slot:impact_overview>
        <p>
          Describe and use metrics (if applicable) to support the effect the
          partnership has on the organization, public service or citizens of
          British Columbia including, but not limited to:
        </p>
        <ul>
          <li>
            Measurable benefits to either their organization(s) and/or the
            citizens of British Columbia through process improvements
            transforming business practices, and/or supporting sustainable
            revenue generation or savings
          </li>
          <li>
            Effect on the community, internal or external stakeholders including
            any social, economic and environmental benefits achieved as a result
            of the partnership
          </li>
          <li>
            Extent to which the outcomes and objectives of the project, program
            or initiative were achieved
          </li>
          <li>
            Effect of the partnership on operational efficiencies as
            demonstrated by financial or other key performance indicators
          </li>
          <li>
            Improvement to quality, cost-effectiveness or productivity of
            services to internal and/or external stakeholders and/or the
            citizens of British Columbia
          </li>
          <li>
            Extent to which the outcomes and objectives have significantly
            improved government-to-business or government-to-citizen program or
            service delivery
          </li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
  </div>
  <!-- end nomination form -->
</template>
