import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {store} from '../../data/users/store';
import i18n from 'i18n-js';
import {Button, H2, Icon, List, ListItem, Right, Body} from 'native-base';
import MapViewDirections from 'react-native-maps-directions';
import {t} from '../../locales/i18n';

const authToken = store.getState().authToken;

const locale = store.getState().locale;

const HereMarker = () => {
    return (
        <Icon name='navigate'/>
    )
};


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: {
                latitude: 0,
                longitude: 0
            },

        };
        this.findCoordinates();
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {

                this.setState({ currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            error =>console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };



    render() {
        let points = [];
        const GOOGLE_API_KEY = 'AIzaSyB5hRwzheXSWfjV2JyRwH5mwMwwspD64Lo';
        const locations = this.props.navigation.getParam('locations');

        for(let i = 0; i < locations.length; i++){

            points.push(
                <Marker
                    key={i}
                    coordinate={locations[i]}
                />
            )
        }

        points.push(
            <Marker
                coordinate={this.state.currentPosition}
                key={locations.length+1}
            >
                <HereMarker/>
            </Marker>
        );


        return (

            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.currentPosition.latitude,
                        longitude: this.state.currentPosition.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <MapViewDirections
                        origin={this.state.currentPosition}
                        destination={locations[locations.length-1]}
                        waypoints={locations}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor="#f6c23d"
                    />
                    {points}


                </MapView>
                <ListItem key={this.props.navigation.getParam('name')}>
                    <Body>
                    <H2>{this.props.navigation.getParam('name')}</H2>
                    <Text>{this.props.navigation.getParam('description')}</Text>
                    </Body>
                    <Right>
                        <Button style={styles.btnCentered}>
                            <Text>{t('GO')}</Text>

                        </Button>
                    </Right>
                </ListItem>
                <ScrollView style={styles.locationlist}>
                    <List>
                        {locations.map((value) => {
                            return <ListItem key={value.latitude}>
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
