import React ,{ Component }from 'react';
import { View,Modal,Text , Platform} from 'react-native';
import { AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements';

import { styles, s, themeColor1,themeColor, btnColor } from '../utils/style';


 class HeaderRight extends Component{
     constructor( props ){
         super( props );
     }

     render(){
        
        const { navigate } = this.props.navigation;
        const userId=AsyncStorage.getItem('userId');
        const username=AsyncStorage.getItem('username');

       return(
            <View>
               <View style={{ flexDirection: "row", justifyContent: "space-evenly",width: 80}}>
                    <Icon
                        name = 'shopping-cart'
                        size = {20}
                        color = '#fff'
                        onPress={() => {navigate('CartComponent',{ username : username , userId : userId})}}
                        type = 'font-awesome'/>
            
                    <Icon
                        name = 'sign-out'
                        onPress={() => {this.props.toggleModal() }}
                        size = {20}
                        color = '#fff'
                        type = 'font-awesome'/>
                </View>
            </View>
       );
     }

}

export default HeaderRight;