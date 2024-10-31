/**
 * Nominations state (Pinia)
 *
 *
 * @param {Array} items
 * @param {Object} nomination
 * @param {Boolean} loading
 * @param {Object} error
 *
 * **/

import { defineStore } from "pinia";
import { download, get, post, upload } from "@/services/api.services";
import { getWordCount } from "@/services/util.services";
import { validateNomination } from "@/services/validation.services";
import { settingsStore } from "@/stores/settings.store";

// const settings = settingsStore();
// await settings.getAll();
// // get current word count limits
// const maxWordCounts = settings.get("wordCounts");
// const maxAttachments = settings.get("maxAttachments");

// const lookup = function (key, value) {
//   return settings.lookup(key, value);
// };

/* 
  PA-164, alters wordCountsMax.total to use the category's max or default.
  Used by all the occurances of wordCountsMax in the store, and then also where ever the store is used.
  Altered the setting's JSON to be 
  { "total": { "default": 1700, "legacy": 2125, "leadership": 2125}, "summary": 160, "context": 260 }
*/
const getMaxWordCounts = (state) => {
  const settings = settingsStore(),
    wordCountsMax = settings.lookup("wordCounts", undefined, true),
    category = state.selected.category.toLowerCase();

  if ( typeof wordCountsMax.total == "object" ) {

    wordCountsMax.total = wordCountsMax.total[category] || wordCountsMax.total.default || 1700;
  }
  
  return wordCountsMax;
};

