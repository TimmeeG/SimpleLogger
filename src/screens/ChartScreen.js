import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { StockLine } from 'react-native-pathjs-charts';

class ChartScreen extends Component {
  formatData() {
    const rawData = this.props.data.data.filter(
      dataPoint => dataPoint.set === this.props.set.currentSet,
    );

    const lastTime = moment(rawData[rawData.length - 1].timeStamp);
    const firstTime = rawData[0].timeStamp;
    const timeRange = lastTime.diff(firstTime);

    return rawData.map(d => ({
      x: Math.round(100 * (moment(d.timeStamp).diff(firstTime) / timeRange)),
      y: parseInt(d.dataPoint, 10),
    }));
  }

  render() {
    const data = this.formatData();

    const options = {
      width: 250,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
      },
      animate: {
        type: 'delayed',
        duration: 200,
      },
      axisX: {
        showAxis: true,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        },
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        },
      },
    };

    return (
      <View>
        <Text>{this.props.set.currentSet}</Text>
        <StockLine data={[data]} options={options} xKey="x" yKey="y" />
        <Text>Time</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ data, set }) => ({
  data,
  set,
});

export default connect(mapStateToProps, {})(ChartScreen);
