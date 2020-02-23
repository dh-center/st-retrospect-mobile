import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import Geolocation from 'react-native-geolocation-service';
import {View} from 'native-base';

import Loader from '../../components/common/Loader';
import PointMarker from '../../components/map/PointMarker';
import MinusButton from '../../components/map/MinusButton';
import PlusButton from '../../components/map/PlusButton';
import LocationMarker from '../../components/map/LocationMarker';
import Route from '../../components/map/Route';

const LatitudeChangeDelta = 1.5;
const DistanceFilter = 3;
const RouteMode = 'WALKING';

export class MapWithMarkers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: this.props.deltas.latitudeDelta,
            longitudeDelta: this.props.deltas.longitudeDelta,
        };

        this.onPressZoomOut = this.onPressZoomOut.bind(this);
        this.onPressZoomIn = this.onPressZoomIn.bind(this);
    }

    componentDidMount() {
        this.setWatchLocation();
    }

    componentWillUnmount() {
        this.clearWatchLocation();
    }

    getCurrentLocation() {
        if (this.state.latitude && this.state.longitude) {
            return {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            };
        }
        return null;
    }

    setWatchLocation() {
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
    }

    clearWatchLocation() {
        Geolocation.clearWatch(this.watchID);
    }

    render() {
        const locations = this.props.locations;

        if (this.getCurrentLocation()) {
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
                        {this.displayRoute(locations)}
                        {this.displayRouteLocations(locations)}
                        {this.displayCurrentLocation()}
                    </MapView>
                    <PlusButton onPress={this.onPressZoomIn} />
                    <MinusButton onPress={this.onPressZoomOut} />
                </View>
            );
        } else {
            return <Loader />;
        }
    }

    displayRouteLocations(locations) {
        return locations.map((location, i) => {
            return (
                <PointMarker
                    key={i}
                    coordinate={location}
                    title={location.name}
                    description={location.description}
                />
            );
        });
    }

    displayCurrentLocation() {
        return <LocationMarker coordinate={this.getCurrentLocation()} />;
    }

    displayRoute(locations) {
        return (
            <Route
                origin={this.getCurrentLocation()}
                apikey={GOOGLE_DIRECTIONS_API_KEY}
                destination={locations[locations.length - 1]}
                waypoints={locations}
                mode={RouteMode}
            />
        );
    }

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
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    map: {
        flex: 1,
    },
});
