import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StockLine } from 'react-native-pathjs-charts';

class ChartScreen extends Component {
  render() {
    const data = [
      [
        {
          x: -10,
          y: -1000,
        },
        {
          x: -9,
          y: -729,
        },
        {
          x: 0,
          y: -729,
        },
      ],
    ];

    const options = {
      showAreas: false,
      width: 280,
      height: 280,
      color: '#2980B9',
      margin: {
        top: 20,
        left: 45,
        bottom: 25,
        right: 20,
      },
      animate: {
        type: 'delayed',
        duration: 200,
      },
      axisX: {
        showAxis: false,
        showLines: true,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
        },
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
        },
      },
    };

    return (
      <View>
        <StockLine data={data} options={options} xKey="x" yKey="y" />
        <Text>Time</Text>
      </View>
    );
  }
}

export default ChartScreen;
