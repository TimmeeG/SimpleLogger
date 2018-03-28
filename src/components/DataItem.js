import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/colors';

class DataItem extends Component {
  state = {
    showButtons: false,
    editing: false,
    editValue: '',
  };

  editItem() {
    this.setState({
      editing: true,
      showButtons: false,
      editValue: this.props.item.dataPoint,
    });
  }

  deleteItem() {
    this.setState({ showButtons: false });
    this.props.deleteDataPoint();
  }

  submitEditItem() {
    this.setState({ editing: false, showButtons: true });

    const newItem = {
      dataPoint: this.state.editValue,
      set: this.props.item.set,
      timeStamp: this.props.item.timeStamp,
    };

    this.props.editDataPoint(newItem);
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        {this.state.editing ? (
          <TextInput
            keyboard="numeric"
            style={styles.androidPaddingStyle}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            value={this.state.editValue}
            onChangeText={input => this.setState({ editValue: input })}
          />
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.setState({ showButtons: !this.state.showButtons })
            }
          >
            <Text style={styles.textStyle}>
              {moment(this.props.item.timeStamp).format('M/DD/YY')} -{' '}
              {this.props.item.dataPoint}
            </Text>
          </TouchableOpacity>
        )}
        {this.state.showButtons && (
          <View style={[styles.viewStyle, styles.iconViewStyle]}>
            <TouchableOpacity onPress={() => this.editItem()}>
              <View style={styles.iconStyle}>
                <Icon name="edit" size={20} color={colors.editIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteItem()}>
              <View style={styles.iconStyle}>
                <Icon name="trash" size={20} color={colors.deleteIcon} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {this.state.editing && (
          <View style={[styles.viewStyle, styles.iconViewStyle]}>
            <TouchableOpacity onPress={() => this.submitEditItem()}>
              <View style={styles.iconStyle}>
                <Icon name="edit" size={20} color={colors.editIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({ editing: false, showButtons: true })
              }
            >
              <View style={styles.iconStyle}>
                <Icon name="ban" size={20} color={colors.deleteIcon} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
  },
  iconViewStyle: {
    marginRight: 20,
  },
  iconStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    lineHeight: 30,
  },
  androidPaddingStyle: {
    paddingBottom: 0,
  },
});

export default DataItem;
