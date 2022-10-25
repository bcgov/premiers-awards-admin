/*!
 * Store services (Vue)
 * File: store.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.services';
import {getWordCount, validateEmail, validatePhone} from '@/services/validation.services'
import formServices from '@/services/settings.services'
Vue.use(Vuex)

/**
 * File attachment model
 */

const initSettings = {
  year: 2022,
  draftLimit: 12
}
const initUser = {}
const initNomination = {
  type: 'individual',
  seq: -1,
  category: '',
  year: null,
  submitted: false,
  guid: '',
  organization: '',
  acknowledgment: 'not_accepted',
  title: '',
  nominee: {
    firstname: '',
    lastname: ''
  },
  nominees: 0,
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
      locations: [{
        address         : '',
        city            : ''
      }]
    }
  },
  nominators: [{
    firstname       : '',
    lastname        : '',
    title           : '',
    email           : ''
  }, {
    firstname       : '',
    lastname        : '',
    title           : '',
    email           : ''
  }],
  evaluation: {
    summary: '',
    context: '',
    complexity: '',
    approach: '',
    valuing_people: '',
    commitment: '',
    contribution: '',
    impact: ''
  }
}

const initAttachments = [{
  file: null,
  label: '',
  description: ''
}]

const initMaxCounts = {
  total: 1650,
  summary: 150,
  context: 250
}

const initValidation = {
  organization: false,
  acknowledgment: false,
  title: false,
  nominee: false,
  partners: false,
  contacts: false,
  nominators: false,
  evaluation: false,
  attachments: false,
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
}

const initMessage = {
  text: '',
  type: '',
  spinner: false
}

/**
 * State storage
 */

const state = {
  user: initUser,
  settings: initSettings,
  nomination: initNomination,
  attachments: [],
  validation: initValidation,
  message: initMessage,
  error: false,
  loading: false
};

/**
 * State getters
 */

const getters = {
  isAuthenticated: state => {
    return !!state.user && !!state.user.guid && !!state.user.username && !!state.user.role
  },
  isNominator: state => {
    return state.user.role === 'nominator' || state.user.role === 'administrator' || state.user.role === 'super-administrator'
  },
  isAdmin: state => {
    return state.user.role === 'administrator' || state.user.role === 'super-administrator'
  },
  isSuperAdmin: state => {
    return state.user.role === 'super-administrator'
  },
  getMessage: state => {
    return state.message || initMessage
  },
  isError: state => {
    return state.error
  },
  isLoading: state => {
    return state.loading
  },
  getUser: state => {
    const {
      guid='',
      username='',
      firstname='',
      lastname='',
      email='',
      role='' } = state.user;
    return {
      guid: guid,
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role
    }
  },
  getSettings: state => {
    return state.settings || initSettings
  },
  getNomination: state => {
    return state.nomination || initNomination
  },
  getAttachments: state => {
    return state.attachments || initAttachments
  },
  getValidation: state => {
    // run validation check

    // Acknowledgement
    state.validation.acknowledgment = state.nomination.acknowledgment === 'accepted'

    // Organization
    state.validation.organization = !!state.nomination.organization

    // Organization
    state.validation.title = !!state.nomination.title

    // Single Nominee
    if (formServices.lookupType(state.nomination.category) === 'individual') {
      state.validation.nominee = !!state.nomination.nominee
        && !!state.nomination.nominee.firstname
        && !!state.nomination.nominee.lastname
        && state.nomination.nominee.firstname.length > 0
        || state.nomination.nominee.lastname.length > 0
      state.validation.partners = true
    } else {
      // Partners
      // - ensure nominee count is above zero
      // - ensure all partners have organizations
      state.validation.nominee = true
      state.validation.partners = state.nomination.nominees > 0
        && state.nomination.partners.filter(partner => {
        return !partner.organization
      }).length === 0;
    }

    // Nominators
    const hasAdditional = state.nomination.nominators[1].firstname.length > 0
      || state.nomination.nominators[1].lastname.length > 0
      || state.nomination.nominators[1].title.length > 0
      || state.nomination.nominators[1].email.length > 0

    const nominator1Complete = state.nomination.nominators[0].firstname.length > 0
      && state.nomination.nominators[0].lastname.length > 0
      && state.nomination.nominators[0].title.length > 0
      && validateEmail(state.nomination.nominators[0].email);

    const nominator2Complete = state.nomination.nominators[1].firstname.length > 0
      && state.nomination.nominators[1].lastname.length > 0
      && state.nomination.nominators[1].title.length > 0
      && validateEmail(state.nomination.nominators[1].email);

    state.validation.nominators = hasAdditional ? nominator1Complete && nominator2Complete : nominator1Complete;

    // Contacts
    state.validation.contacts = state.nomination.contacts.primary.firstname.length > 0
      && state.nomination.contacts.primary.lastname.length > 0
      && validateEmail(state.nomination.contacts.primary.email)
      && validatePhone(state.nomination.contacts.primary.phone)
      && state.nomination.contacts.video.firstname.length > 0
      && state.nomination.contacts.video.lastname.length > 0
      && validateEmail(state.nomination.contacts.video.email)
      && state.nomination.contacts.video.locations
        .filter(location => {
          return location.city.length === 0 || location.address.length === 0
        }).length === 0

    // Evaluation
    let wordCount = 0;
    Object.keys(state.nomination.evaluation || {}).map(key => {
      wordCount += getWordCount(state.nomination.evaluation[key])
    })

    state.validation.counts = {
      max: initMaxCounts,
      total: wordCount,
      summary: getWordCount(state.nomination.evaluation.summary || ''),
      context: getWordCount(state.nomination.evaluation.context || ''),
      complexity: getWordCount(state.nomination.evaluation.complexity || ''),
      approach: getWordCount(state.nomination.evaluation.approach || ''),
      valuing_people: getWordCount(state.nomination.evaluation.valuing_people || ''),
      commitment: getWordCount(state.nomination.evaluation.commitment || ''),
      contribution: getWordCount(state.nomination.evaluation.contribution || ''),
      impact: getWordCount(state.nomination.evaluation.impact || '')
    }

    state.validation.evaluation = state.validation.counts.total > 0
      && state.validation.counts.total <= state.validation.counts.max.total
      && state.validation.counts.summary <= state.validation.counts.max.summary
      && state.validation.counts.context <= state.validation.counts.max.context

    // Attachments
    state.validation.attachments = state.attachments.length > 0
      && state.attachments.filter(attachment => {return !attachment.file}).length === 0;

    return state.validation
  }
};

