import React, { Component } from 'react';
import { View, Button } from 'react-native';

class DataSetItem extends Component {
  state = {
    showButtons: false,
  };

  onSetNamePress() {
    this.setState({ showButtons: !this.state.showButtons });
  }

  onAddDataPoint() {
    this.props.switchToDataSet(this.props.title);
    this.props.navigator.navigate('data');
  }

  deleteSet() {
    // TODO find out why delete opens button for new item
    this.props.deleteItem(this.props.title);
  }

  render() {
    return (
      <View>
        <Button
          title={this.props.title}
          onPress={() => this.onSetNamePress()}
        />
        {this.state.showButtons && (
          <View>
            <Button
              title="Add Data Point"
              onPress={() => this.onAddDataPoint()}
            />
            <Button title="Delete Data Set" onPress={() => this.deleteSet()} />
          </View>
        )}
      </View>
    );
  }
}

export default DataSetItem;
