import React from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import Geolocation from 'react-native-geolocation-service';
import {setDeviceLocation} from '../../redux/actions/actions.location';

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        const isAuthorized = this.checkAuthToken();
        let hasLocationPermission = await this.checkLocationPermission();
        if (!hasLocationPermission) {
            await this.requestLocationPermission();
        }
        this.findCoordinates();
        this.setWatchLocation();
        this.props.navigation.navigate(isAuthorized ? 'App' : 'Auth');
    }

    componentWillUnmount() {
        this.clearWatchLocation();
    }

    findCoordinates() {
        Geolocation.getCurrentPosition(
            position => {
                store.dispatch(
                    setDeviceLocation(
                        position.coords.latitude,
                        position.coords.longitude,
                    ),
                );
            },
            error => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    setWatchLocation() {
        this.watchID = Geolocation.watchPosition(
            position => {
                store.dispatch(
                    setDeviceLocation(
                        position.coords.latitude,
                        position.coords.longitude,
                    ),
                );
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 250,
                maximumAge: 20,
                distanceFilter: 3,
            },
        );
    }

    clearWatchLocation() {
        Geolocation.clearWatch(this.watchID);
    }

    checkAuthToken() {
        const authToken = store.getState().authToken;
        return !!authToken;
    }

    async checkLocationPermission() {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted;
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Allow this app to use your location?',
                    message:
                        'StRetrospect would like to have access to your ' +
                        'location to show nearest routes and places.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            alert('An error occured. Please restart the app.');
        }
    }

    render() {
        return (
            <View>
                <Loader />
            </View>
        );
    }
}
