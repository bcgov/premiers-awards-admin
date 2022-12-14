/**
 * Users state (Pinia)
 *
 * Schema: [{
 *         guid: '',
 *         username: '',
 *         firstname: '',
 *         lastname: '',
 *         email: '',
 *         role: ''
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

export const usersDataStore = defineStore({
    id: 'userData',
    state: () => ({
        items: [],
        selected: {
            guid: '',
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            role: 'inactive'
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
                guid: '',
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                role: 'inactive'
            };
        },
        // Get all users
        async getAll() {
            this.loading = true;
            const [error, items] = await get(`admin/users/view`);
            this.items = items;
            this.error = error;
            this.loading = false;
        },
        // Get user by GUID
        // async getByID(guid) {
        //     this.loading = true;
        //     const [error, result] = await get(`admin/users/view/${guid}`);
        //     this.selected = result;
        //     this.error = error;
        //     this.loading = false;
        // },
        // Add new user
        async insert() {
            this.loading = true;
            const [error, ] = await post(`admin/users/register`, this.selected);
            this.error = error;
            this.loading = false;
        },
        // Update user data
        async update() {
            const {guid=''} = this.selected || {};
            this.loading = true;
            const [error, ] = await post(`admin/users/update/${guid}`, this.selected);
            this.error = error;
            this.loading = false;
        },
        // Delete user
        async remove() {
            this.loading = true;
            const {guid=''} = this.selected || {};
            const [error, ] = await get(`admin/users/delete/${guid}`);
            this.error = error;
            this.loading = false;
        },
        // Activate user
        async activate() {
            this.loading = true;
            const {guid=''} = this.selected || {};
            const [error, ] = await get(`admin/users/activate/${guid}`);
            this.error = error;
            this.loading = false;
        },
        // Assign user role
        async assign() {
            this.loading = true;
            const {guid='', role=''} = this.selected || {};
            const [error, ] = await post(`admin/users/assign/${guid}`, {role: role});
            this.error = error;
            this.loading = false;
        }
    }
});

