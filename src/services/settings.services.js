/*!
 * Global settings (Vue)
 * File: settings.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

const schemaData = {
  maxDrafts: 60,
  maxAttachments: 5,
  status: [
    { key: "draft", label: "Draft", key: false },
    { key: "submitted", label: "Submitted", key: true },
  ],
  roles: [
    { key: "inactive", label: "Inactive" },
    { key: "nominator", label: "Nominator" },
    { key: "registrar", label: "Registrar" },
    { key: "administrator", label: "Administrator" },
    { key: "super-administrator", label: "Super-Administrator" },
  ],
  categories: [
    {
      key: "emerging-leader",
      type: "individual",
      label: "Emerging Leader",
      description:
        "This award recognizes a BC Public Service employee 40 years and under and at or below the level of director who has made a significant impact in their ministry, division, workgroup or the greater BC Public Service early in their career.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nominee", id: "nominee" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: [
        "summary",
        "context",
        "valuing_people",
        "commitment",
        "impact",
      ],
    },
    {
      key: "evidence-based-design",
      type: "organization",
      label: "Evidence-Based Design",
      description:
        "This award recognizes groups, teams or organizations in the BC Public Service whose work is outstanding in the area of evidence-based or evidence-informed policy or program development, and the process by which the policy or program was designed. This category showcases excellence in policy or program development for internal government or citizen-facing initiatives.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nomination Title", id: "title" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Nominees", id: "nominees" },
        { label: "Partners", id: "partners" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: ["summary", "context", "complexity", "approach", "impact"],
    },
    {
      key: "innovation",
      type: "organization",
      label: "Innovation",
      description:
        "This award recognizes groups, teams or organizations in the BC Public Service who have developed and transformed new ideas into tangible initiatives, programs or projects. By applying a user-centric or citizen-centric approach, innovations streamline business processes, leverage technology or pursue creative solutions to fulfill organizational mandates.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nomination Title", id: "title" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Nominees", id: "nominees" },
        { label: "Partners", id: "partners" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: ["summary", "context", "complexity", "approach", "impact"],
    },
    {
      key: "leadership",
      type: "individual",
      label: "Leadership",
      description:
        "This award recognizes a BC Public Service employee who demonstrates the highest levels of integrity and exemplary leadership abilities either leading a team or organization, or a substantial project, process or initiative.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nominee", id: "nominee" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: [
        "summary",
        "context",
        "complexity",
        "valuing_people",
        "commitment",
        "impact",
      ],
    },
    {
      key: "legacy",
      type: "individual",
      label: "Legacy",
      description:
        "This award recognizes individuals who have made exceptional and lasting contributions to the BC Public Service and/or the province during a public service career of at least 15 years. The contributions may cover a nominee’s entire career or portions of it, provided the contribution has a lasting and ongoing positive impact.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nominee", id: "nominee" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: [
        "summary",
        "context",
        "complexity",
        "valuing_people",
        "contribution",
        "impact",
      ],
    },
    {
      key: "organizational-excellence",
      type: "organization",
      label: "Organizational Excellence",
      description:
        "This award recognizes one or more BC Public Service organizations that have delivered a program, service or initiative resulting in substantial benefits to their organization(s), the public service or citizens.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nomination Title", id: "title" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Nominees", id: "nominees" },
        { label: "Partners", id: "partners" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: ["summary", "context", "complexity", "approach", "impact"],
    },
    {
      key: "partnership",
      type: "organization",
      label: "Partnership",
      description:
        "This award recognizes joint ventures or multi-party initiatives between BC Public Service organizations and organizations in the broader public sector, other levels of government, Indigenous communities or in the private or non-profit sectors.",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nomination Title", id: "title" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Nominees", id: "nominees" },
        { label: "Partners", id: "partners" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: ["summary", "context", "complexity", "approach", "impact"],
    },
    {
      key: "regional-impact",
      type: "organization",
      label: "Regional Impact",
      description:
        "This award recognizes groups, teams or organizations within the BC Public Service who have developed and delivered programs, projects and initiatives benefiting citizens in a specific location (town, city, municipality or region).",
      sections: [
        { label: "Acknowledgment", id: "acknowledgment" },
        { label: "Organizations", id: "organizations" },
        { label: "Nomination Title", id: "title" },
        { label: "Nominators", id: "nominators" },
        { label: "Contact Information", id: "contacts" },
        { label: "Nominees", id: "nominees" },
        { label: "Partners", id: "partners" },
        { label: "Evaluation Considerations", id: "evaluation" },
        { label: "Attachments", id: "attachments" },
      ],
      evaluation: ["summary", "context", "complexity", "approach", "impact"],
    },
  ],
  evaluationSections: [
    { key: "summary", label: "Summary" },
    { key: "context", label: "Context" },
    { key: "complexity", label: "Complexity" },
    { key: "approach", label: "Approach" },
    { key: "valuing_people", label: "Valuing People" },
    { key: "commitment", label: "Commitment to the Organization" },
    {
      key: "contribution",
      label: "Contribution to BC Public Service Excellence",
    },
    { key: "impact", label: "Impact" },
  ],
  organizations: [
    { key: "org-1", label: "BC Public Service Agency" },
    { key: "org-2", label: "Environmental Assessment Office" },
    {
      key: "org-3",
      label: "Government Communications and Public Engagement",
    },
    {
      key: "org-4",
      label: "Ministry of Post-Secondary Education and Future Skills",
    },
    { key: "org-5", label: "Ministry of Agriculture and Food" },
    {
      key: "org-6",
      label: "Ministry of Attorney General",
    },
    { key: "org-7", label: "Ministry of Children and Family Development" },
    { key: "org-8", label: "Ministry of Citizens’ Services" },
    { key: "org-9", label: "Ministry of Education and Child Care" },
    {
      key: "org-10",
      label: "Ministry of Energy, Mines and Low Carbon Innovation",
    },
    {
      key: "org-11",
      label: "Ministry of Environment and Climate Change Strategy",
    },
    { key: "org-12", label: "Ministry of Finance" },
    {
      key: "org-13",
      label: "Ministry of Forests",
    },
    { key: "org-14", label: "Ministry of Health" },
    {
      key: "org-15",
      label: "Ministry of Indigenous Relations and Reconciliation",
    },
    {
      key: "org-16",
      label:
        "Ministry of Ministry of Jobs, Economic Development and Innovation",
    },
    { key: "org-17", label: "Ministry of Labour" },
    {
      key: "org-18",
      label: "Land, Water and Resource Stewardship",
    },
    { key: "org-19", label: "Ministry of Mental Health and Addictions" },
    { key: "org-20", label: "Ministry of Municipal Affairs" },
    {
      key: "org-21",
      label: "Ministry of Public Safety and Solicitor General",
    },
    {
      key: "org-22",
      label: "Ministry of Social Development & Poverty Reduction",
    },
    { key: "org-23", label: "Ministry of Tourism, Arts, Culture and Sport" },
    { key: "org-24", label: "Ministry of Transportation & Infrastructure" },
    { key: "org-25", label: "Office of the Premier" },
    {
      key: "org-26",
      label: "Ministry of Emergency Management and Climate Readiness",
    },
    {
      key: "org-27",
      label: "Ministry of Housing",
    },
  ],
  mimeTypes: [
    { key: "application/pdf", label: "PDF" },
    { key: "application/doc", label: "MS Word" },
  ],
  wordCounts: {
    total: 1650,
    summary: 150,
    context: 250,
  },
};

export default {
  /**
   * get enumerated data by category type
   * **/

  get: function get(type) {
    return schemaData[type] !== "undefined" ? schemaData[type] : [];
  },

  /**
   * get enumerated data by key
   * **/

  lookup: function lookup(type, key) {
    if (typeof schemaData[type] === "undefined") return null;
    const found = schemaData[type].filter((item) => item.key === key);
    return found.length > 0 ? found[0].label : null;
  },

  /**
   * get category data by key
   * **/

  lookupCategory: function lookup(key) {
    const found = schemaData.categories.filter((item) => item.key === key);
    return found.length > 0 ? found[0] : null;
  },

  /**
   * lookup nomination form type
   * **/

  lookupType: function lookupType(category) {
    const found = schemaData.categories.filter((item) => item.key === category);
    return found.length > 0 ? found[0].type : null;
  },

  /**
   * check if category contains given section
   * **/

  checkSection: function checkSection(section, category) {
    const metadata = this.lookupCategory(category);
    if (!metadata) return null;
    return metadata.sections.filter((sec) => sec.id === section).length > 0;
  },
};
