import express, { Router} from 'express';
import SwaggerUi from 'swagger-ui-express';
import SwaggerAutogen from 'swagger-autogen';

import ApplicationConstants from './src/application/constants';
import DataContext from './src/infrastructure/data-contexts/postgresContext';

import Controllers from './src/application/controllers';

import { AuthControllerRoute } from './src/application/routes/auth';
import { FlashcardControllerRoute } from './src/application/routes/flashcard';
import { SwaggerRoute } from './src/application/routes/apiDocs';

import { Authorize } from './src/application/middlewares/auth';

DataContext.setupDataContext(
    '10.5.0.2',
    '5432',
    'bipe',
    'admin',
    'admin'
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(Authorize);

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
const endpointsFiles = ['./server.js', './src/application/controllers/index.js'];

const router = Router();

app.use('/', router);
app.use(AuthControllerRoute, Controllers.Auth);
app.use(FlashcardControllerRoute, Controllers.Flashcard);

SwaggerGenerator(outputFile, endpointsFiles, doc)
    .then(() => {
        const SwaggerDocument = require(ApplicationConstants.Setup.SWAGGER_JSON_PATH);

        router.use(SwaggerRoute, SwaggerUi.serve);
        router.get(SwaggerRoute, SwaggerUi.setup(SwaggerDocument));

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