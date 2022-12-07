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

import { defineStore } from 'pinia';
import {download, get, post, upload} from '@/services/api.services'
import {getWordCount} from "@/services/util.services";
import settings from '@/services/settings.services.js';

// get current word count limits
const maxWordCounts = settings.get('wordCounts');

const getWordCounts = (state) => {
        if (!state.selected) return {};

        let wordCountTotal = 0;
        const wordCounts = {
            summary: getWordCount(state.selected.evaluation.summary || ''),
            context: getWordCount(state.selected.evaluation.context || ''),
            complexity: getWordCount(state.selected.evaluation.complexity || ''),
            approach: getWordCount(state.selected.evaluation.approach || ''),
            valuing_people: getWordCount(state.selected.evaluation.valuing_people || ''),
            commitment: getWordCount(state.selected.evaluation.commitment || ''),
            contribution: getWordCount(state.selected.evaluation.contribution || ''),
            impact: getWordCount(state.selected.evaluation.impact || '')
        }
        Object.keys(state.selected.evaluation || {}).forEach(key => {
            wordCountTotal += getWordCount(state.selected.evaluation[key])
        })
        wordCounts.max = maxWordCounts;
        wordCounts.total = wordCountTotal;
        return wordCounts;
}

export const nominationsDataStore = defineStore({
    id: 'nominationData',
    state: () => ({
        items: [],
        selected: null,
        loading: false,
        error: null,
        attachmentError: null,
    }),
    getters: {
        getErrors: (state) => state.error,
        getAttachmentErrors: (state) => state.attachmentError,
        wordCounts: getWordCounts,
        submitted: (state) => {
            return state.selected && state.selected.submitted;
        },
        validate: (state) => {
            if (!state.selected) return [];
            const validations = {};
            const wordCounts = getWordCounts(state);
            const nomination = settings.lookupCategory(state.selected.category);

            // Nomination Acknowledgement
            validations.acknowledgment = !!state.selected.acknowledgment;

            // Nomination Title
            validations.title = !!state.selected.title;

            // Single Nominee
            // - ensure first and last names
            validations.nominee = state.selected.nominee.firstname !== '' &&
                state.selected.nominee.lastname !== '';

            // Partners
            // - ensure nominee count is above zero
            // - ensure all partners have organizations
            validations.partners = state.selected.nominees > 0 &&
                state.selected.partners.filter(partner => {
                    return !partner.organization
                }).length === 0;

            // Evaluation
            // - compare section/total word counts to limits
            validations.evaluation = wordCounts.total > 0
                && wordCounts.total <= wordCounts.max.total
                && wordCounts.summary <= wordCounts.max.summary
                && wordCounts.context <= wordCounts.max.context;

            // Attachments
            // - ensure files exists
            validations.attachments = (state.selected.attachments || []).length > 0
                && state.selected.attachments.filter(attachment => !attachment.file).length === 0;

            return nomination.sections.map(section => {
                return {
                    id: section.id,
                    label: section.label,
                    valid: !validations.hasOwnProperty(section.id) || validations[section.id]
                }
            });
        }
    },
    actions: {
        // Reset selected item
        async reset() {
            this.loading = false;
            this.error = null;
            this.selected = {
                seq: null,
                category: '',
                guid: '',
                owner: null,
                submitted: false,
                filePath: '',
                organization: '',
                title: '',
                nominee: {
                    firstname: '',
                    lastname: '',
                    organization: ''
                },
                nominees: null,
                partners: [],
                contacts: {
                    primary: {
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: ''
                    },
                    video: {
                        firstname: '',
                        lastname: '',
                        email: '',
                        locations: []
                    }
                },
                nominators: [],
                acknowledgment: 'not_accepted',
                evaluation: {
                    summary: '',
                    context: '',
                    complexity: '',
                    approach: '',
                    valuing_people: '',
                    commitment: '',
                    contribution: '',
                    impact: ''
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
                    impact: 0
                }
            };
        },
        // Get all nominations
        async getAll() {
            this.loading = true;
            const [error, items] = await get(`nominations/view`);
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
            this.selected = item ;
            this.error = error;
            this.loading = false;
        },
        // Create new nomination
        async create(category) {
            this.loading = true;
            const [error, item] = await get(`nominations/create/${category}`);
            this.error = error;
            this.loading = false;
            return item;
        },
        // Update nomination data
        async update() {
            const {_id=''} = this.selected || {};
            this.loading = true;
            const [error, ] = await post(`nominations/update/${_id}`, this.selected);
            this.error = error;
            this.loading = false;
        },
        // Delete nomination
        async remove() {
            this.loading = true;
            const {_id=''} = this.selected || {};
            const [error, ] = await get(`nominations/delete/${_id}`);
            this.error = error;
            this.loading = false;
        },
        // Submit nomination for review
        async submit() {
            this.loading = true;
            const {_id=''} = this.selected || {};
            const [error, ] = await get(`nominations/submit/${_id}`);
            this.error = error;
            this.loading = false;
        },
        // Unsubmit nomination
        async unsubmit() {
            this.loading = true;
            const {_id=''} = this.selected || {};
            const [error, ] = await get(`nominations/unsubmit/${_id}`);
            this.error = error;
            this.loading = false;
        },
        // Export nominations to file
        async export(ids, format) {
            this.loading = true;
            const [error, ] = await post(`nominations/export/${format}`, {ids: ids});
            this.error = error;
            this.loading = false;
        },
        // Download nomination as file
        async download() {
            this.loading = true;
            const {_id=''} = this.selected || {};
            const [error, ] = await get(`nominations/download/${_id}`);
            this.error = error;
            this.loading = false;
        },
        // Upload attachment
        async uploadAttachment (file, label, description) {
            const {_id = ''} = this.selected || {};
            // handle attachment submission
            let formData = new FormData();
            formData.append(`attached`, file);
            formData.append(`nomination`, _id);
            formData.append(`label`, label || '');
            formData.append(`description`, description || '');
            const [error,] = await upload(`/nominations/attachments/upload/${_id}`, formData);
            this.error = error;
        },
        // Update attachment metadata
        async updateAttachment (data) {
            const {_id=''} = data || {};
            const [error, ] = await upload(`/nominations/attachments/update/${_id}`, data);
            this.attachmentError = error;
        },
        // Delete attachment from nomination
        async removeAttachment(id) {
            const [error, ] = await get(`/nominations/attachments/delete/${id}`);
            this.attachmentError = error;
        },
        // Download attachment file
        async downloadAttachment(attachment) {
            const { _id='', file=null } = attachment || {};
            const { originalname='' } = file || {};
            const [error, ] = await download(`/nominations/attachments/download/${_id}`, originalname);
            this.attachmentError = error;
        },
        // Add partner to selected
        async addPartner() {
            this.selected.partners.push({organization: ''});
        },
        // Remove partner from selected
        async removePartner(index) {
            if (this.selected.partners.length > 0)
                this.selected.partners.splice(index, 1);
        },
        // Add nominator to selected
        async addNominator() {
            this.selected.nominators.push({
                firstname: '',
                lastname: '',
                title: '',
                email: ''
            });
        },
        // Remove nominator from selected
        async removeNominator(index) {
            if (this.selected.nominators.length > 0)
                this.selected.nominators.splice(index, 1);
        },
        // Add location to selected
        async addLocation() {
            this.selected.contacts.video.locations.push({address: '', city: ''});
        },
        // Remove location from selected
        async removeLocation(index) {
            if (this.selected.contacts.video.locations.length > 0)
                this.selected.contacts.video.locations.splice(index, 1);
        },
    }
});

