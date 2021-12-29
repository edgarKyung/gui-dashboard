const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const fs = require('fs');
// Subscription
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
const express = require("express");
const cors = require('cors');
const { SubscriptionServer } = require("subscriptions-transport-ws");


(async function(){
    const pubsub = new PubSub();

    const schema = require('./graphql/schema')(pubsub);
    const dataSources = require('./graphql/dataSources');
    
    const server = new ApolloServer({
        schema,
        context:{
          test:'asd'
        },
        dataSources,
    });
    console.log('dataSources', dataSources());
    await server.start();

    const app = express();
    app.use('*', cors());
    const httpServer = createServer(app);
    server.applyMiddleware({ app });
    SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        { server: httpServer, path: server.graphqlPath }
    );
    
    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`🚀  Server ready at ${PORT}${server.graphqlPath}`);
        startTempMonitoring();
    });
     
    const startTempMonitoring = () => {
        const monitoring =  async () => {
          const robots = fs.readFileSync('./database/robots.json', 'utf8');
          pubsub.publish("robots", { robots: JSON.parse(robots) });
            setTimeout(monitoring, 1000);
        }
        monitoring();
    }
})();