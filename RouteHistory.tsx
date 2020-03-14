import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default class RouteHistory extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Route History</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
