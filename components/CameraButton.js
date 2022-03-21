import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import UploadModeMadal from './UploadModeMadal';

const TABBAR_HEIGHT = 49;
const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

function CameraButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const inserts = useSafeAreaInsets();
  const navigation = useNavigation();

  console.log('inserts>>', inserts);
  console.log('>>>>>>>>>>>>>', TABBAR_HEIGHT / 2);

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: inserts.bottom - 4 + 24.5,
    // ios: TABBAR_HEIGHT / 2 + inserts.bottom - 4,
  });

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push('Upload', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const onPress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          onLaunchCamera();
        } else if (buttonIndex === 1) {
          onLaunchImageLibrary();
        }
      },
    );
  };

  return (
    <>
      {/* <View style={styles.wrapper}> */}
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{color: '#fff', borderless: true}}
          style={styles.circle}
          onPress={onPress}>
          <Icon name="camera-alt" color="#fff" size={32} />
        </Pressable>
      </View>
      <UploadModeMadal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    backgroundColor: 'unset',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default CameraButton;
