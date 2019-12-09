import React, {Component} from 'react';

import {Body, H3, Left, ListItem, Thumbnail} from 'native-base';
import {Text} from 'react-native';
import {store} from '../../redux/store';

class RouteItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
        };
    }

    render() {
        let locations = [];

        for (let i = 0; i < this.props.data.locations.length; i++) {
            locations.push({
                latitude: this.props.data.locations[i].coordinateX,
                longitude: this.props.data.locations[i].coordinateY,
                name: this.props.data.locations[i].name[this.state.locale],
                description: this.props.data.locations[i].description[
                    this.state.locale
                ],
            });
        }

        return (
            <ListItem
                avatar
                button
                onPress={() => {
                    this.props.navigation.navigate('RouteDescription', {
                        routeId: this.props.data.id,
                        name: this.props.data.name[this.state.locale],
                        locations: locations,
                        description: this.props.data.description[
                            this.state.locale
                        ],
                    });
                }}>
                <Left>
                    <Thumbnail source={{uri: this.props.data.photoLink}} />
                </Left>
                <Body>
                    <H3>{this.props.data.name[this.state.locale]}</H3>
                    <Text numberOfLines={2} note>
                        {this.props.data.description[this.state.locale]}
                    </Text>
                </Body>
            </ListItem>
        );
    }
}

export default RouteItem;
