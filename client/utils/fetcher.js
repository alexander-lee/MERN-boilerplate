import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

async function request(url, userOptions, dispatch) {
  const defaultOptions = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Security-Policy': 'default-src \'self\'',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': 1,
    },
  };

  if (userOptions.body && typeof userOptions.body === 'object') {
    userOptions.body = JSON.stringify(userOptions.body);
  }

  const options = { ...defaultOptions, ...userOptions };

  try {
    const response = await fetch(url, options);
    const body = await response.json();

    if (body.redirectTo) {
      if (!dispatch) {
        throw new Error('Dispatch not found!');
      }

      dispatch(push(body.redirectTo));
    }

    if (response.ok) {
      return body;
    }

    throw body;
  }
  catch (e) {
    const error = _.get(e, 'error', e) || 'An unexpected error has occurred!';
    return { error };
  }
}

const wrapper = {};
['get', 'post', 'put', 'delete'].forEach((method) => {
  wrapper[method] = (url, options = {}, dispatch) => {
    options.method = method;
    return request(url, options, dispatch);
  };
});

export default wrapper;
