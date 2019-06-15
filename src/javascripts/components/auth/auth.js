import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import googleImage from './googleButton.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const authStringBuilder = () => {
  let domString = '';
  domString += '<div class="card-body text-center border bg-white shadow-sm align-self-center justify-self-center">';
  domString += '<h1 class="card-header border">Cashew Outside</h1>';
  domString += '<p class="my-2 text-muted">Please sign in</p>';
  domString += '<button id="google-auth" class="btn btn-outline" aria-label="Google Sign In">';
  domString += `<img src=${googleImage} style="width: 100%;"/>`;
  domString += '</button>';
  domString += '</div>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authStringBuilder };
