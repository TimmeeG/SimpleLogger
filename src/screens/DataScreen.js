import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { logDataPoint } from './../actions';

class DataScreen extends Component {
  state = {
    text: '',
  };

  addDataPoint() {
    this.props.logDataPoint({
      set: this.props.set.currentSet,
      datum: this.state.text,
      time: new Date(),
    });
  }

  render() {
    return (
      <View>
        <Text>Log Data</Text>
        {this.props.data.data ? (
          <FlatList
            data={this.props.data.data.filter(
              datum => datum.set === this.props.set.currentSet,
            )}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({ item }) => <Text>{item.datum}</Text>}
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
