import {Button, Icon} from 'native-base';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';


class DrawerButton extends Component{
    render() {
        return (
            <Button
                onPress={()=>{
                    this.props.navigation.openDrawer();
                }}>
                <Icon name='menu'/>
            </Button>
        )
    };
}

export default withNavigation(DrawerButton);
