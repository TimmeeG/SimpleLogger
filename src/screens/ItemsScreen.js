import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

class ItemsScreen extends Component {
  state = {
    text: 'Log New Item Here',
  };

  logItem() {
    console.log(this.state.text);
  }

  render() {
    return (
      <View>
        <Text>Log Data</Text>
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button title="Log New Data Point" onPress={() => this.logItem()} />
      </View>
    );
  }
}

export default ItemsScreen;
