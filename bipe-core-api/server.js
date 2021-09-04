import express, { Router } from 'express';
import SwaggerUi from 'swagger-ui-express';
import SwaggerAutogen from 'swagger-autogen';

import ApplicationConstants from './src/application/constants';
import DataContext from './src/infrastructure/data-contexts/postgresContext';

DataContext.setupDataContext(
    'localhost',
    '5432',
    'bipe',
    'admin',
    'admin'
);

const app = express();

const SwaggerGenerator = SwaggerAutogen();

const doc = {
    info: {
      title: 'Bipe Core API',
      description: 'API Core da aplicação Bipe',
    },
    host: `${ApplicationConstants.Setup.HOST}:${ApplicationConstants.Setup.PORT}`,
    schemes: ['http'],
};

const outputFile = ApplicationConstants.Setup.SWAGGER_JSON_PATH;
const endpointsFiles = [];

/* NOTE: if you use the express Router, you must pass in the 
    'endpointsFiles' only the root file where the route starts,
    such as index.js, app.js, routes.js, ... */

SwaggerGenerator(outputFile, endpointsFiles, doc)
    .then(() => {
        const router = Router();

        const SwaggerDocument = require(ApplicationConstants.Setup.SWAGGER_JSON_PATH);

        router.use('/api-docs', SwaggerUi.serve);
        router.get('/api-docs', SwaggerUi.setup(SwaggerDocument));

        app.use('/', router);

        app.listen(ApplicationConstants.Setup.PORT, ApplicationConstants.Setup.HOST, (error) => {
            if(error) console.log(`Error in server setup: ${error.toString()}`);
            console.log(`
                Server listening on ${ApplicationConstants.Setup.HOST}:${ApplicationConstants.Setup.PORT}\n
                Access http://${ApplicationConstants.Setup.HOST === '0.0.0.0' ? 'localhost' : ApplicationConstants.Setup.HOST}:${ApplicationConstants.Setup.PORT}/api-docs to view 
                detailed contract infromation.
            `);
        })
    })
    .catch(error => {
        console.log(`Error in swagger generation: ${error.toString()}`);
    });