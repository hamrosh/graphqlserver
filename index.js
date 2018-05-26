import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema/schema';
// declaring the express app and the port to be used
const app = express();
const PORT = 5000;

// move this key to the config file later
const mongoURI = 'mongodb://sa:ham24MDB@ds259499.mlab.com:59499/itigurus';

// Cors used for request from CLient App  in Local Development

app.use(cors());

// mongobd Connection and Setup

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database ');
});

//  Setting the Graphql Endpoints

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Starting the server on Port , usee the ENV.PORT varialble Later

app.listen(PORT, () => {
  console.log('Listening on Port 5000');
});
