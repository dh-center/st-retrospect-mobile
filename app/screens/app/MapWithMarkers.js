import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Fab, Icon, View} from 'native-base';
import {StyleSheet} from 'react-native';

const CurrentLocationMarker = () => {
    return <View style={styles.circle} />;
};

const LatitudeChangeDelta = 1.5;
const DistanceFilter = 3;

export class MapWithMarkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: this.props.deltas.latitudeDelta,
            longitudeDelta: this.props.deltas.longitudeDelta,
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

    componentDidMount = () => {
        this.watchID = Geolocation.watchPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
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

    onPressZoomIn() {
        const region = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta / LatitudeChangeDelta,
            longitudeDelta: this.state.longitudeDelta / LatitudeChangeDelta,
        };
        this.setState(region);
        this.map.animateToRegion(region, 100);
    }

    onPressZoomOut() {
        const region = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta * LatitudeChangeDelta,
            longitudeDelta: this.state.longitudeDelta * LatitudeChangeDelta,
        };
        this.setState(region);
        this.map.animateToRegion(region, 100);
    }

    MinusButton = () => {
        return (
            <Fab
                active={true}
                direction="up"
                position="bottomRight"
                style={{
                    backgroundColor: '#fff',
                }}
                onPress={() => this.onPressZoomOut()}>
                <Icon name="md-remove" style={{color: '#f6c23d'}} />
            </Fab>
        );
    };

    PlusButton = () => {
        return (
            <Fab
                active={true}
                direction="up"
                position="bottomRight"
                style={{
                    backgroundColor: '#fff',
                }}
                containerStyle={{bottom: 100}}
                onPress={() => this.onPressZoomIn()}>
                <Icon name="md-add" style={{color: '#f6c23d'}} />
            </Fab>
        );
    };

    render() {
        let points = [];
        const locations = this.props.locations;

        for (let i = 0; i < locations.length; i++) {
            points.push(<Marker key={i} coordinate={locations[i]} />);
        }

        points.push(
            <Marker
                coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                }}
                key={locations.length + 1}>
                <CurrentLocationMarker />
            </Marker>,
        );

        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta,
                    }}
                    style={styles.map}
                    ref={ref => (this.map = ref)}>
                    <MapViewDirections
                        origin={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}
                        destination={locations[locations.length - 1]}
                        waypoints={locations}
                        apikey={GOOGLE_DIRECTIONS_API_KEY}
                        strokeWidth={5}
                        strokeColor="#f6c23d"
                        mode="WALKING"
                        resetOnChange={false}
                    />
                    {points}
                </MapView>
                <this.PlusButton />
                <this.MinusButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    map: {
        flex: 1,
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 18 / 2,
        backgroundColor: '#f6c23d',
        borderColor: '#fff',
        borderWidth: 2,
    },
});
