import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import HomePage from './HomePage';
import FocusPage from './FocusPage';
import LongBreakPage from './LongBreakPage';
import BreakPage from './BreakPage';

import { createSwitchNavigator, createAppContainer } from 'react-navigation'; 

const RootStack = createSwitchNavigator(
  {
    Home: HomePage,
    Focus: FocusPage,
    Break: BreakPage,
    LongBreak: LongBreakPage,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
