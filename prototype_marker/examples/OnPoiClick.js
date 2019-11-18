import React from 'react';
import { StyleSheet, View, Text, Dimensions,Button } from 'react-native';

import MapView, { Callout, Marker, ProviderPropType } from 'react-native-maps';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import Geolocation from '@react-native-community/geolocation';
class OnPoiClick extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      destination: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
      poi: null,
    };
    this.onPoiClick = this.onPoiClick.bind(this);
  }

  
  getlocation(){
    Geolocation.getCurrentPosition(position =>
      this.setState({
        source: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      }),
      );
  }

  onPoiClick(e) {
    const poi = e.nativeEvent;

    this.setState({
     destination: {
               latitude: poi.coordinate.latitude,
               longitude: poi.coordinate.longitude,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
             },
      poi:poi,
    });

    console.log(poi)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.source}
          onPoiClick={this.onPoiClick}
          showsUserLocation={true}
          showsMyLocationButton = {true}
        >

          {this.state.poi && (
            <Marker coordinate={this.state.poi.coordinate}>
              <Callout>
                <View>
                  <Text>Place Id: {this.state.poi.placeId}</Text>
                  <Text>Name: {this.state.poi.name}</Text>
                </View>
              </Callout>
            </Marker>
          )}

        </MapView>
        <Button title="hello" onPress={this.getlocation.bind(this)}/>
      </View>
    );
  }
}

OnPoiClick.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OnPoiClick;
