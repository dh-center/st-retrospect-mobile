import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';


class Loader extends Component{
    render() {
        return (
            <View style={styles.content}>
                <ActivityIndicator color="#2d2d2d" />
            </View>
        )
    };
}

let styles = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
});

export default Loader;
