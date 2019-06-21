import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class MySearchBar extends React.Component {
    render() {
        return (
            <SearchBar
                placeholder="Buscar aluno..."
                onChangeText={this.props.onChangeText}
                autoCorrect={false}
                value={this.props.search} 
                lightTheme={true} />
        );
    }
}
