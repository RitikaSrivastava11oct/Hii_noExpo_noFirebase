import { config } from '../../utils/config';
import { helpers } from '../../utils/helpers';

async function getAboutDetails(){
    try {
        let data = {
            apiPath : `${config.backend}about`,
            body : '',
            method : 'GET'
        }
        let response = await helpers.secureFetch(data);
        return response;

    } catch (error) {
        throw error;
    }

}

export const aboutApi = { getAboutDetails }; 