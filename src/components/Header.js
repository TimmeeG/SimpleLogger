import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from './../constants/colors';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={styles.textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerViewStyle: {
    paddingTop: 20,
    backgroundColor: colors.headerBackground,
    borderColor: colors.headerBottomBorder,
    borderBottomWidth: 2,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});
