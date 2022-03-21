import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

function SignButtons({isSignUp, onSubmit, loading}) {
  const navigation = useNavigation();
  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secoundaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecoundaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignIn', {isSignUp: true});
    }
  };

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color={'#6200ee'} />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
      <CustomButton
        title={secoundaryTitle}
        theme={'secondary'}
        onPress={onSecoundaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignButtons;
