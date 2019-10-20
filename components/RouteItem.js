import React, { Component } from 'react';

import { ListItem, Left, Body, Thumbnail, H2 } from 'native-base'
import { Text } from 'react-native'

/*TODO: replace 'ru' with user language settings*/
export default class RouteItem extends Component {
    render() {
        return (
            <ListItem avatar>
                <Left>
                    <Thumbnail source={{ uri: this.props.data.photoLink }} />
                </Left>
                <Body>
                <H2>{ this.props.data.name.ru }</H2>
                <Text note>{ this.props.data.description.ru }</Text>
                </Body>
            </ListItem>
        )
    }
};

