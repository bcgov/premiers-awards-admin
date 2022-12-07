/*!
 * Error service (Vue)
 * File: message.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

const messages = {
  insert: { text: 'New record added successfully!', type: 'success' },
  update: { text: 'Record updated successfully!', type: 'success' },
  remove: { text: 'Record deleted successfully!', type: 'success' },
  download: { text: 'File downloaded successfully!', type: 'success' },
  uploadAttachment: { text: 'New attachment added successfully!', type: 'success' },
  updateAttachment: { text: 'Attachment updated successfully!', type: 'success' },
  removeAttachment: { text: 'Attachment deleted successfully!', type: 'success' },
  downloadAttachment: { text: 'Attachment downloaded successfully!', type: 'success' },
  invalidToken: { text: 'User token could not be verified.', type: 'error' },
  invalidData: { text: 'Your form data is invalid or incomplete.', type: 'error' },
  serverError: { text: 'Server Error: Your request could not be completed.', type: 'error' },
  notAuthorized: { text: 'You are not authorized to access this screen.', type: 'error' },
  notAuthenticated: { text: 'User is not authenticated.', type: 'error' },
  loginError: { text: 'Login Error: Your user credentials are not valid.', type: 'error' }
};

export default {

  /**
   * get enumerated error message by key
   * **/

  get: function get(key) {
    return messages[key] !== 'undefined' ? messages[key] : null;
  }

}
