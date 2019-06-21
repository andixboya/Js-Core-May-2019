// const assert = require(`chai`).assert;

function validateRequest(obj) {

    if (obj.hasOwnProperty(`method`)){
        validateMethod(obj);
    } else {
        throw new Error(`Invalid request header: Invalid Method`);
    }
    if (obj.hasOwnProperty(`uri`)) {
        validateUri(obj);
    } else {
        throw new Error(`Invalid request header: Invalid URI`);
    }
    if (obj.hasOwnProperty(`version`)){
        validateVersion(obj);
    } else {
        throw new Error(`Invalid request header: Invalid Version`)
    }
    if (obj.hasOwnProperty(`message`)){
        validateMessage(obj);
    } else {
        throw new Error(`Invalid request header: Invalid Message`)
    }

    return obj;

    function validateMethod(obj){
        let validMethods = {
            GET: `GET`,
            POST: `POST`,
            DELETE: `DELETE`,
            CONNECT: `CONNECT`
        }

        let method = validMethods[obj.method];
        if (!method) {
            throw new Error(`Invalid request header: Invalid Method`);
        }
    }

    function validateUri(obj) {
        // let pattern = /^([A-Z0-9a-z]*)(\.[A-Z0-9a-z]*)?(\.[A-Z0-9a-z]*)?$/g;
        const pattern= /^([\w.]+)$/gm;
        let uri = obj.uri;
        let match = uri.match(pattern);
        if ((!match && match !== ``) && obj.uri !== `*`) {
            throw new Error(`Invalid request header: Invalid URI`);
        }
    }

    function validateVersion(obj) {

        let version= obj.version;
        let validVersions= [`HTTP/0.9`, `HTTP/1.0`, `HTTP/1.1`, `HTTP/2.0`];
        if (!validVersions.includes(version)){
            throw new Error(`Invalid request header: Invalid Version`);
        }

    }

    function validateMessage(obj) {
        const message = obj.message;
        const messagePattern = /^[^<>\\&'"]*$/gm;
        let match = message.match(messagePattern);

        if (!match) {
            throw new Error(`Invalid request header: Invalid Message`)
        }
    }
}
