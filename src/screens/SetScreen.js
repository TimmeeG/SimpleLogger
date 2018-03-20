import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { createNewSet } from './../actions';

class SetScreen extends Component {
  state = {
    text: '',
  };

  startNewDataSet() {
    this.props.createNewSet(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <View>
        <Text>Datasets</Text>
        {this.props.set.set.length > 0 ? (
          <FlatList
            data={this.props.set.set}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        ) : (
          <Text>No data sets yet!</Text>
        )}
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Start New Data Set"
          onPress={() => this.startNewDataSet()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ set }) => ({
  set,
});

export default connect(mapStateToProps, {
  createNewSet,
})(SetScreen);
