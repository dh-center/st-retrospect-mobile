import React, { Component } from 'react';

import { ListItem, Left, Body, Thumbnail, H2 } from 'native-base';
import { Text } from 'react-native'
import i18n from "i18n-js";

class RouteItem extends Component {

    render() {
        return (
            <ListItem avatar>
                <Left>
                    <Thumbnail source={{ uri: this.props.data.photoLink }} />
                </Left>
                <Body>
                <H2>{ this.props.data.name[i18n.locale] }</H2>
                <Text note>{ this.props.data.description[i18n.locale] }</Text>
                </Body>
            </ListItem>
        )
    }
};

export default RouteItem;

