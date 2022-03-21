import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('user');

export const createUser = ({id, displayName, photoURL}) =>
  usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });

export const getUser = async id => {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
};
