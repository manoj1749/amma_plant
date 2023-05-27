import React from 'react';
import { StyleSheet, View,TouchableOpacity} from 'react-native';
import MenuButton from '../../components/MenuButton';
import {AppIcon} from '../../styles/AppStyles';
import {useDispatch} from 'react-redux';
import { Avatar } from 'react-native-paper';
import Icon, { Icons } from '../../constants/Icons';


export default function DrawerContainer({navigation}) {
  const dispatch = useDispatch();
  const DrawerArr = [
    { route: 'HomeStack', Title: 'Home', Name: 'home', type:Icons.AntDesign },
    { route: 'AddImageStack', Title: 'Add Image',  Name: 'add-a-photo', type:Icons.MaterialIcons },
    { route: 'LoginStack', Title: 'Log Out', Name: 'logout', type:Icons.AntDesign },
  ];
  return (
    <View style={styles.content}>
      <View style={styles.container}>
      <View
        style={{
          flex: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Avatar.Image
          size={150}
          style={{marginHorizontal: 20,backgroundColor:'#00e4d0'}}
          // source={{uri: user && user.photoURL}}
        />
      </View>
      <View style={{
          flex: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        {DrawerArr.map((item,index)=>{
          return(
            <TouchableOpacity >
              <Icon type={item.type} name={item.Name} color={'#00e4d0'} size={25}  />
            </TouchableOpacity>
          )
        })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection:'column'
   
  },
});