/**
 * Actions
 */

const actions = {
  setMessage({ commit }, newValue) {
    const { text='', type='', spinner=false } = newValue || {}
    commit("setMessage", { text: text, type: type, spinner: spinner });
  },
  resetMessage({ commit }) {
    commit("resetMessage");
  },
  async login({commit}) {
    try {
      const response = await api.get('users/login') || {}
      const { data = {} } = response || {}
      const { user = {} } = data || {}
      await commit('setUser', user)
    } catch (err) {
      console.error(err);
      await commit('setMessage', {
          text: 'Please sign in to access this site.',
          type: 'danger'
        })
    }
  },
  async logout({commit}){
    await api.post('users/logout')
    await commit('logout')
  },
  async refresh({ commit }, accessToken) {
    commit('refresh', accessToken);
  },
  async createNomination({ commit }, init) {

    // initialization
    commit('resetNomination')
    commit('setError', false)
    commit('setMessage', {
      text: 'Creating new nomination...',
      type: 'info',
      spinner: true
    })

    // check if user has exceeded draft limit
    const response = await api.get(`data/user/${init.guid}`) || []
    const { data=[] } = response || {}
    const nDrafts = data.filter(nomination => {return !nomination.submitted}).length
    if ( nDrafts > init.settings.draftLimit) {
      commit('setError', true)
      commit('setMessage', {
        text: `Nomination could not be created. You are limited to ${init.settings.draftLimit} drafts. Delete an existing draft to start a new nomination to continue.`,
        type: 'danger'
      })
      return null
    }
    else {
      // initialize nomination data
      initNomination.category = init.category || '';
      initNomination.year = init.settings.year || '';
      initNomination.guid = init.guid || '';
      commit("setNomination", initNomination)
      commit("setAttachments", initAttachments)

      // create nomination via API
      const response = await api.post(`data/create`, initNomination)
      const { data = {} } = response || {}

      // update nomination state
      commit("setNomination", data)
      commit('setMessage', {
        text: 'Created new nomination.',
        type: 'success'
      })
      return {
        id: data._id,
        category: init.category,
        year: init.settings.year
      }
    }
  },
  async removeNomination({ commit }, id) {
    commit('resetNomination')
    commit('setError', false)
    commit('setMessage', {
      text: 'Deleting nomination...',
      type: 'info',
      spinner: true
    })

    await api.get(`data/delete/${id}`)
    commit('resetMessage')
    commit('setMessage', {
      text: 'Nomination deleted successfully!',
      type: 'success',
      spinner: false
    })
  },
  async loadNomination({ commit }, id) {

    // initialization
    commit('resetNomination')
    commit('setError', false)
    commit('setLoading', true)
    commit('setMessage', {
      text: 'Loading nomination data...',
      type: 'info',
      spinner: true
    })

    const nomination = await api.get(`data/view/${id}`)
    const attachments = await api.get(`attachments/view/${id}`) || []

    // does this nomination exist?
    if ( !nomination.data ) {
      commit('setMessage', {
        text: 'Nomination could not be found.',
        type: 'danger'
      })
      commit('setError', true)
      commit('setLoading', false)
    }
    else {
      // store nomination + attachment data in state
      commit("setNomination", nomination.data || {})
      commit('setAttachments', attachments.data || [])
      commit('resetMessage')
      commit('setLoading', false)
    }
  },
  async loadAttachments({ commit }, guid) {

    // initialization
    commit('setError', false)
    commit('setLoading', true)
    commit('setMessage', {
      text: 'Loading attachments data...',
      type: 'info',
      spinner: true
    })
    const attachments = await api.get(`attachments/view/${guid}`) || []
    commit('setAttachments', attachments.data || [])
    commit('resetMessage')
    commit('setLoading', false)
  },
  async getUserNominations( {commit}, userID ) {
    commit('resetNomination')
    commit('resetMessage')
    return await api.get(`data/user/${userID}`)
      .then(response => {
        const {data = []} = response || {}
        return data
          .map(nomination => {
          const {
            _id=null,
            submitted=false,
            category=null,
            organization='',
            title='',
            nominee={},
            updatedAt=null,
            createdAt=null,
          } = nomination || {}
          const { firstname='', lastname=''} = nominee || {}
          const updatedTS = new Date(updatedAt)
          const createdTS = new Date(createdAt)
          return {
            id: _id,
            submitted: submitted,
            status: submitted ? 'Submitted' : 'Draft',
            category: category,
            organization: formServices.lookup('organizations', organization),
            title: title || `${firstname} ${lastname}`,
            created: createdTS,
            updated: updatedTS,
            data: nomination
          }
        })
      })
  },
  setNomination({ commit }, newValue) {
    commit("setNomination", newValue);
  },
  resetNomination({ commit }) {
    commit("resetNomination");
  },
  setValidation({ commit }, newValue) {
    commit("setValidation", newValue);
  },
  async getUserById ( {commit}, guid) {
    commit("resetMessage");
    return await api.get(`users/view/${guid}`)
      .then(response => {
        const {data = {}} = response || {}
        const {
          _id = null,
          role = '',
          guid = '',
          username = '',
          firstname = '',
          lastname = '',
          email = '',
          createdAt = '',
          updatedAt = ''
        } = data || {}
        const updatedTS = new Date(updatedAt)
        const createdTS = new Date(createdAt)
        return {
          id: _id,
          role: role,
          guid: guid,
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          created: createdTS,
          updated: updatedTS,
        }
      })
  },
  async getUsers( {commit} ) {
    commit('resetNomination')
    commit('resetMessage')
    return await api.get(`users/view/`)
      .then(response => {
        const {data = []} = response || {}
        return data
          .map(user => {
            const {
              _id=null,
              role='',
              guid='',
              username='',
              firstname='',
              lastname='',
              email='',
              createdAt='',
              updatedAt=''
            } = user || {}
            const updatedTS = new Date(updatedAt)
            const createdTS = new Date(createdAt)
            return {
              id: _id,
              role: role,
              guid: guid,
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              created: createdTS,
              updated: updatedTS,
            }
          })
      })
  },
  async activateUser ( {commit}, guid) {
    commit('setError', false)
    commit('setMessage', {
      text: 'Activating user...',
      type: 'info',
      spinner: true
    })
    return await api.get(`users/activate/${guid}`)
  },
  async removeUser({ commit }, guid) {
    commit('setError', false)
    commit('setMessage', {
      text: 'Deleting user...',
      type: 'info',
      spinner: true
    })
    await api.get(`users/delete/${guid}`)
    commit('resetMessage')
    commit('setMessage', {
      text: 'User deleted successfully!',
      type: 'success',
      spinner: false
    })
  },
  handleError ({ commit }, message) {
    commit('setMessage', message)
    commit('setError', true)
  }
};

/**
 * State mutations
 */

const mutations = {
  logout(state){
    localStorage.clear()
    state.user = null
  },
  refresh(state, accessToken) {
    state.status.loggedIn = true;
    state.user = {...state.user, accessToken: accessToken};
  },
  setMessage( state, message ) {
    state.message = message
  },
  resetMessage (state) {
    state.message = initMessage
  },
  setError( state, isError ) {
    state.error = isError
  },
  setLoading( state, isLoading ) {
    state.loading = isLoading
  },
  setUser(state, user){
    state.user = user
  },
  setNomination(state, data) {
    state.nomination = Object.assign({}, state.nomination, data)
  },
  resetNomination(state) {
    state.nomination = initNomination
  },
  setAttachments(state, data) {
    state.attachments = data
  },
  setValidation(state, data) {
    state.validation = Object.assign({}, state.validation, data)
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

