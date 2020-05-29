import React, { Component } from 'react';
import { View, Platform ,Image,Text} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import CategoryComponent from './category/categoryComponent';
import HomeComponent from './home/HomeComponent';
import CategoryProductsComponent from './product/categoryProductComponent';
import ProductComponent from './product/productComponent';
import AllProductsComponent from './product/AllProductsComponent';
import CartComponent from './cart/CartComponent';
import Login from './user/loginModalComponent';
import HeaderLeft from './headerLeftComponent';
import HeaderRight from './headerRightComponent';
import AboutComponent from "./aboutUs/AboutComponent";
import ContactComponent from "./contactUs/ContactComponent";
import { themeColor1 ,themeColor,drawerBackgroundColor} from '../utils/style';
import Test from './test';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      menuModal : false
    };
  }


  render() {
    
    const HomeNavigator = createStackNavigator({
      
      HomeComponent: { screen: HomeComponent },
      CategoryProductsComponent: { screen: CategoryProductsComponent },
      ProductComponent: { screen: ProductComponent },
      CartComponent : {screen : CartComponent}
    },
      {
        initialRouteName: 'HomeComponent',
        defaultNavigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff"
          },
          headerRight: ()=>(
            <HeaderRight navigation= {navigation}
            menuModal = { this.state.menuModal}
            toggleMenuModal={()=>{this.setState({menuModal : !this.state.menuModal})}}
            toggleModal={()=>{this.setState({loginModal : !this.state.loginModal})}}/>
          ),
          headerLeft: ()=>(
            <HeaderLeft navigation={navigation} />
          )
        })
      },
      console.log('hiii gggg ')
    );

    console.log('hiii main 1'); 
    const CategoryNavigator = createStackNavigator({
      CategoryComponent: { screen: CategoryComponent },
      CategoryProductsComponent: { screen: CategoryProductsComponent },
      ProductComponent: { screen: ProductComponent }
    },
      {
        initialRouteName: 'CategoryComponent',
        defaultNavigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            
            color: "#fff"
          },
          headerRight: (
            <HeaderRight navigation = {navigation}
            toggleMenuModal={()=>{this.setState({menuModal : !this.state.menuModal})}}
            menuModal = { this.state.menuModal}
              toggleModal={()=>{this.setState({loginModal : !this.state.loginModal})}}/>
          ),
          headerLeft: (
            <HeaderLeft navigation={navigation} />
          )


        })
      }
    );
    console.log('hiii main 2');
    const ProductNavigator = createStackNavigator({
      AllProductsComponent: { screen: AllProductsComponent },
      ProductComponent: { screen: ProductComponent }
    },
      {
        initialRouteName: 'AllProductsComponent',
        defaultNavigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            
            color: "#fff"
          },
          headerRight: (
            <HeaderRight navigation = {navigation}
            toggleModal={()=>{this.setState({loginModal : !this.state.loginModal})}}/>
          ),
          headerLeft: (
            <HeaderLeft navigation={navigation} />
          )


        })
      }
    );
    console.log('hiii main 3');
    const CartNavigator = createStackNavigator({
      CartComponent: { screen: CartComponent },
      ProductComponent: { screen: ProductComponent }
    },
      {
        initialRouteName: 'CartComponent',
        defaultNavigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            
            color: "#fff"
          },
          headerRight: (
            <HeaderRight navigation = {navigation}
            toggleModal={()=>{this.setState({loginModal : !this.state.loginModal})}}/>
          ),
          headerLeft: (
            <HeaderLeft navigation={navigation} />
          )
        })
      }
    );
    console.log('hiii main 5');
    const AboutNavigator = createStackNavigator({
      AboutComponent : { screen : AboutComponent }
      },
      {
        initialRouteName : 'AboutComponent',
        defaultNavigationOptions : ({navigation}) => ({
          headerStyle : {
            backgroundColor : themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff"
          },
          headerRight: (
            <HeaderRight navigation = {navigation}
            toggleModal={()=>{this.setState({loginModal : !this.state.loginModal})}}/>
          ),
          headerLeft: (
            <HeaderLeft navigation={navigation} />
          )
        })
      }

    );
    console.log('hiii main 6');
    const ContactNavigator = createStackNavigator({
      ContactComponent : { screen : ContactComponent }
      },
      {
        initialRouteName : 'ContactComponent',
        defaultNavigationOptions : ({navigation}) => ({
          headerStyle : {
            backgroundColor : themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff"
          },
          headerRight: (
            <HeaderRight navigation = {navigation}
            toggleModal={()=>{this.setState({loginModal : !this.state.loginModal})}}/>
          ),
          headerLeft: (
            <HeaderLeft navigation={navigation} />
          )
        })
      }

    );
    console.log('hiii main 7');
    const MainNavigator = createDrawerNavigator({
      'Home':
      {
        screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      },
      'Categories':
      {
        screen: CategoryNavigator,
        navigationOptions: {
          title: 'Categories',
          drawerLabel: 'Categories',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      }
      , 'Products':
      {
        screen: ProductNavigator,
        navigationOptions: {
          title: 'Products',
          drawerLabel: 'Products',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='shopping-bag'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      }, 'Cart':
      {
        screen: CartNavigator,
        navigationOptions: {
          title: 'My Cart',
          drawerLabel: 'My Cart',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='shopping-cart'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      },
      'About Us' :
      {
        screen : AboutNavigator,
        navigationOptions : {
          title : 'About Us',
          drawerLabel : 'About Us',
          drawerIcon : ({ tintColor }) => (
            <Icon
              name='address-book'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      },
      'Contact Us' :
      {
        screen : ContactNavigator,
        navigationOptions : {
          title : 'Contact Us',
          drawerLabel : 'Contact Us',
          drawerIcon : ({ tintColor }) => (
            <Icon
              name='phone'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      }


    }, {
      drawerBackgroundColor: drawerBackgroundColor,
      activeTintColor: '#739c1a',
      inactiveTintColor: '#D3D3D3',
      initialRouteName: 'Home'
    },console.log('hiii main drawer'));
    console.log('hiii main 8');
    const AppCategoryNavigator = createAppContainer(MainNavigator);
    console.log('hiii main 9');
    return (
      // <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 1 }}>
        <Login showModal={this.state.loginModal} toggleModal={() => this.setState({ loginModal: !this.state.loginModal })} />
        <AppCategoryNavigator />
              {/* <View><Text>Test</Text>
      <Test/>
      </View> */}
      </View >

    );
  }
}

export default Main;

// import * as React from 'react';
// import {Button} from 'react-native-elements';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeComponent from './home/HomeComponent';

// const Stack = createStackNavigator();

//  export default function MyStack() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeComponent}
//           options={{ title: 'Welcome' }}
//         />
        
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function HomeScreen({ navigation }) {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
//         // navigation.navigate('Profile', { name: 'Jane' })
//         console.log('in stack of 0.62')}
//     />
//   );
// }