import React from 'react';
import { View, StyleSheet, Text, Dimensions  } from 'react-native';
import MapView, {Callout, Marker, ProviderPropType} from 'react-native-maps';

// const { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// class UserMap extends React.Component {
//     constructor(props) {
//         super(props);

//         userLocationMarker = null;//

//         this.state = {
//           region: {
//             latitude: LATITUDE,
//             longitude: LONGITUDE,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           },
//           poi: null,
//         };
    
//         this.onPoiClick = this.onPoiClick.bind(this);
//     }

//     onPoiClick(e) {
//         const poi = e.nativeEvent;
    
//         this.setState({
//           poi,
//         });
//     }

//     render() {
//         return (
//             <View style={styles.mapContainer}>
//                 <MapView 
//                 initialRegion={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.0622,
//                     longitudeDelta: 0.0421,
//                 }}
//                 showsUserLocation={true}
//                 userLocationAnnotationTitle={'老子在这里'}
//                 onPoiClick={this.onPoiClick}
//                 region={props.userLocation}
//                 style = {styles.map}>
//                     <Marker coordinate={this.state.poi.coordinate}>
//                         <Callout>
//                             <View>
//                             <Text>Place Id: {this.state.poi.placeId}</Text>
//                             <Text>Name: {this.state.poi.name}</Text>
//                             </View>
//                         </Callout>
//                     </Marker>
//                 </MapView>
//             </View>
//         );
//     }
// }

// UserMap.propTypes = {
//     provider: ProviderPropType,
// };

const usersMap = props => {
    let userLocationMarker = null;

    if(props.userLocation){
        //userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>
    }
    return (
        <View style={styles.mapContainer}>
            <MapView 
                initialRegion={{
                    latitude: 29.6500,
                    longitude: -82.3248,
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
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
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