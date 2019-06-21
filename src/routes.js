import { createAppContainer, createStackNavigator, HeaderBackButton } from 'react-navigation';

import Principal from './pages/Principal';
import Cadastrar from './pages/Cadastrar';
import Atualizar from './pages/Atualizar';

export default createAppContainer(
    createStackNavigator({
        Principal,
        Cadastrar,
        Atualizar
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerTitle: 'Crud-Alunos',
            headerBackTitle: null
        },
        mode: 'modal'
    })
);