/*!
 * Form and page services/utilities (Vue)
 * File: util.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

export {genID, scrollToAnchor, getWordCount, validateEmail, validatePhone, formatFileSize};

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
    el && el.scrollIntoView();
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
 * Validate email address
 * Reference: https://stackoverflow.com/a/46181 (Retrieved Jan 18, 2022)
 * **/

const validateEmail = (email) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Validate phone number
 * Reference: https://stackoverflow.com/a/29767609 (Retrieved Jan 25, 2022)
 * Valid formats:
    (123) 456-7890
    (123)456-7890
    123-456-7890
    123.456.7890
    1234567890
    +31636363634
    075-63546725
 * **/

const validatePhone = (phone) => {
  return !!String(phone)
    .toLowerCase()
    .match(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im
    );
};

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