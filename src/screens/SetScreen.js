import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { createNewSet, changeCurrentDataSet, deleteSet } from './../actions';
import DataSetItem from './../components/DataSetItem';
import Header from './../components/Header';
import { colors } from '../constants/colors';

class SetScreen extends Component {
  state = {
    text: '',
  };

  setCurrentDataSet(setName) {
    this.props.changeCurrentDataSet(setName);
  }

  startNewDataSet() {
    this.props.createNewSet(this.state.text);
    this.setState({ text: '' });
  }

  deleteDataSet(setName) {
    this.props.deleteSet(setName);
  }

  render() {
    const { text } = this.state;

    return (
      <View style={styles.outerViewStyle}>
        <Header hideLeft hideRight title="Your Datasets" />
        <View style={styles.innerViewStyle}>
          {this.props.set.set.length > 0 ? (
            <FlatList
              data={this.props.set.set}
              keyExtractor={(item, index) => `list-item-${index}`}
              renderItem={({ item }) => (
                <DataSetItem
                  title={item.name}
                  navigator={this.props.navigation}
                  switchToDataSet={() => this.setCurrentDataSet(item.name)}
                  deleteItem={() => this.deleteDataSet(item.name)}
                />
              )}
            />
          ) : (
            <View>
              <Text style={styles.textStyle}>
                No data sets yet.
                {'\n'}
                {'\n'}
              </Text>
              <Text style={styles.textStyle}>Create a data set below!</Text>
            </View>
          )}
        </View>
        <View style={styles.bottomViewStyle}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Name your dataset"
            onChangeText={input => this.setState({ text: input })}
            value={text}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.startNewDataSet()}
            disabled={!text}
          >
            <Text>Start New Data Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerViewStyle: {
    flex: 1,
  },
  innerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
  },
  buttonStyle: {
    height: 30,
    backgroundColor: colors.buttonBackground,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  textInputStyle: {
    width: '50%',
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.inputBorder,
    height: 30,
  },
});

const mapStateToProps = ({ set }) => ({
  set,
});

export default connect(mapStateToProps, {
  createNewSet,
  changeCurrentDataSet,
  deleteSet,
})(SetScreen);
