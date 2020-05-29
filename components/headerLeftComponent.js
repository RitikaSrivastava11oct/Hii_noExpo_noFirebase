import React from 'react';
import { View,Image,Text,TouchableHighlight }from 'react-native';
import { Icon } from 'react-native-elements';
import Home from './home/HomeComponent';


 function HeaderLeft (props){
    const { navigate } = props.navigation;
    return(
        <View style={{ marginLeft : 10}}>
          <Icon name="menu" size={35}
              color= 'white'
              onPress={ () => props.navigation.toggleDrawer() } /> 
      </View>
    );
}

export default HeaderLeft;