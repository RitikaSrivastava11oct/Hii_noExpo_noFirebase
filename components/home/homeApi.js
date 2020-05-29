import {config} from '../../utils/config';
import { helpers } from '../../utils/helpers';

async function getData() {
    try {
        let data = {
            apiPath : `${config.backend}home/`,
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

export const home = {getData};