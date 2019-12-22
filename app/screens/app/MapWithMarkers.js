import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import React, {Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Fab, Icon, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';

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
            points: [],
        };
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
            {enableHighAccuracy: true},
        );
    };

    findPoints = () => {
        let points = [];
        const locations = this.props.locations;

        for (let i = 0; i < locations.length; i++) {
            points.push(
                <Marker
                    key={i}
                    coordinate={locations[i]}
                    pinColor={'#f6c23d'}
                    tracksViewChanges={false}
                    title={locations[i].name[store.getState().locale]}
                    description={locations[i].description}
                />,
            );
        }
        console.log(points);
        this.setState({points: points});
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
        this.findCoordinates();
        this.findPoints();
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
        const locations = this.props.locations;

        if (
            this.state.latitude &&
            this.state.longitude &&
            this.state.points.length !== 0
        ) {
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
                        {this.state.points}
                        <Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}
                            key={locations.length + 1}>
                            <CurrentLocationMarker />
                        </Marker>
                    </MapView>
                    <this.PlusButton />
                    <this.MinusButton />
                </View>
            );
        } else {
            return <Loader />;
        }
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
