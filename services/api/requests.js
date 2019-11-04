import { signUpUrl, logInUrl } from './endpoints';
import {store} from '../../data/users/store';
import {SAVE_AUTH_TOKEN} from '../../data/users/action_types';

export function sendSignUpRequest(username, password) {
    fetch(
        signUpUrl,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }
    )
        .then((response) => {
            if (response.status == 201) {
                console.log('OK');
            }
            else {
                console.log(response.status);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export function sendLogInRequest(username, password) {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    const parmsUrl = logInUrl + `?username=${encodedUsername}&password=${encodedPassword}`;

    fetch(parmsUrl)
        .then((response) => response.json())
        .then((responseData) => {
            store.dispatch({type: SAVE_AUTH_TOKEN, authToken: responseData.data.accessToken});

        })
        .catch((error) => {
            console.error(error);
        });
}
