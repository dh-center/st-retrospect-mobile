import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {store} from '../../data/users/store';
import i18n from 'i18n-js';
import {Button, H2, Icon, List, ListItem, Right, Body} from 'native-base';
import MapViewDirections from 'react-native-maps-directions';

const authToken = store.getState().authToken;

const locale = i18n.locale;

const HereMarker = () => {
    return (
        <Icon name='navigate'/>
    )
};


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 37.4219981,
                longitude: -122.084000
            },

        };
        this.findCoordinates();
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {

                this.setState({ initialPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
                console.log(position);
            },
            error =>console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };



    render() {
        let points = [];
        const GOOGLE_MAPS_APIKEY = 'AIzaSyB5hRwzheXSWfjV2JyRwH5mwMwwspD64Lo';
        const locations = this.props.navigation.getParam('locations');

        for(let i = 0; i < locations.length; i++){

            points.push(
                <Marker
                    key={i}
                    coordinate={locations[i]}
                />
            )
        }

        console.log(locations);


        return (

            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: locations[0].latitude,
                        longitude: locations[0].longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <MapViewDirections
                        origin={locations[0]}
                        destination={locations[locations.length-1]}
                        waypoints={locations}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="#f6c23d"
                    />
                    {points}


                </MapView>
                <ListItem>
                    <Body>
                    <H2>{this.props.navigation.getParam('name')}</H2>
                    </Body>
                    <Right>
                        <Button style={styles.btnCentered}>
                            <Text>GO</Text>

                        </Button>
                    </Right>
                </ListItem>
                <ScrollView style={styles.locationlist}>


                    <List
                        scrollable
                    >
                        {locations.map((value) => {
                            return <ListItem>

                                        <Text>
                                            {value.name}
                                        </Text>

                                    </ListItem>;
                        })}
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    map: {
        flex: 3,
    },
    locationlist: {
        flex: 1
    },
    btnCentered: {width: 100, flexDirection: "row", justifyContent: "center"}
});
