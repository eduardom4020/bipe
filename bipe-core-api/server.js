import express, { Router } from 'express';
import SwaggerUi from 'swagger-ui-express';
import SwaggerAutogen from 'swagger-autogen';

import ApplicationConstants from './src/application/constants';
import DataContext from './src/infrastructure/data-contexts/postgresContext';

// import CryptoJS from 'crypto-js';

// console.log('Senha admin: ', CryptoJS.AES.encrypt('admin', 'G0dU$sopp').toString());
// console.log('Senha admin: ', CryptoJS.AES.decrypt('U2FsdGVkX18ze5vAngLdrD1I7vP3lj35g13VBjKvFOY=', 'G0dU$sopp').toString(CryptoJS.enc.Utf8));

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