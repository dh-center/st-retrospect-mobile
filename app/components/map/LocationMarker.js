import React, {Component} from 'react';

import {Marker} from 'react-native-maps';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';

class LocationMarker extends Component {
    render() {
        return (
            <Marker {...this.props}>
                <View style={styles.circle} />
            </Marker>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        width: 18,
        height: 18,
        borderRadius: 18 / 2,
        backgroundColor: '#f6c23d',
        borderColor: '#fff',
        borderWidth: 2,
    },
});

export default LocationMarker;
