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

import { defineStore } from "pinia";
import { get, post } from "@/services/api.services";

export const settingsStore = defineStore({
  id: "settingData",
  state: () => ({
    items: [],
    selected: {
      type: "",
      label: "",
      value: "",
    },
    loading: false,
    error: null,
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
        type: "",
        label: "",
        value: "",
      };
      this.getAll();
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
    // lookup setting by type and key, and return it's label
    async lookup(type) {
      if (key != undefined) {
        const found = this.items[type].filter((item) => item.key === key);
        return found.length > 0 ? found[0].label : null;
      } else {
        return this.items.filter((item) => item.type === type);
      }
    },
    // lookup setting by type and key, and return it's label
    lookup(type, key) {
      if (key != undefined && this.items.length > 0) {
        const setting = this.items.find((item) => item.type === type);
        //console.log(test2.value);
        const jsonSetting = JSON.parse(setting.value);
        const keySetting = jsonSetting.find((item) => item.key === key);
        if (keySetting)
          return keySetting.label && keySetting.label.length > 0
            ? keySetting.label
            : jsonSetting;
      } else if (this.items.length > 0) {
        const test = this.items.filter((item) => item.type === type);
        return test;
      } else {
        console.log("[ERROR] -  Settings.store.js: Cannot find lookup");
        return "NOT FOUND";
      }
    },
    // Add new user
    async insert() {
      this.loading = true;
      const [error] = await post(`admin/settings/create`, this.selected);
      this.error = error;
      this.loading = false;
    },
    // Update user data
    async update() {
      const { _id = "" } = this.selected || {};
      this.loading = true;
      const [error] = await post(`admin/settings/update/${_id}`, this.selected);
      this.error = error;
      this.loading = false;
    },
    // Delete user
    async remove() {
      this.loading = true;
      const { _id = "" } = this.selected || {};
      const [error] = await get(`admin/settings/delete/${id}`);
      this.error = error;
      this.loading = false;
    },
  },
});
