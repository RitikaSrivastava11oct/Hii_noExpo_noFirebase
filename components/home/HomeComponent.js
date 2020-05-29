import React, { Component } from 'react';
import { config } from '../../utils/config';
import { Text, View, FlatList, TextInput, Modal, Button, TouchableHighlight,Image ,ScrollView,Dimensions, Platform ,Linking} from 'react-native';
import { Icon, Card ,SearchBar,Tile ,SocialIcon } from 'react-native-elements';
import { styles, s, themeColor1,themeColor } from '../../utils/style';
import { home } from './homeApi';
import Swiper from "react-native-web-swiper";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favProducts: '',
            favCategories: '',
            width: Dimensions.get('window').width
        }
    }

    async componentDidMount() {
        try {
            let DATA = await home.getData();
            if (DATA.result) this.setState({ favProducts: DATA.results.favProducts, favCategories: DATA.results.favCategories });
        }
        catch (error) {
            console.error(error);
        }
    }
    static navigationOptions = {
        title : 'Hunar In India'
    }

    render() {
        const { width } = this.state;
        const { navigate }= this.props.navigation;
        const renderFavCategoryItems = ( {item,index} )=>{
            
            let imagePath = item.filePath ? `${config.backend}images/${item.filePath}` : 'null';
            return(
                    
                    <View style ={[styles.shadow ,{width : 165, margin: 0.5,height : 210 }]}>
                        <TouchableHighlight onPress ={() => navigate('CategoryProductsComponent', { category_id: item._id, category_name: item.category_name })}>
                            <Card
                                width={155}
                                key={index}
                                wrapperStyle ={[styles.shadow]}
                                image={{ uri: imagePath }}>
                                <Text style= {{ fontSize : 11 , fontWeight : 'bold'}}>
                                    {item.category_name}
                                </Text>
                                <Text style= {{ fontSize : 9 }}>
                                    {item.category_description}
                                </Text>
                            </Card>
                        </TouchableHighlight>

                    </View>
            );
        }

        const renderFavproductItems = ( {item,index} )=>{
            let imagePath = item.filePath ? `${config.backend}images/${item.filePath}` : 'null';
            return(
                <View style ={[styles.shadow ,{width : 145, margin : 0.5,height : 180 }]}>
                    <TouchableHighlight>
                        <Card
                        width={135}
                        key={index}
                        onPress ={() => navigate('ProductComponent', { product_id: item._id})}
                        wrapperStyle ={[styles.shadow]}
                        image={{ uri: imagePath }}>
                        <View style = {{flexDirection : 'row' , justifyContent : 'space-between'}}>
                            <View > 
                                <Text style= {{ fontSize : 11 , fontWeight : 'bold'}}>
                                    {item.product_name}
                                </Text>
                            </View>
                            <View >
                                <Text style= {{ fontSize : 11 , color : '#B22222' ,fontWeight : 'bold'}}>
                                    ₹{item.price}
                                </Text>
                            </View>

                            </View>
                            <Text style= {{ fontSize : 9 }}>
                                {item.product_description}
                            </Text>
                        </Card>
                    </TouchableHighlight>
                </View>
            );
        }

        return (


            <View style={styles.MainContainer}>
                <SearchBar
                    containerStyle={{backgroundColor :'#FFFFFF' }}
                    placeholder="Search..."
                    lightTheme = {true}
                    style = {{marginBottom : 5, marginTop : 5,backgroundColor : '#FFFFFF'}}
                />
                <ScrollView>
                    <View style={styles.row,{height : 200}}>
                        <View style={styles.col}>
                            <Swiper timeout={3}
                                from={0}
                                minDistanceForAction={0.1}
                                controlsProps={{
                                    dotsTouchable: true,
                                    prevPos: 'left',
                                    nextPos: 'right',
                                    nextTitle: '>',
                                    nextTitleStyle: { color: 'green', fontSize: 24, fontWeight: '500' },
                                    PrevComponent: ({ onPress }) => (
                                        <TouchableHighlight onPress={onPress}>
                                            <Text style={{ color: 'green', fontSize: 24, fontWeight: '500' }}>
                                                {'<'}
                                            </Text>
                                        </TouchableHighlight>
                                    ),
                                }}
                            >
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                                     <Image
                                        style={{ alignSelf: 'stretch', height: 200 }}
                                        source={require('.././images/i16.jpg')}
                                        //source={{ uri: 'https://image.shutterstock.com/image-vector/sale-banner-template-design-260nw-487646701.jpg' }}
                                    /> 
                                </View>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                                     <Image
                                        style={{ width:400, height: 200 }}
                                        source={require('.././images/i17.jpg')}
                                       // source={{ uri: 'https://cdn1.vectorstock.com/i/1000x1000/93/90/mega-sale-offer-and-discount-banner-design-in-vector-14299390.jpg' }}
                                    /> 
                                </View>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                                    <Image
                                        style={{ width: 400, height: 200 }}
                                        source={require('.././images/i18.jpg')}
                                        //source={{ uri: 'https://cdn1.vectorstock.com/i/1000x1000/93/10/sale-voucher-discount-and-offers-banner-design-vector-14299310.jpg' }}
                                    /> 
                                </View>
                            </Swiper>
                        </View>
                    </View>
                    
                    <View style={styles.ViewFavCategory}> 
                        <ScrollView horizontal = {true} automaticallyAdjustContentInsets= {false}
                                     contentInset={{top: 1, left: 1, bottom: 1, right: 1}}>

                            <View style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                backgroundColor: '#ecf0f1'
                                }}>
                                    <FlatList
                                        data={this.state.favCategories}
                                        renderItem={renderFavCategoryItems}
                                        keyExtractor={item => item._id.toString()}
                                        horizontal={true}
                                    /> 
                            </View>
                        </ScrollView>
                    </View>
                    
                    <View style={styles.ViewFavProducts}> 
                        <View style ={{ marginBottom : 1, marginTop : 2 ,marginStart : 9 }}>
                            <Text style = {{fontSize : 14 , fontWeight : 'bold'}}>
                                BEST SELLERS
                            </Text>
                        </View>
                        <ScrollView horizontal = {true} automaticallyAdjustContentInsets= {false}>
                            <View style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                backgroundColor: '#ecf0f1'
                                }}>
                                <FlatList
                                    data={this.state.favProducts}
                                    renderItem={renderFavproductItems}
                                    keyExtractor={item => item._id.toString()}
                                    horizontal={true}
                                />
                            </View>

                        </ScrollView>
                    </View>
                    <View style = {styles.footer}>
                    <View style={{ marginTop : 10,flexDirection: "row", justifyContent: "space-evenly",width: width}}>
                            
                                <Icon
                                    name = 'google-plus'
                                    type = 'font-awesome'
                                    size= {24}
                                    color = '#A9A9A9'
                                    onPress={() => Linking.openURL('mailto:hunarinindia@gmail.com?subject=Hunar In India&body=welcome to Hunar In India') }
                                   
                                    />
                                <Icon
                                    name = 'instagram'
                                    type = 'font-awesome'
                                    size= {24}
                                    color = '#A9A9A9'
                                    onPress={() => Linking.openURL('http://instagram.com/_u/USER_NAME') }
                                    />
                                <Icon
                                    name = 'facebook'
                                    type = 'font-awesome'
                                    size= {24}
                                    color = '#A9A9A9'
                                    onPress={() => Linking.openURL('fb://page/PAGE_ID')}
                                    />
                                <Icon
                                    name = 'twitter'
                                    type = 'font-awesome'
                                    size= {24}
                                    color = '#A9A9A9'
                                    onPress={() => Linking.openURL('mailto:hunarinindia@gmail.com?subject=Hunar In India&body=welcome to Hunar In India') }
                                    
                                    />
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text style = {{fontSize : 12 , fontStyle : 'italic', color : '#A9A9A9'}}>
                                Reach out for help .Contact Us
                                {"\n"}
                                @Copyright 2020.All rights reserved.
                                
                                
                            </Text>
                        </View>


                    </View>
                </ScrollView>

            </View>
        );
    }
}

export default Home;