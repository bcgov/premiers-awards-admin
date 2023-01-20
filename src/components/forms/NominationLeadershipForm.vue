<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>This award recognizes a BC Public Service employee who demonstrates the highest levels of integrity and exemplary leadership abilities either leading a team or organization, or a substantial project, process or initiative.</p>
    <p>Considerations may include but are not limited to</p>
    <ul>
      <li>Ability to create, communicate and implement a clear and compelling vision</li>
      <li>Ability to establish trust, motivate, empower and receive high satisfaction ratings from their employees</li>
      <li>Ethical leadership practices</li>
      <li>Commitment to diversity and inclusion in both the work environment and the development of programs, policies and services</li>
      <li>Advocating meaningful engagement and learning with Indigenous peoples to support and facilitate reconciliation</li>
      <li>Anticipating future trends and working with others to develop strategies to meet future challenges</li>
      <li>Commitment to succession management through knowledge transfer, support for continuous learning and mentorship</li>
      <li>Commitment to service delivery in exceeding the needs/expectations of internal or external clients</li>
      <li>Experimental or innovative mindset whereby openness to change, taking calculated risks and challenging the status quo to try something new resulted in a measurable outcome</li>
    </ul>
    <AcknowledgmentFieldset />
    <NomineeFieldset />
    <OrganizationsFieldset />
    <NominatorsFieldset />
    <ContactsFieldset />
    <EvaluationsFieldset>
      <template v-slot:summary_overview></template>
      <template v-slot:context_overview>
        <p>Briefly describe the conditions under which the employee demonstrates exemplary leadership to provide background and perspective.</p>
      </template>
      <template v-slot:complexity_overview>
        <p>Describe the employee’s ability to demonstrate exemplary leadership acumen including, but not limited to</p>
        <ul>
          <li>Size of the organization, project, process or initiative managed</li>
          <li>Managing complex situations including large-scale initiatives, managing and mitigating risks, creatively solving problems and implementing solutions</li>
          <li>Constraints encountered and overcome under their leadership such as time frame, technical, financial, organizational or policy</li>
        </ul>
      </template>

      <template v-slot:valuing_people_overview>
        <p>Identify and describe how the employee demonstrates their leadership in supporting the workplace either by leading a team or organization, or as leader of a substantial project, process or initiative.</p>
        <p>Considerations may include but are not limited to</p>
        <ul>
          <li>Ability to create, communicate and implement a clear and compelling vision for their team aligning with the Corporate Plan for the BC Public Service</li>
          <li>Ability to establish trust, motivate and receive high satisfaction ratings from their employees and/or stakeholders</li>
          <li>Ability to involve, empower and lead staff through times of change</li>
          <li>Investing in personal and organizational learning about trends and new ideas in their sector and the broader government context</li>
          <li>Championing employee recognition and collaborative team-based environments</li>
          <li>Commitment to succession management through knowledge transfer and mentorship</li>
          <li>Modeling the importance of respect, inclusion, ethics and integrity and ensuring employee awareness of obligations regarding ethics and professional conduct</li>
          <li>Supporting those willing to try something new, recognizing their intent and effort, accepting failure by not casting blame but rather learning from it, improving and moving forward</li>
        </ul>
      </template>

      <template v-slot:commitment_overview>
        <p>Identify and describe the effect the leader has on employees, clients, the public service and/or citizens of British Columbia.</p>
        <p>Considerations may include but are not limited to</p>
        <ul>
          <li>Anticipating future trends and working with others to develop strategies to meet future challenges</li>
          <li>Making decisions with considerations of the long-term impacts and context, anticipating emerging priorities as well as the current need</li>
          <li>Experimental or innovative mindset whereby openness to change, taking calculated risks and challenging the status quo to try something new resulted in a measurable outcome</li>
          <li>Enabling innovation by visibly and actively inviting and advancing new ideas within their organization and demonstrating the courage to embrace change</li>
          <li>Strong client service orientation ensuring service design needs are driven by citizens’ needs or client outcomes rather than internally focused metrics</li>
        </ul>
      </template>

      <template v-slot:impact_overview>
        <p>Describe and use metrics (if applicable) to support the effect the leader has on employees, clients, the public service and/or citizens of British Columbia.</p>
        <p>Considerations may include but are not limited to</p>
        <ul>
          <li>Improving the quality of the workplace for employees by contributing to the enhancement of diversity, health and safety, workplace culture and employee development</li>
          <li>Supporting innovation, new technology and best practices resulting in the improvement of workplace processes such as reducing costs or increasing efficiencies</li>
          <li>Improving the quality, cost-effectiveness or productivity of services to internal or external stakeholders</li>
          <li>Improving government-to-business or government-to-citizen service delivery</li>
          <li>Measurable benefits to their organization(s) and/or the citizens of British Columbia through process improvements to transform business practices and/or sustainable revenue generation or savings</li>
          <li>Improved organizational performance as indicated by Work Environment Survey scores</li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
  </div><!-- end nomination form -->
</template>

