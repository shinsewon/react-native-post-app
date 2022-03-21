import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import CameraButton from '../components/CameraButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#6200ee',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MyProfileStack"
          component={MyProfileStack}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="person" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <CameraButton />
    </>
  );
}

export default MainTab;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});
