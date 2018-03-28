import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { createNewSet, changeCurrentDataSet, deleteSet } from './../actions';
import SetItem from './../components/SetItem';
import Header from './../components/Header';
import { colors } from '../constants/colors';

class SetScreen extends Component {
  state = {
    text: '',
    errorText: '',
  };

  setCurrentDataSet(setName) {
    this.props.changeCurrentDataSet(setName);
  }

  startNewDataSet() {
    if (this.props.set.set.some(set => set.name === this.state.text)) {
      this.setState({ errorText: 'Cannot create sets with duplicate names' });
      return;
    }

    Keyboard.dismiss();
    this.props.createNewSet(this.state.text);
    this.setState({ text: '' });
  }

  deleteDataSet(setName) {
    this.props.deleteSet(setName);
  }

  render() {
    const { text } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.outerViewStyle}>
        <Header hideLeft hideRight title="Your Datasets" />
        <View style={styles.innerViewStyle}>
          {this.props.set.set.length > 0 ? (
            <FlatList
              data={this.props.set.set}
              keyExtractor={(item, index) => `list-item-${index}`}
              renderItem={({ item }) => (
                <SetItem
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
        <View>
          <Text style={styles.errorTextStyle}>{this.state.errorText}</Text>
          <View style={styles.bottomViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              placeholder="Name your dataset"
              onChangeText={input =>
                this.setState({ text: input, errorText: '' })
              }
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
      </KeyboardAvoidingView>
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
  errorTextStyle: {
    textAlign: 'center',
    color: colors.errorText,
    marginBottom: 20,
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
    paddingBottom: 0,
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
