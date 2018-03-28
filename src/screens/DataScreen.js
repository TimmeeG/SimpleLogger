import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import DataItem from '../components/DataItem';
import { logDataPoint, editDataPoint, deleteDataPoint } from './../actions';
import { colors } from '../constants/colors';

class DataScreen extends Component {
  state = {
    text: '',
    data: [],
  };

  componentWillMount() {
    this.state.data = this.props.data.data.filter(
      dataPoint => dataPoint.set === this.props.set.currentSet,
    );
  }

  componentWillReceiveProps(nextProps) {
    this.state.data = nextProps.data.data.filter(
      dataPoint => dataPoint.set === this.props.set.currentSet,
    );
  }

  addDataPoint() {
    Keyboard.dismiss();
    this.props.logDataPoint({
      set: this.props.set.currentSet,
      dataPoint: this.state.text,
      timeStamp: new moment(),
    });
    this.setState({ text: '' });
  }

  editCurrentDataPoint(newItem) {
    this.props.editDataPoint(newItem);
  }

  deleteDataPoint(timeStamp) {
    this.props.deleteDataPoint(timeStamp);
  }

  exportData() {
    const headerString = 'timestamp,data\n';
    const rowString = this.state.data
      .map(d => `${(d.timeStamp, d.dataPoint)}\n`)
      .join('');
    const csvString = `${headerString}${rowString}`;
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/${
      this.props.set.currentSet
    }.csv`;

    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        Alert.alert(
          'File Downloaded',
          `${this.props.set.currentSet}.csv has been downloaded to your device`,
        );
      })
      .catch(error => console.error(error));
  }

  render() {
    const { text, data } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.viewStyle}>
        <Header
          title={this.props.set.currentSet}
          onLeft={() => this.props.navigation.navigate('sets')}
          onRight={() => this.exportData()}
        />
        <View style={styles.viewStyle}>
          {data ? (
            <FlatList
              keyboardShouldPersistTaps="always"
              data={data}
              keyExtractor={(item, index) => `list-item-${index}`}
              renderItem={({ item }) => (
                <DataItem
                  deleteDataPoint={() => this.deleteDataPoint(item.timeStamp)}
                  editDataPoint={this.editCurrentDataPoint.bind(this)}
                  item={item}
                />
              )}
            />
          ) : (
            <Text>No data points logged yet!</Text>
          )}
        </View>
        <View style={styles.bottomViewStyle}>
          <TextInput
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            placeholder="Enter value here"
            onChangeText={input => this.setState({ text: input })}
            value={text}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.addDataPoint()}
            disabled={!text}
          >
            <Text>Log New Data Point</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
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
    marginTop: 10,
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

const mapStateToProps = ({ data, set }) => ({
  data,
  set,
});

export default connect(mapStateToProps, {
  logDataPoint,
  editDataPoint,
  deleteDataPoint,
})(DataScreen);
