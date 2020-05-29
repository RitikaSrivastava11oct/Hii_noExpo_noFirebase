import { config } from '../../utils/config';
import { helpers } from '../../utils/helpers';
import { AsyncStorage } from 'react-native';

async function getCategoryProducts(category_id) {
    try {
        let data = {
            apiPath : `${config.backend}products/get-category-products/`,
            body : {"category_id": category_id},
            method : 'POST'
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function getProducts() {
    try {
        let data = {
            apiPath : `${config.backend}products/`,
            body : '',
            method : 'GET'
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function getProductDetail(product_id){
    try {
        let data = {
            apiPath : `${config.backend}products/get-product/`,
            body : {"product_id": product_id},
            method : 'POST'
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function addProduct(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        Object.assign(payload,{created_by : userId});
        let data = {
            apiPath : `${config.backend}products/`,
            body : payload,
            method : 'POST',
            jwt : jwt
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function editProduct(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        let data = {
            apiPath : `${config.backend}products/`,
            body : payload,
            method : 'PUT',
            jwt : jwt
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function deleteProduct(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        let data = {
            apiPath : `${config.backend}products/`,
            body : payload,
            method : 'DELETE',
            jwt : jwt
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function addToCart(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        Object.assign(payload,{user_id : userId});
        let data = {
            apiPath : `${config.backend}cart/`,
            body : payload,
            method : 'POST',
            jwt : jwt
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}


export const products = { getCategoryProducts ,getProductDetail,addProduct,getProducts,editProduct,deleteProduct,addToCart};