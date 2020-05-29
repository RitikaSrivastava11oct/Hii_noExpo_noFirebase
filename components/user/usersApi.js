import { config } from '../../utils/config';
import { helpers } from '../../utils/helpers';
import { AsyncStorage } from 'react-native';


async function handleLogin(userData) {
  try {
    let data = {
      apiPath: `${config.backend}users/login/`,
      body: userData,
      method: 'POST'
    }
    let response = await helpers.secureFetch(data);
    if (response.result === true) {
      await AsyncStorage.multiSet([
        ["jwt", response.results.token],
        ["username", response.results.user.username],
        ["userId", response.results.user._id],
        ["admin",JSON.stringify(response.results.user.admin)]
      ]);
    }
    return response;
  }
  catch (error) {
    throw error;
  }
}


async function handleSignup(userData) {
  try {
    let data = {
      apiPath: `${config.backend}users/signup/`,
      body: userData,
      method: 'POST'
    }
    let response = await helpers.secureFetch(data);
    return response;
  }
  catch (error) {
    throw error;
  }
}
export const usersApi = { handleLogin ,handleSignup};