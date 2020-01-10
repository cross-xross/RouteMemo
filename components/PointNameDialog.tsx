import * as React from 'react';

import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

import App from '../App';

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
            <View style={{backgroundColor: "#fff" }}>
                <View>
                    <Text>地点名</Text>
                    <TextInput style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 2 }} value={""} onChangeText={(text) => {this.state = {pointName: text, pointMemo: ""}}}></TextInput>
                </View>
                <View>
                    <Text>メモ</Text>
                    <TextInput style={{ height: 100, borderColor: 'gray', borderWidth: 1, margin: 2 }} value={""} multiline></TextInput>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 2}}>
                    <Button title="OK" onPress={() => this.props.onDialogDismiss(this.state) } />
                    <Button title="Cancel" onPress={() => this.props.onDialogDismiss()} />
                </View>
          </View>
        );
    }

    pointName = () => {
        return this.state.pointName;
    }
}