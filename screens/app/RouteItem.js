import React, { Component } from 'react';

import {ListItem, Left, Right, Body, Thumbnail, H3, Icon, Button} from 'native-base';
import { Text } from 'react-native'
import i18n from "i18n-js";
// import { useApolloClient, useMutation } from '@apollo/react-hooks';
// import {saveRoute} from '../../services/api/mutations'


// function doSaveRoute() {
//     const client = useApolloClient();
//     const [route, { loading, error }] = useMutation(
//         saveRoute,
//         {
//             onCompleted({ route }) {
//                 console.log('Saved')
//             }
//         }
//     );
//
//     if (loading) return <Loading />;
//     if (error) return <p>An error occurred</p>;
// }

class RouteItem extends Component {

    render() {
        return (
            <ListItem
                avatar
                button
                key={this.props.id}
                onPress={() => {this.props.navigation.navigate('Route')}}
            >
                <Left>
                    <Thumbnail source={{ uri: this.props.data.photoLink }} />
                </Left>
                <Body>
                <H3>{ this.props.data.name[i18n.locale] }</H3>
                <Text note>{ this.props.data.description[i18n.locale] }</Text>

                </Body>
                <Right>
                    {/*<Button transparent onPress={() => {doSaveRoute()}}>*/}
                    <Button transparent>
                        <Icon name='md-star-outline'/>
                    </Button>
                </Right>
            </ListItem>
        )
    }
};

export default RouteItem;

