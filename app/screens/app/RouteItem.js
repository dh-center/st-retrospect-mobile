import React, {Component} from 'react';

import {Body, H3, Left, ListItem, Thumbnail} from 'native-base';
import {Text} from 'react-native';
import {store} from '../../redux/store';

class RouteItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
        };
    }

    render() {
        let locations = [];

        for (let i = 0; i < this.props.data.locationsInstance.length; i++) {
            locations.push({
                latitude: this.props.data.locationsInstance[i].location
                    .coordinateX,
                longitude: this.props.data.locationsInstance[i].location
                    .coordinateY,
                name: this.props.data.locationsInstance[i].name,
                description: this.props.data.locationsInstance[i].description,
            });
        }

        return (
            <ListItem
                avatar
                button
                onPress={() => {
                    this.props.navigation.navigate('RouteDescription', {
                        routeId: this.props.data.id,
                        name: this.props.data.name,
                        locations: locations,
                        description: this.props.data.description,
                    });
                }}>
                <Left>
                    <Thumbnail source={{uri: this.props.data.photoLink}} />
                </Left>
                <Body>
                    <H3>{this.props.data.name}</H3>
                    <Text numberOfLines={2} note>
                        {this.props.data.description}
                    </Text>
                </Body>
            </ListItem>
        );
    }
}

export default RouteItem;
