import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import Profile from '../components/Profile';

function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  console.log('userid>>>', userId);

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId} />;
}

export default ProfileScreen;
