import {logInUrl, signUpUrl} from './endpoints';

export function sendSignUpRequest(username, password) {
    return fetch(signUpUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => {
            if (response.status === 201) {
                return 'OK';
            } else {
                return 'Err';
            }
        })
        .catch(() => {
            return 'Err';
        });
}

export function sendLogInRequest(username, password) {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    const parmsUrl =
        logInUrl + `?username=${encodedUsername}&password=${encodedPassword}`;

    return fetch(parmsUrl)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return 'Err';
            }
        })
        .catch(() => {
            return 'Err';
        });
}
