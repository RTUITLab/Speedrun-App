import fetch from 'node-fetch';
import OpenAPI from 'openapi-typescript-codegen';
OpenAPI.generate({
    input: 'http://192.168.2.61:5000/swagger/v1/swagger.yaml',
    output: './src/api'
});
