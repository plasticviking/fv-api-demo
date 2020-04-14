// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

import ClientOAuth2 from 'client-oauth2';
import { createAction, handleActions } from 'redux-actions';
import { delay, call, put, takeLatest, all, select } from '@redux-saga/core/effects';
import axios from 'axios';
import CONFIG from './config';


let validateClientDetails = createAction('VALIDATE_CLIENT_DETAILS');
let validatedClientDetails = createAction('VALIDATED_CLIENT_DETAILS');

let setClientID = createAction('SET_CLIENT_ID');
let setClientSecret = createAction('SET_CLIENT_SECRET');
let clearClientDetails = createAction('CLEAR_CLIENT');

const reducer = handleActions(
  {
    [setClientID]: (state, { payload: { clientID } }) => {
      return { ...state, clientID }
    },
    [setClientSecret]: (state, { payload: { clientSecret } }) => {
      return { ...state, clientSecret }
    },
    [clearClientDetails]: (state) =>
      ({ ...state, clientID: null, clientSecret: null }),
    [validatedClientDetails]: (state, { payload: { validated } }) => {
      return { ...state, validated, validating: false }
    },
    [validateClientDetails]: (state) => {
      return { ...state, validated: false, validating: true }
    },
  },
  {
    clientID: null,
    clientSecret: null,
    validated: false,
    validating: false
  });

function* configureAuthentication(action) {
  //debounce
  yield delay(1000);
  yield put(validateClientDetails());
}

const selectClientDetails = (state) => {
  return {
    clientID: state.auth.clientID,
    clientSecret: state.auth.clientSecret
  };
};

function *doClientDetailsValidation(action) {

  let c = yield select(selectClientDetails);

  // try {
  console.log('validating');

  if (c.clientID && c.clientSecret) {

    let client = new ClientOAuth2({
      clientId: c.clientID,
      clientSecret: c.clientSecret,
      accessTokenUri: CONFIG.TOKEN_ENDPOINT,
      scopes: ['fvapi/communities:read', 'fvapi/communities:record']
    });

    try {
      let result = yield client.credentials.getToken();
      console.log('got result: ');
      console.log(result);
      axios.defaults.headers.common['Authorization'] = `bearer ${result.accessToken}`;
      yield put(validatedClientDetails({ validated: true }));
    } catch (err) {
      console.log(err);
      yield put(validatedClientDetails({ validated: false }));
    }
  }
}

function* saga() {
  yield all(
    [
      takeLatest('SET_CLIENT_ID', configureAuthentication),
      takeLatest('SET_CLIENT_SECRET', configureAuthentication),
      takeLatest('VALIDATE_CLIENT_DETAILS', doClientDetailsValidation)
    ]);
}

export { reducer, clearClientDetails, saga, setClientID, setClientSecret };
