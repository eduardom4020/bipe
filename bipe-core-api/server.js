import express, { Router } from 'express';
import SwaggerUi from 'swagger-ui-express';
import SwaggerAutogen from 'swagger-autogen';

import Constants from './src/constants';

const app = express();

const SwaggerGenerator = SwaggerAutogen();

const doc = {
    info: {
      title: 'Bipe Core API',
      description: 'API Core da aplicação Bipe',
    },
    host: '0.0.0.0:3000',
    schemes: ['http'],
};

const outputFile = Constants.Setup.SWAGGER_JSON_PATH;
const endpointsFiles = [];

/* NOTE: if you use the express Router, you must pass in the 
    'endpointsFiles' only the root file where the route starts,
    such as index.js, app.js, routes.js, ... */

SwaggerGenerator(outputFile, endpointsFiles, doc)
    .then(() => {
        const router = Router();

        const SwaggerDocument = require(Constants.Setup.SWAGGER_JSON_PATH);

        router.use('/api-docs', SwaggerUi.serve);
        router.get('/api-docs', SwaggerUi.setup(SwaggerDocument));

        app.use('/', router);

        app.listen(Constants.Setup.PORT, Constants.Setup.HOST, (error) => {
            if(error) console.log(`Error in server setup: ${error.toString()}`);
            console.log(`
                Server listening on ${Constants.Setup.HOST}:${Constants.Setup.PORT}\n
                Access http://localhost:${Constants.Setup.PORT}/api-docs to view 
                detailed contract infromation.
            `);
        })
    })
    .catch(error => {
        console.log(`Error in swagger generation: ${error.toString()}`);
    });