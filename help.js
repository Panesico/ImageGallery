const clientId = 'aYgYAGQ4dZfiL3ucUNj_-PgpNuNXy4gQ1o16CnpVIlI'; // Replace with your access key
const clientSecret = 'eas4mYWxV2OpbEmnP5zTbohhzOetgirTuPMqdTaMdGk'; // Replace with your secret key
const redirectUri = 'http://127.0.0.1:3000/index.html'; // Replace with your redirect URI

function getAuthorizationCode() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
}

async function fetchAccessToken(code) {
    const url = 'https://unsplash.com/oauth/token';

    const requestBody = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
        grant_type: 'authorization_code',
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById('output').innerText = `Access Token: ${data.access_token}`;
    } catch (error) {
        console.error('Error fetching access token:', error);
        document.getElementById('output').innerText = 'Failed to fetch access token.';
    }
}

function init() {
    const code = getAuthorizationCode();
    console.log(code);
    if (code) {
        fetchAccessToken(code);
    } else {
        document.getElementById('output').innerText = 'No authorization code found in the URL.';
    }
}

window.onload = init;