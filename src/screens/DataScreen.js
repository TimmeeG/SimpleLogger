import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

class DataScreen extends Component {
  state = {
    text: '',
  };

  logItem() {
    console.log(this.state.text);
  }

  render() {
    return (
      <View>
        <Text>Log Data</Text>
        {this.props.dataPoints ? (
          <FlatList
            data={this.props.dataPoints || []}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({ item }) => <Text>{item.data}</Text>}
          />
        ) : (
          <Text>No data points logged yet!</Text>
        )}
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button title="Log New Data Point" onPress={() => this.logItem()} />
      </View>
    );
  }
}

export default DataScreen;
