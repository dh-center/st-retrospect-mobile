import React, {Component} from 'react';

import {Fab, Icon} from 'native-base';

class MinusButton extends Component {
    render() {
        return (
            <Fab
                active={true}
                direction="up"
                position="bottomRight"
                style={{
                    backgroundColor: '#fff',
                }}
                onPress={this.props.onPress}>
                <Icon name="md-remove" style={{color: '#f6c23d'}} />
            </Fab>
        );
    }
}

export default MinusButton;
