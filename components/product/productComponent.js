import React, { Component } from 'react';
import { View, Text ,ScrollView ,Dimensions ,FlatList} from 'react-native';
import { Card, Icon ,Tile ,Button} from 'react-native-elements';
import { products } from './productsApi';
import { s, styles, themeColor, themeColor1 } from '../../utils/style';
import { config } from '../../utils/config';
//import * as Animatable from 'react-native-animatable';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: '',
            width: Dimensions.get('window').width,
            height : Dimensions.get('window').height
        };
    }

    async componentDidMount() {
        try {
            const product_id = this.props.navigation.getParam('product_id', '');
            let PRODUCT = await products.getProductDetail(product_id);
            if (PRODUCT.result)
                this.setState({ product: PRODUCT.results });
        }
        catch (error) {
            console.error(error);
        }
    }

    async addToCart(){
        let status = await products.addToCart({ product_id: this.state.product._id });
        alert(status.message);

    }

    render() {
        const { width } = this.state;
        const { height } = this.state;
        let product = this.state.product;
        let imagePath = product.filePath ? `${config.backend}images/${product.filePath}` : 'null';
        const { navigate } = this.props.navigation;
        
        const renderCommentItem = ({item, index}) => {
            return (
                <View key={index} style={{margin: 10}}>
                    <Text style={{fontSize: 14}}>{item.comment}</Text>
                    <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
                </View>
            );
        };
        
        let disountPercentage=Math.round(((product.price-product.disountPrice)/product.price*100));
        let Save = product.price-product.disountPrice;
        if (!product) return (<View></View>);

        return (

                <View >
                <ScrollView>
                    <View style ={{ marginTop : 10, marginBottom :10 , marginLeft :5 , marginRight : 5}}>
                        <Tile
                        height = {529}
                        fontSize = {9}
                        textDecorationStyle
                        title={product.product_name} 
                        imageSrc={{ uri: imagePath }}
                        contentContainerStyle={{ height: 70 }}
                        >
                            <View >
                                <Text style = {{ fontSize : 14}}>
                                    {product.product_description}
                                </Text>
                            </View>
                        </Tile>
                        <View style = {{ marginLeft : 18 , marginTop : 10}}>
                            <Text style = {{ fontSize :16 , color :'#B22222', fontWeight : 'bold'}}> 
                                ₹{product.disountPrice}
                            </Text>
                            <View style = {{ flexDirection : 'row' }}>
                                <Text style={{fontSize :16 ,textDecorationLine : 'line-through', textDecorationStyle : 'solid'}}>
                                    {product.price}
                                </Text>
                                <Text style = {{ marginLeft : 5, fontSize :16 ,color :themeColor}}> 
                                    Save ₹{Save}
                                </Text>
                            </View>

                            <Text style = {{ fontSize :16 ,color :themeColor}}> 
                                ({disountPercentage}%)
                            </Text>
                        </View>

                    </View>
                    <View>
                        <FlatList
                            data={this.state.product.comments}
                            renderItem={renderCommentItem}
                            keyExtractor={(item)=>{ item._id.toString()}}
                         />
                    </View>
                    <View style={styles.bottomRight}>
                        <Button
                            type = 'outline'
                            icon={
                                <Icon
                                    raised
                                    reverse
                                    name='shopping-cart'
                                    type='font-awesome'
                                    color ={ themeColor}
                                    size = {9}
                                   
                                />
                            }
                            onPress={() =>  this.addToCart()}
                            title="Add To Cart"
                            titleStyle = {{ color : themeColor }}
                            buttonStyle = {{ backgroundColor : themeColor1 , borderColor : themeColor}}
                            />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default ProductComponent;