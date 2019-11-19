import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from "native-base";
import {StyleSheet} from 'react-native';

const HereMarker = () => {
    return (
        <Icon name='navigate'/>
    )
};

export class MapWithMarkers extends Component {
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

    componentDidMount = () => {
        this.watchID = Geolocation.watchPosition(
            position => {
                this.setState({
                    currentPosition: position.coords
                });
                console.log(position.coords);
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 250, maximumAge: 20 }
        );
    };

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    };

    render() {
        let points = [];
        const locations = this.props.locations;

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
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: this.state.currentPosition.latitude,
                    longitude: this.state.currentPosition.longitude,
                    latitudeDelta: this.props.deltas.latitudeDelta,
                    longitudeDelta: this.props.deltas.latitudeDelta,
                }}
                style={styles.map}
            >
                <MapViewDirections
                    origin={this.state.currentPosition}
                    destination={locations[locations.length-1]}
                    waypoints={locations}
                    apikey={GOOGLE_DIRECTIONS_API_KEY}
                    strokeWidth={5}
                    strokeColor="#f6c23d"
                    mode="WALKING"
                />
                {points}


            </MapView>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 3,
    },
});
