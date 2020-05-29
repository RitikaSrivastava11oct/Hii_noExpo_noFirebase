import React, { Component } from 'react';
import { config } from '../../utils/config';
import { Text, View, FlatList, TextInput, Modal, Button, TouchableHighlight, Alert , ScrollView} from 'react-native';
import { Icon, Card ,Input , Tile} from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { categories } from './categoriesApi';
import { styles, s, themeColor,themeColor1 } from '../../utils/style';
// import * as ImagePicker from 'expo-image-picker';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: '',
            showModal: false,
            delModal: false,
            category_name: '',
            category_description: '',
            fileData: '',
            editCatId: '',
            delCatId: '',
            admin: ''
        };
    }

    async componentDidMount() {
        try {
            this.isAdmin();
            let CATEGORIES = await categories.getCategories();
            this.setState({ categories: CATEGORIES.results });
        }
        catch (error) {
            console.error(error);
        }
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
        if (this.state.delCatId) {
            let status = await categories.deleteCategory({ category_id: this.state.delCatId });
            if (status.result === true) {
                this.setState({ delModal: false, delCatId: '' });
                this.componentDidMount();
            }
            alert(status.message);
        }
    }

    async handleSubmit() {
        try {
            let status;
            let payload = {
                category_name: this.state.category_name,
                category_description: this.state.category_description
            }
            if (this.state.editCatId) {
                let payloadData = {
                    category_id: this.state.editCatId, toUpdate: {
                        category_name: this.state.category_name,
                        category_description: this.state.category_description
                    }
                };
                if (this.state.fileData) Object.assign(payloadData, { category_img: { fileData: this.state.fileData } });
                status = await categories.editCategory(payloadData);
            }
            else {
                if (this.state.fileData) Object.assign(payload, { category_img: { fileData: this.state.fileData } });
                status = await categories.addCategory(payload);
            }
            if (status.result === true) {
                this.setState({
                    showModal: false, editCatId: '', category_name: '', category_description: '', category_img: {
                        fileData: ''
                    }
                });
                this.componentDidMount();
            }
            alert(status.message);
        } catch (error) {
            console.log(error);
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

    editCategoy(item) {
        this.setState({
            showModal: true,
            editCatId: item._id,
            category_name: item.category_name,
            category_description: item.category_description
        });
    }

    deleteCategoy(item) {
        this.setState({
            delCatId: item._id
        });
        Alert.alert('DELETE CATEGORY','Are you sure you want to delete?',[
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

    closeModal() {
        this.setState({
            showModal: false,
            delModal: false,
            category_name: '',
            fileData: '',
            category_description: '',
            editCatId: '',
            delCatId: ''
        });
    }

    async toggleFav(category_id, favourite) {
        try {
            let payloadData = {
                category_id: category_id, toUpdate: {
                    favourite: !favourite
                }
            };
            let status = await categories.editCategory(payloadData);
            if (status.result === true) {
                this.componentDidMount();
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    static navigationOptions = {
        title : 'Categories'
    }
    render() {
        const { navigate } = this.props.navigation;
        const height = 220 ;
        const height1 = 239; 

        const renderCategoryItem = ({ item, index }) => {
            let imagePath = item.filePath ? `${config.backend}images/${item.filePath}` : 'null';

            return (
                 <View >
                    <ScrollView>
                        <View style ={styles.catView1}>
                            <TouchableHighlight onPress={() => navigate('CategoryProductsComponent', { category_id: item._id, category_name: item.category_name })} >
                                <Card
                                    width ={165}
                                    key={index}
                                    image={{ uri: imagePath }}>
                                    <Text style= {styles.catText1}>
                                        {item.category_name}
                                    </Text>
                                    <Text style= {styles.catText2}>
                                        {item.category_description}
                                    </Text>
                                    <View style = {styles.catView2}>
                                        
                                        <Icon
                                            name ='pencil'
                                            type ='font-awesome' 
                                            color ={themeColor}  
                                            size = {16}
                                            onPress ={() => this.editCategoy(item)}/>
                                        <Icon
                                            name ='close'
                                            type ='font-awesome' 
                                            color ={themeColor}  
                                            size = {16}
                                            onPress ={() => this.deleteCategoy(item)}/>
                                        <Icon
                                            name = {item.favourite ?  'heart' : 'heart-o'}
                                            type ='font-awesome' 
                                            color ={themeColor}  
                                            size = {16}
                                            onPress ={() => this.toggleFav(item._id, item.favourite)}/>
                                    </View>
                                </Card>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
            );
        };
        return (
            <View style={styles.MainContainer}>
                <View style={[s.container]}>
                    <Modal animationType={"slide"} transparent={false}
                        visible={this.state.showModal}>
                        <View style={[s.modal, s.fade]}>
                            <View style={[s.modalDialog]}>
                            <View style={[s.modalContent] ,{ backgroundColor : '#fff9e6'}}> 
                                    <View style = {styles.topRight}>
                                        <Icon
                                            name = 'close'
                                            type = 'font-awesome'
                                            size = {22}
                                            onPress={() => { this.closeModal() }}
                                            color = 'red'/>
                                    </View>
                                    <View style={[s.modalBody]}>
                                        <View style = {styles.catView3}>    
                                            <Input
                                                placeholder=" Add Category"
                                                defaultValue={this.state.category_name}
                                                onChangeText={text => this.setState({ category_name: text })}
                                            />
                                        </View>
                                        <View style = {styles.catView3}>    
                                            <Input
                                                placeholder="Category Decription"
                                                defaultValue={this.state.category_description}
                                                onChangeText={text => this.setState({ category_description: text })}
                                            />
                                        </View>

                                        <View style={styles.formButton}>
                                            <Button
                                                    onPress={() => this.chooseFile()}
                                                    title="image"
                                                    icon={
                                                        <Icon
                                                            name='image'
                                                            type='font-awesome'            
                                                            size={24}
                                                            color= 'white'
                                                        />
                                                    }
                                                    color = {themeColor1}
                                                />
                                        </View>

                                        <View style={styles.formButton}>
                                            <Button
                                                onPress={() => this.handleSubmit()}
                                                title="submit"
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
                    </Modal>
                        
                    <FlatList
                        data={this.state.categories}
                        renderItem={renderCategoryItem}
                        numColumns= {2}
                        keyExtractor={item => item._id.toString()}
                    />
                </View>
                <View style={styles.bottomRight}>
                    {/* {this.state.admin ? ( */}
                            <Icon
                                size= {17}
                                reverse
                                name='plus-circle'
                                type='font-awesome'
                                color={themeColor}
                                onPress={() => this.setState({ showModal: true })}
                            />
                        {/* ) : null} */}
                </View>
            </View>
        );
    }
}

export default Category;