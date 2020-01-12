import * as React from 'react';

import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

export interface PointNameDialogProps {
    onDialogDismiss: (PointNameDialogState?) => void;
}

export interface PointNameDialogState {
    pointName: string;
    pointMemo: string;
}

export default class PointNameDialog extends React.Component<PointNameDialogProps, PointNameDialogState> {

    constructor(props: PointNameDialogProps) {
        super(props);
        this.state = {
            pointName: "",
            pointMemo: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>地点名</Text>
                    <TextInput style={styles.pointNameInput} onChangeText={(text) => {this.handleOnChangePointNameInput(text)}}></TextInput>
                </View>
                <View>
                    <Text>メモ</Text>
                    <TextInput style={styles.pointMemoInput} multiline onChangeText={(text) => {this.handleOnChangePointMemoInput(text)}}></TextInput>
                </View>
                <View style={styles.pointNameDialogButtons}>
                    <Button title="OK" onPress={() => this.props.onDialogDismiss(this.state) } />
                    <Button title="Cancel" onPress={() => this.props.onDialogDismiss()} />
                </View>
          </View>
        );
    }

    handleOnChangePointNameInput = (text) => {
        this.setState({pointName: text});
    }

    handleOnChangePointMemoInput = (text) => {
        this.setState({pointMemo: text});
    }
}

/**
 * Define view styles.
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    },
    pointNameInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 2
    },
    pointMemoInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 2
    },
    pointNameDialogButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 2
    }
});
