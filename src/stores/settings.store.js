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

import { ref, watch, computed } from "vue";
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
    hasLoaded: (state) => {
      return state.items != undefined && state.items.length > 0;
    },
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
    // lookup setting by type and, if defined, the key within the value
    // Returns: Only type defined: entire settings content
    //          type+key defined: label by default,
    //          key+type+fullValue(true) defined: entire setting contents of the selected key
    lookupItem(type, key, fullValue) {
      try {
        if (this.items == undefined || this.items.length == 0) {
          this.getAll();
        }
        if (key != undefined && this.items.length > 0) {
          const setting = this.items.find((item) => item.type === type);
          const jsonSetting = setting.value;
          const keySetting = jsonSetting.find((item) => item.key === key);
          if (keySetting && !fullValue)
            return keySetting.label && keySetting.label.length > 0
              ? keySetting.label
              : jsonSetting;
          if (keySetting && fullValue) return keySetting;
        } else if (key == undefined && this.items.length > 0) {
          const setting = this.items.find((item) => item.type === type);
          const jsonSetting = setting.value;
          if (fullValue) return jsonSetting;
          try {
            const sorted = jsonSetting.sort((a, b) => {
              if (a.label < b.label) {
                return -1;
              }
            });
            return sorted;
          } catch (e) {
            return jsonSetting;
          }
        } else {
          console.log(
            "[ERROR] -  Settings.store.js: Cannot find lookup (type, key): ",
            type,
            ",",
            key
          );
          return "NOT FOUND";
        }
      } catch (e) {
        console.log(
          "[ERROR] -  Settings.store.js: Cannot find lookup --- Caught error:",
          e
        );
        return "NOT FOUND";
      }
    },
    /*
      This function returns a Proxy object and then creates a watch on the .items array. When the items have finally loaded the watch callback performs the lookup again and updates the value.
      Take note that a setting can be changed unexpectedly because the proxy/ref being returned is probably changed somewhere down the line.
    */
    lookup(type, key, fullValue) {
      if (this.items == undefined || this.items.length == 0) {
        this.getAll();
      }
      const proxy = ref(this.lookupItem(type, key, fullValue));
      const loadedData = computed(() => {
        return proxy.value || null;
      });

      watch(
        () => this.items,
        () => {
          if (!this.hasLoaded) return;
          proxy.value = this.lookupItem(type, key, fullValue);
        },
        { immediate: true }
      );

      return loadedData.value;
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
      const [error] = await get(`admin/settings/delete/${_id}`);
      this.error = error;
      this.loading = false;
    },
    async checkSection(section, category) {
      const metadata = this.lookup("categories", category);
      if (!metadata) return null;
      return metadata.sections.filter((sec) => sec.id === section).length > 0;
    },
  },
});
