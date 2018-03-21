import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from './../constants/colors';

export default class Header extends Component {
  render() {
    const { hideLeft, title, onLeft, onRight, hideRight } = this.props;

    return (
      <View style={styles.headerViewStyle}>
        {hideLeft ? (
          <View style={styles.headerSectionStyle} />
        ) : (
          <TouchableOpacity style={styles.headerSectionStyle} onPress={onLeft}>
            <Text>Sets</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.textStyle}>{title}</Text>
        {hideRight ? (
          <View style={styles.headerSectionStyle} />
        ) : (
          <TouchableOpacity style={styles.headerSectionStyle} onPress={onRight}>
            <Text>CSV</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: colors.headerBackground,
    borderColor: colors.headerBottomBorder,
    borderBottomWidth: 2,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerSectionStyle: {
    width: 50,
  },
});
