import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';

export default class FloatingActionButton extends React.Component {
    state = {
        // buttons = [
        //     {
        //         id: '',
        //         color: '',
        //         title: '',
        //         onPress: () => null,
        //         iconName: '',
        //         iconStyle: ''
        //     }
        // ]
    }
    
    static defaultProps = {
        buttons: [],
        containerStyle: style.containerStyle,
        actionButtonStyle: styles.actionButton,
        actionButtonItemsStyle: styles.actionButtonItem,
        actionButtonItemsIconStyle: styles.actionButtonItemIcon,
        onAcionButtonOneClick: () => null,
        onAcionButtonTwoClick: () => null
    };

    componentDidMount() {

    }    

    render() {
        return (
            <View style={this.props.containerStyle}>
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('Cadastrar')}>
                    { this.props.buttons.map(button => (
                        <ActionButton.Item buttonColor={button.color} title={button.title} onPress={() => {button.onPress()}}>
                            <Icon name={button.iconName} style={button.iconStyle} />
                        </ActionButton.Item>
                    )) }
                    
                    {/* <ActionButton.Item buttonColor='#3498db' title="Novo aluno" onPress={() => this.props.navigation.navigate('Cadastrar')}>
                        <Icon name="md-create" style={styles.actionButtonItemIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Sobre" onPress={() => this.props.onAcionButtonTwoClick()}>
                        <Icon name="ios-information-circle" style={styles.actionButtonItemIcon} />
                    </ActionButton.Item> */}
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {

    },

    actionButton: {

    },

    actionButtonItem: {

    },

    actionButtonItemIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});