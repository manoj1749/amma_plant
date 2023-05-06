import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FAB} from 'react-native-paper';
import Map from '../components/Map';
import Geolocation from '@react-native-community/geolocation';
import {setLocation} from '../redux/slices/mapSlice';
import MapScreen from '../components/MapScreen';
import {getUserDetails} from '../utiltis/utilitis';
import {getUserDetail} from '../redux/slices/userSlice';

const HomePage = ({navigation}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserDetails().then(res => {
      dispatch(getUserDetail(res.id));
    });
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        dispatch(setLocation({latitude, longitude}));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <View style={styles.container}>
      <Map />
      {/* <MapScreen /> */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('addImage')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {flex: 1},
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#86adae',
    position: 'absolute',
    bottom: 20,
    right: 10,
    padding: 2,
    color: 'white',
  },
});
export default HomePage;
