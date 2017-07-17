import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import { store, history } from '../create-store';
import { APPLICATION_ERROR } from '../shared/constants';

async function request(url, options){
  const defaultOptions = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Security-Policy': 'default-src \'self\'',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': 1
    },
  };

  if(options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  options = {...defaultOptions, ...options};

  try {
    const response = await fetch(url, options);
    const body = await response.json();

    if(body.redirectTo) {
      history.push(body.redirectTo);
    }

    if(response.ok) {
      return body;
    }
    else {
      throw body;
    }
  }
  catch (e) {
    const error = _.get(e, 'error', e) || 'An unexpected error has occurred!';
    console.error(error);

    store.dispatch({
      type: APPLICATION_ERROR,
      error: error
    });

    return { error };
  }
}

let wrapper = {};
['get', 'post', 'put', 'delete'].forEach(function(method) {
  wrapper[method] = (url, options = {}) => {
    options.method = method;
    return request(url, options);
  };
});

export default wrapper;
