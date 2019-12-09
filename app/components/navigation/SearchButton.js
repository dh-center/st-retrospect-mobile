import {Button, Icon} from 'native-base';
import React, {Component} from 'react';

class SearchButton extends Component {
    render() {
        return (
            <Button
                transparent
                onPress={() => {
                    this.props.navigation.navigate('Search');
                }}>
                <Icon name="search" />
            </Button>
        );
    }
}

export default SearchButton;
