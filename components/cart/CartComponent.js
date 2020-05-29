import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, ScrollView ,Alert} from 'react-native';
import { Card, Icon} from 'react-native-elements';
import { cart } from './cartApi';
import { styles, themeColor1 ,themeColor} from '../../utils/style';
import { config } from '../../utils/config';

class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: ''
        };
    }

    async componentDidMount() {
        try {
            let CART = await cart.getUserCart();
            if (CART.result === true)
                this.setState({ cart: CART.results });
        }
        catch (error) {
            console.error(error);
        }
    }
    confirmDeleteCartProduct(itemId) {
        Alert.alert('REMOVE ','Are you sure you want to remove this product from cart? '
        ,[
            {
                text : 'Yes',
                onPress : () => {this.deleteCartProduct(itemId)}
            },
            {
                text : 'No',
                style: ' cancel'
            }
        ]);

    }

    async deleteCartProduct(cartProduct_id){
        try{
            let deleteStatus = await cart.deleteCartProduct(cartProduct_id);
            if (deleteStatus.result === true) {
                this.componentDidMount();
            }
        }
        catch(err){
            console.error(error);
        }
    }

    static navigationOptions = {
        title : 'My Cart'
    }

    render() {

        const { navigate } = this.props.navigation;
        const renderCartItem = ({ item, index }) => {
            let disountPercentage=Math.round(((item.product_id.price-item.product_id.disountPrice)/item.product_id.price*100));
            let imagePath = item.product_id.filePath ? `${config.backend}images/${item.product_id.filePath}` : 'null';
            return (
                    <View style = {styles.cartView1}>
                        <ScrollView>
                            <View style = {styles.cartView2}>
                                <View style = {styles.topRight}>
                                    <Icon
                                        name = 'close'
                                        type = 'font-awesome'
                                        size = {17}
                                        onPress={() => this.confirmDeleteCartProduct(item._id)}
                                        color = 'red'/>
                                 </View>
                                <View style={styles.cartView3}>
                                    <TouchableHighlight 
                                        onPress={() => navigate('ProductComponent', { product_id: item.product_id._id })}>
                                        <Card
                                            height ={160}
                                            width ={135}
                                            key={index}
                                            image={{ uri: imagePath }}>
                                        </Card>
                                    </TouchableHighlight>
                                </View>  
                                <View style = {styles.cartView4}>
                                    <Text style={styles.cartText1}>
                                        {item.product_id.product_name}
                                    </Text>
                                    <Text style={styles.cartText2}>
                                        {item.product_id.product_description}
                                    </Text>
                                    <Text style = {styles.cartText3}> 
                                        ₹{item.product_id.disountPrice}
                                    </Text>
                                    <Text style={styles.cartText4}>
                                        {item.product_id.price}
                                    </Text>
                                        {item.product_id.deliveryDate ? (
                                            <View style = {{flexDirection : 'row'}} >
                                                <Text style={styles.cartText5}>
                                                    Delivery by {item.product_id.deliveryDate}
                                                </Text>
                                            </View>
                                    ) : null}
                                </View>
                            </View> 
                    </ScrollView>
                </View>
            );
        };
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.cart}
                    renderItem={renderCartItem}
                    keyExtractor={item => item._id.toString()}
                />
            </View>
        );
    }
}

export default CartComponent;