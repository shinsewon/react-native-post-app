import auth from '@react-native-firebase/auth';

export const signIn = ({email, password}) =>
  auth().signInWithEmailAndPassword(email, password);

export const signUp = ({email, password}) =>
  auth().createUserWithEmailAndPassword(email, password);

export const subscribeAuth = callback => auth().onAuthStateChanged(callback);

export const subscribeTest = callback => auth().onAuthStateChanged(callback);

export const signOut = () => auth().signOut();
