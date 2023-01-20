/*!
 * Form and page services/utilities (Vue)
 * File: util.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

export {genID, scrollToAnchor, getWordCount, formatFileSize};

/**
 * Generate random ID string
 *
 * **/

function genID() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for ( let i = 0; i < chars.length; i++ ) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Force page to scroll to current anchor
 *
 * **/

const scrollToAnchor = () => {
    const el = document.querySelector(window.location.hash);
    if (el) {
        el && el.scrollIntoView();
    }
}

/**
 * Get word count for given string (based on 5 character word length)
 * - Remove HTML tags in the input string;
 * - Replace non-alphanumeric characters with spaces;
 * - Replace multiple spaces to single space;
 * **/

function getWordCount(strRaw) {
  const str = strRaw.toString() || '';
  return str !== ''
      ? str
          .replace( /(<([^>]+)>)/ig, ' ')
          .replace(/[^0-9a-zA-Z_ ]/g,' ')
          .replace(/\s\s+/g, ' ')
          .trim()
          .split(' ').length
      : 0;
}

/**
 * Format file size
 * **/

const formatFileSize = (bytes) => {
    if (bytes === 0) {
        return '0 B';
    }

    let k = 1000,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}