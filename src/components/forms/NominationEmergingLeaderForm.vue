<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>
      This award recognizes a BC Public Service employee working at or below the
      Band 4 level who has made a significant impact on their ministry,
      division, work group or the broader BC Public Service early in their
      career.
    </p>
    <p>Considerations may include but are not limited to:</p>
    <ul>
      <li>
        Demonstrates exemplary formal or informal leadership with direct reports
        and colleagues across all levels of the organization
      </li>
      <li>
        Uses innovative problem solving, team building, collaboration and strong
        client service orientation in their leadership
      </li>
      <li>
        Articulates a strong case for change, is self-motivated and motivates
        others through times of change
      </li>
      <li>
        Demonstrates success through measurable project or program outcomes
      </li>
      <li>
        Has a strong commitment to reconciliation, equity, diversity and
        inclusion in both the work environment and in the development of
        programs, policies and services
      </li>
      <li>Demonstrates equitable and ethical leadership practices</li>
      <li>Supports innovation, new technology and best practices</li>
    </ul>

    <NomineeFieldset />
    <OrganizationsFieldset />
    <NominatorsFieldset />
    <ContactsFieldset />
    <AcknowledgmentFieldset />
    <EvaluationsFieldset>
      <template v-slot:summary_overview></template>
      <template v-slot:context_overview>
        <p>
          Describe how the employee demonstrates exemplary leadership (to
          provide background and perspective for the judges).
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
            colleagues at all levels across the organization
          </li>
          <li>
            Creating a respectful workplace culture through a commitment to
            reconciliation, equity, diversity and inclusion
          </li>
          <li>
            Demonstrating a commitment to reconciliation, equity, diversity and
            inclusion in the development of programs, policies and services
          </li>
          <li>
            Demonstrating integrity and a commitment to ethical conduct and
            decision-making
          </li>
        </ul>
      </template>

      <template v-slot:commitment_overview>
        <p>
          Describe how the employee demonstrates their leadership in operations.
          Examples include, but are not limited to:
        </p>
        <ul>
          <li>
            Demonstrating pride in the BC Public Service through contributions
            that enhance its reputation
          </li>
          <li>
            Constructively articulate a strong case for change by challenging
            assumptions, timelines and recommendations to ensure they are driven
            by the needs of people in B.C., rather than administrative
            convenience
          </li>
          <li>
            Supporting innovation, new technology and best practices by
            modelling a culture of curiosity and collaboration, encouraging
            dialogue and an openness to diverse ideas
          </li>
          <li>
            Considering the long-term impacts and context and anticipating
            emerging priorities as well as the current need when making
            decisions
          </li>
          <li>
            Practicing thoughtful risk management and the ability to accept
            mistakes by learning, improving and moving forward
          </li>
          <li>
            Achieving success through measurable projects or program outcomes
          </li>
        </ul>
      </template>
      <template v-slot:impact_overview>
        <p>
          Describe, using metrics where applicable, how the employee exemplifies
          the future of corporate leadership. Examples include, but are not
          limited to:
        </p>
        <ul>
          <li>
            Effect on employees, clients, the BC Public Service, and/or people
            in British Columbia
          </li>
          <li>
            Enhancing the workplace culture for employees by contributing to the
            enhancement of diversity, health and safety, a respectful work
            environment and employee development
          </li>
          <li>
            Supporting innovation, new technology and best practices, resulting
            in the improvement of workplace processes such as reduced costs,
            increased efficiencies or safety
          </li>
          <li>
            Demonstrating measurable benefits to their organization(s) and/or
            people in British Columbia through process improvements to transform
            business practices, and/or sustainable revenue generation or savings
          </li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
    <AcknowledgmentNomineeFieldset />
  </div>
  <!-- end nomination form -->
</template>
