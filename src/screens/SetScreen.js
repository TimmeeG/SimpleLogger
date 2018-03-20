import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { createNewSet, changeCurrentDataSet, deleteSet } from './../actions';
import DataSetItem from './../components/DataSetItem';

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
    return (
      <View>
        <Text>Datasets</Text>
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
  changeCurrentDataSet,
  deleteSet,
})(SetScreen);