export const nominationsDataStore = defineStore({
  id: "nominationData",
  state: () => ({
    items: [],
    selected: null,
    loading: false,
    saving: false,
    downloading: false,
    error: null,
    attachmentError: null,
    settings: null,
  }),
  getters: {
    wordCounts: (state) => {
      if (!state.selected) return {};

      let wordCountTotal = 0;
      const wordCounts = {
        summary: getWordCount(state.selected.evaluation.summary || ""),
        context: getWordCount(state.selected.evaluation.context || ""),
        complexity: getWordCount(state.selected.evaluation.complexity || ""),
        approach: getWordCount(state.selected.evaluation.approach || ""),
        valuing_people: getWordCount(
          state.selected.evaluation.valuing_people || ""
        ),
        commitment: getWordCount(state.selected.evaluation.commitment || ""),
        contribution: getWordCount(
          state.selected.evaluation.contribution || ""
        ),
        impact: getWordCount(state.selected.evaluation.impact || ""),
      };
      Object.keys(state.selected.evaluation || {}).forEach((key) => {
        wordCountTotal += getWordCount(state.selected.evaluation[key]);
      });
      wordCounts.total = wordCountTotal;
      return wordCounts;
    },
    getErrors: (state) => state.error,
    getAttachmentErrors: (state) => state.attachmentError,
    submitted: (state) => {
      return state.selected && state.selected.submitted;
    },
    validateAttachments: (state) => {
      const settings = settingsStore();
      const maxAttachments = settings.get("maxAttachments");
      if ( state.selected == null || state.selected.attachments == null ) return false;
      return state.selected.attachments.length >= maxAttachments;
    },
    validate: (state) => {
      const settings = settingsStore();
      if (settings.items == undefined || settings.items == [])
        settings.getAll();
      if (!state.selected) return [];
      var wordCounts = state.wordCounts;
      //var wordCountsMax = settings.lookup("wordCounts", undefined, true);
      var wordCountsMax = getMaxWordCounts(state); // PA-164 Get category specific max counts
      var nomination = settings.lookup(
        "categories",
        state.selected.category,
        true
      );
      return validateNomination(
        state.selected,
        wordCounts,
        wordCountsMax,
        nomination
      );
    },
    // New validation in order to facilitate the individual text fields for each category when editing Evaluations (PA-153)
    validationDeep: (state) => {
      if (!state.selected) return [];

      const settings = settingsStore();
      const validations = state.validate;

      //var wordCountsMax = settings.lookup("wordCounts", undefined, true);
      const wordCountsMax = getMaxWordCounts(state); // PA-164 Get category specific max counts

      const getSections = () => {
        const sections = [],
          nomination = settings.lookup(
            "categories",
            state.selected.category,
            true
          );

        (nomination.evaluation || []).forEach((value) => {
          const label = settings.lookup("evaluationSections", value);
          sections.push({
            label: label,
            valid:
              state.wordCounts[value] &&
              state.wordCounts[value] <= (wordCountsMax[value] || 1000),
          });
        });

        return sections;
      };

      (validations.find((item) => item.id === "evaluation") || {}).items = getSections();

      return validations;
    },
    // PA-164 Get category specific max counts
    wordCountsMax: (state) => {
      return getMaxWordCounts(state);
    },
    // PA-149 Gets the nominations open boolean from server. Defaults to true
    isOpen: async () => {

      const [errors, resp] = await get("nominations/open");
      
      if ( errors ) {
        return true;
      }

      return resp && resp.open === true;
    }
  },
  actions: {
    // Reset selected item
    async reset() {
      this.loading = false;
      this.error = null;
      this.selected = {
        seq: null,
        category: "",
        guid: "",
        owner: null,
        submitted: false,
        filePath: "",
        organizations: [],
        title: "",
        nominee: {
          firstname: "",
          lastname: "",
          organization: "",
        },
        nominees: null,
        partners: [],
        contacts: {
          primary: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
          },
          video: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            locations: [],
          },
        },
        nominators: [],
        acknowledgment: false,
        evaluation: {
          summary: "",
          context: "",
          complexity: "",
          approach: "",
          valuing_people: "",
          commitment: "",
          contribution: "",
          impact: "",
        },
        attachments: [],
        createdAt: null,
        updatedAt: null,
        counts: {
          total: 0,
          summary: 0,
          context: 0,
          complexity: 0,
          approach: 0,
          valuing_people: 0,
          commitment: 0,
          contribution: 0,
          impact: 0,
        },
      };
    },
    // Get all nominations
    async getAll() {
      const settings = settingsStore();
      await settings.getAll();

      const lookup = function (key, value) {
        return settings.lookup(key, value);
      };

      this.loading = true;
      const [error, items] = await get(`nominations/view`);

      // update data properties needed for CSV export
      items.map((each, i) => {
        const number = {
          number: i + 1,
        };
        const ministry = {
          ministry: each.organizations.map((o) =>
            JSON.stringify(lookup("organizations", o))
          ),
        };
        const primaryNominator = {
          primaryNominator: each.nominators.length
            ? `${each.nominators[0].firstname} ${each.nominators[0].lastname}`
            : "-",
        };
        const primaryNominatorTitle = {
          primaryNominatorTitle: each.nominators.length
            ? `${each.nominators[0].title}`
            : "-",
        };
        const primaryNominatorEmail = {
          primaryNominatorEmail: each.nominators.length
            ? `${each.nominators[0].email}`
            : "-",
        };
        const coNominator = {
          coNominator:
            each.nominators.length > 1
              ? `${each.nominators[1].firstname} ${each.nominators[1].lastname}`
              : "-",
        };

        const coNominatorTitle = {
          coNominatorTitle:
            each.nominators.length > 2 ? `${each.nominators[1].title}` : "-",
        };
        const coNominatorEmail = {
          coNominatorEmail:
            each.nominators.length > 1 ? `${each.nominators[1].email}` : "-",
        };
        const nominationContact = {
          nominationContact: each.contacts.primary
            ? `${each.contacts.primary.firstname} ${each.contacts.primary.lastname}`
            : "-",
        };
        const nominationContactEmail = {
          nominationContactEmail: each.contacts.primary
            ? each.contacts.primary.email
            : "-",
        };
        const nominationContactPhone = {
          nominationContactPhone: each.contacts.primary
            ? each.contacts.primary.phone
            : "-",
        };
        const videoContact = {
          videoContact: each.contacts.video
            ? `${each.contacts.video.firstname} ${each.contacts.video.lastname}`
            : "-",
        };
        const videoContactEmail = {
          videoContactEmail: each.contacts.video
            ? each.contacts.video.email
            : "-",
        };

        each = Object.assign(
          each,
          ministry,
          number,
          primaryNominator,
          primaryNominatorEmail,
          primaryNominatorTitle,
          coNominator,
          coNominatorTitle,
          coNominatorEmail,
          nominationContact,
          nominationContactEmail,
          nominationContactPhone,
          videoContact,
          videoContactEmail
        );
      });

      this.items = items;
      this.error = error;
      this.loading = false;
    },
    // Get all nominations for current user
    async getByGUID(guid) {
      this.loading = true;
      const [error, items] = await get(`nominations/view/user/${guid}`);
      this.items = items;
      this.error = error;
      this.loading = false;
    },
    // Get nomination by ID
    async getByID(id) {
      this.loading = true;
      const [error, item] = await get(`nominations/view/${id}`);
      this.selected = item;
      this.error = error;
      this.loading = false;
    },
    // Create new nomination
    async create(category) {
      this.loading = true;
      const [error, item] = await get(`nominations/create/${category}`);
      this.selected = item;
      this.error = error;
      this.loading = false;
      return item;
    },
    // Update nomination data
    async update() {
      const { _id = "" } = this.selected || {};
      this.saving = true;
      const [error] = await post(`nominations/update/${_id}`, this.selected);
      this.error = error;
      this.saving = false;
    },
    // Delete nomination
    async remove() {
      this.loading = true;
      const { _id = "" } = this.selected || {};
      const [error] = await post(`nominations/delete/${_id}`, {});
      this.error = error;
      this.loading = false;
    },
    // Submit nomination for review
    async submit() {
      this.loading = true;
      const { _id = "" } = this.selected || {};
      const [error] = await post(`nominations/submit/${_id}`, {});
      this.selected.submitted = true;
      this.error = error;
      this.loading = false;
    },
    // Unsubmit nomination
    async unsubmit() {
      this.loading = true;
      const { _id = "" } = this.selected || {};
      const [error] = await get(`nominations/unsubmit/${_id}`);
      this.error = error;
      this.loading = false;
    },
    // Download zipped nomination package(s)
    async download(data, format) {
      this.downloading = true;
      // create query using IDs from nomination array
      const ids = encodeURIComponent(
        JSON.stringify(
          data.map((nomination) => {
            const { _id = "" } = nomination || {};
            return _id;
          })
        )
      );
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const filename = `package_${timestamp}.zip`;
      const [error] = await download(
        `nominations/export/${format}?ids=${ids}`,
        filename
      );
      this.error = error;
      this.downloading = false;
    },
    async getAttachments() {
      if (this.selected) {
        this.loading = true;
        const { _id = "" } = this.selected || {};
        const [error, attachments] = await get(
          `nominations/attachments/view/${_id}`
        );
        this.selected.attachments = attachments;
        this.error = error;
        this.loading = false;
      }
    },
    // Upload attachment
    async uploadAttachment(file, label, description) {
      const { _id = "" } = this.selected || {};
      // handle attachment submission
      let formData = new FormData();
      formData.append(`attached`, file);
      formData.append(`nomination`, _id);
      formData.append(`label`, label || "");
      formData.append(`description`, description || "");
      const [error, result] = await upload(
        `/nominations/attachments/upload/${_id}`,
        formData
      );
      this.error = error;
      return result;
    },
    // Update attachment metadata
    async updateAttachment(data) {
      const { _id = "" } = data || {};
      const [error] = await upload(
        `/nominations/attachments/update/${_id}`,
        data
      );
      this.attachmentError = error;
    },
    // Delete attachment from nomination
    async removeAttachment(id) {
      const [error] = await get(`/nominations/attachments/delete/${id}`);
      this.attachmentError = error;
    },
    // Download attachment file
    async downloadAttachment(attachment) {
      const { _id = "", file = null } = attachment || {};
      const { originalname = "" } = file || {};
      const [error] = await download(
        `/nominations/attachments/download/${_id}`,
        originalname
      );
      this.attachmentError = error;
    },
    // Add partner to selected
    async addPartner() {
      this.selected.partners.push({ organization: "" });
    },
    // Remove partner from selected
    async removePartner(index) {
      if (this.selected.partners.length > 0)
        this.selected.partners.splice(index, 1);
    },
    // Add nominator to selected
    async addNominator() {
      this.selected.nominators.push({
        firstname: "",
        lastname: "",
        title: "",
        email: "",
        branch: "",
        division: "",
      });
    },
    // Remove nominator from selected
    async removeNominator(index) {
      if (this.selected.nominators.length > 0)
        this.selected.nominators.splice(index, 1);
    },
    // Add location to selected
    async addLocation() {
      this.selected.contacts.video.locations.push({ address: "", city: "" });
    },
    // Remove location from selected
    async removeLocation(index) {
      if (this.selected.contacts.video.locations.length > 0)
        this.selected.contacts.video.locations.splice(index, 1);
    },
  },
});
