import {config} from '../../utils/config';
import { helpers } from '../../utils/helpers';
import { AsyncStorage } from 'react-native';


async function getUserCart(){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        let data = {
            apiPath : `${config.backend}cart/${userId}`,
            body : '',
            method : 'GET',
            jwt : jwt
        }
        let response = await helpers.secureFetch(data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

async function deleteCartProduct(cartProduct_id){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        let data = {
            apiPath : `${config.backend}cart/`,
            body : {cartProduct_id : cartProduct_id},
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

export const cart = {getUserCart,deleteCartProduct};