import React from 'react';
import { View, StyleSheet   } from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props => {
    let userLocationMarker = null;

    if(props.userLocation){
        userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>
    }
    return (
        <View style={styles.mapContainer}>
            <MapView 
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                userLocationAnnotationTitle={'老子在这里'}
                onPoiClick={this.onPoiClick}
                region={props.userLocation}
                style = {styles.map}>
                </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '90%',
        marginTop: 20
    },
    map: {
        width: '100%',
        height: '100%'
    }
});
export default usersMap;