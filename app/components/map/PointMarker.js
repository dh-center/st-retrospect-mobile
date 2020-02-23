import React, {Component} from 'react';

import {Marker} from 'react-native-maps';

class PointMarker extends Component {
    render() {
        return (
            <Marker
                {...this.props}
                pinColor={'#f6c23d'}
                tracksViewChanges={false}
            />
        );
    }
}

export default PointMarker;
