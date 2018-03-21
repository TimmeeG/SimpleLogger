import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import Header from '../components/Header';
import { logDataPoint } from './../actions';

class DataScreen extends Component {
  state = {
    text: '',
  };

  addDataPoint() {
    this.props.logDataPoint({
      set: this.props.set.currentSet,
      dataPoint: this.state.text,
      timeStamp: new moment(),
    });
  }

  exportData() {
    const headerString = 'timestamp,data\n';
    const rowString = this.props.data.data
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
    return (
      <View>
        <Header title="Data" />
        {this.props.data.data ? (
          <FlatList
            data={this.props.data.data.filter(
              dataPoint => dataPoint.set === this.props.set.currentSet,
            )}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({ item }) => <Text>{item.dataPoint}</Text>}
          />
        ) : (
          <Text>No data points logged yet!</Text>
        )}
        <TextInput
          keyboardType="numeric"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Log New Data Point"
          onPress={() => this.addDataPoint()}
        />
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('sets')}
        />
        <Button title="Download CSV" onPress={() => this.exportData()} />
      </View>
    );
  }
}

const mapStateToProps = ({ data, set }) => ({
  data,
  set,
});

export default connect(mapStateToProps, {
  logDataPoint,
})(DataScreen);
