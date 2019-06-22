import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Swipeout } from 'react-native-swipeout'
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import * as Progress from 'react-native-progress';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import io from 'socket.io-client';
import api from '../services/api';

import MySeachBar from '../components/SearchBar';

export default class Principal extends React.Component {
    state = {
        alunos: [],
        feed: [],
        carregando: true,
        conectado: true,
        pesquisa: ''
    };

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={navigation.getParam('refresh')}>
                <Icon name='md-refresh' style={{fontSize: 30, height: 30}}/> 
            </TouchableOpacity>
        ) 
    });

    componentDidMount() {
        this.registerToSocket();

        this.props.navigation.setParams({ refresh: this.listarAlunos })

        this.listarAlunos();
    }

    registerToSocket = () => {
        const socket = io('https://crud-alunos-server.herokuapp.com/');

        socket.on('incluir-aluno', alunoNovo => {
            this.setState({ alunos: this.state.aluno.push(alunoNovo) });
            this.listarAlunos();
        });

        socket.on('alterar-aluno', alunoAlterado => {
            for (i = 0; i < this.state.alunos.length; i++) {
                if (this.state.alunos[i].ra == alunoAlterado.ra)
                    this.state.alunos[i] = alunoAlterado;
            }

            this.listarAlunos();
        });

        socket.on('excluir-aluno', alunoExcluido => {
            for (i = 0; i < this.state.alunos.length; i++) {
                if (this.state.alunos[i] == alunoExcluido)
                    this.state.alunos.splice(i, 1);
            }
            this.listarAlunos();
        });
    }

    listarAlunos = async () => {
        this.setState({ carregando: true });
        try {
            const response = await api.get('alunos');
        
            this.setState({ alunos: response.data }); 
            this.setState({ feed: this.state.alunos });
        } catch (err) {
            this.setState({ conectado: false })
            Alert.alert('Problemas com a conexão', 'Verifique sua conexão com a internet', [{text: 'OK'}]);
        }
        
        this.setState({ carregando: false });
    }

    handleSeach = pesquisa => {
        this.setState({ pesquisa });

        if (this.state.pesquisa === '') {
            this.setState({ feed: this.state.alunos });
        }

        const resultado = this.state.alunos.filter((aluno) => {
            return aluno.ra.includes(pesquisa);
        });
        
        this.setState({ feed: resultado });
    }

    handleDeleteButton = async ra => {
        this.setState({ carregando: true });
        await api.delete(`/alunos/${ra}`);

        
        this.setState({ carregando: false });
        this.listarAlunos();
    }

    render() {
        return (
            <View style={styles.container}>
                <MySeachBar search={this.state.pesquisa} onChangeText={this.handleSeach} />

                { this.state.alunos.length == 0 && this.state.carregando == false &&  (
                    this.state.conectado && (
                        <View style={styles.message}>
                            <Text style={styles.messageText}>Não há alunos cadastrados!</Text>
                        </View>
                    )
                )}

                { this.state.alunos.length != 0 && this.state.feed.length == 0 && this.state.carregando == false &&  (
                    this.state.conectado && (
                        <View style={styles.message}>
                            <Text style={styles.messageText}>Nenhum resultado!</Text>
                        </View>
                    )
                )}

                { this.state.carregando == true && (
                    <View style={styles.progressBar}>
                        <Progress.Circle size={25} indeterminate={true} />
                    </View>
                )}

                <FlatList style={{backgroundColor: '#f3f3f3'}} data={this.state.feed} keyExtractor={aluno => aluno._id} renderItem={({ item }) => (
                    <View style={styles.alunoItem}>
                        <View style={styles.alunoItemInfo}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Atualizar', { 
                                ra: item.ra,
                                nome: item.nome,
                                email: item.email
                            })}>
                                <Text style={styles.nome}>{item.nome} - {item.ra}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actions}>
                            {/* <TouchableOpacity style={styles.action} onPress={() => this.props.navigation.navigate('Atualizar', { 
                                ra: item.ra,
                                nome: item.nome,
                                email: item.email
                            })}>
                                <Icon name="md-create" style={{fontSize: 28, height: 28, color: '#3498db', marginRight: 2}} />
                            </TouchableOpacity> */}

                            <TouchableOpacity style={styles.action} 
                                onPress={() => Alert.alert(
                                    'Deseja remover o aluno?',
                                    `${item.nome} - ${item.ra} ${item.email}`,
                                    [
                                        {text: 'Cancelar'},
                                        {text: 'Remover', onPress: () => this.handleDeleteButton(item.ra)}
                                    ] 
                                )}>
                                <Icon name="md-trash" style={{fontSize: 30, height: 30, color: 'rgba(231,76,60,1)', marginRight: 2}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )} />

                <ActionButton style={{ marginRight: 9 }} buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('Cadastrar')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        paddingBottom: getBottomSpace()
    },

    progressBar: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#f3f3f3'
    },

    alunoItem: {
        marginBottom: 3,
        height: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    alunoItemInfo: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'center'
    },

    ra: {
        fontSize: 14,
        color: '#000'
    },

    nome: {
        fontWeight: 'bold',
        color: '#000'
    },

    email: {
        fontSize: 12,
        color: '#000',
        marginTop: 2
    },

    message: {
        display: 'flex',
        flexDirection: 'row',        
        justifyContent: 'center',
        marginTop: 20
    },

    messageText: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold'
    },

    actions: {
        flexDirection: 'row'
    },

    action: {
        justifyContent: 'center',
        marginLeft: 15,
    },

    actionButton: {
        flex:1, 
        backgroundColor: '#f3f3f3',
        position: 'relative',
        paddingBottom: 120,
        paddingLeft: 90,
        display: 'flex',
        zIndex: 99999
    }
});