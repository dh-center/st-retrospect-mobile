import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Body, Button, H2, Icon, ListItem, Right} from 'native-base';
import {t} from '../../locales/i18n';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import {MapWithMarkers} from './MapWithMarkers';


export default class RouteNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nextLocation: this.props.navigation.getParam('locations')[0]
        };
    }

    render() {
        const locations = this.props.navigation.getParam('locations');

        return (

            <View style={styles.container}>
                <MapWithMarkers locations={locations} deltas={{latitudeDelta: 0.005, longitudeDelta: 0.005}}/>
                <ListItem key={this.props.navigation.getParam('name')}>
                    <Body>
                    <Text>{t('next-stop')}</Text>
                    <H2>{this.state.nextLocation.name}</H2>
                    <Text numberOfLines={2} >{this.state.nextLocation.description}</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="md-close"/>
                        </Button>
                    </Right>
                </ListItem>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    locationlist: {
        flex: 1
    },
    btnCentered: {width: 100, flexDirection: "row", justifyContent: "center"}
});
