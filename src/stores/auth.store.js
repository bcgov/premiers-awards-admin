/**
 * Authenticated user store
 *
 * Schema:
 *         guid: '',
 *         username: '',
 *         firstname: '',
 *         lastname: '',
 *         role: '',
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
            const [error, user] = await get(`app/users/info`);
            if (!error && user.hasOwnProperty('role')) {
                this.current = user;
                this.isAdmin = user.role === 'administrator' || user.role === 'super-administrator';
                this.isSuperAdmin = user.role === 'super-administrator';
            }
            this.error = error;
            this.loading = false;
        }
    }
});

