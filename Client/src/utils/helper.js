// helper.js

// Checks if the string starts with "**"
export const checkheading = (str) => {
  return /^\*\*/.test(str);
};

// Removes leading "**" only (if present)
export const replaceheading = (str) => {
  return str
    .replace(/^\*\*/, '')     // remove leading **
    .replace(/\*+$/, '')      // remove trailing * (one or more)
    .trim();
};