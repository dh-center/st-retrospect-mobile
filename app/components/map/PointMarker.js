import React, {Component} from 'react';

import {Callout, Marker} from 'react-native-maps';
import {View, Text} from 'native-base';
import {styles} from '../../theme/styles';

class PointMarker extends Component {
    render() {
        return (
            <Marker
                {...this.props}
                pinColor={'#f6c23d'}
                tracksViewChanges={false}>
                <Callout style={{width: 200}}>
                    <View style={styles.centerContent}>
                        <Text>{this.props.title}</Text>
                    </View>
                </Callout>
            </Marker>
        );
    }
}

export default PointMarker;
