const requester = function () {
    const baseUrl = "https://baas.kinvey.com/";

    const appKey = "kid_HyiNDXhzS";
    const appSecret = "80163071851e454f965bb77884b6a223";

    const get = function (endpoint, module, typeOfAuthorization) {
        const headers = makeHeaders(typeOfAuthorization, 'GET');
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, headers);
    };

    const post = function (endpoint, module, type, data) {
        
        const headers = makeHeaders(type, 'POST', data);
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;
        
        // debugger;
        return fetch(url, headers);
    };

    const put = function (endpoint, module, type, data) {
        const headers = makeHeaders(type, 'PUT', data);
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, headers);
    };

    const del = function (endpoint, module, type) {
        const headers = makeHeaders(type, 'DELETE');
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, headers);
    };

    const makeAuth = (typeOfAuth) => {
        return typeOfAuth === 'Basic'
            ? 'Basic ' + btoa(appKey + ':' + appSecret)
            : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    const makeHeaders = (typeOfAuth, httpMethod, data) => {
        const headers = {
            method: httpMethod,
            headers: {
                'Authorization': makeAuth(typeOfAuth),
                'Content-Type': 'application/json'
            }
        };

        if (httpMethod === 'POST' || httpMethod === 'PUT') {
            headers.body = JSON.stringify(data);
        }

        return headers;
    }

    return {
        get,
        post,
        del,
        put,
    }
}();