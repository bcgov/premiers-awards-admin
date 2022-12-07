<template>
  <div class="form-sections">
    <h3 id="overview-fieldset">Overview</h3>
    <p>This award recognizes groups, teams or organizations within the BC Public Service who have developed and delivered programs, projects and initiatives benefiting citizens in a specific location (town, city, municipality or region).</p>
    <p>Considerations may include but are not limited to</p>
    <ul>
      <li>Projects or initiatives directly benefiting citizens in the specific town, city, municipality or region</li>
      <li>Recognizing merit regardless of the project/initiative’s size or pedigree and those with less visibility which are more grassroots in nature</li>
      <li>Generating innovative ideas, fresh perspectives and new opportunities</li>
      <li>Citizen engagement practices with diverse stakeholder groups</li>
      <li>Citizen-centric or customer-centric approach at the heart of the design and/or implementation of a policy/project</li>
      <li>Developing and managing sustained strategic partnerships with local government, Indigenous, private sector, volunteer or non-profit organizations, integrating policy and/or service delivery to better serving British Columbians in a specific location</li>
      <li>Experimental or innovative mindset whereby openness to change, taking calculated risks and challenging the status quo to try something new resulted in a measurable outcome</li>
    </ul>

    <AcknowledgmentFieldset />
    <OrganizationFieldset />
    <NominationTitleFieldset />
    <NominatorsFieldset />
    <ContactsFieldset />
    <NomineesFieldset />
    <PartnersFieldset />

    <EvaluationsFieldset>
      <template v-slot:summary_overview></template>
      <template v-slot:context_overview>
        <p>Briefly describe why the new program, project or initiative was undertaken to provide background and perspective.</p>
      </template>
      <template v-slot:complexity_overview>
        <p>Describe the scope and scale of the program, project or initiative resulting in significant impact directly benefiting local citizens including, but not limited to</p>
        <ul>
          <li>Size of the program, service or initiative</li>
          <li>Risks encountered</li>
          <li>Challenges around introducing a new approach to solve a problem</li>
          <li>Constraints such as time frame, financial, policy or technical</li>
          <li>Challenges around aligning stakeholder or partner group interests</li>
        </ul>
      </template>

      <template v-slot:approach_overview>
        <p>Describe key aspects of the approach taken throughout the development of the new program, project or initiative including, but not limited to</p>
        <ul>
          <li>The process used to generate innovative ideas, fresh perspectives, new opportunities and creativity in the design</li>
          <li>User-centric or citizen-centric approach in the development of the initiative/program</li>
          <li>Inclusive citizen engagement practices with diverse stakeholder groups</li>
          <li>Adapting and refining the approach when things did not work well and learning from the setbacks/mistakes</li>
          <li>Applying and/or developing best practices to remove barriers that may have prevented the successful outcome of the project</li>
          <li>Risk and/or change management strategy</li>
          <li>Building relationships with external stakeholder(s) to achieve mutually beneficial goals or mandates</li>
        </ul>
      </template>

      <template v-slot:impact_overview>
        <p>Describe and use metrics (if applicable) to support the outcomes and impact the program, project or initiative has on the BC Public Service and local citizens including, but not limited to</p>
        <ul>
          <li>Experimental or innovative mindset whereby openness to change, taking calculated risks and challenging the status quo to try something new resulted in a measurable outcome</li>
          <li>Extent to which the outcomes and objectives of the project, program or initiative were achieved</li>
          <li>Quantitative or measurable improvement to the program, project or initiative</li>
          <li>Efficiencies and improvements as demonstrated by financial or other key performance indicators</li>
          <li>Effect on the community, internal or external stakeholders including any social, economic and environmental benefits achieved</li>
          <li>Effect on external stakeholders such as increased client satisfaction to high quality service delivery</li>
        </ul>
      </template>
    </EvaluationsFieldset>
    <AttachmentsFieldset />
  </div><!-- end nomination form -->
</template>
