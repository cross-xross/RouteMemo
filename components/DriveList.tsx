import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native';

export interface DeviceListProps {
  pointName: string;
  arrivalTime: string;
  departureTime: string;
}

export default class DriveList extends React.Component<DeviceListProps, {}> {
  /**
   * Constructor
   */
  constructor(props: DeviceListProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.row}>
        <View style={styles.rowUpper}>
          <View style={styles.left}>
            <View style={styles.verticalLine}>
              <View style={styles.circle} />
            </View>
            <Text>{ this.props.pointName != undefined && this.props.pointName}</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.time}>{this.props.arrivalTime != undefined && this.props.arrivalTime}着</Text>
            <Text style={styles.time}>{this.props.departureTime != undefined && this.props.departureTime}発</Text>
          </View>
        </View>

        <View style={styles.rowLower}>
          <View style={styles.verticalLine} />
          <Text style={styles.move}>↓</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 60,
    backgroundColor: '#ecf0f1',
  },

  rowUpper: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },

  rowLower: {
    flexDirection: 'row',
  },

  left: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
  },

  right: {
    flex: 1,
    backgroundColor: 'lightblue',
    height: 30,
    alignItems: 'center',
    textAlign: 'left',
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'deeppink',
    backgroundColor: 'white',
    marginRight: 10,
  },

  time: {
    fontSize: 8,
    height: 12,
  },

  verticalLine: {
    width: 10,
    height: 30,
    borderColor: 'gray',
    borderRightWidth: 5,
    marginRight: 10,
    justifyContent: 'center',
  },

  move: {
    fontSize: 14,
  },
});
