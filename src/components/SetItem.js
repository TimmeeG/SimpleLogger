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

class SetItem extends Component {
  state = {
    showButtons: false,
  };

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
          style: 'default',
        },
        {
          text: 'Delete',
          onPress: () => {
            this.setState({ showButtons: false });
            this.props.deleteItem(this.props.title);
          },
          style: 'destructive',
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
          onPress={() =>
            this.setState({ showButtons: !this.state.showButtons })
          }
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
    flex: 1,
    width: 300,
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

export default SetItem;
