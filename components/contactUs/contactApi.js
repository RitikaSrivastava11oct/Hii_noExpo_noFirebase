import { config } from '../../utils/config';
import { helpers } from '../../utils/helpers';

async function getContactDetails(){
    try {
        let data = {
            apiPath : `${config.backend}contact`,
            body : '',
            method : 'GET'
        }
        let response = await helpers.secureFetch(data);
        return response;

    } catch (error) {
        throw error;
    }

}

export const contactApi = { getContactDetails }; 