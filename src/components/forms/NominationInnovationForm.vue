<template>
  <div id="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>This award recognizes groups, teams or organizations in the BC Public Service who have developed and transformed new ideas into tangible initiatives, programs or projects. By applying a user-centric or citizen-centric approach, innovations streamline business processes, leverage technology or pursue creative solutions to fulfill organizational mandates.</p>
    <p>Considerations may include but are not limited to</p>
    <ul>
      <li>Generating breakthrough ideas, fresh perspectives and new opportunities</li>
      <li>Using new technology or tools to enhance program and service delivery or improve upon existing processes and procedures such as Behavioural Insights, Data Science, Service Design or Agile Methodology</li>
      <li>Improving performance by doing things that may be unique, leading-edge or new to the public sector</li>
      <li>Changing the organizational culture or traditional approach to management or problem solving</li>
      <li>Experimental or innovative mindset whereby openness to change, taking calculated risks and challenging the status quo to try something new resulted in a measurable outcome</li>
      <li>Adapting and refining the approach or initiative when things have not worked well and learning from the setbacks/mistakes</li>
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
        <p>Briefly describe why the new innovative approach was undertaken
          to provide background and perspective.</p>
      </template>

      <template v-slot:complexity_overview>
        <div>
          <p>Describe the scope and scale of the new initiative, streamlined business processes, technology or creative solution developed including, but not limited to</p>
          <ul>
            <li>Size of the project, process and technology solution</li>
            <li>Risks encountered and overcome</li>
            <li>Challenges around introducing a new approach to solve a problem</li>
            <li>Technical or organizational difficulties identified and addressed</li>
            <li>Financial constraints</li>
          </ul>
        </div>
      </template>

      <template v-slot:approach_overview>
        <p>Describe how the new initiative, product or service was developed from inception to delivery and transformed new ideas into tangible initiatives including, but not limited to</p>
        <ul>
          <li>The process used to generate breakthrough ideas, fresh perspectives and new opportunities</li>
          <li>Using new technology or tools to enhance program and service delivery or improve upon existing processes and procedures such as Behavioural Insights, Data Science, Service Design or Agile Methodology</li>
          <li>Applying user-centric or citizen-centric approach in the development of the initiative/program</li>
          <li>Adapting and refining the approach or initiative when things did not work well and learning from the setbacks/mistakes</li>
          <li>Managing and overcoming risks encountered to adapt and refine the process</li>
          <li>Creativity in the design or redesign of the programs or services</li>
        </ul>
      </template>

      <template v-slot:impact_overview>
        <p>Describe and use metrics (if applicable) to support the impact of the innovative approach to programs and services as demonstrated by, but not limited to</p>
        <ul>
          <li>Improving performance by doing things that may be unique, leading-edge or new to the public service</li>
          <li>Changing the organizational culture or traditional approach to management or problem solving</li>
          <li>Experimental or innovative mindset whereby openness to change, taking calculated risks and challenging the status quo to try something new resulted in a measurable outcome</li>
          <li>Effect of the innovative approach to the programs or services on its intended internal or external stakeholders</li>
          <li>Effect of the innovative approach to the programs or services on the internal operations of the individuals, teams or organizations delivering the programs or services</li>
          <li>Quantitative or measurable improvement to the programs or services</li>
          <li>Describe why and how this was innovative</li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
  </div><!-- end nomination form -->
</template>
