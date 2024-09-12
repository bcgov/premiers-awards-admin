/*!
 * Validation utilities (Vue)
 * File: validation.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */
//import { storeToRefs } from "pinia/dist/pinia";
import { settingsStore } from "@/stores/settings.store";

/**
 * Validate nomination data
 *
 * **/

export function validateNomination(
  data,
  wordCounts,
  wordCountsMax,
  nomination
) {
  //const wordCountsMax = await settings.lookup("wordCounts", undefined, true);
  //const nomination = await settings.lookup("categories", data.category, true);
  // init validation object
  const validations = {};

  // Nomination Acknowledgement
  validations.acknowledgment = !!data.acknowledgment;

  // Nomination Organization
  validations.organizations =
    data.organizations.length > 0 &&
    data.organizations.filter((organization) => {
      return !organization;
    }).length === 0;

  const settings = settingsStore();

  const nominationsSettings = settings.lookup("nominations") || { maxTitle: 7 };
  // Nomination Title
  /*
  (PA-156) Added max word length to Nomination title. Value should be defined in settings as:

  { "type": "nominations", "label": "Entry for nominations max title length, etc", "value": {"maxTitle": 7} } 
  */
  validations.title = !!data.title &&
    data.title.split(/\s/).length <= nominationsSettings.maxTitle;

  // Single Nominee
  // - ensure first and last names
  validations.nominee =
    data.nominee &&
    data.nominee.hasOwnProperty("firstname") &&
    data.nominee.hasOwnProperty("lastname") &&
    data.nominee.firstname !== "" &&
    data.nominee.lastname !== "";

  // Primary contact information
  validations.primary_contact =
    data.contacts.primary &&
    data.contacts.primary.hasOwnProperty("firstname") &&
    data.contacts.primary.hasOwnProperty("lastname") &&
    data.contacts.primary.hasOwnProperty("email") &&
    data.contacts.primary.firstname !== "" &&
    data.contacts.primary.lastname !== "" &&
    data.contacts.primary.email !== "";

  // Video contact information
  validations.video_contact =
    data.contacts.video &&
    data.contacts.video.hasOwnProperty("firstname") &&
    data.contacts.video.hasOwnProperty("lastname") &&
    data.contacts.video.hasOwnProperty("email") &&
    data.contacts.video.firstname !== "" &&
    data.contacts.video.lastname !== "" &&
    data.contacts.video.email !== "";

  // Video location information
  validations.locations =
    (data.contacts.video.locations || []).filter(
      (location) =>
        !(
          location.hasOwnProperty("address") &&
          location.hasOwnProperty("city") &&
          location.address !== "" &&
          location.city !== ""
        )
    ).length === 0;

  // Aggregate contact information
  validations.contacts =
    validations.locations &&
    validations.primary_contact &&
    validations.video_contact;

  // Nominators
  // - ensure nominators exist and are complete
  validations.nominators =
    data.nominators.length > 0 &&
    data.nominators.filter((nominator) => {
      return !(
        nominator &&
        nominator.hasOwnProperty("firstname") &&
        nominator.hasOwnProperty("lastname") &&
        nominator.hasOwnProperty("title") &&
        nominator.hasOwnProperty("email") &&
        nominator.firstname !== "" &&
        nominator.lastname !== "" &&
        nominator.title !== "" &&
        nominator.email !== ""
      );
    }).length === 0;

  // Partners
  // - allow for zero partners (PA-151), or 
  // - ensure nominee count is above zero
  // - ensure all partners have organizations
  validations.partners =
  ( data.partners.length === 0 ) || ( data.partners.length > 0 &&
    data.partners.filter((partner) => {
      return !partner.organization;
    })).length === 0;

  // Evaluation
  // - compare section/total word counts to limits
  validations.evaluation =
    wordCounts.total > 0 &&
    wordCounts.total <= wordCountsMax.total &&
    wordCounts.summary <= wordCountsMax.summary &&
    wordCounts.context <= wordCountsMax.context;

  // Attachments
  // - ensure files exists
  validations.attachments =
    (data.category !== "leadership" &&
      data.category !== "emerging-leader" &&
      data.category !== "legacy") ||
    data.attachments.length > 0 ||
    ((data.attachments || []).length > 0 &&
      data.attachments.filter((attachment) => !attachment.file).length > 0);

  return nomination.sections.map((section) => {
    return {
      id: section.id,
      label: section.label,
      valid: !validations.hasOwnProperty(section.id) || validations[section.id],
    };
  });
}

/**
 * Validate email address
 * Reference: https://stackoverflow.com/a/46181 (Retrieved Jan 18, 2022)
 * **/

const validateEmail = (email) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export { validateEmail };
/**
 * Validate phone number
 * Reference: https://stackoverflow.com/a/29767609 (Retrieved Jan 25, 2022)
 * Valid formats:
     (123) 456-7890
     (123)456-7890
     123-456-7890
     123.456.7890
     1234567890
     +31636363634
     075-63546725
 * **/

const validatePhone = (phone) => {
  return !!String(phone)
    .toLowerCase()
    .match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im);
};
export { validatePhone };
