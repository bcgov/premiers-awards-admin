/**
 * Users state (Pinia)
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
            roles: ['inactive']
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
                roles: ['inactive']
            };
        },
        // Get all users
        async getAll() {
            this.loading = true;
            const [error, users] = await get(`admin/users/view`);
            this.items = users;
            this.error = error;
            this.loading = false;
        },
        // Load current user data into store
        async getCurrent() {
            this.loading = true;
            if (!this.error) {
                const [error, user] = await get(`admin/users/info`);
                if (user) {
                    this.current = user;
                    // set user roles/status
                    const {guid='', username='', firstname='', lastname='', email='', roles=['inactive']} = user || {};
                    this.selected = {
                        guid: guid,
                        username: username,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        roles: roles.length > 0 ? roles : ['inactive']
                    };
                }
                this.error = error;
            }
            this.loading = false;
        },
        // Add new user
        async insert() {
            this.loading = true;
            const [error, ] = await post(`admin/users/register`, this.selected);
            this.error = error;
            this.loading = false;
        },
        // Add new user
        async register() {
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
        }
    }
});

