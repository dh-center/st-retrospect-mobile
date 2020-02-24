import React, {Component} from 'react';

import MapViewDirections from 'react-native-maps-directions';

class Route extends Component {
    render() {
        return (
            <MapViewDirections
                {...this.props}
                strokeWidth={5}
                strokeColor="#f6c23d"
                resetOnChange={false}
            />
        );
    }
}

export default Route;
