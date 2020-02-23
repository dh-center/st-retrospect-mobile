import React, {Component} from 'react';

import {Fab, Icon} from 'native-base';

class PlusButton extends Component {
    render() {
        return (
            <Fab
                active={true}
                direction="up"
                position="bottomRight"
                style={{
                    backgroundColor: '#fff',
                }}
                containerStyle={{bottom: 100}}
                onPress={this.props.onPress}>
                <Icon name="md-add" style={{color: '#f6c23d'}} />
            </Fab>
        );
    }
}

export default PlusButton;
