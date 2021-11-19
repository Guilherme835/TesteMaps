import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Circle, Marker } from "react-native-maps"


export default function App (){
  const [pin, setPin] = React.useState({
    latitude: -23.51070026527385,
    longitude: -46.86502948843233,
  })
  const [region, setRegion] = React.useState({
    latitude: -23.51070026527385,
    longitude: -46.86502948843233,
    latitudeDelta: 0.092,
    longitudeDelta: 0.042,
  })
  
  return (
    <View style={{ }}>
      <GooglePlacesAutocomplete
      placeholder='Pesquise'
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "Distance",
        type: "beauty_salon"
      }}
      onPress={(data, details = null) => {

        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.092,
          longitudeDelta: 0.042,
        })

      }}
      query={{
        key: "Sua Key",
        language: "pt-BR",
        components: "country:br",
        type: "establishment",
        radius: 3000,
        location: `${region.latitude}, ${region.longitude}`
        
      }}
      styles={{
        container: { flex: 0, paddingTop: 20, width: "100%", zIndex: 1 },
        listView: { backgroundColor: "white" }
      }}
      
    />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.51070026527385,
          longitude: -46.86502948843233,
          latitudeDelta: 0.092,
          longitudeDelta: 0.042,
        }}
        provider="google"
      >
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
        <Marker 
          coordinate={pin}
          draggable={true}
          onDragStart={(e)=>{
            console.log("Drag Start", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e)=>{
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        />
        <Circle
          center={pin}
          radius={1500}
        ></Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
   width: Dimensions.get('window').width,
   height: '100%'
  },
});
