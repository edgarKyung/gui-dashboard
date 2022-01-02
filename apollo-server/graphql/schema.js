const { makeExecutableSchema } = require("@graphql-tools/schema");

module.exports = (pubsub) => {
    const queries = require("./queries")(); 
    const subscriptions = require('./subscriptions')(pubsub);
    
    const images = require("./modules/images")();
    const robots = require("./modules/robots")();
    const floors = require("./modules/floors")();
    
    const typeDefs = [
        images.typeDefs,
        robots.typeDefs,
        floors.typeDefs,
    
        queries.typeDefs,
        subscriptions.typeDefs,
    ];
    const resolvers = [
        images.resolvers,
        robots.resolvers,
        floors.resolvers,

        subscriptions.resolvers,
    ];
    
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
         
    return schema;
}