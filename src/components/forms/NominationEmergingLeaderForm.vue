<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>
      This award recognizes a BC Public Service employee 40 years and under (at
      the time of nomination), and at or below the level of director, who has
      made a significant impact in their ministry, division, workgroup or the
      greater BC Public Service early in their career.
    </p>
    <p>Considerations may include but are not limited to:</p>
    <ul>
      <li>
        Superior formal or informal leadership with colleagues across all levels
        of the organization
      </li>
      <li>
        Superior formal or informal leadership through innovative problem
        solving, team building, collaboration and a strong client service
        orientation
      </li>
      <li>
        Ability to act as a thought leader who can articulate a strong case for
        change, self-motivate and motivate others through change and demonstrate
        success through measurable project/program outcomes
      </li>
      <li>
        Commitment to diversity and inclusion in both the work environment and
        in the development of programs, policies and services
      </li>
      <li>Demonstration of ethical leadership practices</li>
      <li>Supporting innovation, new technology and best practices</li>
    </ul>
    <AcknowledgmentFieldset />
    <NomineeFieldset />
    <OrganizationsFieldset />
    <NominatorsFieldset />
    <ContactsFieldset />
    <EvaluationsFieldset>
      <template v-slot:summary_overview></template>
      <template v-slot:context_overview>
        <p>
          Briefly describe the conditions under which the employee demonstrates
          exemplary leadership, to provide background and perspective.
        </p>
      </template>

      <template v-slot:valuing_people_overview>
        <p>
          Identify and describe how the employee demonstrates their leadership
          in supporting the workplace including, but not limited to:
        </p>
        <ul>
          <li>
            Innovative problem solving, team building and collaborating with
            colleagues at all levels of the organization
          </li>
          <li>
            Active enhancement of the quality of the workplace through
            commitment to diversity and inclusion in both the work environment
            and the development of programs, policies and services
          </li>
          <li>
            Integrity and commitment to ethical conduct and decision making
          </li>
        </ul>
      </template>

      <template v-slot:commitment_overview>
        <p>
          Identify and describe how the employee demonstrates their leadership
          in operations including, but not limited to:
        </p>
        <ul>
          <li>
            Commitment to and pride in the BC Public Service by contributions
            that enhance its reputation
          </li>
          <li>
            Ability to constructively articulate a strong case for change by
            challenging assumptions, timelines and recommendations to ensure
            they are driven by citizens’ needs rather than administrative
            convenience
          </li>
          <li>
            Support of innovation, new technology and best practices by
            modelling a culture of curiosity, collaborating, encouraging
            dialogue and inviting competing ideas
          </li>
          <li>
            Decision making with considerations of the long-term impacts and
            context, anticipating emerging priorities as well as the current
            need
          </li>
          <li>
            Thoughtful risk management and ability to accept failure by
            learning, improving and moving forward
          </li>
          <li>Success through measurable project/program outcomes</li>
        </ul>
      </template>
      <template v-slot:impact_overview>
        <p>
          Describe and use metrics (if applicable) to support how the employee
          exemplifies the future of corporate leadership as demonstrated by, but
          not limited to:
        </p>
        <ul>
          <li>
            Effect on employees, clients, the public service and/or citizens of
            British Columbia
          </li>
          <li>
            Improvement of the quality of the workplace for employees by
            contributing to the enhancement of diversity, health and safety,
            workplace culture and employee development
          </li>
          <li>
            Support of innovation, new technology and best practices, resulting
            in the improvement of workplace processes such as reduced costs,
            increased efficiencies, or safety
          </li>
          <li>
            Measurable benefits to their organization(s) and/or citizens through
            process improvements to transform business practices, and/or
            sustainable revenue generation or savings
          </li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
  </div>
  <!-- end nomination form -->
</template>
