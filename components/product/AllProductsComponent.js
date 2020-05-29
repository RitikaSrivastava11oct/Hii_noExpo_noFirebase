import React, { Component } from 'react';
import { Text, View, FlatList, TextInput, Modal, TouchableHighlight, Picker, Button ,ScrollView,Alert , Dimensions} from 'react-native';
import { Card, Icon ,Input, Tile} from 'react-native-elements';
import { products } from './productsApi';
import { categories } from '../category/categoriesApi';
import { s, styles, themeColor ,themeColor1,btnColor} from '../../utils/style';
import { config } from '../../utils/config';
import { AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-picker';

// import * as ImagePicker from 'expo-image-picker';

class AllProductsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: '',
            categories : [{category_name : '',_id : ''}],
            productModal: false,
            delModal: false,
            product_name: '',
            product_description: '',
            category_id: '',
            price: '',
            fileData: '',
            editProId: '',
            delProId: '',
            admin: '',
            disountPrice: '',
            purchaseCost: '',
            width: Dimensions.get('window').width
            
        };
    }

    async componentDidMount() {

        try {let CATEGORIES;
            let PRODUCTS = await products.getProducts();
            if (PRODUCTS.result === true) {
                this.setState({ products: PRODUCTS.results });
                CATEGORIES = await categories.getCategories();
                if (CATEGORIES.result === true)   this.setState({ categories: CATEGORIES.results });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    
    static navigationOptions = {
        
        title : 'Products'
    }

    async  isAdmin(){
        try {
            let isAdminValue = await AsyncStorage.getItem('admin');
            if(isAdminValue!=null)
            this.setState({
                admin:isAdminValue
            });
        }
        catch (error) {
            throw error;
        }
    }

    async handleDelete() {
        if (this.state.delProId) {
            let status = await products.deleteProduct({ product_id: this.state.delProId });
            if (status.result === true) {
                this.setState({ delModal: false, delProId: '' });
                this.componentDidMount();
            }
            alert(status.message);
        }
    }

    async handleSubmit() {
        let status;
        let payload = {
            product_name: this.state.product_name,
            product_description: this.state.product_description,
            category_id: this.state.category_id,
            price: parseInt(this.state.price),
            disountPrice : parseInt(this.state.disountPrice),
            purchaseCost : parseInt(this.state.purchaseCost)
        }
        try{
            if (this.state.editProId) {
                let payloadData = {
                    product_id: this.state.editProId, toUpdate: {
                        product_name: this.state.product_name,
                        product_description: this.state.product_description,
                        price: parseInt(this.state.price),
                        category_id : this.state.category_id,                    
                        disountPrice : parseInt(this.state.disountPrice),
                        purchaseCost : parseInt(this.state.purchaseCost)
                    }
                };
                if (this.state.fileData) Object.assign(payloadData, { product_img: { fileData: this.state.fileData } });
                status = await products.editProduct(payloadData);
            }
            else {
                if (this.state.fileData) Object.assign(payload, { product_img: { fileData: this.state.fileData } });
                status = await products.addProduct(payload);
            }
            if (status.result === true) {
                this.setState({category_id :"",  productModal: false, product_name: '', purchaseCost : '',disountPrice : '',product_description: '', price: '', editProId: '' });
                await this.componentDidMount();
            }
            alert(status.message);
        }
        catch(err){
            alert('error in AllProductComponent****',err);
        }
    }


    

    chooseFile = async () => {
        ImagePicker.showImagePicker((response) => {
            
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              console.log('Response = ', response.uri);
              this.setState({ fileData: source.base64 });
            }
        });
        // let image = await ImagePicker.launchImageLibraryAsync({ base64: true });
        // this.setState({ fileData: image.base64 });
    };


    deleteProduct(item) {
        this.setState({
            delProId: item._id
        });
        Alert.alert('DELETE PRODUCT','Are you sure you want to delete?',[
            {
                text : 'Yes',
                onPress : () => {this.handleDelete()}
            },
            {
                text : 'No',
                style: ' cancel'
            }
        ]);

    }
    editProduct(item) {
        this.setState({
            productModal: true,
            editProId: item._id,
            price: item.price,
            product_name: item.product_name,
            product_description: item.product_description,
            category_id : item.category_id ? item.category_id._id : 'Select'
        });
    }

    closeModal() {
        this.setState({
            productModal: false,
            product_name: '',
            editProId: '',
            fileData: '',
            price: '',
            product_description: '',
            delProId: ''
        });
    }

    async toggleFav(product_id, favourite) {
        try {
            let payloadData = {
                product_id: product_id, toUpdate: {
                    favourite: !favourite
                }
            };
            let status = await products.editProduct(payloadData);
            if (status.result === true) {
                this.componentDidMount();
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    render() {
        
        const { navigate } = this.props.navigation;
        const { width } = this.state;
        

        const renderProductItem = ({ item, index }) => {
            let imagePath = item.filePath ? `${config.backend}images/${item.filePath}` : 'null';
            let disountPercentage=Math.round(((item.price-item.disountPrice)/item.price*100));
            let Save = item.price-item.disountPrice;
            return (
                <View >
                    <ScrollView>
                        <View style ={{borderWidth : 1,borderColor: themeColor1, width : 165,margin : 1,marginTop : 2,height : 460,flexDirection : 'row' , justifyContent : 'space-around' , alignItems : "stretch"}}>
                            <View>
                            <Tile
                            height = {365}
                            title = {item.product_name}
                            titleStyle ={{ fontStyle : 'normal' , width : 200}}
                            width={165}
                            onPress={() => navigate('ProductComponent', { product_id: item._id })}
                            imageSrc={{ uri: imagePath }}
                            contentContainerStyle  = {{ marginTop : 0, height: 104 }}
                            >
                                <View style = {{ flexDirection : 'row' }}>
                                    <Text >
                                    {item.product_description}
                                    </Text>
                                </View>
                            </Tile>
                            <View style = {{ flexDirection : 'row' , flexWrap : 'wrap', justifyContent : 'space-evenly'}}>
                                <Text style = {{ fontSize :17 , color :'#B22222', fontWeight : 'bold'}}> 
                                    ₹{item.disountPrice}
                                </Text>
                                <Text style={{textDecorationLine : 'line-through', textDecorationStyle : 'solid', color :themeColor}}>
                                    {item.price}
                                </Text>
                                <Text style = {{ color :themeColor}}> 
                                    Save ₹{Save}
                                </Text>
                            </View>
                            <View style = {{ flexDirection : 'row' , justifyContent : 'space-evenly'}}>
                                <Text>
                                    ({disountPercentage}%)
                                </Text>
                            </View>
                            <View style = {{paddingBottom : 3,paddingTop : 3, flexDirection : 'row', flexWrap : 'wrap',justifyContent : 'space-evenly'}}>        
                                <Icon
                                    name ='pencil'
                                    type ='font-awesome' 
                                    color ={themeColor}  
                                    size = {16}
                                    onPress ={() => this.editProduct(item)}/>
                                <Icon
                                    name ='close'
                                    type ='font-awesome' 
                                    color ={themeColor}  
                                    size = {16}
                                    onPress ={() => this.deleteProduct(item)}/>
                                <Icon
                                    name = {item.favourite ?  'heart' : 'heart-o'}
                                    type ='font-awesome' 
                                    color ={themeColor}  
                                    size = {16}
                                    onPress ={() => this.toggleFav(item._id, item.favourite)}/>
                            </View>
                            </View>
                        </View>
                    </ScrollView>
                    
                </View>
            );
        };

        return (
            <View style={styles.MainContainer}>
                <View style={[s.container]}>
                    <Modal animationType={"slide"} transparent={false}
                        visible={this.state.productModal}>
                        <ScrollView>
                            <View style={[s.modal, s.fade]}>
                                <View style={[s.modalDialog]}>
                                    <View style={[s.modalContent]}>
                                        <View style={[s.modalBody]}>
                                            <View style = {{margin : 20}}> 
                                                <Picker
                                                    selectedValue={this.state.category_id}
                                                    onValueChange={(itemValue, _) => this.setState({ category_id: itemValue })}>
                                                    <Picker.Item label={'Select'} value={'Select'}/>
                                                    {
                                                        this.state.categories.map((item) => {
                                                            return (
                                                                <Picker.Item label={item.category_name} value={item._id} key  ={item._id}/>
                                                            );
                                                        })
                                                    }
                                                </Picker>
                                            </View>

                                            <View style = {{margin : 12}}>    
                                                <Input
                                                    placeholder="New product Name"
                                                    defaultValue={this.state.product_name}
                                                    onChangeText={text => this.setState({ product_name: text })}
                                                />
                                            </View>

                                            <View style = {{margin : 12}}>    
                                                <Input
                                                    placeholder="Product Decription"
                                                    defaultValue={this.state.product_description}
                                                    multiline = { true }
                                                    onChangeText={text => this.setState({ product_description: text })}
                                                />
                                            </View>
                                            <View style = {{margin : 12}}>    
                                                <Input
                                                    placeholder="Price"
                                                    defaultValue={this.state.price}
                                                    keyboardType={"numeric"}
                                                    onChangeText={text => this.setState({ price: text })}
                                                />
                                            </View>
                                            <View style = {{margin : 12}}>    
                                                <Input
                                                    placeholder="Disount Price"
                                                    defaultValue={this.state.disountPrice}
                                                    keyboardType={"numeric"}
                                                    onChangeText={text => this.setState({ disountPrice: text })}
                                                />
                                            </View>
                                            <View style = {{margin : 12}}>    
                                                <Input
                                                    placeholder="Purchase cost"
                                                    defaultValue={this.state.purchaseCost}
                                                    keyboardType={"numeric"}
                                                    onChangeText={text => this.setState({ purchaseCost: text })}
                                                />
                                            </View>
                                            <View style={styles.formButton}>
                                            <Button
                                                onPress={() => this.chooseFile()}
                                                title=" Image"
                                                color = {themeColor1}
                                                icon={
                                                    <Icon
                                                        name='image'
                                                        type='font-awesome'            
                                                        size={24}
                                                        color= 'white'
                                                    />
                                                }
                                            />
                                            </View>
                                            <View style={styles.formButton}>
                                            <Button
                                               onPress={() => this.handleSubmit()}
                                                title="Submit"
                                                color = {themeColor1}
                                                icon={
                                                    <Icon
                                                        name='image'
                                                        type='font-awesome'            
                                                        size={24}
                                                        color= 'white'
                                                    />
                                                }
                                            />
                                            </View>
                                            <View style={styles.formButton}>
                                            <Button
                                                onPress={() => this.closeModal()}
                                                title="cancel"
                                                color = {themeColor1}
                                                icon={
                                                    <Icon
                                                        name='image'
                                                        type='font-awesome'            
                                                        size={24}
                                                        color= 'white'
                                                    />
                                                }
                                            />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                    <FlatList
                        numColumns={2}
                        data={this.state.products}
                        renderItem={renderProductItem}
                        keyExtractor={item => item._id.toString()}
                    />
                </View>
                <View style={styles.bottomRight}>
                    <Icon
                        size= {17}
                        reverse
                        name='plus-circle'
                        type='font-awesome'
                        color={themeColor}
                        onPress={() => this.setState({ productModal: true })}
                    />
                </View>
            </View>
        );
    }
}

export default AllProductsComponent;