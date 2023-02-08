/**
 * Store of all global helper functions used in the application.
 * @module helpers
 */

/**
 * Function used to fetch data from an URL and transform it to a JavaScript object.
 * @async
 * @function fetchAndTransformData
 * @param {string} url - the URL we want to get the data from
 * @returns {Promise<Object|Object[]>} - A Promise containing the formatted data returned by the requested url.
 * @author Werner Schmid
 */
export const fetchAndTransformData = async url => {
  const response = await fetch(url, { mode: 'cors' });

  if (!response.ok) throw new Error('Non existing user');

  const { data } = await response.json();

  return data;
};
