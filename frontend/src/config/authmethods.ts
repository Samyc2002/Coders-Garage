import firebase from './firebase';

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();