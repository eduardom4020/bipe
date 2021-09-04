import { Client } from 'pg';

const clientSingletonDict = {};
let keysHistory = [];

const PostgresConnectionFatory = (host, port, database, user, password) => {
    const key = `${host}:${port}, ${database}, ${user}, ${password}`;

    if(clientSingletonDict.hasOwnProperty(key))
        return clientSingletonDict[key];

    const client =  new Client({host, port, database, user, password});

    clientSingletonDict[key] = client;
    keysHistory = [...keysHistory, key];

    return client;
};

const getCurrentContext = () => clientSingletonDict.hasOwnProperty(keysHistory[keysHistory.length - 1]) && clientSingletonDict[keysHistory[keysHistory.length - 1]];

const query = (queryString, parameters, handleSuccess, handleError) => {
    const context = getCurrentContext();

    return context.connect()
        .then(() => {
            console.log('Connected to database.');
            context.query(queryString, parameters)
                .then(handleSuccess)
                .catch(handleError)
                .finally(() => {
                    context.end()
                        .then(() => console.log('Connection closed.'))
                        .catch(() => console.log('Failed to close connection.'));
                });
        })
        .catch(() => {
            console.log('Failed to start connection.')
        });
};

export default {
    setupDataContext: PostgresConnectionFatory,
    query
};