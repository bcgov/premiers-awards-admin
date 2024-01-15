<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>
      This award recognizes individuals who have made exceptional and lasting
      contributions to the BC Public Service and/or the province during a public
      service career of at least 15 years. The contributions may cover a
      nominee’s entire career or portions of it, provided the contribution has a
      lasting and ongoing positive impact.
    </p>
    <p>Considerations may include but are not limited to:</p>
    <ul>
      <li>
        Impact on peers, internal operations and/or external organizations
      </li>
      <li>
        Contributions to the development or application of best practices in
        their field of expertise
      </li>
      <li>
        Experimental or innovative mindset whereby openness to change, taking
        calculated risks and challenging the status quo to try something new
        resulted in a measurable outcome
      </li>
      <li>
        Embodying the ideal vision of leadership within the BC Public Service
      </li>
      <li>
        Commitment to diversity and inclusion in both the work environment and
        in the development of programs, policies, and services
      </li>
      <li>
        Advocation for meaningful engagement and learning with Indigenous
        peoples to support and facilitate reconciliation
      </li>
      <li>
        Demonstrating superior leadership through complex situations including
        large-scale initiatives, managing and mitigating risks, creatively
        solving problems and implementing solutions
      </li>
      <li>
        Achieving outcomes despite constraints, such as technical,
        organizational and financial
      </li>
      <li>
        Commitment to succession management through knowledge transfer, support
        for continuous learning and mentorship
      </li>
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
          Briefly describe the conditions under which the employee demonstrated
          their lasting contribution within the BC Public Service and/or the
          province, including career highlights, to provide background and
          perspective.
        </p>
      </template>
      <template v-slot:complexity_overview>
        <div>
          <p>
            Explain how the employee demonstrated exemplary leadership
            throughout their career including, but not limited to:
          </p>
          <ul>
            <li>
              Demonstrating superior leadership through complex situations
              including large-scale initiatives, managing and mitigating risks,
              creatively solving problems and implementing solutions
            </li>
            <li>
              Managing constraints such as time frame, technical, financial,
              organizational or policy
            </li>
            <li>
              Applying and/or developing best practices to remove barriers that
              may have prevented successful outcomes
            </li>
          </ul>
        </div>
      </template>

      <template v-slot:valuing_people_overview>
        <p>
          Identify and describe how the employee has demonstrated their
          leadership in supporting the workplace either by leading a team or
          organization, or as leader of a substantial project, process or
          initiative.
        </p>
        <p>Considerations may include but are not limited to:</p>
        <ul>
          <li>
            Ability to create, communicate and implement a clear and compelling
            vision for their team, aligned with the Corporate Plan for the BC
            Public Service
          </li>
          <li>
            Ability to anticipate future trends and work with others to develop
            strategies to meet future challenges
          </li>
          <li>
            Ability to establish trust, motivate and receive high satisfaction
            ratings from their employees and/or stakeholders
          </li>
          <li>
            Ability to involve, empower and lead staff through times of change
          </li>
          <li>
            Investment in personal and organizational learning about trends and
            new ideas in their sector and the broader government context
          </li>
          <li>
            Commitment to succession management through knowledge transfer and
            mentorship
          </li>
          <li>
            Demonstration of the importance of respect, inclusion, ethics and
            integrity and ensuring employees' awareness of obligations regarding
            ethics and professional conduct
          </li>
        </ul>
      </template>

      <template v-slot:contribution_overview>
        <p>
          Describe how the individual approached leadership, resulting in public
          service excellence. Considerations may include but are not limited to:
        </p>
        <ul>
          <li>
            Outstanding dedication to their work while maintaining a high level
            of commitment to BC Public Service values and government direction
          </li>
          <li>
            Embodying the ideal vision of leadership within the BC Public
            Service
          </li>
          <li>
            Demonstrating commitment to diversity and inclusion in both the work
            environment and in the development of programs, policies and
            services
          </li>
          <li>
            Making decisions with considerations for the long-term impacts and
            context, anticipating emerging priorities as well as current needs
          </li>
          <li>
            Enabling innovation by visibly and actively inviting and advancing
            new ideas within their organization and demonstrating the courage to
            embrace change
          </li>
          <li>
            Facilitating, reinforcing and successfully leading through changes
            necessary to promote innovation, continuous improvement or improved
            service delivery to internal or external clients
          </li>
          <li>
            Displaying a strong client service orientation ensuring service
            design needs are driven by citizens’ needs or client outcomes rather
            than internally focused metrics
          </li>
          <li>
            Demonstrating public service values throughout their career while
            continually developing their subject matter expertise
          </li>
        </ul>
      </template>

      <template v-slot:impact_overview>
        <p>
          Describe and use metrics (if applicable) to support the ongoing
          positive contributions the individual has made to the BC Public
          Service and/or the province of British Columbia.
        </p>
        <p>Considerations may include but are not limited to:</p>
        <ul>
          <li>
            Measurable benefits to either their organization(s) and/or the
            citizens of British Columbia
          </li>
          <li>
            Impact on the community, internal operations and/or external
            organizations including any social, economic and environmental
            benefits achieved as a result of their work
          </li>
          <li>
            Improving the quality of the workplace for employees by contributing
            to the enhancement of diversity, health and safety, workplace
            culture and employee development
          </li>
          <li>
            Demonstration of an experimental or innovative mindset whereby
            openness to change, taking calculated risks and challenging the
            status quo to try something new resulted in a measurable outcome
          </li>
          <li>
            Improvements to the quality, cost-effectiveness or productivity of
            services to internal or external stakeholders
          </li>
          <li>
            Improvements to government-to-business or government-to-citizen
            service delivery
          </li>
          <li>
            Provincial, national or global recognition for contributions to the
            development of best practices in their field of expertise
          </li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
  </div>
  <!-- end nomination form -->
</template>
