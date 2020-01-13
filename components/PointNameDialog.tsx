import * as React from 'react';

import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

/**
 * プロパティ定義
 */
export interface PointNameDialogProps {
    onDialogDismiss: (PointNameDialogState?) => void;
    isModalVisible: boolean;
}

/**
 * State定義
 */
export interface PointNameDialogState {
    pointName: string;
    pointMemo: string;
}

/**
 * 地点入力画面表示用のダイアログコンポーネント
 */
export default class PointNameDialog extends React.Component<PointNameDialogProps, PointNameDialogState> {

    /**
     * コンストラクタ
     * @param props 
     */
    constructor(props: PointNameDialogProps) {
        super(props);
        this.state = {
            pointName: "",
            pointMemo: ""
        };
    }

    render() {
        return (
            <Modal isVisible={this.props.isModalVisible}>
                <View style={styles.container}>
                    <View>
                        <Text>地点名</Text>
                        <TextInput style={styles.pointNameInput} 
                                onChangeText={(text) => {this.handleOnChangePointNameInput(text)}}/>
                    </View>
                    <View>
                        <Text>メモ</Text>
                        <TextInput style={styles.pointMemoInput} 
                                multiline 
                                onChangeText={(text) => {this.handleOnChangePointMemoInput(text)}}/>
                    </View>
                    <View style={styles.pointNameDialogButtons}>
                        <Button title="OK" 
                                onPress={() => this.props.onDialogDismiss(this.state) } />
                        <Button title="Cancel" 
                                onPress={() => this.props.onDialogDismiss()} />
                    </View>
                </View>
            </Modal>
        );
    }

    /**
     * 地点名の入力イベントハンドリング
     */
    handleOnChangePointNameInput = (text) => {
        this.setState({pointName: text});
    }

    /**
     * 地点メモの入力イベントハンドリング
     */
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
