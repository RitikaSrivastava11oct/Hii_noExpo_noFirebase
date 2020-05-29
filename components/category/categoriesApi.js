import {config} from '../../utils/config';
import { helpers } from '../../utils/helpers';
import { AsyncStorage } from 'react-native';


async function getCategories() {
    try {
        let data = {
            apiPath : `${config.backend}categories/`,
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

async function addCategory(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        Object.assign(payload,{created_by : userId});
        let data = {
            apiPath : `${config.backend}categories/`,
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

async function editCategory(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        let data = {
            apiPath : `${config.backend}categories/`,
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

async function deleteCategory(payload){
    try {
        let jwt = await AsyncStorage.getItem('jwt');
        let userId = await AsyncStorage.getItem('userId');
        if(!jwt || !userId) return {result : false,message : "Login First!"};
        let data = {
            apiPath : `${config.backend}categories/`,
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

export const categories = {getCategories,addCategory,editCategory,deleteCategory};