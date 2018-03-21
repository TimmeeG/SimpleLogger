import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import { colors } from './../constants/colors';

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
    Alert.alert(
      `${this.props.title}`,
      'Are you sure you want to delete this set?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            this.setState({ showButtons: false });
            this.props.deleteItem(this.props.title);
          },
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View>
        <Button
          title={this.props.title}
          onPress={() => this.onSetNamePress()}
        />
        {this.state.showButtons && (
          <View style={styles.buttonsViewStyle}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.onAddDataPoint()}
            >
              <Text style={styles.buttonTextStyle}>View/Add Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.deleteStyle]}
              onPress={() => this.deleteSet()}
            >
              <Text style={styles.buttonTextStyle}>Delete Set</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    width: 125,
    backgroundColor: colors.buttonBackground,
    borderRadius: 5,
    overflow: 'hidden',
  },
  deleteStyle: {
    backgroundColor: colors.delete,
  },
  buttonTextStyle: {
    textAlign: 'center',
  },
});

export default DataSetItem;
