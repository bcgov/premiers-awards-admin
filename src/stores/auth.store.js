/**
 * Authenticated user store
 *
 * Schema:
 *         guid: '',
 *         username: '',
 *         firstname: '',
 *         lastname: '',
 *         roles: [],
 *         email: '',
 *
 * @param {Object} current
 * @param {Boolean} loading
 * @param {Object} error
 *
 * **/

import { defineStore } from 'pinia';
import { get } from '@/services/api.services'

export const authDataStore = defineStore({
    id: 'authData',
    state: () => ({
        current: {},
        loaded: false,
        isRegistered: false,
        isActive: false,
        isNominator: false,
        isAdmin: false,
        isSuperAdmin: false,
        loading: false,
        error: null
    }),
    getters:{
        getErrors: (state) => state.error,
    },
    actions:{
        // Load current logged-in user info
        async currentUserInit() {
            this.loading = true;
            if (!this.error) {
                const [error, user] = await get(`admin/users/info`);
                // check if user was authenticated through SiteMinder
                if (user && user.hasOwnProperty('roles')) {
                    this.current = user;
                    // set user roles/status
                    const {_id="", roles=[]} = user || {};
                    // user is registered if a user ID is already assigned
                    this.isRegistered = !!_id;
                    this.isActive = !roles.includes('inactive');
                    this.isNominator = roles.includes('nominator');
                    this.isAdmin = roles.includes('administrator') || roles.includes('super-administrator');
                    this.isSuperAdmin = roles.includes('super-administrator');
                }
                this.error = error;
            }
            this.loading = false;
        }
    }
});

