import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default class Cadastrar extends React.Component {
    state = {
        ra: '',
        nome: '',
        email: ''
    }

    static navigationOptions = {
        headerTitle: 'Cadastrar aluno'
    }

    handleSubmit = async () => {
        if (!this.state.ra || !this.state.nome || !this.state.email) {
            Alert.alert('Campos vazios', 'Preencha todos os campos!');
            return;
        }
        
        const novoAluno = {
            ra: this.state.ra,
            nome: this.state.nome,
            email: this.state.email
        }

        await api.post('/alunos', novoAluno);

        // const data = new FormData();

        // data.append('ra', this.state.ra);
        // data.append('nome', this.state.nome);
        // data.append('email', this.state.email);

        // await api.post('alunos', data);

        this.props.navigation.navigate('Principal');
    }

    render() {
        return (
            <View style={StyleSheet.container}>
                <TextInput style={styles.input} 
                    autoCorrect={false} 
                    autoCapitalize='none' 
                    keyboardType='number-pad'
                    placeholder='RA do aluno' 
                    placeholderTextColor='#999' 
                    value={this.state.ra} 
                    maxLength={5}
                    onChangeText={ra => this.setState({ ra })} />

                <TextInput style={styles.input} 
                    autoCorrect={false} 
                    autoCapitalize='none' 
                    placeholder='Nome do aluno' 
                    placeholderTextColor='#999' 
                    value={this.state.nome} 
                    maxLength={25}
                    onChangeText={nome => this.setState({ nome })} />

                <TextInput style={styles.input} 
                    autoCorrect={false} 
                    autoCapitalize='none' 
                    keyboardType='email-address'
                    placeholder='Email do aluno' 
                    placeholderTextColor='#999' 
                    value={this.state.email} 
                    maxLength={30}
                    onChangeText={email => this.setState({ email })} />

                <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit} >
                    <Text style={styles.shareButtonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },

    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginTop: 10,
        marginHorizontal: 10,
        fontSize: 16
    },

    shareButton: {
        backgroundColor: '#3498db',
        borderRadius: 4,
        height: 42,
        marginTop: 15,
        marginHorizontal: 10,
    
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    shareButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    }    
});