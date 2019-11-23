import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Body, Button, H2, Icon, ListItem, Right} from 'native-base';
import {t} from '../../locales/i18n';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import {MapWithMarkers} from './MapWithMarkers';
import Geolocation from '@react-native-community/geolocation';

const DistanceFilter = 3;
const LatitudeChangeDelta = 0.0001;
const LongitudeChangeDelta = 0.0001;

export default class RouteNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextLocationIndex: 0,
            locations: this.props.navigation.getParam('locations'),
            latitude: null,
            longitude: null,
        };
        this.findCoordinates();
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    };

    getNextLocation() {
        return this.state.locations[this.state.nextLocationIndex];
    }

    finishRoute = () => {
        this.props.navigation.navigate('RouteFinish', {
            routeId: this.props.navigation.getParam('routeId'),
        });
    };

    updateNextLocation = () => {
        let curLatitudeDelta = Math.abs(
            this.getNextLocation().latitude - this.state.latitude,
        );
        let curLongitudeDelta = Math.abs(
            this.getNextLocation().longitude - this.state.longitude,
        );

        if (
            curLatitudeDelta <= LatitudeChangeDelta &&
            curLongitudeDelta <= LongitudeChangeDelta
        ) {
            const curLocIndex = this.state.nextLocationIndex;
            if (curLocIndex === this.state.locations.length) {
                this.finishRoute();
            } else {
                this.setState({
                    nextLocationIndex: curLocIndex + 1,
                });
            }
        }
    };

    componentDidMount = () => {
        this.watchID = Geolocation.watchPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                this.updateNextLocation();
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 250,
                maximumAge: 20,
                distanceFilter: DistanceFilter,
            },
        );
    };

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    };

    render() {
        return (
            <View style={styles.container}>
                <MapWithMarkers
                    locations={this.state.locations}
                    deltas={{latitudeDelta: 0.005, longitudeDelta: 0.005}}
                />
                <ListItem key={this.props.navigation.getParam('name')}>
                    <Body>
                        <Text style={{paddingBottom: 10}}>
                            {t('next-stop')}
                        </Text>
                        <H2>{this.getNextLocation().name}</H2>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.finishRoute()}>
                            <Icon name="md-close-circle" />
                        </Button>
                    </Right>
                </ListItem>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    locationlist: {
        flex: 1,
    },
    btnCentered: {width: 100, flexDirection: 'row', justifyContent: 'center'},
});
