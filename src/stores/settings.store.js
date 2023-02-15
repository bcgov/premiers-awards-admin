/**
 * Settings state (Pinia)
 *
 * Schema: [{
 *         guid: '',
 *         username: '',
 *         firstname: '',
 *         lastname: '',
 *         email: '',
 *         roles: []
 *         }]
 *
 * @param {Array} items
 * @param {Object} user
 * @param {Boolean} loading
 * @param {Object} error
 *
 * **/

import { defineStore } from 'pinia';
import { get, post } from '@/services/api.services'

export const settingsStore = defineStore({
    id: 'userData',
    state: () => ({
        items: [],
        selected: {
            type: '',
            label: '',
            value: ''
        },
        loading: false,
        error: null
    }),
    getters: {
        getErrors: (state) => state.error,
    },
    actions: {
        // Reset selected item
        async reset() {
            this.loading = false;
            this.error = null;
            this.selected = {
                type: '',
                label: '',
                value: '',
            };
        },
        // Get all settings
        async getAll() {
            this.loading = true;
            const [error, settings] = await get(`admin/settings/view`);
            this.items = settings;
            this.error = error;
            this.loading = false;
        },
        // Get setting by ID
        async get(id) {
            this.loading = true;
            const [error, setting] = await get(`admin/settings/${id}`);
            this.items = setting;
            this.error = error;
            this.loading = false;
        },
        // Add new user
        async insert() {
            this.loading = true;
            const [error, ] = await post(`admin/settings/create`, this.selected);
            this.error = error;
            this.loading = false;
        },
        // Update user data
        async update() {
            const {_id=''} = this.selected || {};
            this.loading = true;
            const [error, ] = await post(`admin/settings/update/${_id}`, this.selected);
            this.error = error;
            this.loading = false;
        },
        // Delete user
        async remove() {
            this.loading = true;
            const {id=''} = this.selected || {};
            const [error, ] = await get(`admin/settings/delete/${id}`);
            this.error = error;
            this.loading = false;
        }
    }
});

