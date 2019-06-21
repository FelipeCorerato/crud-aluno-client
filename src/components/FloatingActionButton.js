import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';

export default class FloatingActionButton extends React.Component {
    static defaultProps = {
        onAcionButtonOneClick: () => null,
        onAcionButtonTwoClick: () => null
    };

    handleButtonOneClick = () => {
        this.props.onAcionButtonOneClick();
    }

    handleButtonTwoClick = () => {
        this.props.onAcionButtonTwoClick();
    }

    render() {
        return (
            <View style={this.props.style}>
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('Cadastrar')}>
                    {/* <ActionButton.Item buttonColor='#3498db' title="Novo aluno" onPress={() => this.props.navigation.navigate('Cadastrar')}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Sobre" onPress={() => this.props.onAcionButtonTwoClick()}>
                        <Icon name="ios-information-circle" style={styles.actionButtonIcon} />
                    </ActionButton.Item> */}
                </ActionButton>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});