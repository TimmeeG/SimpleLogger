import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';

import store from './store';

import SetScreen from './screens/SetScreen';
import DataScreen from './screens/DataScreen';
import ChartScreen from './screens/ChartScreen';

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        sets: { screen: SetScreen },
        main: {
          screen: TabNavigator({
            data: { screen: DataScreen },
            chart: { screen: ChartScreen },
          }),
        },
      },
      {
        navigationOptions: {
          tabBarVisible: false,
        },
      },
    );

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
