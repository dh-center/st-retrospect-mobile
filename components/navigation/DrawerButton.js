import {Button, Icon, StyleProvider} from 'native-base';
import React, { Component } from 'react';
import {withNavigation} from 'react-navigation';


class DrawerButton extends Component{
    render() {
        return (
            <Button transparent
                onPress={()=>{
                    this.props.navigation.toggleDrawer();
                }}

            >
                <Icon name='menu'/>
            </Button>
        )
    };
}

export default withNavigation(DrawerButton);
