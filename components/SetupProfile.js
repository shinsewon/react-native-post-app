import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/user';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import Avatar from './Avatar';
import {useUserContext} from '../contexts/UserContext';

function SetupProfile() {
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState(null);
  const navigation = useNavigation();
  const {params} = useRoute();
  const {uid} = params || {};
  const {setUser} = useUserContext();

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res.assets[0]);
      },
    );
  };

  const onSubmit = async () => {
    setLoading(true);
    let photoURL = null;

    if (response) {
      const extension = response.fileName.split('.').pop();
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        await reference.putString(response.base64, 'base64', {
          contentType: response.type,
        });
      } else {
        await reference.putFile(response.uri);
      }
      photoURL = response ? await reference.getDownloadURL() : null;
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
    };

    createUser(user);
    setUser(user);
    setLoading(false);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Avatar source={response && {uri: response.uri}} size={128} />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnType="next"
        />

        {loading ? (
          <ActivityIndicator
            style={styles.spinner}
            size={32}
            color={'#6200ee'}
          />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title={'다음'} onPress={onSubmit} hasMarginBottom />
            <CustomButton
              title={'취소'}
              onPress={onCancel}
              theme={'secondary'}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
  spinner: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
});

export default SetupProfile;
