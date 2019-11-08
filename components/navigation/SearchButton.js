import {Button, Icon} from 'native-base';
import React, {Component} from 'react';

class SearchButton extends Component{
    render() {
        return (
                <Button transparent>
                    <Icon name='search'/>
                </Button>
        )
    }
}

export default SearchButton
