import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Body, Button, H2, List, ListItem, Right} from 'native-base';
import {t} from '../../locales/i18n';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import {MapWithMarkers} from './MapWithMarkers';


export default class RouteDescription extends Component {

    render() {
        const locations = this.props.navigation.getParam('locations');

        return (

            <View style={styles.container}>
                <MapWithMarkers locations={locations} deltas={{latitudeDelta: 0.015, longitudeDelta: 0.0121}}/>
                <ListItem key={this.props.navigation.getParam('name')}>
                    <Body>
                    <H2>{this.props.navigation.getParam('name')}</H2>
                    <Text>{this.props.navigation.getParam('description')}</Text>
                    </Body>
                    <Right>
                        <Button style={styles.btnCentered} onPress={() => this.props.navigation.navigate('RouteNavigation', {locations: locations})}>
                            <Text>{t('GO')}</Text>

                        </Button>
                    </Right>
                </ListItem>
                <ScrollView style={styles.locationlist}>
                    <List>
                        {locations.map((value) => {
                            return <ListItem key={value.latitude}>
                                        <Text>
                                            {value.name}
                                        </Text>
                                    </ListItem>;
                        })}
                    </List>
                </ScrollView>
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
