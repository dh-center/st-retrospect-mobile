import React, { Component } from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from '../../theme/styles';


class Loader extends Component{
    render() {
        return (
            <View style={styles.centerContent}>
                <ActivityIndicator color="#2d2d2d" />
            </View>
        )
    };
}


export default Loader;
