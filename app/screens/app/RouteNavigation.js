import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Body, Button, H2, Icon, ListItem, Right} from 'native-base';
import {t} from '../../locales/i18n';
import {MapWithMarkers} from './MapWithMarkers';
import {store} from '../../redux/store';

const LatitudeChangeDelta = 0.0001;
const LongitudeChangeDelta = 0.0001;

export default class RouteNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextLocationIndex: 0,
            locations: this.props.navigation.getParam('locations'),
        };
    }

    getNextLocation() {
        return this.state.locations[this.state.nextLocationIndex];
    }

    finishRoute = () => {
        this.props.navigation.navigate('RouteFinish', {
            routeId: this.props.navigation.getParam('routeId'),
        });
    };

    showInfo = () => {
        Alert.alert(
            this.getNextLocation().name,
            this.getNextLocation().description,
            [
                {
                    text: 'Back to route',
                    style: 'cancel',
                },
            ],
        );
    };

    updateNextLocation = () => {
        let curLatitudeDelta = Math.abs(
            this.getNextLocation().latitude - store.getState().latitude,
        );
        let curLongitudeDelta = Math.abs(
            this.getNextLocation().longitude - store.getState().longitude,
        );

        if (
            curLatitudeDelta <= LatitudeChangeDelta &&
            curLongitudeDelta <= LongitudeChangeDelta
        ) {
            const curLocIndex = this.state.nextLocationIndex;
            if (curLocIndex === this.state.locations.length) {
                this.finishRoute();
            } else {
                this.setState({
                    nextLocationIndex: curLocIndex + 1,
                });
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <MapWithMarkers
                    locations={this.state.locations}
                    deltas={{latitudeDelta: 0.005, longitudeDelta: 0.005}}
                />
                <ListItem key={this.props.navigation.getParam('name')}>
                    <Body>
                        <Text style={{paddingBottom: 10}}>
                            {t('next-stop')}
                        </Text>
                        <H2>{this.getNextLocation().name}</H2>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.showInfo()}>
                            <Icon name="md-information-circle-outline" />
                        </Button>
                        <Button transparent onPress={() => this.finishRoute()}>
                            <Icon name="md-close-circle" />
                        </Button>
                    </Right>
                </ListItem>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    locationlist: {
        flex: 1,
    },
    btnCentered: {width: 100, flexDirection: 'row', justifyContent: 'center'},
});
